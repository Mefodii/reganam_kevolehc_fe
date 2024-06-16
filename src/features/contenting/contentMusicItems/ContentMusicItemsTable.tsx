import React from 'react';
import ContentMusicItemRow from './ContentMusicItemRow';
import { Table } from '../../../components/generic';

type ContentMusicItemTableProps = {
  contentMusicItems: Model.ContentMusicItemDM[];
};

const renderUtilityPanel = (): React.ReactNode => {
  // TODO: Select rows, copy buttons (title, url, publish), import from txt, show hidden fields
  return (
    <div className='m-5 flex text-lg font-bold border-b-2 border-active-1/80 mb-2 pb-1 text-text-1/20'>
      TBD Utility Panel (select multiple, show urls, show publish date, import
      from txt)
    </div>
  );
};

const ContentMusicItemTable: React.FC<ContentMusicItemTableProps> = ({
  contentMusicItems,
}) => {
  return (
    <Table.TContainer>
      {renderUtilityPanel()}
      <Table.TBody>
        {contentMusicItems.map((contentMusicItem, i) => (
          <ContentMusicItemRow key={i} contentMusicItem={contentMusicItem} />
        ))}
      </Table.TBody>
    </Table.TContainer>
  );
};

export default ContentMusicItemTable;
