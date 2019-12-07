const moment = require('moment');
const chalk = require('chalk');

module.exports = (str) => {
    let time = `[ERR ${moment().format("hh:mm:ss")}]`;
    console.log(`${chalk.bold.red(time)} ${chalk.red(str)}`);
};