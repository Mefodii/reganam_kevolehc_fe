import { combineReducers } from "redux";
import info from "./info";
import page from "./page";
import anime from "./anime";
import serials from "./serials";
import movies from "./movies";
import contentWatchers from "./contentWatchers";
import contentLists from "./contentLists";
import contentItems from "./contentItems";
import contentItemParts from "./contentItemParts";
import itemsFilters from "./itemsFilters";
import modal from "./modal";

export default combineReducers({
  info,
  anime,
  serials,
  movies,
  contentWatchers,
  contentLists,
  contentItems,
  contentItemParts,
  page,
  itemsFilters,
  modal,
});
