function get_posts(database_name, gender_checked, age_checked) {
    const express = require('express');
    const mysql = require('mysql');
    const app = express();

    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: `${database_name}`,
    });
    con.connect((err) => {
        if(err) console.log(err);
        else {
            console.log("databse connected");
            fetch_posts();
        }
    });

    function fetch_posts() {
        app.get('/fetch', (req, res) => {
            create_query();
            con.query(query_str, function(err, result, fields) {
                if(err) console.log(err);
                else mealmate_posts = JSON.parse(JSON.stringify(result));
            });
        })
    }
    function create_query() {
        let query_str = `SELECT * FROM ${database_name}`;
        /* WHERE */
        query_str += " WHERE (";
        let gender_flag = false;
        if(gender_checked[0]) { query_str += "gender = 'M'"; gender_flag = true; }
        if(gender_checked[1]) {
            if(gender_flag) query_str += " OR gender = 'F'";
            else { query_str += "gender = 'F'"; gender_flag = true; }
        }
        query_str += ") AND (";
        let age_flag = false;
        if(age_checked[0]) { query_str += "(20 <= age AND age <= 29)"; age_flag = true; }
        if(age_checked[1]) {
            if(age_flag) query_str += " OR (30 <= age AND age <= 39)";
            else { query_str += "(30 <= age AND age <= 39)"; age_flag = true; }
        }
        if(age_checked[2]) {
            if(age_flag) query_str += " OR (40 <= age AND age <= 49)";
            else { query_str += "(40 <= age AND age <= 49)"; age_flag = true; }
        }
        if(age_checked[3]) {
            if(age_flag) query_str += " OR (50 <= age AND age <= 59)";
            else { query_str += "(50 <= age AND age <= 59)"; age_flag = true; }
        }
        if(age_checked[4]) {
            if(age_flag) query_str += " OR (age >= 60)";
            else { query_str += "(age >= 60)"; age_flag = true;}
        }
        query_str += ")";

        /* ORDER BY */

        return query_str;
    }
}