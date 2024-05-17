import VideoItem from './VideoItem';
import { LoadingOverlay } from '../../../components/generic';

type VideoListProps = {
  watchingType: string;
  videos: Model.VideoDM[];
  isLoading: boolean;
};

const VideoList: React.FC<VideoListProps> = ({
  watchingType,
  videos,
  isLoading,
}) => {
  return (
    <div className='relative max-h-200 overflow-y-auto mt-4 border-t-2 border-theme-3'>
      <LoadingOverlay loading={isLoading} />
      {videos.map((video) => (
        <VideoItem
          video={video}
          key={video.id}
          watchingType={watchingType}
        ></VideoItem>
      ))}
    </div>
  );
};

export default VideoList;
