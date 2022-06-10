// 
// Clayton Skaggs 6-9-22
//
// Installed inquirer vis "npm install inquirer" command
// - npm install @octokit/core
// - npm install inquirer
// - npm install request

// const key = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     'X-RapidAPI-Host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com',
//     'X-RapidAPI-Key': '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'
//   }
// };

//!===================== Variable Decleration =====================

//? Import Statments
const fs = require('fs');
const inquirer = require('inquirer');
const { Octokit } = require("@octokit/core");
const request = require('request');

//? List of Questions
const questions = [
  "Please Enter a Project Title:",
  "Please Enter a Project Description:",
  "Please Enter Project Installation Instructions:",
  "Please Enter Project Usage Information:",
  "Please Enter Project Contribution Guidelines:",
  "Please Enter Project Test Instructions:",
  "Please Choose a Project License:",
  "Please Enter your GitHub UserName:",
  "Please Enter your GitHub Email:",
];

//? List of License choices 
const listOfLicenses = ["mit", "gpl-3.0", "gpl-2.0", "apache-2.0"];

//? Empty object to hold user input
const readmeInput = {
  proTitle: "",
  proDescription: "",
  proInstall: "",
  proUsage: "",
  proContributionGuide: "",
  proTestInstuctions: "",
  proLicense: "",
  licenseBadge: "",
  licenseBody: "",
  licenseReadName: "",
  userGitHub: "",
  userEmail: ""
};

let licenseBody = '';

//!===================== Functions Section =====================


// ?============= init =============
function init() {

  console.log(`\x1b[46m=============== README-O-MATIC ================\x1b[0m`);
  console.log(`\x1b[46m                    Hello!                     \x1b[0m`);
  console.log(`\x1b[46mWelcome to the README-O-MATIC Readme Generator!\x1b[0m`);

};

// ?============= getUserInput =============
async function getUserInput() {

  await 1

  inquirer
    .prompt([
      {
        type: 'input',
        name: 'proTitle',
        message: questions[0],
      },
      {
        type: 'input',
        name: 'proDescription',
        message: questions[1],
      },
      {
        type: 'input',
        name: 'proInstall',
        message: questions[2],
      },
      {
        type: 'input',
        name: 'proUsage',
        message: questions[3],
      },
      {
        type: 'input',
        name: 'proContributionGuide',
        message: questions[4],
      },
      {
        type: 'input',
        name: 'proTestInstuctions',
        message: questions[5],
      },
      {
        type: 'rawlist',
        name: 'proLicense',
        choices: listOfLicenses,
        message: questions[6],
      },
      {
        type: 'input',
        name: 'userGitHub',
        message: questions[7],
      },
      {
        type: 'input',
        name: 'userEmail',
        message: questions[8],
      },
    ])
    .then(answers => {

      //* Save User input to Object 
      readmeInput.proTitle = answers.proTitle;
      readmeInput.proDescription = answers.proDescription;
      readmeInput.proInstall = answers.proInstall;
      readmeInput.proUsage = answers.proUsage;
      readmeInput.proContributionGuide = answers.proContributionGuide;
      readmeInput.proTestInstuctions = answers.proTestInstuctions;
      readmeInput.proLicense = answers.proLicense;
      readmeInput.userGitHub = answers.userGitHub;
      readmeInput.userEmail = answers.userEmail;
      // console.info('Answer:', readmeInput.proLicense);

      var tempURL = 'https://api.github.com/licenses/' + readmeInput.proLicense;
      console.log("TempURL = " + tempURL)

      const options = {
        url: tempURL,
        headers: {
          'User-Agent': 'DesertCow'
        }
      };

      request(options, callback);
      //getLicenseInfo(readmeInput.proLicense);


      return true;

    });
};

