import { TrackStatus } from '../../api/api-utils';
import { BaseModel } from '../generic/model';
import { alias } from '../watching/alias';

declare global {
  namespace Model {
    type TrackSM = {
      id?: number;
      title: string;
      aliases: Alias;
      artists: ArtistDM[];
      feat: ArtistDM[];
      remix: ArtistDM[];
      cover: ArtistDM[];
      status: TrackStatus;
      is_clean: boolean;
      double_checked: boolean;
    };
    type TrackDM = TrackSM & {
      id: number;
      full_name: string;
    };
    type TrackProps = CreateProps | UpdateProps<TrackDM>;
  }
}

class TrackModel extends BaseModel<
  Model.TrackProps,
  Model.TrackSM,
  Model.TrackDM
> {
  mandatoryFields: (keyof Model.TrackSM)[] = [
    'title',
    'is_clean',
    'double_checked',
  ];
  getInitialState(props?: Model.TrackProps | undefined): Model.TrackSM {
    if (props?.formMode !== 'CREATE') {
      throw new Error(
        'props required in formMode = "CREATE" for `getInitialState` of the contentMusicItem.'
      );
    }

    return {
      id: undefined,
      title: '',
      aliases: alias.getInitialState(),
      artists: [],
      feat: [],
      remix: [],
      cover: [],
      status: TrackStatus.NONE,
      is_clean: false,
      double_checked: false,
    };
  }
  toState(dbState: Model.TrackDM): Model.TrackSM {
    return {
      id: dbState.id,
      title: dbState.title,
      aliases: alias.toState(dbState.aliases),
      artists: dbState.artists,
      feat: dbState.feat,
      remix: dbState.remix,
      cover: dbState.cover,
      status: dbState.status,
      is_clean: dbState.is_clean,
      double_checked: dbState.double_checked,
    };
  }

  toDBState(state: Model.TrackSM, dbState: Model.TrackDM): Model.TrackDM {
    return {
      id: dbState.id,
      title: state.title,
      aliases: alias.toState(state.aliases),
      artists: state.artists,
      feat: state.feat,
      remix: state.remix,
      cover: state.cover,
      status: state.status,
      is_clean: state.is_clean,
      double_checked: state.double_checked,
      full_name: dbState.full_name,
    };
  }

  equals(o1: Model.TrackDM, o2: Model.TrackDM): boolean {
    if (o1?.title !== o2?.title) return false;
    if (o1?.status !== o2?.status) return false;
    if (o1?.is_clean !== o2?.is_clean) return false;
    if (o1?.double_checked !== o2?.double_checked) return false;
    if (!alias.equals(o1.aliases, o2.aliases)) return false;

    return true;
  }
  addAlias = (aliases: Model.Alias): Model.Alias => alias.addAlias(aliases);
  deleteAlias = (aliases: Model.Alias): Model.Alias =>
    alias.deleteAlias(aliases);
  getLike<T extends Model.TrackSM>(track: T): boolean | null {
    if (this.isDislike(track)) {
      return false;
    }
    if (this.isThumbsUp(track)) {
      return true;
    }

    return null;
  }
  isThumbsUp<T extends Model.TrackSM>(track: T): boolean {
    return [
      TrackStatus.LIKE,
      TrackStatus.DOWNLOADED,
      TrackStatus.IN_LIBRARY,
    ].includes(track.status);
  }
  isLike<T extends Model.TrackSM>(track: T): boolean {
    return track.status === TrackStatus.LIKE;
  }
  isDislike<T extends Model.TrackSM>(track: T): boolean {
    return track.status === TrackStatus.DISLIKE;
  }
  isDownloaded<T extends Model.TrackSM>(track: T): boolean {
    return track.status === TrackStatus.DOWNLOADED;
  }
  isInLibrary<T extends Model.TrackSM>(track: T): boolean {
    return track.status === TrackStatus.IN_LIBRARY;
  }
}

export const track = new TrackModel();
