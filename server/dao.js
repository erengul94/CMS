"use strict";

const sqlite = require('sqlite3');
const dbPath = './storage/cms.sqlite'

const dbObj = new sqlite.Database(dbPath, (err) => {
    if (err) {
        throw err;
    } else { console.log("connection is established with database...") }
});


class DAO {
    constructor() {
        this.db = dbObj
    }

    async getPages() {
        console.log("get pages");
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM page';
            this.db.all(sql, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(
                        rows.map((p) => ({
                            ID: p.ID,
                            authorID: p.authorID,
                            creationDate: p.creationDate,
                            publicationDate: p.publicationDate,
                            status: p.status,
                            content: p.content,
                        }))
                    );
                }
            });
        });
    }

    async createPage(page) {
        console.log(page)
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO page (ID, authorID, creationDate, publicationDate, status, content) VALUES(?,?,?,?,?,?)';
            this.db.run(sql, [page.ID, page.authorID, page.creationDate, page.publicationDate, page.status, page.content], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    }

    async editPage(pageID, updatedContent) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE page SET content = ? WHERE ID = ?';
            this.db.run(sql, [updatedContent, pageID], function (err) {
                if (err) {
                    reject(err);
                } else if (this.changes === 0) {
                    reject(new Error(`Page with ID ${pageID} not found`));
                } else {
                    resolve(`Page with ID ${pageID} updated successfully`);
                }
            });
        });
    };

    async deletePage(pageID) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM page WHERE ID=?';
            this.db.run(sql, [pageID], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    }
}

module.exports = DAO;




