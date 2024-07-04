import { BaseModel } from '../generic/model';

declare global {
  namespace Model {
    type ContentTrackSM = {
      id?: number;
      name: string;
      position: number;
      start_time: number | null;
      duration: number | null;
      comment: string;
      needs_edit: boolean;
      is_track: boolean;
      // TODO: (M) - create a Nullable Boolean SIngle Selector
      // TODO: (L) probably track will be received as full json not just number
      track: number | null;
    };
    type ContentTrackDM = ContentTrackSM & {
      id: number;
      content_item: number;
    };
    type ContentTrackProps = CreateProps | UpdateProps<ContentTrackDM>;
  }
}

class ContentTrackModel extends BaseModel<
  Model.ContentTrackProps,
  Model.ContentTrackSM,
  Model.ContentTrackDM
> {}

export const contentTrack = new ContentTrackModel();
