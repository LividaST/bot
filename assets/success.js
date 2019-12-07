const moment = require('moment');
const chalk = require('chalk');

module.exports = (str) => {
    let time = `[SUCCESS ${moment().format("hh:mm:ss")}]`;
    console.log(`${chalk.bold.green(time)} ${chalk.green(str)}`);
};