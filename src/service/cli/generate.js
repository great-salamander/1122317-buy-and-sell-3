'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const {
  getRandomInt,
  shuffle,
} = require(`../../utils`);

const {
  ExitCode
} = require(`../../constants`);

const {
  TITLES,
  SENTENCES,
  CATEGORIES,
  OfferType,
  SumRestrict,
  PictureRestrict
} = require(`./data`);

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const FILE_NAME = `mocks.json`;
const MAX_COUNT_DESCRIPTION = 5;

const getPictureFileName = (number) => `item${number.toString().padStart(2, 0)}.jpg`;

const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]],
    description: shuffle(SENTENCES).slice(1, MAX_COUNT_DESCRIPTION).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countOffer > MAX_COUNT) {
      console.info(chalk.red(`Не больше 1000 объявлений`));
      process.exit(ExitCode.error);
    }
    const content = JSON.stringify(generateOffers(countOffer));

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
      process.exit(ExitCode.success);
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
      process.exit(ExitCode.error);
    }
  }
};
