const inquirer = require('inquirer');
const sqlQuery = require('./utils/query');


const promptUser = () => {
    return inquirer.prompt(
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add department']
        }
    )
    
};

const addDepartmentPrompt = () => {
    return inquirer.prompt(
        {
            type: 'input',
            name: 'departmentInput',
            message: 'Please enter the department name.',
            validate: input => {
                if (input) {
                    return true;
                } else {
                    console.log('Please enter your department name!');
                    return false;
                }
            }
        }
    )
};

const recursivePrompt = () => {

    promptUser()
        .then(promptData => {
            if (promptData.options === 'View all departments') {
                let newQuery = new sqlQuery();
    
                newQuery.viewDepartments().then((rows) => {
                    console.table(rows);
                    recursivePrompt();
                });

                
            }
    
            if (promptData.options === 'View all roles') {
                let newQuery = new sqlQuery();
    
                newQuery.viewRoles().then((rows) => {
                    console.table(rows);
                    recursivePrompt();
                });
            }
    
            if (promptData.options === 'View all employees') {
                let newQuery = new sqlQuery();
    
                newQuery.viewEmployees().then((rows) => {
                    console.table(rows);
                    recursivePrompt();
                });
            }
    
            if (promptData.options === 'Add department') {
                addDepartmentPrompt()
                    .then(departmentPromptData => {
                        
    
                            let newQuery = new sqlQuery();
    
                            newQuery.addDepartment(departmentPromptData.departmentInput).then(() => {
                                console.log('Successfully added department.');
                                recursivePrompt();
                            });
    
                    });
                
            }
    
    
    
        })
        .catch( err => {
            console.log(err);
        });

    
    
}

recursivePrompt();