import React from 'react';
import { Table } from '../../../components/generic';
import { SVGInfoCircle } from '../../../components/svg';
import { ContentListRow } from './ContentListRow';

type ContentListTableProps = {
  contentLists: Model.ContentListPureDM[];
};

const renderTableHeader = () => {
  return (
    <Table.THead>
      <div className='w-10 flex justify-center mr-2'>
        <SVGInfoCircle className='w-5' tooltip='Consumed' />
      </div>
      <div className='flex-3'>Name</div>
      <div className='flex-1'>Category</div>
      <div className='flex-1 text-center'>Count</div>
      <div className='flex-1 text-center'>Actions</div>
    </Table.THead>
  );
};

export const ContentListTable = React.memo(
  ({ contentLists }: ContentListTableProps) => {
    return (
      <Table.TContainer className='max-h-220'>
        {renderTableHeader()}
        <Table.TBody>
          {contentLists.map((contentList, i) => (
            <ContentListRow key={i} contentList={contentList} />
          ))}
        </Table.TBody>
      </Table.TContainer>
    );
  }
);
