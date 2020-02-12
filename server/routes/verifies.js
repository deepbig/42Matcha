const conn = require('../config/db');

//

module.exports.up = (req, res) => {
    const sql_select_verifies = 'SELECT id FROM verifies WHERE user_email = ? AND uuid = ?';
    const sql_delete_verifies = 'DELETE FROM verifies WHERE user_email = ? AND uuid = ?';
    const sql_update_users = 'UPDATE users SET verify = 1 WHERE email = ?';

    const email = req.query.email;
    const code = req.query.uuid;

    conn.query(sql_select_verifies, [email, code], (err, results) => {
        if (err) {
            console.log(err);
        } else if (results.length !== 0) {
            conn.query(sql_delete_verifies, [email, code], (err) => {
                if (err) {
                    console.log(err);
                }
            })
            conn.query(sql_update_users, [email], (err) => {
                if (err) {
                    console.log(err);
                }
            })
        }
    })
}