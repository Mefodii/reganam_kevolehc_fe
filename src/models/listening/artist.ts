import { getToday } from '../../util/datetime';
import { BaseModel } from '../generic/model';

import { alias } from '../watching/alias';

declare global {
  namespace Model {
    type ArtistSM = {
      id?: number;
      name: string;
      aliases: Alias;
      monitoring: boolean;
      check_date: string;
      releasing: boolean;
    };
    type ArtistDM = ArtistSM & {
      id: number;
    };
    type ArtistProps = CreateProps | UpdateProps<ArtistDM>;
  }
}

class ArtistModel extends BaseModel<
  Model.ArtistProps,
  Model.ArtistSM,
  Model.ArtistDM
> {
  mandatoryFields: (keyof Model.ArtistSM)[] = ['name'];
  getInitialState(props?: Model.ArtistProps | undefined): Model.ArtistSM {
    if (props?.formMode !== 'CREATE') {
      throw new Error(
        'props required in formMode = "CREATE" for `getInitialState` of the contentMusicItem.'
      );
    }

    return {
      id: undefined,
      name: '',
      aliases: alias.getInitialState(),
      monitoring: false,
      check_date: getToday(),
      releasing: false,
    };
  }
  toState(dbState: Model.ArtistDM): Model.ArtistSM {
    return {
      id: dbState.id,
      name: dbState.name,
      aliases: alias.toState(dbState.aliases),
      monitoring: dbState.monitoring,
      check_date: dbState.check_date,
      releasing: dbState.releasing,
    };
  }

  toDBState(state: Model.ArtistSM, dbState: Model.ArtistDM): Model.ArtistDM {
    return {
      id: dbState.id,
      name: state.name,
      aliases: alias.toState(state.aliases),
      monitoring: state.monitoring,
      check_date: state.check_date,
      releasing: state.releasing,
    };
  }
  equals(o1: Model.ArtistDM, o2: Model.ArtistDM): boolean {
    if (o1?.name !== o2?.name) return false;
    if (o1?.monitoring !== o2?.monitoring) return false;
    if (o1?.check_date !== o2?.check_date) return false;
    if (o1?.releasing !== o2?.releasing) return false;
    if (!alias.equals(o1.aliases, o2.aliases)) return false;

    return true;
  }
  addAlias = (aliases: Model.Alias): Model.Alias => alias.addAlias(aliases);
  deleteAlias = (aliases: Model.Alias): Model.Alias =>
    alias.deleteAlias(aliases);
}

export const artist = new ArtistModel();
