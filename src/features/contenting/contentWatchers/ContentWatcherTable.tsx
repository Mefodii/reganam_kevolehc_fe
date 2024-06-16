import React from 'react';
import ContentWatcherRow from './ContentWatcherRow';

type ContentWatcherTableProps = {
  contentWatchers: Model.ContentWatcherDM[];
};

const renderTableHeader = () => {
  return (
    <div className='flex text-lg font-bold border-b-2 border-active-1/80 mb-2 pb-1'>
      <div className='flex-3'>Name</div>
      <div className='flex-1'>Category</div>
      <div className='flex-1'>Type</div>
      <div className='flex-1'>Count</div>
      <div className='flex-1 text-center'>Download</div>
      <div className='flex-1 text-center'>Qual.</div>
      <div className='flex-1'>Ext.</div>
      <div className='flex-2'>Status</div>
      <div className='flex-2'>Check Date</div>
      <div className='flex-1'>Actions</div>
    </div>
  );
};
// TODO: Add a Select panel
const ContentWatcherTable: React.FC<ContentWatcherTableProps> = ({
  contentWatchers,
}) => {
  return (
    <div className='p-5 bg-theme-1 border border-theme-3 rounded-lg shadow-2xl shadow-active-1/5 font-mono'>
      {renderTableHeader()}
      <div className='divide-y divide-active-1/10'>
        {contentWatchers.map((contentWatcher, i) => (
          <ContentWatcherRow key={i} contentWatcher={contentWatcher} />
        ))}
      </div>
    </div>
  );
};

export default ContentWatcherTable;
