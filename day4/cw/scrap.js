/** @format */

import puppeteer from "puppeteer";
import fs from "fs/promises";

const url = "https://www.ajio.com/s/footwear-4461-74581";

async function getData(retries = 3) {
  let browser;
  try {
    console.log("Launching browser...");
    browser = await puppeteer.launch({
      headless: false,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--window-size=1920,1080",
      ],
      defaultViewport: null,
    });

    console.log("Creating new page...");
    const page = await browser.newPage();

    console.log("Setting user agent...");
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    console.log("Navigating to URL...");
    await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });

    console.log("Waiting for product grid to load...");
    await page.waitForSelector(".item", { timeout: 60000 });

    console.log("Scrolling page...");
    await autoScroll(page);

    console.log("Extracting product data...");
    const products = await page.evaluate(() => {
      return Array.from(document.querySelectorAll(".item")).map((item) => ({
        "Product Name":
          item.querySelector(".nameCls")?.textContent.trim() || "N/A",
        Brand: item.querySelector(".brand")?.textContent.trim() || "N/A",
        Price: item.querySelector(".price")?.textContent.trim() || "N/A",
        Availability: "In Stock",
      }));
    });

    console.log(`Found ${products.length} products`);

    if (products.length === 0) {
      throw new Error(
        "No products found. The page might not have loaded correctly or the structure might have changed."
      );
    }

    const productsString = products
      .map(
        (product) =>
          `Product Name: ${product["Product Name"]}\n` +
          `Brand: ${product["Brand"]}\n` +
          `Price: ${product["Price"]}\n` +
          `Availability: ${product["Availability"]}\n\n`
      )
      .join("");

    console.log("Writing data to file...");
    await fs.writeFile("ajio_products.txt", productsString);
    console.log("Data has been written to ajio_products.txt");
  } catch (error) {
    console.log("Error:", error.message);
    console.log("Error stack:", error.stack);
    if (retries > 0) {
      console.log(`Retrying... (${retries} attempts left)`);
      await getData(retries - 1);
    }
  } finally {
    if (browser) {
      console.log("Closing browser...");
      await browser.close();
    }
  }
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      var totalHeight = 0;
      var distance = 100;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

getData();
