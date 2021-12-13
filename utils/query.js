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

            // console.log(rows);
            console.table(rows)
        });

        console.log("success");
    }

    viewRoles() {
        const sql = `SELECT roles.id, roles.title, roles.salary, department.department_name 
                    FROM roles 
                    LEFT JOIN department 
                    ON roles.department_id = department.id;`

        db.query(sql, (err, rows) => {
            if (err) {
                console.log(err);
            }

            console.table(rows);
        });
    }
};

module.exports = Queries;