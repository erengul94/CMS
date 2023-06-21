'use strict';

const dayjs = require('dayjs');

const defineStatus = (page) => {
    let status = "";
    console.log(page)

    if (!page.publicationDate) {
        status = "draft";
        console.log("change draft")
    } else if (dayjs(page.publicationDate).isAfter(dayjs(), 'day')) {
        status = "scheduled";
        console.log("change scheduled")

    } else {
        status = "published";
        console.log("change published")
    }

    page.status = status;
    return page;
};

module.exports = defineStatus;
// This function should receive the page and calculate the current status of page.
