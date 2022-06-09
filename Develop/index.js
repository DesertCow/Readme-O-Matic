// 
// Clayton Skaggs 6-9-22
//
// Installed inquirer vis "npm install inquirer" command
// - npm install @octokit/core
// - npm install inquirer
//

// const key = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     'X-RapidAPI-Host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com',
//     'X-RapidAPI-Key': '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'
//   }
// };

const fs = require('fs');
const inquirer = require('inquirer');
const { Octokit } = require("@octokit/core");

// List of Questions
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

const listOfLicenses = ["MIT", "GPLv3", "GPLv2", "Apache"];

const readmeInput = {
  proTitle: "",
  proDescription: "",
  proInstall: "",
  proUsage: "",
  proContributionGuide: "",
  proTestInstuctions: "",
  proLicense: "",
  licenseBadge: "",
  userGitHub: "",
  userEmail: ""
};

//########################### Functions ###########################


// TODO: Create a function to initialize app
function init() {

  //console.log(questions);

};

function getUserInput() {

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

      //console.log(readmeInput);
      generateREADME(readmeInput);
      return true;

    });
};

async function generateREADME(data) {

  // console.log("README Function PRINT");
  // console.log(data);
  // console.log(`${process.argv[2]}\n`);

  let titleHeader = `

  <h2 align="center">${readmeInput.proTitle}</h2>
  <div align="center">

  ${readmeInput.licenseBadge}

  </div>
  ---
  `;



  let proDescription = `

  <h3 align="center">📢 📢 Description 📢 📢</h3>

  ----
  <p align="center">${readmeInput.proDescription}</p>


  <br>
  <br>
  `;

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

  let installDescription = `

  <a name="install">
  <h3 align="center">📢 📢 Installation 📢 📢</h3>
  </a>

  ----
  <p align="left">${readmeInput.proInstall}</p>


  <br>
  <br>
  `;

  let usageDescription = `

  <a name="usage">
  <h3 align="center">📢 📢 Usage 📢 📢</h3>
  </a>
  
  ----
  <p align="left">${readmeInput.proUsage}</p>


  <br>
  <br>
  `;

  let contributionDescription = `

  <a name="guide">
  <h3 align="center">📢 📢 Contribution Guidelines 📢 📢</h3>
  </a>
  
  ----
  <p align="left">${readmeInput.proContributionGuide}</p>


  <br>
  <br>
  `;

  let testDescription = `

  <a name="test">
  <h3 align="center">📢 📢 Test Instructions 📢 📢</h3>
  </a>
  
  ----
  <p align="left">${readmeInput.proTestInstuctions}</p>


  <br>
  <br>
  `;

  let licenseDescription = `

  <a name="license">
  <h3 align="center">📢 📢 Project License 📢 📢</h3>
  </a>
  
  ----
  <p align="center">This project is licensed under the terms of the ${readmeInput.proLicense} license.</p>
  <div align="center">

  ${readmeInput.licenseBadge}

  </div>

  <br>
  <br>
  `;

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

  fs.appendFile('README.md', `${titleHeader}\n${proDescription}\n${tableOfContents}\n${installDescription}\n${usageDescription}\n${contributionDescription}\n${testDescription}\n${licenseDescription}\n${contactInfo}\n`, () => { })


};

function setLicenseBadge(license) {

  if (license === "MIT") {

    readmeInput.licenseBadge = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";

  } else if (license === "GPLv3") {

    readmeInput.licenseBadge = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";

  } else if (license === "GPLv2") {

    readmeInput.licenseBadge = "[![License: GPL v2](https://img.shields.io/badge/License-GPL_v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)";

  } else if (license === "Apache") {

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

async function getLicenseInfo() {

  var apiURL = "https://www.themealdb.com/api/json/v1/1/random.php";

  fetch(apiURL)
    .then(function (respone) {

      if (respone.status != 200) {
        console.log("ERROR API(" + respone.status + ") from " + apiURL);
      } else {
        return respone.json();
      }
      return;

    })
    .then(function (data) {

      summary.mealName = data.meals[0].strMeal;
      summary.mealInstructions = data.meals[0].strInstructions;
      summary.mealPictureURL = data.meals[0].strMealThumb;
      summary.mealYouTubeURL = data.meals[0].strYoutube;

      recipeCardNameTitleEL.textContent = summary.mealName;
      recipeImgEL.src = summary.mealPictureURL;
      recipeCardFullrecipeEL.textContent = summary.mealInstructions;

      titleDrinkEL.textContent = summary.drinkName;
      recipeNameTitleEL.textContent = summary.mealName;

      updateSessionStore();

      return;
    })
}

// ============= Init =============
init();

// ============= Main =============
getUserInput();

// while (userInputFlag) {
//   // Wait for user to complete input...
// }

// console.log("User Input COMPLETE!");

// ========== END of MAIN =========