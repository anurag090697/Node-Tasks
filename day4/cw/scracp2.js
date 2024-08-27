/** @format */

import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs/promises";

const url =
  "https://www.amazon.in/s/ref=mega_sv_s23_3_1_1_1?rh=i%3Akitchen%2Cn%3A1380027031&ie=UTF8&lo=kitchen";

const products = [];
async function getData() {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    $('div[data-component-type="s-search-result"]').each((i, element) => {
      const name = $(element).find("h2.a-size-mini").text().trim();
      const price = $(element).find("span.a-price-whole").text().trim();
      const availability = $(element).find("span.a-color-price").length
        ? "In Stock"
        : "Out of Stock";
      const rating = $(element).find("span.a-icon-alt").text().trim() || "N/A";

      products.push({
        "Product Name": name,
        Price: price,
        Availability: availability,
        "Product Rating": rating,
      });
    });
    // console.log(products);
    const productsString = products
      .map(
        (product) =>
          `Product Name: ${product["Product Name"]}\n` +
          `Price: ${product.Price}\n` +
          `Availability: ${product.Availability}\n` +
          `Product Rating: ${product["Product Rating"]}\n\n`
      )
      .join("");

    // Write to file
    await fs.writeFile("amazon_products.txt", productsString);
    console.log("Data has been written to amazon_products.txt");
  } catch {
    console.log("error");
  }
}

getData();
