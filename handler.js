const moment = require('moment-timezone');

module.exports.gimmetime = async (event) => {
  let tz = 'Europe/Rome';

  if (event.queryStringParameters && event.queryStringParameters.tz) {
    tz = event.queryStringParameters.tz;

    if (!moment.tz.names().includes(tz)) {
      return {
        statusCode: '400',
        body: `Unknown timezone ${tz}`
      };
    }
  }

  return {
    statusCode: '200',
    body: `The time in ${tz} is: ${moment.tz(tz).format()}`
  };
};
