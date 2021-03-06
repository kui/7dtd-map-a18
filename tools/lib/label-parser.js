/* eslint-env node */

const fsPromise = require('fs').promises;
const csvParse = require('csv-parse');

const EN_INDEX = 5;

module.exports = async (localizationFileName) => {
  const localization = await fsPromise.readFile(localizationFileName);
  const labelArr = await new Promise((resolve, reject) => {
    csvParse(localization, (err, out) => { resolve(out); reject(err); });
  });
  return labelArr.reduce((r, l) => Object.assign(r, { [l[0]]: l[EN_INDEX] }), {});
};
