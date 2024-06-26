import { ContentCategory, ContentWatcherSource } from '../../api/api-utils';

declare global {
  namespace Model {
    type ContentingFilter = {
      showWatchers: boolean;
      showLists: boolean;
      watcherType?: ContentWatcherSource;
      category?: ContentCategory;
    };
    type ContentingFilterModel = {
      getInitialState: () => ContentingFilter;
      filterContentWatchers: (
        items: Model.ContentWatcherDM[],
        filter: ContentingFilter
      ) => Model.ContentWatcherDM[];
      filterByCategory: <T extends { category: string }>(
        items: T[],
        category?: string
      ) => T[];
      filterBySourceType: (
        items: ContentWatcherDM[],
        type?: string
      ) => ContentWatcherDM[];
    };
  }
}

export const filter: Model.ContentingFilterModel = {
  getInitialState: (): Model.ContentingFilter => ({
    showWatchers: true,
    showLists: true,
    watcherType: undefined,
    category: undefined,
  }),
  filterContentWatchers(items, { watcherType, category }) {
    let filteredContentWatchers = this.filterByCategory(items, category);
    filteredContentWatchers = this.filterBySourceType(
      filteredContentWatchers,
      watcherType
    );
    return filteredContentWatchers;
  },
  filterByCategory(items, category) {
    if (!category || category.length === 0) return items;
    return items.filter((item) => item.category === category);
  },
  filterBySourceType(items, type) {
    if (!type || type.length === 0) return items;
    return items.filter((item) => item.source_type === type);
  },
};
