const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const type = 
    {
        type: "list",
        message: "Choose a role from the list",
        name: "role",
        choices: ['Manager', 'Engineer', 'Intern']
    };

const sameQuestions = [
    {
        type: "input",
        message: "What is your name?",
        name: "userName"
    },
    {
        type: "input",
        message: "What is your employee id?",
        name: "id"
    },
    {
        type: "input",
        message: "What is your email addy?",
        name: "email"
    }
];

const managerQuestion = 
    {
        type: "input",
        message: "What is your Office Number?",
        name: "officeNumber"
    };

const engineerQuestion = 
    {
        type: "input",
        message: "What is you GitHub username (no '@' needed)?",
        name: "githubUser"
    };

const internQuestion = {
        type: "input",
        message: "What school did you go to?",
        name: "school"
    };
const workers = [];
let newWorker;
async function promptUser() {
    try{
        const sameQs = await inquirer.prompt(sameQuestions);
        const eType = await inquirer.prompt(type);

        if (eType.role == "Manager"){
            let singleQ = await inquirer.prompt(managerQuestion)
            newWorker = new Manager(sameQs.userName, sameQs.id, sameQs.email, singleQ.officeNumber);
            workers.push(newWorker);
        }
        else if (eType.role == "Engineer"){
            let singleQ =await inquirer.prompt(engineerQuestion)
            newWorker = new Engineer(sameQs.userName, sameQs.id, sameQs.email, singleQ.githubUser);
            workers.push(newWorker);
        }
        else{
            let singleQ = await inquirer.prompt(internQuestion)
            newWorker = new Intern(sameQs.username, sameQs.id, sameQs.email, singleQ.school);
            workers.push(newWorker);
        }
        fs.writeFileSync(outputPath, render(workers));
    }catch(err){
        console.log(err);
    }

}
promptUser();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
