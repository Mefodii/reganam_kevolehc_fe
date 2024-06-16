import {
  WatchingAirStatus,
  WatchingStatus,
  WatchingType,
  isWatchingQueue,
} from '../../api/api-utils';
import { getToday } from '../../util/datetime';
import { alias } from './alias';
import { link } from './link';

declare global {
  namespace Model {
    type GroupBaseProps = {
      id?: number;
      name: string;
      type: WatchingType;
      aliases: Alias;
      links: Alias;
    };
    type GroupSingleSM = GroupBaseProps & {
      single: true;
      status?: WatchingStatus;
      watched_date: string;
      rating: number;
      year: number;
    };
    type GroupNotSingleSM = GroupBaseProps & {
      airing_status?: WatchingAirStatus;
      single: false;
      check_date: string;
    };
    type GroupSM = GroupSingleSM | GroupNotSingleSM;

    type GroupSingleAM = GroupSingleSM & {
      status: WatchingStatus;
    };
    type GroupNotSingleAM = GroupNotSingleSM & {
      airing_status: WatchingAirStatus;
    };
    type GroupAM = GroupSingleAM | GroupNotSingleAM;

    type GroupSingleDM = GroupSingleSM & {
      id: number;
      images: PosterDM[];
    };
    type GroupNotSingleDM = GroupNotSingleSM & {
      id: number;
      images: PosterDM[];
      videos: VideoDM[];
    };
    type GroupDM = GroupSingleDM | GroupNotSingleDM;
    type GroupCreateProps = {
      withToggleSingle: boolean;
      watchingType: WatchingType;
      single: boolean;
      formMode: 'CREATE';
    };
    type GroupUpdateProps = {
      group: GroupDM;
      watchingType: WatchingType;
      single: boolean;
      formMode: 'UPDATE';
    };
    type GroupProps = GroupCreateProps | GroupUpdateProps;
    type GroupModel = Worker<GroupProps, GroupSM, GroupAM, GroupDM> & {
      toggleSingle: (group: GroupSM) => GroupSM;
      addAlias: (aliases: Alias) => Alias;
      deleteAlias: (aliases: Alias) => Alias;
      addLink: (links: Alias) => Alias;
      deleteLink: (links: Alias) => Alias;
      isInQueue: <T extends GroupSingleSM>(group: T) => boolean;
      isPremiere: <T extends GroupSingleSM>(group: T) => boolean;
      isDropped: <T extends GroupSingleSM>(group: T) => boolean;
      isFinished: <T extends GroupSingleSM>(group: T) => boolean;
      setFinished: <T extends GroupSingleSM>(group: T, rating: number) => T;
    };
  }
}

