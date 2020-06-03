import SiteMenuComponent from "./components/menu.js";
import FilterComponent from "./components/filter.js";
import DateConteinerComponent from "./components/date-conteiner.js";
import BoardController from "./controllers/board.js";
import {generatePoints} from "./mock/points.js";
import {render, RenderPosition} from "./utils/render.js";


const POINT_NUM = 22;
const siteMainElement = document.querySelector(`.trip-main`);
const siteHeaderElement = siteMainElement.querySelector(`.trip-main__trip-controls`);
const siteEventElement = document.querySelector(`.trip-events`);


const points = generatePoints(POINT_NUM);


render(siteHeaderElement, new SiteMenuComponent(), RenderPosition.BEFOREEND);
render(siteHeaderElement, new FilterComponent(), RenderPosition.BEFOREEND);

const conteinerComponent = new DateConteinerComponent();
const boardController = new BoardController(conteinerComponent);
render(siteEventElement, conteinerComponent, RenderPosition.BEFOREEND);
boardController.render(points);
