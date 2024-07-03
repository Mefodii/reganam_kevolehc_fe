import React, { useCallback, useMemo } from 'react';
import { SVGArrow } from '../svg';
import { useAppDispatch } from '../../hooks';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';

const PAGES_RANGE = 1;

const generateInnerRange = (
  currentPage: number,
  totalPages: number,
  range: number = PAGES_RANGE
): number[] => {
  if (currentPage > totalPages) {
    throw new Error(
      `Current page > total pages: ${currentPage} > ${totalPages}`
    );
  }

  const startPage = Math.max(2, currentPage - range);
  const endPage = Math.min(totalPages - 1, currentPage + range);
  let pageNumbers: number[] = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
  return pageNumbers;
};

const Dots: React.FC = React.memo(() => {
  return <div className='text-[9px] tracking-tighter'>...</div>;
});

type PaginationProps<T extends QParams.Page> = {
  pageInfo: PageInfo<T>;
  action: (params: T) => AsyncThunkAction<any, T, AsyncThunkConfig>;
};

const Pagination = <T extends QParams.Page>({
  pageInfo: { page, pages, nextParams, previousParams },
  action,
}: PaginationProps<T>) => {
  const dispatch = useAppDispatch();

  const changePage = useCallback(
    (params: T | null) => {
      if (!params) return;
      dispatch(action(params));
    },
    [dispatch, action]
  );

  const handlePageClick = useCallback(
    (page: number) => {
      const params = nextParams || previousParams;
      if (!params) return;

      changePage({ ...params, page });
    },
    [nextParams, previousParams, changePage]
  );

  const generatePage = useCallback(
    (pageNr: number, selected: boolean) => (
      <div
        className={`px-2 border-t-2 border-b-2 ${
          selected
            ? 'rounded-md border-active-1/70 text-text-1'
            : 'rounded-full border-active-1/0 hover:bg-theme-3 hover:text-active-1 cursor-pointer active:bg-theme-5'
        }`}
        key={pageNr}
        onClick={selected ? undefined : () => handlePageClick(pageNr)}
      >
        {pageNr}
      </div>
    ),
    [handlePageClick]
  );

  const pagesSet = useMemo(() => {
    const firstPage = generatePage(1, page === 1);
    const lastPage =
      pages > 1 ? generatePage(pages, page === pages) : undefined;

    const range = generateInnerRange(page, pages);
    const dotsBefore = page - PAGES_RANGE > 2 ? <Dots /> : undefined;
    const dotsAfter = page + PAGES_RANGE < pages - 1 ? <Dots /> : undefined;
    return (
      <div className='flex space-x-2 items-baseline'>
        {firstPage}
        {dotsBefore}
        {range.map((p) => generatePage(p, page === p))}
        {dotsAfter}
        {lastPage}
      </div>
    );
  }, [page, pages, generatePage]);

  return (
    <div className='flex items-center space-x-2 text-text-1/60 w-full justify-center'>
      <div
        className={`rounded-full p-2 ${
          previousParams
            ? 'cursor-pointer hover:text-active-1 hover:bg-theme-3 active:bg-theme-5'
            : ''
        }`}
        onClick={() => changePage(previousParams)}
      >
        <SVGArrow className='w-3 -rotate-180' />
      </div>

      {pagesSet}

      <div
        className={`rounded-full p-2 ${
          nextParams
            ? 'cursor-pointer hover:text-active-1 hover:bg-theme-3 active:bg-theme-5'
            : ''
        }`}
        onClick={() => changePage(nextParams)}
      >
        <SVGArrow className='w-3' />
      </div>
    </div>
  );
};

export default React.memo(Pagination) as typeof Pagination;
