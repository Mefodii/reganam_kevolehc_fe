declare global {
  namespace Model {
    type ContentTrackSM = {
      id?: number;
      name: string;
      position: number;
      start_time?: number;
      duration?: number;
      comment?: string;
      needs_edit: boolean;
      like?: boolean;
      is_duplicate: boolean;
      is_track: boolean;
      track?: number;
    };
    type ContentTrackAM = ContentTrackSM;
    type ContentTrackDM = ContentTrackAM & {
      id: number;
      content_item: number;
      // TODO: probably track will be received as full json not just number
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
