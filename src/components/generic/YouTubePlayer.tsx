import React from 'react';

type YouTubePlayerProps = {
  title: string;
  videoId: string;
};

const EMBED_BASE_URL = 'https://www.youtube.com/embed/';

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId, title }) => {
  return (
    <div>
      <iframe
        width='100%'
        height='630'
        src={`${EMBED_BASE_URL}${videoId}`}
        title={title}
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default React.memo(YouTubePlayer) as typeof YouTubePlayer;
