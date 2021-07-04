import { combineReducers } from "redux";
import info from "./info";
import page from "./page";
import anime from "./anime";
import serials from "./serials";
import movies from "./movies";

export default combineReducers({
  info,
  anime,
  serials,
  movies,
  page,
});
