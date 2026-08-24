import puppeteer from "puppeteer-core";
import * as chromeLauncher from "chrome-launcher";
import fs from "fs";
import path from "path";

async function main() {
  const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless=new", "--no-sandbox"] });
  const browser = await puppeteer.connect({
    browserURL: `http://127.0.0.1:${chrome.port}`
  });
  const page = await browser.newPage();

  async function optimize(file) {
    const filePath = path.resolve(file);
    const b64 = fs.readFileSync(filePath).toString("base64");
    const newB64 = await page.evaluate(async (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = 1280;
          canvas.height = Math.round(img.naturalHeight * (1280 / img.naturalWidth));
          const ctx = canvas.getContext("2d");
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL("image/webp", 0.72).split(",")[1]);
        };
        img.src = "data:image/webp;base64," + src;
      });
    }, b64);
    fs.writeFileSync(filePath, Buffer.from(newB64, "base64"));
    console.log("Optimized", file, "->", fs.statSync(filePath).size, "bytes");
  }

  await optimize("public/credentials/Google_Auth/step1.webp");
  await optimize("public/onboarding/step1.webp");
  await browser.close();
  await chrome.kill();
}

main().catch(console.error);
