import AbstractComponent from "./abstract-component.js";
import {formatDate} from "../utils/common.js";
import {formatTime} from "../utils/common.js";
import {addOffer} from "../const.js";
import {typeItemsIn} from "../const.js";

const createButtonMarkup = (name, isActive = true) => {
  return (
    `<input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked="${isActive ? `checked` : ``}">
        <label class="event__favorite-btn" for="event-favorite-1">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>`
  );
};

const createChooseType = () => {
  return (
    `<input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
  <div class="event__type-list">
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Transfer</legend>
      <div class="event__type-item">
        <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
        <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
      </div>
      <div class="event__type-item">
        <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
        <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
      </div>
      <div class="event__type-item">
        <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
        <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
      </div>
      <div class="event__type-item">
        <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
        <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
      </div>
      <div class="event__type-item">
        <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
        <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
      </div>
      <div class="event__type-item">
        <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
        <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
      </div>
      <div class="event__type-item">
        <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
        <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
      </div>
    </fieldset>
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Activity</legend>
      <div class="event__type-item">
        <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
        <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
      </div>
      <div class="event__type-item">
        <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
        <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
      </div>
      <div class="event__type-item">
        <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
        <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
      </div>
    </fieldset>
  </div>`
  );
};


const createEditFormTemplate = (point) => {
  const {type, title, startDateTime, price, duration, description, picture} = point;

  const favoritesButton = createButtonMarkup(`favorites`, !point.isFavorite);
  const chooseTypeForm = createChooseType();

  const startDate = formatDate(new Date(startDateTime));
  const startTime = formatTime(new Date(startDateTime));

  const typeUp = type[0].toUpperCase() + type.slice(1);
  const isType = typeItemsIn.includes(`${type}`);
  const isTitleShowing = !!title;

  let arr = `${duration}`.replace(`D`, `:`);
  arr = arr.replace(`H`, `:`);
  arr = arr.replace(`M`, ` `);
  arr = arr.split(`:`);
  const j = arr.length - 1;
  const endDateTimeHours = new Date(startDateTime).setHours(new Date(startDateTime).getHours() + Number(arr[j - 1]));
  const endDateTimeMinutes = new Date(endDateTimeHours).setMinutes(new Date(endDateTimeHours).getMinutes() + Number(arr[j]));
  const endTime = isTitleShowing ? formatTime(new Date(endDateTimeMinutes)) : startTime;
  const endDate = isTitleShowing ? formatDate(new Date(endDateTimeMinutes)) : startDate;

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
  const isOffer3Showing = !!offerTitle[2];

  return (
    `<li class="trip-days__item  day">
  
    <ul class="trip-events__list">
    
    <li class="trip-events__item">
    <form class="event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          ${chooseTypeForm}
        </div>
        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${typeUp} ${isType ? `in` : `to`}
          </label>
          ${isTitleShowing ? `
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${title}" list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="${title}"></option>
            <option value="Geneva"></option>
            <option value="${title}"></option>
          </datalist>` : ``}
        </div>
        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDate} ${startTime}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDate} ${endTime}">
        </div>
        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" ${isTitleShowing ? `value="${price}"` : ``}>
        </div>
        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        ${favoritesButton}
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
      ${isOfferShowing ? `
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
              <label class="event__offer-label" for="event-offer-luggage-1">
                <span class="event__offer-title">${offerTitle[0]}</span>
                &plus;
                &euro;&nbsp;<span class="event__offer-price">${offerPrice[0]}</span>
              </label>
            </div>
            ${isOffer2Showing ? `
            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage">
              <label class="event__offer-label" for="event-offer-luggage-1">
                <span class="event__offer-title">${offerTitle[1]}</span>
                &plus;
                &euro;&nbsp;<span class="event__offer-price">${offerPrice[1]}</span>
              </label>
            </div>` : ``}
            ${isOffer3Showing ? `
            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage">
              <label class="event__offer-label" for="event-offer-luggage-1">
                <span class="event__offer-title">${offerTitle[2]}</span>
                &plus;
                &euro;&nbsp;<span class="event__offer-price">${offerPrice[2]}</span>
              </label>
            </div> ` : ``}
            
          </div>
        </section>` : ``}
        ${isTitleShowing ? `
        <section class="event__section  event__section--destination">
                <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                <p class="event__destination-description">${description}</p>
                <div class="event__photos-container">
                  <div class="event__photos-tape">
                    <img class="event__photo" src="${picture}" alt="Event photo">
                    <img class="event__photo" src="${picture}" alt="Event photo">
                    <img class="event__photo" src="${picture}" alt="Event photo">
                    <img class="event__photo" src="${picture}" alt="Event photo">
                  </div>
                </div>
              </section>` : ``}
      </section>
    </form>
    </li>
    </ul>
  </li>
                `
  );
};

export default class PointEdit extends AbstractComponent {
  constructor(point) {
    super();
    this._point = point;

  }

  getTemplate() {
    return createEditFormTemplate(this._point);
  }
  setSubmitHandler(handler) {
    this.getElement().querySelector(`form`)
      .addEventListener(`submit`, handler);
  }
  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-btn`)
      .addEventListener(`click`, handler);
  }
}
