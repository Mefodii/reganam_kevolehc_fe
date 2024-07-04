import React from 'react';
import ContentWatcherRow from './ContentWatcherRow';
import { SVGInfoCircle } from '../../../components/svg';
import { Table } from '../../../components/generic';

type ContentWatcherTableProps = {
  contentWatchers: Model.ContentWatcherDM[];
};

const renderTableHeader = () => {
  // TODO: (L) - Add a Select panel - run check updates for selected rows
  return (
    <Table.THead>
      <div className='w-10 flex justify-center mr-2'>
        <SVGInfoCircle className='w-5' tooltip='Consumed' />
      </div>
      <div className='flex-3'>Name</div>
      <div className='flex-1'>Cat.</div>
      <div className='flex-1'>Type</div>
      <div className='flex-1 text-center'>Count</div>
      <div className='flex-1 text-center'>Download</div>
      <div className='flex-1 text-center'>Qual.</div>
      <div className='flex-1'>Ext.</div>
      <div className='flex-2'>Status</div>
      <div className='flex-2'>Check Date</div>
      <div className='flex-1 text-center'>Actions</div>
    </Table.THead>
  );
};

const ContentWatcherTable: React.FC<ContentWatcherTableProps> = ({
  contentWatchers,
}) => {
  return (
    <Table.TContainer className='max-h-220'>
      {renderTableHeader()}
      <Table.TBody>
        {contentWatchers.map((contentWatcher, i) => (
          <ContentWatcherRow key={i} contentWatcher={contentWatcher} />
        ))}
      </Table.TBody>
    </Table.TContainer>
  );
};

export default React.memo(ContentWatcherTable) as typeof ContentWatcherTable;
