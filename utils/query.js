const db = require('../db/connection');
const cTable = require('console.table');


class Queries {
    viewDepartments() {
        const sql = `SELECT * FROM department;`

        db.query(sql, (err, rows) => {
            if (err) {
                console.log(err);
                return;
            }

            
            console.table(rows)
        });

        
        
    }

    viewRoles() {
        const sql = `SELECT roles.id, roles.title, roles.salary, department.department_name 
                    FROM roles 
                    LEFT JOIN department 
                    ON roles.department_id = department.id;`

        db.query(sql, (err, rows) => {
            if (err) {
                console.log(err);
                return;
            }

            console.table(rows);
        });
    }

    viewEmployees() {
        const sql = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, department.department_name AS department, employs.first_name  AS manager_name  
                    FROM employees 
                    LEFT JOIN roles ON employees.role_id = roles.id 
                    LEFT JOIN department ON roles.department_id = department.id 
                    LEFT JOIN employees AS employs ON employees.manager_id = employs.id;`

        db.query(sql, (err, rows) => {
            if (err) {
                console.log(err);
                return;
            }

            console.table(rows);
        });
    }

    addDepartment(params) {
        const sql = `INSERT INTO department (department_name)
                    VALUES
                        (?);`
        
        
        db.query(sql, params, (err, rows) => {
            if (err) {
                console.log(err);
                return;
            }

            console.log('Success.');
        });
    }
};

module.exports = Queries;