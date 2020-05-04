import {createElement} from "../utils.js";

const createDateConteinerTemplate = () => {

  return (
    `<ul class="trip-days">
  
  
      
    </ul>
    `
  );
};

export default class DateConteiner {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createDateConteinerTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
