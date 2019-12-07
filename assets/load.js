const moment = require('moment');
const chalk = require('chalk');

module.exports = (str) => {
    let time = `[LOAD ${moment().format("hh:mm:ss")}]`;
    console.log(`${chalk.bold.blue(time)} ${chalk.blue(str)}`);
};