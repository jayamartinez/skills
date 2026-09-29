#!/usr/bin/env node
// Link this workflow into Claude Code and Codex so edits here reach both agents.
// Usage: node scripts/install.mjs [--check]
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const home = os.homedir();
const check = process.argv.includes("--check");
const isWindows = process.platform === "win32";
const backupRoot = path.join(home, ".agent-workflow-backups", new Date().toISOString().replace(/[:.]/g, "-"));

const skillDirs = {
  claude: path.join(home, ".claude", "skills"),
  codex: path.join(home, ".agents", "skills"),
};
const legacyCodexSkills = path.join(home, ".codex", "skills");
const repoLink = path.join(home, ".claude", "agent-workflow");
const claudeImport = "@~/.claude/agent-workflow/CLAUDE.md";
const codexAgents = path.join(home, ".codex", "AGENTS.md");

let problems = 0;
const log = (status, message) => console.log(`${status.padEnd(8)} ${message}`);

function lstat(p) {
  try {
    return fs.lstatSync(p);
  } catch {
    return null;
  }
}

function linkTarget(p) {
  try {
    return path.resolve(path.dirname(p), fs.readlinkSync(p));
  } catch {
    return null;
  }
}

function samePath(a, b) {
  const norm = (p) => path.resolve(p).replace(/[\\/]+$/, "");
  return isWindows ? norm(a).toLowerCase() === norm(b).toLowerCase() : norm(a) === norm(b);
}

function backup(p, label) {
  const dest = path.join(backupRoot, label, path.basename(p));
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.renameSync(p, dest);
  log("backup", `${p} -> ${dest}`);
}

// Directories use junctions on Windows, which need no elevated rights.
function ensureLink(source, dest, label, type = "dir") {
  const stat = lstat(dest);
  if (stat?.isSymbolicLink() && samePath(linkTarget(dest), source)) {
    log("ok", dest);
    return;
  }
  if (check) {
    log("missing", `${dest} is not linked to ${source}`);
    problems++;
    return;
  }
  if (stat) {
    if (stat.isSymbolicLink()) fs.unlinkSync(dest);
    else backup(dest, label);
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.symlinkSync(source, dest, type === "dir" && isWindows ? "junction" : type);
  log("linked", `${dest} -> ${source}`);
}

const skills = fs
  .readdirSync(repo, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(repo, entry.name, "SKILL.md")))
  .map((entry) => entry.name);

for (const [label, dir] of Object.entries(skillDirs)) {
  for (const name of skills) ensureLink(path.join(repo, name), path.join(dir, name), label);

  // Remove links left behind by skills that were renamed or deleted here.
  for (const entry of fs.existsSync(dir) ? fs.readdirSync(dir) : []) {
    const p = path.join(dir, entry);
    const target = lstat(p)?.isSymbolicLink() ? linkTarget(p) : null;
    if (!target || skills.includes(entry) || !samePath(path.dirname(target), repo)) continue;
    if (check) {
      log("stale", p);
      problems++;
    } else {
      fs.unlinkSync(p);
      log("removed", `${p} (skill no longer exists)`);
    }
  }
}

// Older Codex installs copied skills here; a second copy would shadow or duplicate the linked one.
for (const name of skills) {
  const p = path.join(legacyCodexSkills, name);
  if (!lstat(p)) continue;
  if (check) {
    log("stale", `${p} duplicates ${path.join(skillDirs.codex, name)}`);
    problems++;
  } else {
    backup(p, "codex-legacy-skills");
  }
}

// Claude Code: link the checkout to a path without spaces, then import the adapter globally.
ensureLink(repo, repoLink, "claude-repo-link");
const claudeMd = path.join(home, ".claude", "CLAUDE.md");
const claudeText = fs.existsSync(claudeMd) ? fs.readFileSync(claudeMd, "utf8") : null;
if (claudeText?.split(/\r?\n/).includes(claudeImport)) {
  log("ok", `${claudeMd} imports the workflow`);
} else if (check) {
  log("missing", `${claudeMd} does not contain ${claudeImport}`);
  problems++;
} else {
  const prefix = claudeText ? `${claudeText.replace(/\s*$/, "")}\n\n` : "";
  fs.writeFileSync(claudeMd, `${prefix}${claudeImport}\n`);
  log("updated", `${claudeMd} now imports the workflow`);
}

// Codex: its global instructions file must be the shared AGENTS.md itself.
try {
  ensureLink(path.join(repo, "AGENTS.md"), codexAgents, "codex-agents", "file");
} catch (error) {
  if (error.code !== "EPERM") throw error;
  fs.copyFileSync(path.join(repo, "AGENTS.md"), codexAgents);
  log("copied", `${codexAgents} (file symlinks need Windows Developer Mode; rerun after AGENTS.md changes)`);
}

if (check && problems) {
  console.log(`\n${problems} item(s) need attention. Run: node scripts/install.mjs`);
  process.exit(1);
}
