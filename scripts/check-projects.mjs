// Contrôle sans dépendance externe et sans modification des fichiers.
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { resolve, relative, isAbsolute } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const projects = JSON.parse(await readFile(new URL("../data/projects.json", import.meta.url), "utf8"));
const source = await readFile(new URL("../js/data.js", import.meta.url), "utf8");
// Le chargeur navigateur est importé en mémoire ; fetch est simulé seulement ici.
const originalFetch = globalThis.fetch;
let checks = 0;
let media = 0;

try {
  // Une URL factice remplace uniquement l'emplacement du JSON dans le test.
  // new URL() a besoin d'une base hiérarchique pour le module importé en mémoire.
  const testSource = source.replace('import.meta.url', '"https://portfolio.test/js/data.js"');
  const testModule = await import(`data:text/javascript;base64,${Buffer.from(testSource).toString("base64")}`);
  async function run(value, ok = true) {
    globalThis.fetch = async () => ({ ok, status: ok ? 200 : 503, json: async () => value });
    return testModule.loadProjects();
  }
  const loaded = await run(projects);
  assert.equal(loaded.length, 6);
  checks++;
  for (const project of loaded) {
    assert(project.shortDescription.trim());
    const files = [project.image, project.heroImage, ...project.gallery,
      ...project.videos.flatMap((clip) => [clip.src, clip.poster])].filter(Boolean);
    for (const file of files) {
      assert(!/^[a-z]+:/i.test(file), `Média attendu local : ${file}`);
      const target = resolve(root, file);
      const local = relative(root, target);
      assert(!local.startsWith("..") && !isAbsolute(local), `Chemin hors dépôt : ${file}`);
      await access(target);
      media++;
    }
  }
  const missingSummary = structuredClone(projects);
  delete missingSummary[0].shortDescription;
  assert.equal((await run(missingSummary))[0].shortDescription, projects[0].description);
  checks++;
  for (const badSummary of ["", "   ", 123, []]) {
    const fixture = structuredClone(projects);
    fixture[0].shortDescription = badSummary;
    await assert.rejects(() => run(fixture), /shortDescription/);
    checks++;
  }
  const duplicate = structuredClone(projects);
  duplicate[1].id = duplicate[0].id;
  await assert.rejects(() => run(duplicate), /identifiant/);
  checks++;
  await assert.rejects(() => run({}), /tableau/);
  checks++;
  await assert.rejects(() => run(projects, false), /503/);
  checks++;
  console.log(`OK : ${checks} contrôles, ${loaded.length} projets, ${media} références de médias locaux.`);
} finally {
  globalThis.fetch = originalFetch;
}
