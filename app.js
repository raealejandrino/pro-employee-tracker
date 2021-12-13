const inquirer = require('inquirer');
const sqlQuery = require('./utils/query');


const promptUser = () => {
    return inquirer.prompt(
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add department', 'Add role']
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

const addRolePrompt = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Please enter the role title.',
            validate: input => {
                if (input) {
                    return true;
                } else {
                    console.log('Please enter the role title!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Please enter the role salary.',
            validate: input => {
                if (input) {
                    return true;
                } else {
                    console.log('Please enter the role salary!');
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'department',
            message: "Please select the role's department",
            choices: ['Sales', 'Engineering', 'Finance', 'Legal']
        }
    ])
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

            if (promptData.options === 'Add role') {
                addRolePrompt()
                    .then(rolePromptData => {
                        
                        
                        params = [rolePromptData.title, rolePromptData.salary, rolePromptData.department]

                        if (params[2] === 'Sales') {
                            params[2] = 1;
                        } else if (params[2] === 'Engineering') {
                            params[2] = 2;
                        } else if (params[2] === 'Finance') {
                            params[2] = 3;
                        } else {
                            params[2] = 4;
                        }

                        

                            let newQuery = new sqlQuery();
    
                            newQuery.addRole(params).then(() => {
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