import React from 'react';
import { NavLink } from 'react-router-dom';
import { LED, Table } from '../../../components/generic';
import { SVGDocumentText, SVGPencil } from '../../../components/svg';
import { useModal } from '../../../hooks';
import { FE_URL } from '../../../util/frontend-urls';
import { ContentListForm } from './ContentListForm';

type ContentListRowProps = {
  contentList: Model.ContentListPureDM;
};

export const ContentListRow = React.memo(
  ({ contentList }: ContentListRowProps) => {
    const { id, name, category, consumed, items_count } = contentList;
    const { openModal, closeModal } = useModal();

    const handleOpenContentListModal = () => {
      openModal(
        <ContentListForm
          formProps={{ formMode: 'UPDATE', item: contentList, scope: 'LIST' }}
          onSuccess={closeModal}
        />
      );
    };

    const renderActions = () => {
      return (
        <div className='flex justify-center divide-x divide-active-1/0 group-hover:divide-active-1/20'>
          <SVGPencil
            className='px-2 wiggling-clickable-group'
            svgClassName='w-5'
            tooltip='Edit'
            onClick={handleOpenContentListModal}
          />
          <NavLink to={`${FE_URL.CONTENTING}/content_list/${id}`}>
            <SVGDocumentText
              className='px-2 wiggling-clickable-group'
              svgClassName='w-5'
              tooltip='Show Items'
            />
          </NavLink>
        </div>
      );
    };

    return (
      <Table.TRow className='group'>
        <div className='w-10 flex justify-center mr-2'>
          <LED on={true} color={consumed ? 'Green' : 'Red'} />
        </div>
        <div className='flex-3'>{name}</div>
        <div className='flex-1'>{category}</div>
        <div className='flex-1 text-center'>{items_count}</div>
        <div className='flex-1'>{renderActions()}</div>
      </Table.TRow>
    );
  }
);
