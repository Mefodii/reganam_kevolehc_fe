import { WatchingStatus, isWatchingQueue } from '../../api/api-utils';
import { getToday } from '../../util/datetime';
import { BaseModel } from '../generic/model';
import { alias } from './alias';
import { link } from './link';

declare global {
  namespace Model {
    type VideoSM = {
      id?: number;
      name: string;
      comment: string;
      group: number;
      aliases: Alias;
      links: Alias;
      year: number;
      status: WatchingStatus;
      order: number;
      current_episode: number;
      episodes: number;
      rating: number | null;
      watched_date: string;
    };
    type VideoDM = VideoSM & {
      id: number;
    };
    type VideoCreateProps = CreateProps & {
      groupId: number;
      defaultOrder: number;
    };
    type VideoProps = VideoCreateProps | UpdateProps<VideoDM>;
  }
}

class VideoModel extends BaseModel<
  Model.VideoProps,
  Model.VideoSM,
  Model.VideoDM
> {
  getInitialState(props: Model.VideoProps): Model.VideoSM {
    if (props?.formMode !== 'CREATE') {
      throw new Error(
        'props required in formMode = "CREATE" for `getInitialState` of the video.'
      );
    }

    return {
      id: undefined,
      name: '',
      comment: '',
      group: props.groupId,
      aliases: alias.getInitialState(),
      links: link.getInitialState(),
      status: WatchingStatus.PLANNED,
      watched_date: getToday(),
      year: 0,
      order: props.defaultOrder ? props.defaultOrder : 1,
      current_episode: 0,
      episodes: 1,
      rating: null,
    };
  }

  toState(dbState: Model.VideoDM): Model.VideoSM {
    return {
      id: dbState.id,
      name: dbState.name,
      comment: dbState.comment,
      group: dbState.group,
      aliases: alias.toState(dbState.aliases),
      links: link.toState(dbState.links),
      year: dbState.year,
      status: dbState.status,
      order: dbState.order,
      current_episode: dbState.current_episode,
      episodes: dbState.episodes,
      rating: dbState.rating,
      watched_date: dbState.watched_date,
    };
  }

  toDBState(state: Model.VideoSM, dbState: Model.VideoDM): Model.VideoDM {
    return {
      ...state,
      id: dbState.id,
    };
  }

  equals(o1: Model.VideoDM, o2: Model.VideoDM): boolean {
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
  }

  addAlias = (aliases: Model.Alias): Model.Alias => alias.addAlias(aliases);

  deleteAlias = (aliases: Model.Alias): Model.Alias =>
    alias.deleteAlias(aliases);
  addLink = (links: Model.Link): Model.Link => link.addLink(links);
  deleteLink = (links: Model.Link): Model.Link => link.deleteLink(links);
  isInQueue = <T extends Model.VideoSM>(video: T): boolean =>
    isWatchingQueue(video.status);
  isPremiere = <T extends Model.VideoSM>(video: T): boolean =>
    video.status === WatchingStatus.PREMIERE;
  isDropped = <T extends Model.VideoSM>(video: T): boolean =>
    video.status === WatchingStatus.DROPPED;
  isFinished = <T extends Model.VideoSM>(video: T): boolean =>
    video.status === WatchingStatus.FINISHED;
  setFinished<T extends Model.VideoSM>(video: T, rating: number) {
    return {
      ...video,
      status: WatchingStatus.FINISHED,
      current_episode: video.episodes,
      watched_date: getToday(),
      rating,
    };
  }
}

export const video = new VideoModel();
