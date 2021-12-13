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
};

module.exports = Queries;