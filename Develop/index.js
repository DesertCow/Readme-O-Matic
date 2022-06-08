// 
// Clayton Skaggs 6-9-22
//
// Installed inquirer vis "npm install inquirer" command
//

const fs = require('fs');
const inquirer = require('inquirer');

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

const listOfLicenses = ["MIT license", "Apache License 2.0", "GNU General Public License (GPL)", "Common Development and Distribution License 1.0"];

const readmeInput = {
  proTitle: "",
  proDescription: "",
  proInstall: "",
  proUsage: "",
  proContributionGuide: "",
  proTestInstuctions: "",
  proLicense: "",
  userGitHub: "",
  userEmail: ""
};

var userInputFlag = true;



// TODO: Create a function to write README file
function writeToFile(fileName, data) { }

// TODO: Create a function to initialize app
function init() {

  //console.log(questions);

};

async function getUserInput() {


  inquirer
    .prompt([
      {
        type: 'input',
        name: 'proTitle',
        message: questions[0],
      },
    ])
    .then(answers => {
      readmeInput.proTitle = answers.proTitle;
      // console.info('Answer:', readmeInput.proTitle);

      inquirer
        .prompt([
          {
            type: 'input',
            name: 'proDescription',
            message: questions[1],
          },
        ])
        .then(answers => {
          readmeInput.proDescription = answers.proDescription;
          // console.info('Answer:', readmeInput.proDescription);

          inquirer
            .prompt([
              {
                type: 'input',
                name: 'proInstall',
                message: questions[2],
              },
            ])
            .then(answers => {
              readmeInput.proInstall = answers.proInstall;
              // console.info('Answer:', readmeInput.proInstall);

              inquirer
                .prompt([
                  {
                    type: 'input',
                    name: 'proUsage',
                    message: questions[3],
                  },
                ])
                .then(answers => {
                  readmeInput.proUsage = answers.proUsage;
                  // console.info('Answer:', readmeInput.proUsage);

                  inquirer
                    .prompt([
                      {
                        type: 'input',
                        name: 'proContributionGuide',
                        message: questions[4],
                      },
                    ])
                    .then(answers => {
                      readmeInput.proContributionGuide = answers.proContributionGuide;
                      // console.info('Answer:', readmeInput.proContributionGuide);

                      inquirer
                        .prompt([
                          {
                            type: 'input',
                            name: 'proTestInstuctions',
                            message: questions[5],
                          },
                        ])
                        .then(answers => {
                          readmeInput.proTestInstuctions = answers.proTestInstuctions;
                          // console.info('Answer:', readmeInput.proTestInstuctions);

                          inquirer
                            .prompt([
                              {
                                type: 'rawlist',
                                name: 'proLicense',
                                choices: listOfLicenses,
                                message: questions[6],
                              },
                            ])
                            .then(answers => {
                              readmeInput.proLicense = answers.proLicense;
                              // console.info('Answer:', readmeInput.proLicense);

                              inquirer
                                .prompt([
                                  {
                                    type: 'input',
                                    name: 'userGitHub',
                                    message: questions[7],
                                  },
                                ])
                                .then(answers => {
                                  readmeInput.userGitHub = answers.userGitHub;
                                  // console.info('Answer:', readmeInput.proLicense);

                                  inquirer
                                    .prompt([
                                      {
                                        type: 'input',
                                        name: 'userEmail',
                                        message: questions[8],
                                      },
                                    ])
                                    .then(answers => {
                                      readmeInput.userEmail = answers.userEmail;
                                      // console.info('Answer:', readmeInput.proLicense);

                                      //console.log(readmeInput);
                                      generateREADME(readmeInput);
                                      return true;

                                    });



                                });



                            });



                        });




                    });





                });




            });


        });
    });



  // inquirer
  //   .prompt([
  //     {
  //       type: 'rawlist',
  //       name: 'proTitle',
  //       message: questions[0],
  //       choices: ['1', '2'],
  //     },
  //   ])
  //   .then(answers => {
  //     console.info('Answer:', answers.faveReptile);
  //   });


  // var inquirer = require('inquirer');
  // inquirer
  //   .prompt(questions)
  //   .then((answers) => {
  //     // Use user feedback for... whatever!!
  //   })
  //   .catch((error) => {
  //     if (error.isTtyError) {
  //       // Prompt couldn't be rendered in the current environment
  //     } else {
  //       // Something else went wrong
  //     }
  //   });
};

function generateREADME(data) {

  console.log("README Function PRINT");
  console.log(data);

};

// ============= Init =============
init();

// ============= Main =============
getUserInput();

// while (userInputFlag) {
//   // Wait for user to complete input...
// }

// console.log("User Input COMPLETE!");

// ========== END of MAIN =========