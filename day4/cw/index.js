/** @format */

import axios from "axios";
import * as cheerio from "cheerio";
import * as xlsx from "xlsx";

const url = "https://www.ajio.com/s/footwear-4461-74581";

async function fetchData() {
  try {
    console.log("Fetching data from the website...");
    const { data } = await axios.get(
      "https://juvento.myshopify.com/collections/all"
    );
    const $ = cheerio.load(data);
    // console.log(data);
    const products = [];

    const temp = $(data).find(".product-grid-view .col-lg-4 .single-product");
    temp.each((index, element) => {
      // console.log(element);
      const productName =
        $(element).find(".popup_cart_title").text().trim() || "N/A";
      const brand = $(element).find(".product-brand").text().trim() || "N/A";
      const price = $(element).find(".now-price").text().trim() || "N/A";
      const originalPrice =
        $(element).find(".regular-price").text().trim() || "N/A";
      const rating =
        $(element).find(".product-review").text().trim() || "No rating";
      const availability = "In Stock"; // Assuming all listed products are in stock
      //   console.log(price);
      products.push({
        "Product Name": productName,
        "original Price": originalPrice,
        "Offer Price": price,
        Rating: rating,
        Availability: availability,
      });
    });

    // console.log(`Found ${products.length} products`);

    // console.log("Saving data to Excel...");
    const worksheet = xlsx.utils.json_to_sheet(products);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Products");

    xlsx.writeFile(workbook, "product.xlsx");
    // console.log("Data has been saved to ajio_products.xlsx");
  } catch (error) {
    console.log("Error fetching data:", error.message);
  }
}

fetchData();
