import {formatTime} from "../units.js";
import {MONTH_NAMES} from "../const.js";

export const createPointsTemplate = (point) => {
  const {type, title, startDateTime, duration, price, hasOffer, offerTitle, offerPrice} = point;

  const startTime = formatTime(startDateTime);
  const startDate = ` ${MONTH_NAMES[startDateTime.getMonth()]} ${startDateTime.getDate()}`;
  const offerIncludeClass = hasOffer ? `` : `trip-main--hidden`;

  let arr = duration.replace(`D`, `:`);
  arr = arr.replace(`H`, `:`);
  arr = arr.replace(`M`, ` `);
  arr = arr.split(`:`);
  const i = arr.length - 1;
  const endDateTime = startDateTime;
  endDateTime.setHours(endDateTime.getHours() + Number(arr[i - 1]));
  endDateTime.setMinutes(endDateTime.getMinutes() + Number(arr[i]));
  const endTime = formatTime(endDateTime);

  const typeItemsIn = [`Check-in`, `Sightseeing`, `Restaurant`];
  const isType = typeItemsIn.includes(`${type}`);

  return (
    `<li class="trip-days__item  day">
    <div class="day__info">
    <span class="day__counter">1</span>
    <time class="day__date" datetime="2019-03-18">${startDate}</time>
    </div>

    <ul class="trip-events__list">
      <li class="trip-events__item">
        <div class="event">
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
          </div>

          <h3 class="event__title">${type} ${isType ? `in` : `to`} ${title}</h3>


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
          <ul class="event__selected-offers ${offerIncludeClass}">
            <li class="event__offer">
              <span class="event__offer-title">${offerTitle}</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">${offerPrice}</span>
             </li>
          </ul>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>
      
    

          </button>
        </div>
      </li>
    </ul>
  </li>`
  );
};
