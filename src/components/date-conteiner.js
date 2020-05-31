import AbstractComponent from "./abstract-component.js";

const createDateConteinerTemplate = () => {

  return (
    `<ul class="trip-days">
  
  
      
    </ul>
    `
  );
};

export default class DateConteiner extends AbstractComponent {

  getTemplate() {
    return createDateConteinerTemplate();
  }

}
