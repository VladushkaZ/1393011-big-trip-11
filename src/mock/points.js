import {typeItemsIn} from "../const.js";
import {typeItemsTo} from "../const.js";
import {descriptionItems} from "../const.js";
import {cities} from "../const.js";


const typeItems = typeItemsTo.concat(typeItemsIn);

const getRandomArrayItem = (array) => {
  const randonIndex = getRandomNumber(0, array.length);
  return array[randonIndex];
};

const getRandomNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};


function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    const temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

const value = getRandomNumber(1, 6);
let description = shuffle(descriptionItems).slice(0, value).join(` `);


const getRandomDate = () => {
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomNumber(0, 1500000000);
  const timestamp = Date.now() + diffValue;
  return timestamp;
};

const generatePoint = () => {
  return {
    startDateTime: getRandomDate(),
    type: getRandomArrayItem(typeItems),
    title: getRandomArrayItem(cities),
    duration: `${getRandomNumber(0, 2)}D ${getRandomNumber(0, 13)}H ${getRandomNumber(0, 60)}M`,
    price: getRandomNumber(5, 500),
    description: shuffle(descriptionItems).slice(0, value).join(` `),
    picture: `http://picsum.photos/248/152?r=${Math.random()}`,
    isFavorite: Math.random() > 0.5,
  };
};

const generatePoints = (count) => {
  return new Array(count)
  .fill(``)
  .map(generatePoint);
};

export {generatePoint, generatePoints};
