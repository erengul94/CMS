
"use strict";

const sqlite = require('sqlite3');
const crypto = require('crypto');
const dbPath = './storage/cms.sqlite'

const dbObj = new sqlite.Database(dbPath, (err) => {
    if (err) {
        throw err;
    } else { console.log("Database connection has established") }
});


class UserDAO {
    constructor() {
        this.db = dbObj
    }

    async getUser(username, password) {
        console.log("user requested")
        return new Promise((resolve, reject) => {
            // to check the passwords are match, we should retreive the user with it's identifier
            const sql = 'SELECT * FROM user WHERE username = ?';
            this.db.get(sql, [username], (err, row) => {
                if (err) {
                    reject(err);
                }
                // userID does not exists
                else if (row === undefined) {
                    resolve(false);
                }
                else {
                    const user = { id: row.authorID, username: row.username, role: row.role, email: row.email };
                    console.log(user)
                    // compute hash password with comming user password with salt which computes the hashedPassword
                    crypto.scrypt(password, row.salt, 32, function (err, hashedPassword) {
                        if (err) reject(err);
                        // comparesion function
                        if (!crypto.timingSafeEqual(Buffer.from(row.password, 'hex'), hashedPassword))
                            resolve(false);
                        else
                            resolve(user);
                    });
                }
            });
        });
    };

    async getUsers() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM user';
            this.db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(
                        rows.map((row) => ({
                            id: row.authorID, username: row.username, role: row.role, email: row.email
                        }))
                    );
                }
            });
        });
    }


}

module.exports = UserDAO;




