import BaseModel from "../base-model";

class WatchioFilterModel extends BaseModel {
  init = (props) => {};

  getInitialState = (props) => ({
    title: "",
    showPosters: true,
    statuses: [],
    fromDate: null,
    toDate: null,
  });

  toState = (props) => {
    const { watchioFilter } = props;
    return {
      title: watchioFilter.title,
      showPosters: watchioFilter.showPosters,
      statuses: watchioFilter.statuses,
      fromDate: watchioFilter.fromDate,
      toDate: watchioFilter.toDate,
    };
  };

  toModel = (state, props) => ({
    title: state.title,
    showPosters: state.showPosters,
    statuses: state.statuses,
    fromDate: state.fromDate,
    toDate: state.toDate,
  });

  buildState = (props) => {
    return this.toState(props);
  };

  validate = (state, props) => {
    const model = this.toModel(state, props);
    const isValid = true;
    const error = {};

    // TODO

    return [model, isValid, error];
  };

  equals = (state, props) => {
    const o1 = this.toModel(state, props);
    const o2 = props.watchioFilter;

    if (o1?.title !== o2?.title) return false;
    if (o1?.showPosters !== o2?.showPosters) return false;
    if (o1?.statuses !== o2?.statuses) return false;
    if (o1?.fromDate !== o2?.fromDate) return false;
    if (o1?.toDate !== o2?.toDate) return false;

    return true;
  };
}

const filterByTitle = (titleFilter, groups) => {
  if (titleFilter.length === 0) return groups;

  return groups.filter((group) => {
    const inName = group.name.toLowerCase().includes(titleFilter.toLowerCase());
    const inAlias = group.aliases.find((alias) =>
      alias.toLowerCase().includes(titleFilter.toLowerCase())
    );

    return inName || inAlias;
  });
};

const filterFromDate = (fromDateFilter, groups) => {
  if (!fromDateFilter || fromDateFilter.length === 0) return groups;

  return groups.filter((group) => {
    const { single, watched_date, videos } = group;

    const inGroup =
      single && watched_date !== null && watched_date >= fromDateFilter;
    const inVideos = videos.find(
      (video) =>
        video.watched_date !== null && video.watched_date >= fromDateFilter
    );

    return inGroup || inVideos;
  });
};

const filterToDate = (toDateFilter, groups) => {
  if (!toDateFilter || toDateFilter.length === 0) return groups;

  return groups.filter((group) => {
    const { single, watched_date, videos } = group;

    const inGroup =
      single && watched_date !== null && watched_date <= toDateFilter;
    const inVideos = videos.find(
      (video) =>
        video.watched_date !== null && video.watched_date <= toDateFilter
    );

    return inGroup || inVideos;
  });
};

const filterByStatuses = (statusesFilter, groups) => {
  if (statusesFilter.length === 0) return groups;

  return groups.filter((group) => {
    const { single, status, videos } = group;

    const inGroup = single && statusesFilter.find((_) => _ === status);
    const inVideos = videos.find((video) =>
      statusesFilter.find((_) => _ === video.status)
    );

    return inGroup || inVideos;
  });
};

export const filterGroups = (filter, groups) => {
  const { title, fromDate, toDate, statuses } = filter;
  let newGroups = filterByTitle(title, groups);
  newGroups = filterFromDate(fromDate, newGroups);
  newGroups = filterToDate(toDate, newGroups);
  newGroups = filterByStatuses(statuses, newGroups);
  return newGroups;
};

export default WatchioFilterModel;
