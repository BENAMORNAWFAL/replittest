const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

const exts = [".ts", ".tsx", ".js", ".jsx"];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === "node_modules" || e.name === ".git") continue;
      walk(full);
    } else if (exts.includes(path.extname(e.name))) {
      processFile(full);
    }
  }
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  const dir = path.dirname(filePath);
  let changed = false;

  // helper
  const replaceMatch = (m, quote, prefix, rest, sourceFile) => {
    // Compute candidate targets (order matters)
    const candidates = [];
    if (prefix === "@") {
      // prefer same-root resolution: if source is in client, prefer client/src
      if (filePath.includes(path.join("client", "src"))) {
        candidates.push(path.resolve(root, "client", "src", rest));
        candidates.push(path.resolve(root, "src", rest));
      } else {
        // source in top-level src or other locations -> prefer top-level src first
        candidates.push(path.resolve(root, "src", rest));
        candidates.push(path.resolve(root, "client", "src", rest));
      }
    } else if (prefix === "@assets") {
      // try common asset locations
      candidates.push(path.resolve(root, "src", "assets", rest));
      candidates.push(path.resolve(root, "client", "src", "assets", rest));
      candidates.push(path.resolve(root, "attached_assets", rest));
    } else if (prefix === "@shared") {
      candidates.push(path.resolve(root, "shared", rest));
    } else {
      return m;
    }

    // Pick the first existing candidate; if none exist, use the first candidate (best-effort)
    let target = candidates.find((p) => fs.existsSync(p));
    if (!target) target = candidates[0];

    // compute relative path and convert to posix-style separators
    const rel = path.relative(dir, target).split(path.sep).join("/");
    const out = quote + (rel.startsWith(".") ? rel : "./" + rel) + quote;
    changed = true;
    return out;
  };

  // patterns: "@/foo/bar"  '@assets/..' '@shared/..'
  content = content.replace(/(['\"])@(\/)(.+?)\1/g, (m, q, s, rest) =>
    replaceMatch(m, q, "@", rest)
  );
  content = content.replace(/(['\"])@assets\/(.+?)\1/g, (m, q, rest) =>
    replaceMatch(m, q, "@assets", rest)
  );
  content = content.replace(/(['\"])@shared\/(.+?)\1/g, (m, q, rest) =>
    replaceMatch(m, q, "@shared", rest)
  );

  if (changed) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log("Updated", path.relative(root, filePath));
  }
}

walk(root);
console.log("Done");
