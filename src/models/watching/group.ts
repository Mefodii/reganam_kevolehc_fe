import {
  WatchingAirStatus,
  WatchingStatus,
  WatchingType,
  isWatchingQueue,
} from '../../api/api-utils';
import { getToday } from '../../util/datetime';
import { BaseModel } from '../generic/model';
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
      status: WatchingStatus;
      watched_date: string;
      rating: number | null;
      year: number;
    };
    type GroupNotSingleSM = GroupBaseProps & {
      airing_status: WatchingAirStatus;
      single: false;
      check_date: string;
    };
    type GroupSM = GroupSingleSM | GroupNotSingleSM;

    type GroupSingleAM = GroupSingleSM;
    type GroupNotSingleAM = GroupNotSingleSM;
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
    type GroupCreateProps = CreateProps & {
      withToggleSingle: boolean;
      watchingType: WatchingType;
      single: boolean;
    };
    type GroupUpdateProps = UpdateProps<GroupDM> & {
      watchingType: WatchingType;
      single: boolean;
    };
    type GroupProps = GroupCreateProps | GroupUpdateProps;
  }
}

class GroupModel extends BaseModel<
  Model.GroupProps,
  Model.GroupSM,
  Model.GroupAM,
  Model.GroupDM
> {
  getInitialState(props?: Model.GroupProps): Model.GroupSM {
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
        status: WatchingStatus.PLANNED,
        watched_date: getToday(),
        rating: null,
        year: 0,
      };
    } else {
      return {
        ...baseProps,
        single: false,
        airing_status: WatchingAirStatus.UNKNOWN,
        check_date: getToday(),
      };
    }
  }
  toState(dbState: Model.GroupDM): Model.GroupSM {
    const baseProps = {
      id: dbState.id,
      name: dbState.name,
      type: dbState.type,
      aliases: alias.toState(dbState.aliases),
      links: link.toState(dbState.links),
      single: dbState.single,
    };

    if (dbState.single) {
      return {
        ...baseProps,
        single: true,
        status: dbState.status,
        watched_date: dbState.watched_date,
        rating: dbState.rating,
        year: dbState.year,
      };
    } else {
      return {
        ...baseProps,
        single: false,
        airing_status: dbState.airing_status,
        check_date: dbState.check_date,
      };
    }
  }

  toggleSingle(group: Model.GroupSM): Model.GroupSM {
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
        airing_status: WatchingAirStatus.UNKNOWN,
        check_date: getToday(),
      };
    } else {
      return {
        ...baseProps,
        single: true,
        status: WatchingStatus.PLANNED,
        watched_date: getToday(),
        rating: null,
        year: 0,
      };
    }
  }

  toAPIState(state: Model.GroupSM): Model.GroupAM {
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
        status: state.status,
        watched_date: state.watched_date,
        year: state.year,
        rating: state.rating,
      };
    } else {
      return {
        ...baseProps,
        single: false,
        check_date: state.check_date,
        airing_status: state.airing_status,
      };
    }
  }

  toDBState(state: Model.GroupSM, dbState: Model.GroupDM): Model.GroupDM {
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
        status: state.status,
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
        airing_status: state.airing_status,
      };
    }

    throw new Error('Cannot convert states with object of opposite <single>');
  }

  equals(o1: Model.GroupDM, o2: Model.GroupDM): boolean {
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
  }

  addAlias = (aliases: Model.Alias): Model.Alias => alias.addAlias(aliases);
  deleteAlias = (aliases: Model.Alias): Model.Alias =>
    alias.deleteAlias(aliases);
  addLink = (links: Model.Link): Model.Link => link.addLink(links);
  deleteLink = (links: Model.Link): Model.Link => link.deleteLink(links);
  isInQueue = <T extends Model.GroupSingleSM>(group: T): boolean =>
    isWatchingQueue(group.status);
  isPremiere = <T extends Model.GroupSingleSM>(group: T): boolean =>
    group.status === WatchingStatus.PREMIERE;
  isDropped = <T extends Model.GroupSingleSM>(group: T): boolean =>
    group.status === WatchingStatus.DROPPED;
  isFinished = <T extends Model.GroupSingleSM>(group: T): boolean =>
    group.status === WatchingStatus.FINISHED;
  setFinished<T extends Model.GroupSingleSM>(group: T, rating: number) {
    return {
      ...group,
      status: WatchingStatus.FINISHED,
      watched_date: getToday(),
      rating,
    };
  }
}

export const group = new GroupModel();
