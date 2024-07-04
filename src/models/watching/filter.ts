import { WatchingStatus } from '../../api/api-utils';
import { SimpleModel } from '../generic/model';

declare global {
  namespace Model {
    type WatchingFilter = {
      title: string;
      showPosters: boolean;
      statuses: WatchingStatus[];
      fromDate: string;
      toDate: string;
    };
  }
}

class FilterModel extends SimpleModel<Model.WatchingFilter> {
  mandatoryFields: (keyof Model.WatchingFilter)[] = [];

  getInitialState(): Model.WatchingFilter {
    return {
      title: '',
      showPosters: true,
      statuses: [],
      fromDate: '',
      toDate: '',
    };
  }

  toState(originalState: Model.WatchingFilter): Model.WatchingFilter {
    return { ...originalState };
  }

  equals(o1: Model.WatchingFilter, o2: Model.WatchingFilter): boolean {
    if (o1?.title !== o2?.title) return false;
    if (o1?.showPosters !== o2?.showPosters) return false;
    if (o1?.statuses !== o2?.statuses) return false;
    if (o1?.fromDate !== o2?.fromDate) return false;
    if (o1?.toDate !== o2?.toDate) return false;

    return true;
  }

  filterByTitle(groups: Model.GroupDM[], title: string): Model.GroupDM[] {
    if (!title) return groups;

    return groups.filter((g) => {
      const inName = g.name.toLowerCase().includes(title.toLowerCase());
      const inAlias = g.aliases.find((alias) =>
        alias.toLowerCase().includes(title.toLowerCase())
      );

      if (g.single) {
        return inName || inAlias;
      }

      const inVideos = g.videos.find((v) => {
        const inVName = v.name.toLowerCase().includes(title.toLowerCase());
        const inVAlias = v.aliases.find((alias) =>
          alias.toLowerCase().includes(title.toLowerCase())
        );
        return inVName || inVAlias;
      });
      return inName || inAlias || inVideos;
    });
  }

  filterByFromDate(groups: Model.GroupDM[], fromDate: string): Model.GroupDM[] {
    if (!fromDate) return groups;

    return groups.filter((g) => {
      if (g.single) {
        return g.watched_date >= fromDate;
      }

      const inVideos = g.videos.find(
        (v) => v.watched_date !== null && v.watched_date >= fromDate
      );
      return inVideos !== undefined;
    });
  }

  filterByToDate(groups: Model.GroupDM[], toDate: string): Model.GroupDM[] {
    if (!toDate) return groups;

    return groups.filter((g) => {
      if (g.single) {
        return g.watched_date <= toDate;
      }

      const inVideos = g.videos.find(
        (v) => v.watched_date !== null && v.watched_date <= toDate
      );
      return inVideos !== undefined;
    });
  }

  filterByStatuses(
    groups: Model.GroupDM[],
    statuses: string[]
  ): Model.GroupDM[] {
    if (statuses.length === 0) return groups;

    return groups.filter((g) => {
      if (g.single) {
        return statuses.find((_) => _ === g.status) !== undefined;
      }

      const inVideos = g.videos.find((v) =>
        statuses.find((_) => _ === v.status)
      );
      return inVideos !== undefined;
    });
  }

  filterGroups(
    groups: Model.GroupDM[],
    filter: Model.WatchingFilter
  ): Model.GroupDM[] {
    const { title, fromDate, toDate, statuses } = filter;
    let newGroups = this.filterByTitle(groups, title);
    newGroups = this.filterByFromDate(newGroups, fromDate);
    newGroups = this.filterByToDate(newGroups, toDate);
    newGroups = this.filterByStatuses(newGroups, statuses);
    return newGroups;
  }
}

export const filter = new FilterModel();
