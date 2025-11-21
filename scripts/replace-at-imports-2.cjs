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
  const replaceMatch = (m, quote, prefix, rest) => {
    let target;
    if (prefix === "@") target = path.resolve(root, "client", "src", rest);
    else if (prefix === "@assets")
      target = path.resolve(root, "attached_assets", rest);
    else if (prefix === "@shared") target = path.resolve(root, "shared", rest);
    else return m;

    // if target doesn't have extension and exists as file with various extensions, keep rest as-is
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
