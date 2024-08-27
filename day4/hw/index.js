/** @format */

import axios from "axios";
import * as cheerio from "cheerio";
import * as xlsx from "xlsx";

// const url =
//   "https://www.linkedin.com/jobs/search/?currentJobId=3987914256&keywords=Web%20Developer&origin=JOBS_HOME_KEYWORD_AUTOCOMPLETE&refresh=true";

async function getData() {
  try {
    const { data } = await axios.get(
      "https://www.shine.com/job-search/web-developer-fresher-jobs?q=web-developer-fresher&inference=%257B%2522skill%2522%253A%255B%255D%252C%2522jt%2522%253A%255B%2522web%2520developer%2522%255D%252C%2522ind%2522%253A%255B%2522fresher%2522%255D%252C%2522root_ind%2522%253A%255B%2522fresher%2520%2522%255D%257D"
    );
    //   console.log(data);
    const $ = cheerio.load(data);

    
    const temp = $(data).find(".parentClass .jobCard");

    // console.log(temp);
    // console.log($(temp).find(".jobCard"));
    const jobs = [];

    temp.each((index, element) => {
      const jobTitle = $(element)
        .find(".jobCard_pReplaceH2__xWmHg")
        .text()
        .trim();
      const companyName = $(element)
        .find(".jobCard_jobCard_cName__mYnow")
        .text()
        .trim();
      const location = $(element)
        .find(".jobCard_locationIcon__zrWt2")
        .text()
        .trim();
      const jobType = $(element)
        .find(".jobCard_jobType__eAJxE")
        .first()
        .text()
        .trim(); 
      const experience = $(element)
        .find(".jobCard_jobIcon__3FB1t")
        .text()
        .trim(); 
      const jobDescription = $(element)
        .find(".more_info_text")
        .text()
        .trim(); 

        console.log(jobTitle + "\n");
      //   console.log(index);

      jobs.push({
        JobTitle: jobTitle,
        CompanyName: companyName,
        Location: location,
        JobType: jobType,
        experience: experience,
        skills: jobDescription,
      });
        
      const worksheet = xlsx.utils.json_to_sheet(jobs);
      const workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, worksheet, "Jobs");
  
      xlsx.writeFile(workbook, "Jobs.xlsx");
    });

    console.log(jobs);
  } catch {
    console.log("Error");
  }
}

getData();
