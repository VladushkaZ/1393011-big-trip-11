export const cities = [`Helsinki`, `Rio`, `Stambul`, `New York`, `Amsterdam`, `Prague`, `Munchen`, `Rom`, `Tokio`];
export const descriptionItems = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit. `, `Cras aliquet varius magna, non porta ligula feugiat eget. `, `Fusce tristique felis at fermentum pharetra. `, `Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`, `Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat.`, `Nunc fermentum tortor ac porta dapibus.`, `In rutrum ac purus sit amet tempus.`];

export const typeItemsTo = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];
export const typeItemsIn = [`Check-in`, `Sightseeing`, `Restaurant`];

export const MONTH_NAMES = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];

export let AddOffer = class {
  constructor(type, offerTitle, offerPrice) {
    this.type = type;
    this.offerTitle = offerTitle;
    this.offerPrice = offerPrice;
  }
  get fullInfoOffer() {
    return `${this.offerTitle}`;
  }
};

export let Train = new AddOffer(`Train`, `Speed train`, `46`);
export let Restaurant = new AddOffer(`Restaurant`, `All inclusive`, `30`);
export let Taxi = new AddOffer(`Taxi`, `Help with luggage`, `5`);
export let Sightseeing = new AddOffer(`Sightseeing`, `Excursion`, `25`);
export let Flight = new AddOffer(`Flight`, `Comfort class`, `45`);
export let flight2Offer = new AddOffer(`Flight`, `Meal on the board`, `20`);
export let Ship = new AddOffer(`Ship`, `Trip with children`, `40`);
