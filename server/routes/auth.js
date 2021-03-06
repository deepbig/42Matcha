const nodemailer = require('nodemailer');
const uuid = require('uuid/v1');

const conn = require('../config/db');

module.exports.up = (req, res) => {
    const sql_select_user = 'SELECT * FROM users WHERE email = ?';
    const sql_insert_users = 'INSERT INTO users (email, password) values (?, SHA1(?))';
    const sql_insert_verifies = 'INSERT INTO verifies (user_id, user_email, uuid) values ((SELECT id FROM users WHERE email = ?), ?, ?)';

    const data = req.body;
    const code = uuid();

    conn.query(sql_select_user, [data.email], (err, results) => {
        if (err) {
            console.log(err);
        } else if (results.length === 0) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_ADDRESS,
                    pass: process.env.EMAIL_PASSWORD
                }
            });
            const mailOptions = {
                from: process.env.EMAIL_ADDRESS,
                to: data.email,
                subject: 'Please confirm for Matcha registration :)',
                
                html: "<a href=\"" + process.env.ORIGIN_URL + "/verifies/up/" + data.email + "/" + code + "\">Click here to verify !</a>"
            };
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                }
            });
    
            conn.query(sql_insert_users, [data.email, data.password], (err) => {
                if (err) {
                    console.log(err);
                } else {
                    conn.query(sql_insert_verifies, [data.email, data.email, code], (err) => {
                        if (err) {
                            console.log(err);
                        }
                    })
                    res.json(1);
                }
            })
        } else {
            res.json(0);
        }
    })
}

module.exports.in = (req, res) => {
    const sql_select_user = 'SELECT * FROM users WHERE email = ?';
    const sql_select_verify = 'SELECT verify, id FROM users WHERE email = ? AND password = SHA1(?)';

    const email = req.query.email;
    const password = req.query.password;
    const info = req.query.info;

    conn.query(sql_select_user, [email], (err, results) => {
        if (err) {
            console.log(err);
            res.json(0);
        } else if (results.length === 0) {
            res.json(2); // Doesn't exist email
        } else {
            conn.query(sql_select_verify, [email, password], (err, results) => {
                results = JSON.parse(JSON.stringify(results));
                if (err) {
                    console.log(err);
                    res.json(0);
                } else if (results.length === 0) {
                    res.json(3); // Password is wrong
                } else if (results[0].verify === 0) {
                    res.json(4); // Verify is 0
                } else {
                    const sql_insert_log = 'INSERT INTO logs (user_id, info) values (?, ?)';

                    const userId = results[0].id;
                    conn.query(sql_insert_log, [userId, info], (err) => {
                        if (err) {
                            console.log(err);
                            res.json(0);
                        } else {
                            req.session.userId = userId;
                            res.json(1); // Log in successfully
                        }
                    })
                }
            })
        }
    })
}

module.exports.out = (req, res) => {
    if (req.session.userId !== -1) {
        req.session.userId = -1;
        res.json(1);
    } else {
        res.json(-1);
    }
}