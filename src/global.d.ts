declare global {
  type AxiosConfigParams = any;
  type AxiosConfigHeaders = {
    'Content-Type': string;
  };
  type AxiosConfig = {
    params?: AxiosConfigParams;
    headers?: AxiosConfigHeaders;
  };

  declare namespace QParams {
    type Base = {
      page?: number;
    };
    type ContentItemBase = {
      contentList: number;
      hideConsumed?: boolean;
    };
    type ContentItem = Base & ContentItemBase;
  }

  type PageInfo<T extends QParams.Base> = {
    count: number;
    nextUrl: string | null;
    previousUrl: string | null;
    nextParams: T | null;
    currentParams: T;
    previousParams: T | null;
    pages: number;
    page: number;
    page_size: number;
  };

  type AxiosPageResult<T, V> = PageInfo<V> & {
    results: T[];
  };

  type SVGContainerProps = {
    tooltip?: string;
    tooltipDelay?: number;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
  };

  type SVGProps = {
    className?: string;
  } & SVGContainerProps;

  declare namespace Redux {
    type Scope = 'DETAILS' | 'LIST';
  }

  declare namespace DragAndDrop {
    type Type = 'VIDEO_ITEM' | 'CONTENT_ITEM';
    type Item = Model.VideoDJM | Model.ContentItemDM;
    type AccessGroup = number | string;
    type Data = {
      item?: Item;
      type?: Type;
      accessGroup?: AccessGroup;
      copy: boolean;
    };
  }

  declare namespace Form {
    type Mode = 'CREATE' | 'UPDATE';
    type Option<T = string> = T;
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
