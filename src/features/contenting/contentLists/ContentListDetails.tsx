import React from 'react';
import { SVGPencil } from '../../../components/svg';
import ContentListForm from './ContentListForm';
import { useModal } from '../../../hooks';

type ContentListDetailsProps = {
  contentList: Model.ContentListDM;
};

const ContentListDetails: React.FC<ContentListDetailsProps> = ({
  contentList,
}) => {
  const { name, category, items_count } = contentList;

  const { openModal, closeModal } = useModal();

  const handleOpenContentListModal = () => {
    openModal(
      <ContentListForm
        formProps={{
          formMode: 'UPDATE',
          item: contentList,
          scope: 'DETAILS',
        }}
        onSuccess={closeModal}
      />
    );
  };

  const renderActions = () => {
    return (
      <div className='flex divide-x divide-active-1/0 group-hover:divide-active-1/20'>
        <SVGPencil
          className='px-2 wiggling-clickable-group'
          svgClassName='w-5'
          tooltip='Edit'
          onClick={handleOpenContentListModal}
        />
      </div>
    );
  };

  return (
    <div className='flex flex-col bg-theme-2 border border-theme-2 justify-between items-center p-3 rounded-md group'>
      <div className='flex flex-wrap justify-between w-full py-2'>
        <div className='text-3xl ml-4 border-b-2 border-active-1/30 min-w-120'>
          {name}
        </div>
        <div className='space-y-2 text-center w-20 border-b-2 border-active-1/30'>
          <div className='text-xs'>Category</div>
          <div className='font-bold'>{category}</div>
        </div>
        <div className='space-y-2 text-center w-20 border-b-2 border-active-1/30'>
          <div className='text-xs'>Count</div>
          {/* TODO: (M) - update this fields after change in ContentItemTable.
           Probably will need to refetch data when create / delete content item*/}
          <div className='font-bold'>{items_count}</div>
        </div>
        <div className='flex flex-col items-end space-y-2 text-center border-b-2 border-active-1/30 w-52'>
          <div>{renderActions()}</div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ContentListDetails) as typeof ContentListDetails;
