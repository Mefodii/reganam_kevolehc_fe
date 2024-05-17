declare global {
  type AxiosConfigParams = any;
  type AxiosConfigHeaders = {
    'Content-Type': string;
  };
  type AxiosConfig = {
    params?: AxiosConfigParams;
    headers?: AxiosConfigHeaders;
  };

  declare namespace Modal {
    type Group = {
      modalType: 'GROUP_MODAL';
      props: Model.GroupProps;
    };
    type Video = {
      modalType: 'VIDEO_MODAL';
      props: Model.VideoProps;
    };
    type ContentWatcher = {
      modalType: 'CONTENT_WATCHER_MODAL';
      props: Model.ContentWatcherProps;
    };

    type WatchingFilter = {
      modalType: 'WATCHING_FILTER_MODAL';
    };

    type ClosedModal = {
      modalType: 'CLOSED_MODAL';
    };

    type Data =
      | Modal.Group
      | Modal.Video
      | Modal.ContentWatcher
      | WatchingFilter
      | ClosedModal;
  }

  declare namespace DragAndDrop {
    type Type = 'VIDEO_ITEM';
    type Item = Model.VideoDJM;
    type AccessGroup = number | string;
    type Data = {
      item?: DragAndDrop.Item;
      type?: Type; // TODO ??? enum
      accessGroup?: DragAndDrop.AccessGroup;
      copy: boolean;
    };
  }

  declare namespace Form {
    type Mode = 'CREATE' | 'UPDATE';
    type Option<T = string> = T; // TODO
    type Payload<T> = { name: string; value?: T; error?: string };
    type ChangeEvent =
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | undefined;
    type ChangeEventHandler<T> = (e: ChangeEvent, payload: Payload<T>) => void;
  }

  declare namespace Model {
    // S: State Model - Name Convention <ModelNameSM>
    // A: API Model - Name Convention <ModelNameAM>
    // P: Props (contains extra data to help convert models) - Name Convention <ModelNameProps>
    // D: DB Model - Name Convention <ModelNameDM>

    // type ModelWorker<S, A, P> = {
    //   getInitialState: (props?: P) => S;
    //   toState: (props: P) => S;
    //   buildState: (props: P) => S;
    //   toModel: (state: S, props?: P) => A;
    //   validate: (state: S, props: P) => [A, boolean, Partial<S>];
    //   // update?: TODO -
    //   // TODO: maybe it will be better to have validateCreate / validateUpdate (to have proper return type AM / DJM)
    //   equals: (state: S, props: P) => boolean;
    // };

    type SimpleWorker<S, D = S> = {
      getInitialState: () => S;
      toState: (originalState: D) => S;
      buildState: (originalState: D) => S;
      validate: (state: S) => [D, boolean, Partial<S>];
      equals: (state: S, originalState: S) => boolean;
    };

    type Worker<P, S = P, A = S, D = A> = {
      getInitialState: (props?: P) => S;
      toState: (dbState: D) => S;
      buildState: (props: P) => S;
      toAPIState: (state: S) => A;
      toDBState: (state: S, dbState: D) => D;
      getDBState: (props: P) => D;
      validateCreate: (
        state: S
      ) => [A, boolean /* isValid */, Partial<S> /* errors */];
      validateUpdate: (
        state: S,
        dbState: D
      ) => [
        D,
        boolean /* equals */,
        boolean /* isValid */,
        Partial<S> /* errors */
      ];
      equals: (state: D, dbState: D) => boolean;
    };
  }

  declare namespace Helper {
    type Transformer = {
      name: string;
      run: (lines: string[]) => string[];
    };
  }
}

export {};
