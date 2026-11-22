#!/usr/bin/env node
// Validação estática das skills. Node puro, sem dependência: é a bancada de
// quem mantém o pack, e roda antes de qualquer commit.
//
// Quem **usa** o pack nunca roda isto — o instalador é bash puro de propósito.
//
// O que ela não faz: julgar se a skill conduz bem uma conversa. Isso é eval,
// e ainda não existe aqui.

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const SKILLS = join(ROOT, "skills");
const SHARED = join(ROOT, "shared");

// Skill que ninguém lê inteira não é seguida inteira.
const MAX_LINES = 400;

const REQUIRED = ["name", "shared", "description", "allowed-tools", "triggers"];

// O que viaja não pode citar o que só existe na máquina de quem mantém, nem
// identificar projeto ou infraestrutura de terceiro.
const FORBIDDEN = [
  [/\.claude\/rules\//, "pasta de regras de outro baseline"],
  [/claude-base/i, "baseline que quem instala não tem"],
  [/\/speckit[-.]/, "comando de outra ferramenta"],
  [/\bspecify (init|preset|extension)\b/, "CLI de outra ferramenta"],
];

const failures = [];
const fail = (where, what) => failures.push(`${where}: ${what}`);

const read = (file) => readFileSync(file, "utf8");
const flat = (text) => text.replace(/\s+/g, " ");

// Um ``` que abre e não fecha engole o resto do arquivo: o modelo lê as regras
// de depois como exemplo literal.
function unclosedFence(text) {
  let open = 0;
  text.split("\n").forEach((line, i) => {
    if (/^\s*```/.test(line)) open = open ? 0 : i + 1;
  });
  return open;
}

function markdownFiles(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) markdownFiles(full, out);
    else if (entry.endsWith(".md")) out.push(full);
  }
  return out;
}

// `chave: [a, b,` … `c]`, podendo quebrar em várias linhas.
function listOf(fm, key) {
  const m = fm.match(new RegExp(`^${key}:\\s*\\[([^\\]]*)\\]`, "m"));
  if (!m) return null;
  return m[1].split(",").map((s) => s.trim()).filter(Boolean);
}

for (const file of [...markdownFiles(SKILLS), ...markdownFiles(SHARED)]) {
  const rel = relative(ROOT, file);
  const text = read(file);
  const line = unclosedFence(text);
  if (line) fail(rel, `bloco de código aberto na linha ${line} e nunca fechado`);
  for (const [pattern, why] of FORBIDDEN) {
    const m = text.match(pattern);
    if (m) fail(rel, `cita \`${m[0]}\` (${why}) — descreva o comportamento, não a ferramenta`);
  }
}

const skills = existsSync(SKILLS)
  ? readdirSync(SKILLS).filter((d) => statSync(join(SKILLS, d)).isDirectory())
  : [];
if (skills.length === 0) fail("skills/", "nenhuma skill encontrada");

for (const dir of skills) {
  const rel = `skills/${dir}/SKILL.md`;
  const file = join(SKILLS, dir, "SKILL.md");

  if (!/^yas(-[a-z0-9]+)*$/.test(dir)) {
    fail(rel, "nome de pasta fora do padrão: `yas` ou `yas-<nome>`, em kebab-case");
  }
  if (!existsSync(file)) {
    fail(rel, "pasta de skill sem SKILL.md");
    continue;
  }

  const text = read(file);
  const fmMatch = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!fmMatch) {
    fail(rel, "sem frontmatter YAML no topo");
    continue;
  }
  const fm = fmMatch[1];
  const body = text.slice(fmMatch[0].length);

  for (const key of REQUIRED) {
    if (!new RegExp(`^${key}:`, "m").test(fm)) fail(rel, `frontmatter sem \`${key}\``);
  }

  const name = fm.match(/^name:\s*(.+)$/m)?.[1].trim();
  if (name && name !== dir) fail(rel, `\`name: ${name}\` não bate com a pasta \`${dir}\``);

  const lines = text.split("\n").length;
  if (lines > MAX_LINES) fail(rel, `${lines} linhas — o teto é ${MAX_LINES}`);

  const shared = listOf(fm, "shared") ?? [];
  if (!shared.includes("preamble")) {
    fail(rel, "não declara `preamble` em `shared:` — toda skill começa por ele");
  }
  for (const item of shared) {
    if (!existsSync(join(SHARED, `${item}.md`))) {
      fail(rel, `declara \`${item}\` em shared:, e shared/${item}.md não existe`);
    } else if (!body.includes(`${item}.md`)) {
      fail(rel, `declara \`${item}\` e nunca manda lê-lo — arquivo copiado que ninguém abre`);
    }
  }

  const references = listOf(fm, "references") ?? [];
  const refDir = join(SKILLS, dir, "references");
  for (const item of references) {
    if (!existsSync(join(refDir, `${item}.md`))) {
      fail(rel, `declara \`${item}\` em references:, e references/${item}.md não existe`);
    } else if (!body.includes(`references/${item}.md`)) {
      fail(rel, `declara a reference \`${item}\` e nunca manda lê-la`);
    }
  }
  if (existsSync(refDir)) {
    for (const f of readdirSync(refDir)) {
      if (f.endsWith(".md") && !references.includes(f.replace(/\.md$/, ""))) {
        fail(`skills/${dir}/references/${f}`, "não está em `references:` — o instalador copia só o que é declarado");
      }
    }
  }

  // A guarda é o que mantém a ordem do método: sem ganchos, é só ela.
  if (!/^## Guarda/m.test(body)) {
    fail(rel, "sem a seção `## Guarda` — toda skill começa conferindo um fato");
  }

  // Skill só pode mandar rodar skill que existe.
  for (const m of flat(body).matchAll(/`\/(yas(?:-[a-z0-9]+)*)`/g)) {
    if (m[1] !== dir && !skills.includes(m[1])) {
      fail(rel, `manda rodar \`/${m[1]}\`, que não existe em skills/`);
    }
  }
}

if (failures.length) {
  console.error(`✗ ${failures.length} problema(s):\n`);
  for (const f of failures) console.error(`  ${f}`);
  process.exit(1);
}
console.log(`✓ ${skills.length} skill(s) conferidas`);
