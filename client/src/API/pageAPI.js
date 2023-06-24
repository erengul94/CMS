const APIURL = 'http://localhost:3000';


async function getPages() {
    const url = APIURL + '/pages';
    try {
        const response = await fetch(url);
        if (response.ok) {
            // process the response
            const pages = await response.json();
            // // console.log(pages)
            return pages;
        } else {
            // application error (404, 500, ...)
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (ex) {
        // network error
        throw ex;
    }
}

async function getPage(pageID) {
    const url = APIURL + '/page/' + pageID;
    try {
        const response = await fetch(url, {
            credentials: 'include',
        });
        if (response.ok) {
            // process the response
            const pages = await response.json();
            // // console.log(pages)
            return pages;
        } else {
            // application error (404, 500, ...)
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (ex) {
        // network error
        throw ex;
    }
}


async function getUserPage() {
    const url = APIURL + '/getUserPages';
    try {
        const response = await fetch(url, {
            credentials: 'include',
        });
        if (response.ok) {
            // process the response
            const pages = await response.json();
            // // console.log(pages)
            return pages;
        } else {
            // application error (404, 500, ...)
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (ex) {
        // network error
        throw ex;
    }
};

async function createPage(page) {
    const url = APIURL + '/createPage';
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(page),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            return true;
        } else {
            const text = await response.text();
            // // console.log(text);
            throw new TypeError(text);
        }
    } catch (ex) {
        // console.log(ex);
        throw ex;
    }
}

async function editPage(page) {

    const url = APIURL + `/editPage/${page.ID}`;
    // // console.log(page)
    try {
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(page),
            credentials: 'include',

            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            return true;
        } else {
            const text = await response.text();
            // console.log(text);
            throw new TypeError(text);
        }
    } catch (ex) {
        // console.log(ex);
        throw ex;
    }

};

async function updateWebSiteName(name) {
    const url = APIURL + '/updateWebSiteName';
    // console.log("updatewebsite naem")
    // console.log(name)
    try {
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify({name}),
            credentials: 'include',

            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            return true;
        } else {
            const text = await response.text();
            // console.log(text);
            throw new TypeError(text);
        }
    } catch (ex) {
        // console.log(ex);
        throw ex;
    }

};

async function deletePage(pageID) {

    const url = APIURL + `/deletePage/${pageID}`;
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            return true;
        } else {
            const text = await response.text();
            // console.log(text);
            throw new TypeError(text);
        }
    } catch (ex) {
        // console.log(ex);
        throw ex;
    }

}


async function getWebSiteName() {
    const response = await fetch(APIURL + '/website', {
        credentials: 'include',
    });
    const user = await response.json();
    if (response.ok) {
        return user;
    } else {
        throw user;  // an object with the error coming from the server
    }
};



export { getPages, createPage, deletePage, editPage, getPage, getUserPage, updateWebSiteName, getWebSiteName };