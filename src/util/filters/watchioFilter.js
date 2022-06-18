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
  if (fromDateFilter.length === 0) return groups;

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
  if (toDateFilter.length === 0) return groups;

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
