
jest.mock('moment-timezone');

const { tz } = require('moment-timezone');
const handler = require('./handler');

const EXPECTED_DATE = '2018-10-01 00:00:00';
const TIMEZONE = 'Europe/Berlin';
const DEFAULT_TIMEZONE = 'Europe/Rome';

describe('When call handler.gimmetime', () => {
  it('Should return the expected date if the provided timezone exists', async () => {
    const event = {
      queryStringParameters: {
        tz: TIMEZONE
      }
    };

    tz.names = () => { return [TIMEZONE]; };

    tz.mockImplementation(() => {
      return {
        format: () => { return EXPECTED_DATE; }
      };
    });

    const response = await handler.gimmetime(event);

    expect(response.statusCode).toMatch(/200/);
    expect(response.body).toMatch(`The time in ${TIMEZONE} is: ${EXPECTED_DATE}`);
  });

  it('Should return the date for the default timezone if none has been specified', async () => {
    tz.names = () => { return [TIMEZONE]; };

    tz.mockImplementation(() => {
      return {
        format: () => { return EXPECTED_DATE; }
      };
    });

    const response = await handler.gimmetime({ queryStringParameters: {} });

    expect(response.statusCode).toMatch(/200/);
    expect(response.body).toMatch(`The time in ${DEFAULT_TIMEZONE} is: ${EXPECTED_DATE}`);
  });

  it('Should return an error if the provided timezone does not exists', async () => {
    const event = {
      queryStringParameters: {
        tz: TIMEZONE
      }
    };
    tz.names = () => { return []; };

    const response = await handler.gimmetime(event);

    expect(response.statusCode).toMatch(/400/);
    expect(response.body).toMatch(`Unknown timezone ${TIMEZONE}`);
  });
});
