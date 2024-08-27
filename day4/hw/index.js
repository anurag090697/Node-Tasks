/** @format */

import axios from "axios";
import * as cheerio from "cheerio";

const url =
  "https://www.linkedin.com/jobs/search/?currentJobId=3987914256&keywords=Web%20Developer&origin=JOBS_HOME_KEYWORD_AUTOCOMPLETE&refresh=true";

async function getData() {
  try {
    const { data } = await axios.get(url);
    //   console.log(data);
    const $ = cheerio.load(data);
    const jobs = [];
    //   console.log($(data).find("ul.scaffold-layout__list-container"));
    const temp = $(data).find("ul.scaffold-layout__list-container");
    const temp2 = $(data).find(".jobs-search-results__list-item");
    // console.log(temp);
    $("li.jobs-search-results__list-item").each((idx, ele) => {
      console.log(ele);
    });
  } catch {
    console.log("Error");
  }
}

getData();
