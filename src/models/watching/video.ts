import {
  WatchingStatus,
  WatchingType,
  isWatchingQueue,
} from '../../api/api-utils';
import { getToday } from '../../util/datetime';
import { alias } from './alias';
import { link } from './link';

declare global {
  namespace Model {
    type VideoSM = {
      id?: number;
      name: string;
      comment: string;
      type: WatchingType;
      group: number;
      aliases: Alias;
      links: Alias;
      year: number;
      status?: WatchingStatus;
      order: number;
      current_episode: number;
      episodes: number;
      rating: number;
      watched_date: string;
    };
    type VideoAM = VideoSM & {
      status: WatchingStatus;
    };
    type VideoDM = VideoAM & {
      id: number;
    };
    type VideoCreateProps = {
      formMode: 'CREATE';
      groupId: number;
      watchingType: WatchingType;
      defaultOrder: number;
    };
    type VideoUpdateProps = {
      formMode: 'UPDATE';
      video: VideoDM;
    };
    type VideoProps = VideoCreateProps | VideoUpdateProps;
    type VideoModel = Worker<VideoProps, VideoSM, VideoAM, VideoDM> & {
      addAlias: (aliases: Alias) => Alias;
      deleteAlias: (aliases: Alias) => Alias;
      addLink: (links: Alias) => Alias;
      deleteLink: (links: Alias) => Alias;
      isInQueue: <T extends VideoSM>(video: T) => boolean;
      isPremiere: <T extends VideoSM>(video: T) => boolean;
      isDropped: <T extends VideoSM>(video: T) => boolean;
      isFinished: <T extends VideoSM>(video: T) => boolean;
      setFinished: <T extends VideoSM>(video: T, rating: number) => T;
    };
  }
}

export const video: Model.VideoModel = {
  getInitialState: (props) => {
    if (props?.formMode !== 'CREATE') {
      throw new Error(
        'props required in formMode = "CREATE" for `getInitialState` of the video.'
      );
    }

    return {
      id: undefined,
      name: '',
      comment: '',
      type: props.watchingType,
      group: props.groupId,
      aliases: alias.getInitialState(),
      links: link.getInitialState(),
      status: undefined,
      watched_date: getToday(),
      year: 0,
      order: props.defaultOrder ? props.defaultOrder : 1,
      current_episode: 0,
      episodes: 1,
      rating: 0,
    };
  },
  toState: (video) => {
    return {
      id: video.id,
      name: video.name,
      comment: video.comment,
      type: video.type,
      group: video.group,
      aliases: alias.toState(video.aliases),
      links: link.toState(video.links),
      year: video.year,
      status: video.status,
      order: video.order,
      current_episode: video.current_episode,
      episodes: video.episodes,
      rating: video.rating,
      watched_date: video.watched_date,
    };
  },
  buildState(props) {
    if (props.formMode === 'UPDATE') return this.toState(props.video!);
    return this.getInitialState(props);
  },
  toAPIState: (state) => {
    return {
      id: state.id,
      type: state.type,
      group: state.group,
      name: state.name,
      comment: state.comment,
      aliases: alias.toState(state.aliases),
      links: link.toState(state.links),
      year: state.year,
      status: state.status!,
      watched_date: state.watched_date,
      order: state.order,
      current_episode: state.current_episode,
      episodes: state.episodes,
      rating: state.rating,
    };
  },
  toDBState: (state, dbState) => {
    return {
      id: dbState.id,
      type: state.type,
      group: state.group,
      name: state.name,
      comment: state.comment,
      aliases: alias.toState(state.aliases),
      links: link.toState(state.links),
      year: state.year,
      status: state.status!,
      watched_date: state.watched_date,
      order: state.order,
      current_episode: state.current_episode,
      episodes: state.episodes,
      rating: state.rating,
    };
  },
  getDBState: (props) => {
    if (props.formMode === 'UPDATE') return props.video;
    throw new Error(`getDBState not available for ${props.formMode}`);
  },
  validateCreate(state) {
    let isValid = true;
    let error: Partial<Model.VideoSM> = {};

    const apiState = this.toAPIState(state);
    return [apiState, isValid, error];
  },
  validateUpdate(state, dbState) {
    let isValid = true;
    let error: Partial<Model.VideoSM> = {};

    const newState = this.toDBState(state, dbState);
    const equals = isValid && this.equals(newState, dbState);
    return [newState, equals, isValid, error];
  },
  equals(o1, o2) {
    if (o1?.name !== o2?.name) return false;
    if (o1?.comment !== o2?.comment) return false;
    if (o1?.year !== o2?.year) return false;
    if (o1?.status !== o2?.status) return false;
    if (o1?.watched_date !== o2?.watched_date) return false;
    if (o1?.order !== o2?.order) return false;
    if (o1?.current_episode !== o2?.current_episode) return false;
    if (o1?.episodes !== o2?.episodes) return false;
    if (o1?.rating !== o2?.rating) return false;
    if (!alias.equals(o1.aliases, o2.aliases)) return false;
    if (!link.equals(o1.links, o2.links)) return false;

    return true;
  },
  addAlias: (aliases) => alias.addAlias(aliases),
  deleteAlias: (aliases) => alias.deleteAlias(aliases),
  addLink: (links) => link.addLink(links),
  deleteLink: (links) => link.deleteLink(links),
  isInQueue: (video) => isWatchingQueue(video.status),
  isPremiere: (video) => video.status === WatchingStatus.PREMIERE,
  isDropped: (video) => video.status === WatchingStatus.DROPPED,
  isFinished: (video) => video.status === WatchingStatus.FINISHED,
  setFinished: (video, rating) => ({
    ...video,
    status: WatchingStatus.FINISHED,
    current_episode: video.episodes,
    watched_date: getToday(),
    rating,
  }),
};
