declare global {
  namespace Model {
    type WatchingFilter = {
      title: string;
      showPosters: boolean;
      statuses: string[];
      fromDate: string;
      toDate: string;
    };
    type WatchingFilterModel = SimpleWorker<WatchingFilter> & {
      filterByTitle: (title: string, groups: GroupDM[]) => GroupDM[];
      filterByFromDate: (fromData: string, groups: GroupDM[]) => GroupDM[];
      filterByToDate: (toDate: string, groups: GroupDM[]) => GroupDM[];
      filterByStatuses: (statuses: string[], groups: GroupDM[]) => GroupDM[];
      filterGroups: (filter: WatchingFilter, groups: GroupDM[]) => GroupDM[];
    };
  }
}

export const filter: Model.WatchingFilterModel = {
  getInitialState: () => ({
    title: '',
    showPosters: true,
    statuses: [],
    fromDate: '',
    toDate: '',
  }),
  toState: (watchingFilter) => ({
    ...watchingFilter,
  }),
  buildState(watchingFilter) {
    return this.toState(watchingFilter);
  },
  validate(watchingFilter) {
    let isValid = true;
    let error: Partial<Model.WatchingFilter> = {};

    // TODO - do validations

    const newState = this.toState(watchingFilter);
    return [newState, isValid, error];
  },
  equals(o1, o2) {
    if (o1?.title !== o2?.title) return false;
    if (o1?.showPosters !== o2?.showPosters) return false;
    if (o1?.statuses !== o2?.statuses) return false;
    if (o1?.fromDate !== o2?.fromDate) return false;
    if (o1?.toDate !== o2?.toDate) return false;

    return true;
  },
  filterByTitle(title, groups) {
    if (title.length === 0) return groups;

    return groups.filter((group) => {
      const inName = group.name.toLowerCase().includes(title.toLowerCase());
      const inAlias = group.aliases.find((alias) =>
        alias.toLowerCase().includes(title.toLowerCase())
      );

      // TODO - check in videos as well

      return inName || inAlias;
    });
  },
  filterByFromDate(fromDate, groups) {
    if (!fromDate || fromDate.length === 0) return groups;

    return groups.filter((g) => {
      if (g.single) {
        return g.watched_date >= fromDate;
      }

      const inVideos = g.videos.find(
        (v) => v.watched_date !== null && v.watched_date >= fromDate
      );
      return inVideos !== undefined;
    });
  },
  filterByToDate(toDate, groups) {
    if (!toDate || toDate.length === 0) return groups;

    return groups.filter((g) => {
      if (g.single) {
        return g.watched_date <= toDate;
      }

      const inVideos = g.videos.find(
        (v) => v.watched_date !== null && v.watched_date <= toDate
      );
      return inVideos !== undefined;
    });
  },
  filterByStatuses(statuses, groups) {
    if (statuses.length === 0) return groups;

    return groups.filter((g) => {
      if (g.single) {
        return statuses.find((_) => _ === g.status) !== undefined;
      }

      const inVideos = g.videos!.find((v) =>
        statuses.find((_) => _ === v.status)
      );
      return inVideos !== undefined;
    });
  },
  filterGroups(filter, groups) {
    const { title, fromDate, toDate, statuses } = filter;
    let newGroups = this.filterByTitle(title, groups);
    newGroups = this.filterByFromDate(fromDate, newGroups);
    newGroups = this.filterByToDate(toDate, newGroups);
    newGroups = this.filterByStatuses(statuses, newGroups);
    return newGroups;
  },
};
