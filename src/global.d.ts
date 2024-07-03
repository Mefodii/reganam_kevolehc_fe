declare global {
  declare namespace QParams {
    type Page = {
      page?: number;
    };
    type Group = {};
    type ContentItem = Page & {
      contentList: number;
      hideConsumed?: boolean;
    };
    type ContentMusicItem = ContentItem;
  }

  type PageInfo<T extends QParams.Page> = {
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

  declare namespace Axios {
    type PagedResult<T, V> = PageInfo<V> & {
      results: T[];
    };
  }

  type SVGContainerProps = {
    disabled?: boolean;
    tooltip?: string;
    tooltipDelay?: number;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    className?: string;
  };

  type SVGProps = {
    className?: string;
  } & SVGContainerProps;

  type Coords = {
    x: number;
    y: number;
  };

  declare namespace Redux {
    type Scope = 'DETAILS' | 'LIST';
  }

  declare namespace Form {
    type Mode = 'CREATE' | 'UPDATE';
    type Option<T> = T | null;
    type Payload<T> = { name: string; value: T; error?: string };
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

    type CreateProps = {
      formMode: 'CREATE';
    };

    type UpdateProps<D> = {
      formMode: 'UPDATE';
      item: D;
    };

    type ModelProps<D> = CreateProps | UpdateProps<D>;

    type SimpleWorker<S, D = S> = {
      getInitialState: () => S;
      toState: (originalState: D) => S;
      buildState: (originalState: D) => S;
      validate: (state: S) => [D, boolean, Partial<S>];
      equals: (state: S, originalState: S) => boolean;
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
