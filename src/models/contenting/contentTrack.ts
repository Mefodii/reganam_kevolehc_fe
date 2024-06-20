declare global {
  namespace Model {
    type ContentTrackSM = {
      id?: number;
      name: string;
      position: number;
      start_time: number | null;
      duration: number | null;
      comment: string;
      consumed: boolean;
      needs_edit: boolean;
      // TODO: (M) - create a Nullable Boolean SIngle Selector
      like: boolean | null;
      is_duplicate: boolean;
      is_track: boolean;
      // TODO: (L) probably track will be received as full json not just number
      track: number | null;
    };
    type ContentTrackAM = ContentTrackSM;
    type ContentTrackDM = ContentTrackAM & {
      id: number;
      content_item: number;
    };
    type ContentTrackCreateProps = {
      formMode: 'CREATE';
    };
    type ContentTrackUpdateProps = {
      contentTrack: ContentTrackDM;
      formMode: 'UPDATE';
    };
    type ContentTrackProps = ContentTrackCreateProps | ContentTrackUpdateProps;
    type ContentTrackModel = Worker<
      ContentTrackProps,
      ContentTrackSM,
      ContentTrackAM,
      ContentTrackDM
    > & {
      mandatoryFields: string[];
    };
  }
}

export const contentTrack = {};
