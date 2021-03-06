import { combineReducers } from "redux";
import info from "./info";
import page from "./page";
import anime from "./anime";
import serials from "./serials";
import movies from "./movies";
import itemsFilters from "./itemsFilters";

export default combineReducers({
  info,
  anime,
  serials,
  movies,
  page,
  itemsFilters,
});
