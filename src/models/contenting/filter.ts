import { ContentCategory, ContentWatcherSource } from '../../api/api-utils';

declare global {
  namespace Model {
    type ContentingFilter = {
      source?: ContentWatcherSource;
      category?: ContentCategory;
    };
    type ContentingFilterModel = {
      getInitialState: () => ContentingFilter;
      filterContentWatchers: (
        items: Model.ContentWatcherDM[],
        filter: ContentingFilter
      ) => Model.ContentWatcherDM[];
      filterByCategory: <T extends { category: ContentCategory }>(
        items: T[],
        category?: ContentCategory
      ) => T[];
      filterBySource: (
        items: ContentWatcherDM[],
        source?: ContentWatcherSource
      ) => ContentWatcherDM[];
    };
  }
}

export const filter: Model.ContentingFilterModel = {
  getInitialState: (): Model.ContentingFilter => ({
    source: undefined,
    category: undefined,
  }),
  filterContentWatchers(items, { source, category }) {
    let filteredContentWatchers = this.filterByCategory(items, category);
    filteredContentWatchers = this.filterBySource(
      filteredContentWatchers,
      source
    );
    return filteredContentWatchers;
  },
  filterByCategory(items, category) {
    if (!category) return items;
    return items.filter((item) => item.category === category);
  },
  filterBySource(items, source) {
    if (!source) return items;
    return items.filter((item) => item.source_type === source);
  },
};