// *========================== generateREADME ==========================
async function generateREADME(data) {


  //*################### Markup Sections HTML ####################
  //?####################### Title #######################
  let titleHeader = `

  <h2 align="center">${readmeInput.proTitle}</h2>
  <div align="center">

  ${readmeInput.licenseBadge}

  </div>
  ---
  `;

  //?####################### Description ###########################
  let proDescription = `

  <h3 align="center">📢 📢 Description 📢 📢</h3>

  ----
  <p align="center">${readmeInput.proDescription}</p>


  <br>
  <br>
  `;

  //?####################### Table Of Contents ###########################
  let tableOfContents = `
  
  <h3 align="center">📢 📢 Table Of Contents 📢 📢</h3>
  
  ----
  [Installation](#install)
  [Usage](#usage)
  [Contribution Guidelines](#guide)
  [Test Instructions](#test)
  [Project License](#license)
  [Contact Information](#contact)

  <br>
  <br>
  `;

  //?####################### Installation ###########################
  let installDescription = `

  <a name="install">
  <h3 align="center">📢 📢 Installation 📢 📢</h3>
  </a>

  ----
  <p align="left">${readmeInput.proInstall}</p>


  <br>
  <br>
  `;

  //?####################### Usage ###########################
  let usageDescription = `

  <a name="usage">
  <h3 align="center">📢 📢 Usage 📢 📢</h3>
  </a>
  
  ----
  <p align="left">${readmeInput.proUsage}</p>


  <br>
  <br>
  `;


  //?####################### Contrribution ###########################
  let contributionDescription = `

  <a name="guide">
  <h3 align="center">📢 📢 Contribution Guidelines 📢 📢</h3>
  </a>
  
  ----
  <p align="left">${readmeInput.proContributionGuide}</p>


  <br>
  <br>
  `;

  //?####################### Test ###########################
  let testDescription = `

  <a name="test">
  <h3 align="center">📢 📢 Test Instructions 📢 📢</h3>
  </a>
  
  ----
  <p align="left">${readmeInput.proTestInstuctions}</p>


  <br>
  <br>
  `;

  //?####################### License ###########################
  let licenseDescription = `

  <a name="license">
  <h3 align="center">📢 📢 Project License 📢 📢</h3>
  </a>
  
  ----
  <p align="center">This project is licensed under the terms of the ${licenseReadName} license.</p>
  <div align="center">

  ${readmeInput.licenseBadge}

  </div>

  <div align="center">${licenseBody}</div>

  <br>
  <br>
  `;

  //?####################### Contact ###########################
  let contactInfo = `

  <a name="contact">
  <h3 align="center">📢 📢 Questions/Contact Information 📢 📢</h3>
  </a>
  
  ----
  <p align="center">Author GitHub: <a href="https://github.com/${readmeInput.userGitHub}">https://github.com/${readmeInput.userGitHub}</a></p>
  <p align="center">Author Email: <a href="mailto:${readmeInput.userEmail}">${readmeInput.userEmail}</a></p>



  <br>
  <br>
  `;

  //* Write To File README File
  // Generate Readme based on sections defined above
  fs.appendFile('README.md', `${titleHeader}\n${proDescription}\n${tableOfContents}\n${installDescription}\n${usageDescription}\n${contributionDescription}\n${testDescription}\n${licenseDescription}\n${contactInfo}\n`, () => { });
  console.log(`\x1b[43m============= README.md Created! ==============\x1b[0m`);
  console.log(`\x1b[46m=========== Tool Complete, Goodbye! ===========\x1b[0m`);

};

// *============= setLicenseBadge =============
function setLicenseBadge(license) {

  if (license === "mit") {

    readmeInput.licenseBadge = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";

  } else if (license === "gpl-3.0") {

    readmeInput.licenseBadge = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";

  } else if (license === "gpl-2.0") {

    readmeInput.licenseBadge = "[![License: GPL v2](https://img.shields.io/badge/License-GPL_v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)";

  } else if (license === "apache-2.0") {

    readmeInput.licenseBadge = "[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";

  }

  //console.log("Badge Text: " + readmeInput.licenseBadge);
}

// async function fetchLIC(lic) {
//   // Octokit.js
//   // https://github.com/octokit/core.js#readme
//   const octokit = new Octokit({
//     auth: "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"
//   })

// await octokit.request('GET /licenses', {
//   console.log()
// })
// }

// *============= getLicenseInfo =============



function callback(error, response, body) {

  if (error) { return console.log(error); }
  body = JSON.parse(body)
  //console.log(response);
  // console.log(body.key);
  // console.log(body.name);
  // console.log(body.spdx_id);
  // console.log("BODY 1" + body.body);
  licenseReadName = body.name
  licenseBody = body.description;
  // console.log("BODY = " + licenseBody);

  setLicenseBadge(readmeInput.proLicense);
  //console.log(readmeInput);
  generateREADME(readmeInput);

}



// console.log("LIC = " + license + " || " + `https://api.github.com/licenses/${license}`)
// var apiURL = "https://api.github.com/licenses/" + license;

// fetch(apiURL)
//   .then(function (respone) {

//     if (respone.status != 200) {
//       console.log("ERROR API(" + respone.status + ") from " + apiURL);
//     } else {
//       return respone.json();
//     }
//     return;

//   })
//   .then(function (data) {


//     return;
//   })




//!============== Init ==============
init();

// !============= Main =============
getUserInput();


// !========== END of MAIN =========
// console.log(`\x1b[43m========== END of MAIN =========\x1b[0m`);