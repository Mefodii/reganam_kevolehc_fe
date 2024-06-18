import React from 'react';
import { toLocalDatetime } from '../../../util/datetime';
import {
  SVGCalendar,
  SVGCross,
  SVGLink,
  SVGListBullet,
  SVGMinus,
} from '../../../components/svg';
import { contentMusicItem as model } from '../../../models';
import ContentTrackRow from '../contentTracks/ContentTrackRow';

type ContentMusicItemRowProps = {
  contentMusicItem: Model.ContentMusicItemDM;
};
const ContentMusicItemRow: React.FC<ContentMusicItemRowProps> = ({
  contentMusicItem,
}) => {
  const { title, position, published_at, type, tracks, url } = contentMusicItem;

  const renderTypeSVG = () => {
    if (model.isPlaylist(contentMusicItem)) {
      return <SVGListBullet className='w-5' tooltip={type} />;
    }
    if (model.isSingle(contentMusicItem)) {
      return <SVGMinus className='w-5' tooltip={type} />;
    }
    if (model.isNotMusic(contentMusicItem)) {
      return <SVGCross className='w-5 text-error-1/80' tooltip={type} />;
    }
  };

  const renderIcons = () => {
    return (
      <div className='flex space-x-2 divide-x divide-active-1/20 justify-end mr-4'>
        {url && (
          <a href={url} target='_blank' rel='noreferrer'>
            <SVGLink
              className='w-4 ml-2 text-text-1/30 hover:text-text-1'
              tooltip={url}
            />
          </a>
        )}
        <SVGCalendar
          className='w-4 ml-2 text-text-1/30 hover:text-text-1'
          tooltip={toLocalDatetime(published_at)}
        />
      </div>
    );
  };

  // https://blog.logrocket.com/creating-react-context-menu/
  return (
    <div className=''>
      <div className='p-5 flex justify-between items-center py-3 hover:bg-theme-3/50'>
        <div className='w-10 text-text-1/20'>{renderTypeSVG()}</div>
        <div className='w-12 text-lg opacity-20 mr-4'>{position}</div>
        <div className='flex-3'>{title}</div>
        <div className='flex-1'>{renderIcons()}</div>
      </div>
      <div className={`${tracks.length > 0 ? 'pb-3' : ''}`}>
        {tracks.map((track, i) => (
          <ContentTrackRow contentTrack={track} key={i} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(ContentMusicItemRow);
