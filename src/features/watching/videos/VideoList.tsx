import VideoItem from './VideoItem';
import { LoadingOverlay } from '../../../components/generic';

type VideoListProps = {
  videos: Model.VideoDM[];
  isLoading: boolean;
};

// TODO: (M) - display with Table components
const VideoList: React.FC<VideoListProps> = ({ videos, isLoading }) => {
  return (
    <div className='relative max-h-200 overflow-y-auto mt-4 border-t-2 border-theme-3'>
      <LoadingOverlay loading={isLoading} />
      {videos.map((video) => (
        <VideoItem video={video} key={video.id}></VideoItem>
      ))}
    </div>
  );
};

export default VideoList;
