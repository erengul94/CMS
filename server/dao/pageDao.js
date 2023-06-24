"use strict";

const sqlite = require('sqlite3');
const dbPath = './storage/cms.sqlite'

const dbObj = new sqlite.Database(dbPath, (err) => {
    if (err) {
        throw err;
    } else { console.log("Database connection has established") }
});


class PageDAO {
    constructor() {
        this.db = dbObj
    }

    async getPages(sortByField) {
        // console.log("get pages");
        // console.log(sortByField)
        let sql = ""
        return new Promise((resolve, reject) => {
            if (sortByField === "publicationDate") {
                sql = 'SELECT * FROM page ORDER BY publicationDate DESC';
            }
            else {
                sql = 'SELECT * FROM page ORDER BY creationDate DESC';
            }
            this.db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(
                        rows.map((p) => ({
                            ID: p.id,
                            authorID: p.authorID,
                            username: p.username,
                            creationDate: p.creationDate,
                            publicationDate: p.publicationDate,
                            status: p.status,
                            content: p.content,
                            title: p.title
                        }))
                    );
                }
            });
        });
    }

    async getPagesByUser(user) {
        // console.log("get pages");
    
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM page WHERE username = ? ORDER BY creationDate DESC';
            this.db.all(sql, [user.username], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(
                        rows.map((p) => ({
                            ID: p.id,
                            username: p.username,
                            creationDate: p.creationDate,
                            publicationDate: p.publicationDate,
                            status: p.status,
                            content: p.content,
                            title: p.title
                        }))
                    );
                }
            });
        });
    }

    async getPage(pageID) {
        // console.log("pageID");
        // console.log(pageID);

        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM page WHERE id = ?';
            this.db.get(sql, [pageID], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    try {
                        // console.log(row)
                        const page = {
                            ID: row.id,
                            username: row.username,
                            creationDate: row.creationDate,
                            publicationDate: row.publicationDate,
                            status: row.status,
                            content: row.content,
                            title: row.title
                        };
                        resolve(
                            page
                        );
                    } catch (err) { reject(err) }

                }
            });
        });
    }

    async createPage(page) {
        // console.log("CREATED page is triggered")

        // console.log(page)
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO page (username, creationDate, publicationDate, status, content, title) VALUES(?,?,?,?,?,?)';
            this.db.run(sql, [page.username, page.creationDate, page.publicationDate, page.status, page.content, page.title], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    }

    async editPage(pageID, updatedPage) {
        // console.log("updatedContent")

        // console.log(updatedPage)
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE page SET content = ?, username = ?, title = ?, publicationDate = ?, status = ? WHERE ID = ?';
            this.db.run(sql, [updatedPage.content, updatedPage.username, updatedPage.title, updatedPage.publicationDate, updatedPage.status, pageID], function (err) {
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
            const sql = 'DELETE FROM page WHERE id=?';
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

module.exports = PageDAO;




