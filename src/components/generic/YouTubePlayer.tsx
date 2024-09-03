import React from 'react';

type YouTubePlayerProps = {
  title: string;
  videoId: string;
};

const EMBED_BASE_URL = 'https://www.youtube.com/embed/';

export const YouTubePlayer = React.memo(
  ({ videoId, title }: YouTubePlayerProps) => {
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
  }
);
