import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, "public", "images", "blog");

const TARGET_WIDTHS = [320, 640, 720, 960];

const isWebp = (fileName) => fileName.toLowerCase().endsWith(".webp");

const ensureDir = async (dir) => {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch {
    // ignore
  }
};

const formatBytes = (bytes) => {
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KiB`;
  return `${(kb / 1024).toFixed(1)} MiB`;
};

const generateVariantsForFile = async (absInputPath) => {
  const inputFileName = path.basename(absInputPath);
  const baseName = inputFileName.slice(0, -".webp".length);

  const inputStat = await fs.stat(absInputPath);
  const inputMeta = await sharp(absInputPath).metadata();

  if (!inputMeta.width) {
    console.warn(`[skip] ${inputFileName}: can't read width`);
    return;
  }

  const plannedWidths = TARGET_WIDTHS.filter((w) => w <= inputMeta.width);
  if (plannedWidths.length === 0) {
    console.warn(`[skip] ${inputFileName}: smaller than smallest target`);
    return;
  }

  await Promise.all(
    plannedWidths.map(async (width) => {
      const outName = `${baseName}-${width}.webp`;
      const outPath = path.join(path.dirname(absInputPath), outName);

      const outBuffer = await sharp(absInputPath)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 78 })
        .toBuffer();

      await fs.writeFile(outPath, outBuffer);
      const outStat = await fs.stat(outPath);
      console.log(
        `[ok] ${inputFileName} → ${outName} (${width}px): ${formatBytes(outStat.size)} (was ${formatBytes(inputStat.size)})`
      );
    })
  );
};

const main = async () => {
  await ensureDir(BLOG_DIR);

  const entries = await fs.readdir(BLOG_DIR, { withFileTypes: true });
  const webps = entries.filter((e) => e.isFile() && isWebp(e.name)).map((e) => e.name);

  if (webps.length === 0) {
    console.log(`[info] No .webp files found in ${BLOG_DIR}`);
    return;
  }

  for (const fileName of webps) {
    // Skip already-generated variants
    if (/-\d+\.webp$/i.test(fileName)) continue;
    await generateVariantsForFile(path.join(BLOG_DIR, fileName));
  }
};

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});


