const inquirer = require('inquirer');
const sqlQuery = require('./utils/query');


const promptUser = () => {
    return inquirer.prompt(
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add department', 'Add role', 'Add employee']
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

const addRolePrompt = departmentNames => {
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
            choices: departmentNames
        }
    ])
};

const addEmployeePrompt = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'employeeFirstName',
            message: "Please enter the employee's first name.",
            validate: input => {
                if (input) {
                    return true;
                } else {
                    console.log("Please enter the employee's first name.");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'employeeLastName',
            message: "Please enter the employee's last name.",
            validate: input => {
                if (input) {
                    return true;
                } else {
                    console.log("Please enter the employee's last name.");
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'roleList',
            message: "Please select the employee's role.",
            choices: ['Salesperson', 'Lead Engineer', 'Accountant', 'Lawyer']
        },
        {
            type: 'list',
            name: 'managerList',
            message: "Please select the employee's manager",
            choices: ['Rae', 'No Manager']
        }
    ])
};

const updateEmployeePrompt = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'employeeList',
            message: "Please select the employee you'd like to update.",
            choices: []
        }
    ])
}



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
                let newQuery = new sqlQuery();


               newQuery.getDepartmentName().then((rows) => {
                    

                    let departmentsArr = rows.map(department => {
                        return department.department_name;
                    })

                    

                    addRolePrompt(departmentsArr)
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
    
                            
    
        
                                newQuery.addRole(params).then(() => {
                                    console.log('Successfully added role.');
                                    recursivePrompt();
                                });
        
                        });
                });
                
                
                
            }

            if (promptData.options === 'Add employee') {
                addEmployeePrompt()
                    .then(employeePromptData => {
                        
                        
                        params = [employeePromptData.employeeFirstName, employeePromptData.employeeLastName, employeePromptData.roleList, employeePromptData.managerList]

                       
                        if (params[2] === 'Salesperson') {
                            params[2] = 1;
                        } else if (params[2] === 'Lead Engineer') {
                            params[2] = 2;
                        } else if (params[2] === 'Accountant') {
                            params[2] = 3;
                        } else {
                            params[2] = 4;
                        }

                        if (params[3] === 'Rae') {
                            params[3] = 1;
                        } else {
                            params[3] = null;
                        }

                        


                        

                            let newQuery = new sqlQuery();
    
                            newQuery.addEmployee(params).then(() => {
                                console.log('Successfully added employee.');
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