export const group: Model.GroupModel = {
  getInitialState: (props) => {
    if (props?.formMode !== 'CREATE') {
      throw new Error(
        'props required in formMode = "CREATE" for `getInitialState` of the group.'
      );
    }

    const baseProps = {
      id: undefined,
      name: '',
      type: props.watchingType,
      aliases: alias.getInitialState(),
      links: link.getInitialState(),
      single: props.single,
    };
    if (baseProps.single) {
      return {
        ...baseProps,
        single: true,
        status: undefined,
        watched_date: getToday(),
        rating: 0,
        year: 0,
      };
    } else {
      return {
        ...baseProps,
        single: false,
        airing_status: undefined,
        check_date: getToday(),
      };
    }
  },
  toState: (group) => {
    const baseProps = {
      id: group.id,
      name: group.name,
      type: group.type,
      aliases: alias.toState(group.aliases),
      links: link.toState(group.links),
      single: group.single,
    };

    if (group.single) {
      return {
        ...baseProps,
        single: true,
        status: group.status,
        watched_date: group.watched_date,
        rating: group.rating,
        year: group.year,
      };
    } else {
      return {
        ...baseProps,
        single: false,
        airing_status: group.airing_status,
        check_date: group.check_date,
      };
    }
  },
  toggleSingle: (group) => {
    const baseProps = {
      id: group.id,
      name: group.name,
      type: group.type,
      aliases: alias.toState(group.aliases),
      links: link.toState(group.links),
      single: group.single,
    };

    if (group.single) {
      return {
        ...baseProps,
        single: false,
        airing_status: undefined,
        check_date: getToday(),
      };
    } else {
      return {
        ...baseProps,
        single: true,
        status: undefined,
        watched_date: getToday(),
        rating: 0,
        year: 0,
      };
    }
  },
  buildState(props) {
    if (props.formMode === 'UPDATE') return this.toState(props.group);
    return this.getInitialState(props);
  },
  toAPIState: (state) => {
    const baseProps = {
      id: state.id,
      type: state.type,
      name: state.name,
      aliases: alias.toState(state.aliases),
      links: link.toState(state.links),
    };

    if (state.single) {
      return {
        ...baseProps,
        single: true,
        status: state.status!,
        watched_date: state.watched_date,
        year: state.year,
        rating: state.rating,
      };
    } else {
      return {
        ...baseProps,
        single: false,
        check_date: state.check_date,
        airing_status: state.airing_status!,
      };
    }
  },
  toDBState: (state, dbState) => {
    const baseProps = {
      id: dbState.id,
      type: state.type,
      name: state.name,
      aliases: alias.toState(state.aliases),
      links: link.toState(state.links),
    };

    if (state.single && dbState.single) {
      return {
        ...baseProps,
        images: dbState.images,
        single: true,
        status: state.status!,
        watched_date: state.watched_date,
        year: state.year,
        rating: state.rating,
      };
    }
    if (!state.single && !dbState.single) {
      return {
        ...baseProps,
        images: dbState.images,
        videos: dbState.videos,
        single: false,
        check_date: state.check_date,
        airing_status: state.airing_status!,
      };
    }

    throw new Error('Cannot convert states with object of opposite <single>');
  },
  getDBState(props) {
    if (props.formMode === 'UPDATE') return props.group;
    throw new Error(`getDBState not available for ${props.formMode}`);
  },
  validateCreate(state) {
    let isValid = true;
    let error: Partial<Model.GroupSM> = {};

    // TODO - do validations

    const apiState = this.toAPIState(state);
    return [apiState, isValid, error];
  },
  validateUpdate(state, dbState) {
    let isValid = true;
    let error: Partial<Model.GroupSM> = {};

    // TODO - do validations

    const newState = this.toDBState(state, dbState);
    const equals = isValid && this.equals(newState, dbState);
    return [newState, equals, isValid, error];
  },
  equals(o1, o2) {
    if (o1?.name !== o2?.name) return false;
    if (o1?.single !== o2?.single) return false;
    if (!alias.equals(o1.aliases, o2.aliases)) return false;
    if (!link.equals(o1.links, o2.links)) return false;

    if (o1.single && o2.single) {
      if (o1?.status !== o2?.status) return false;
      if (o1?.watched_date !== o2?.watched_date) return false;
      if (o1?.year !== o2?.year) return false;
      if (o1?.rating !== o2?.rating) return false;
    }

    if (!o1.single && !o2.single) {
      if (o1?.check_date !== o2?.check_date) return false;
      if (o1?.airing_status !== o2?.airing_status) return false;
    }

    return true;
  },
  addAlias: (aliases) => alias.addAlias(aliases),
  deleteAlias: (aliases) => alias.deleteAlias(aliases),
  addLink: (links) => link.addLink(links),
  deleteLink: (links) => link.deleteLink(links),
  isInQueue: (group) => isWatchingQueue(group.status),
  isPremiere: (group) => group.status === WatchingStatus.PREMIERE,
  isDropped: (group) => group.status === WatchingStatus.DROPPED,
  isFinished: (group) => group.status === WatchingStatus.FINISHED,
  setFinished: (group, rating) => ({
    ...group,
    status: WatchingStatus.FINISHED,
    watched_date: getToday(),
    rating,
  }),
};
