import {formatTime} from "../units.js";
import {typeItemsIn} from "../const.js";
import {addOffer} from "../const.js";

export const createPointsTemplate = (point) => {
  const {type, title, startDateTime, duration, price} = point;

  const startTime = formatTime(startDateTime);


  let arr = duration.replace(`D`, `:`);
  arr = arr.replace(`H`, `:`);
  arr = arr.replace(`M`, ` `);
  arr = arr.split(`:`);
  const j = arr.length - 1;
  const endDateTime = startDateTime;
  endDateTime.setHours(endDateTime.getHours() + Number(arr[j - 1]));
  endDateTime.setMinutes(endDateTime.getMinutes() + Number(arr[j]));
  const endTime = formatTime(endDateTime);

  const typeUp = type[0].toUpperCase() + type.slice(1);
  const isType = typeItemsIn.includes(`${type}`);

  const offerTitle = [];
  for (let i = 0; i < addOffer.length; i++) {
    if (addOffer[i].type === `${type}`) {
      offerTitle.push(addOffer[i].offerTitle);
    }
  }
  const offerPrice = [];
  for (let i = 0; i < addOffer.length; i++) {
    if (addOffer[i].type === `${type}`) {
      offerPrice.push(addOffer[i].offerPrice);
    }
  }
  const isOfferShowing = !!offerTitle[0];
  const isOffer2Showing = !!offerTitle[1];

  return (
    `
      <li class="trip-events__item">
        <div class="event">
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
          </div>

          <h3 class="event__title">${typeUp} ${isType ? `in` : `to`} ${title}</h3>


          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" >${startTime}</time>
              &mdash;
              <time class="event__end-time" >${endTime}</time>
            </p>

            <p class="event__duration">${duration}</p>

          </div>
          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${price}</span>
          </p>
          
          <h4 class="visually-hidden"> Offer: </h4>
          <ul class="event__selected-offers">
          ${isOfferShowing ? `
            <li class="event__offer">
              <span class="event__offer-title">${offerTitle[0]}</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">${offerPrice[0]}</span>
             </li>` : ``}
             ${isOffer2Showing ? `
             <li class="event__offer">
               <span class="event__offer-title">${offerTitle[1]}</span>
               &plus;
               &euro;&nbsp;<span class="event__offer-price">${offerPrice[1]}</span>
              </li>` : ``}
           </ul>
           <br>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>`
  );
};
