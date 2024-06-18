import { WatchingStatus } from '../../api/api-utils';

declare global {
  namespace Model {
    type WatchingFilter = {
      title: string;
      showPosters: boolean;
      statuses: WatchingStatus[];
      fromDate: string;
      toDate: string;
    };
    type WatchingFilterModel = SimpleWorker<WatchingFilter> & {
      filterByTitle: (groups: GroupDM[], title: string) => GroupDM[];
      filterByFromDate: (groups: GroupDM[], fromData: string) => GroupDM[];
      filterByToDate: (groups: GroupDM[], toDate: string) => GroupDM[];
      filterByStatuses: (groups: GroupDM[], statuses: string[]) => GroupDM[];
      filterGroups: (groups: GroupDM[], filter: WatchingFilter) => GroupDM[];
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
  filterByTitle(groups, title) {
    if (title.length === 0) return groups;

    return groups.filter((group) => {
      const inName = group.name.toLowerCase().includes(title.toLowerCase());
      const inAlias = group.aliases.find((alias) =>
        alias.toLowerCase().includes(title.toLowerCase())
      );

      // TODO: (L) - check in videos as well

      return inName || inAlias;
    });
  },
  filterByFromDate(groups, fromDate) {
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
  filterByToDate(groups, toDate) {
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
  filterByStatuses(groups, statuses) {
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
  filterGroups(groups, filter) {
    const { title, fromDate, toDate, statuses } = filter;
    let newGroups = this.filterByTitle(groups, title);
    newGroups = this.filterByFromDate(newGroups, fromDate);
    newGroups = this.filterByToDate(newGroups, toDate);
    newGroups = this.filterByStatuses(newGroups, statuses);
    return newGroups;
  },
};
