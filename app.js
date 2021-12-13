const inquirer = require('inquirer');
const sqlQuery = require('./utils/query');
const promptUser = () => {
    return inquirer.prompt(
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees']
        }
    );
};

promptUser()
    .then(promptData => {
        if (promptData.options === 'View all departments') {
            let newQuery = new sqlQuery();

            newQuery.viewDepartments();
        }

        if (promptData.options === 'View all roles') {
            let newQuery = new sqlQuery();

            newQuery.viewRoles();
        }

        if (promptData.options === 'View all employees') {
            let newQuery = new sqlQuery();

            newQuery.viewEmployees();
        }

    });