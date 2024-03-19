import React, { FC } from 'react';

interface PaginationProps {
  nextPage: () => void;
  prevPage: () => void;
  pages: number[];
  gotoPage: (page: number) => void;
  index: number;
  pageCount: number;
  pageSize: number;
}

const Number: FC<any> = ({ page, gotoPage, index, arrayIndex }) => {
  const isActive = index === arrayIndex;
  return (
    <div
      className={`flex justify-center items-center rounded-md w-9 h-9 cursor-pointer ${
        isActive ? 'bg-indigo-600 text-white' : ''
      }`}
      onClick={() => gotoPage(page)}
    >
      <a
        className={`float-left w-full h-full flex justify-center items-center ${
          isActive ? 'rounded-md' : ''
        }`}
      >
        {page + 1}
      </a>
    </div>
  );
};

const PaginationArrows: FC<any> = ({ prevPage, nextPage, children }) => {
  return (
    <div className="flex flex-row items-center justify-end">
      {/* <ChevronLeftIcon width={20} onClick={() => prevPage()} /> */}
      <div className="mr-2.5" />
      {children}
      <div className="ml-2.5" />
      {/* <ChevronRightIcon width={20} onClick={() => nextPage()} /> */}
    </div>
  );
};

const FrontPagination: FC<any> = ({
  pages,
  prevPage,
  gotoPage,
  nextPage,
  index,
  pageCount,
}) => {
  return (
    <PaginationArrows nextPage={nextPage} prevPage={prevPage}>
      {pages.map((page: any, i: any) => {
        return (
          <>
            {page + 1 > 5 ? null : (
              <Number
                page={page}
                gotoPage={gotoPage}
                index={index}
                arrayIndex={i}
                key={i}
              />
            )}
            {page + 1 === 6 && <p className="mx-2.5">...</p>}
            {page + 1 === pageCount ? (
              <Number
                page={page}
                gotoPage={gotoPage}
                index={index}
                arrayIndex={i}
                key={i}
              />
            ) : null}
          </>
        );
      })}
    </PaginationArrows>
  );
};

const RearPagination: FC<any> = ({
  pages,
  prevPage,
  gotoPage,
  nextPage,
  index,
  pageCount,
}) => {
  return (
    <PaginationArrows nextPage={nextPage} prevPage={prevPage}>
      {pages.map((page: any, i: any) => {
        return (
          <>
            {page + 1 > 1 ? null : (
              <Number
                page={page}
                gotoPage={gotoPage}
                index={index}
                arrayIndex={i}
                key={i}
              />
            )}
            {page + 1 === 6 && <p className="mx-2.5">...</p>}
            {page + 1 > pageCount - 5 ? (
              <Number
                page={page}
                gotoPage={gotoPage}
                index={index}
                arrayIndex={i}
                key={i}
              />
            ) : null}
          </>
        );
      })}
    </PaginationArrows>
  );
};

const MidPagination: FC<any> = ({
  pages,
  prevPage,
  gotoPage,
  nextPage,
  index,
  pageCount,
}) => {
  const slicedPages = pages
    .map((page: any) => page)
    .slice(index - 2, index + 3);
  return (
    <PaginationArrows nextPage={nextPage} prevPage={prevPage}>
      {
        <>
          <Number
            page={pages[0]}
            gotoPage={gotoPage}
            index={index}
            arrayIndex={pages[0]}
          />
          <p className="mx-2.5">...</p>
          {slicedPages.map((page: any, i: any) => {
            return (
              <Number
                page={page}
                gotoPage={gotoPage}
                index={index}
                arrayIndex={page}
                key={i}
              />
            );
          })}
          <p className="mx-2.5">...</p>
          <Number
            page={pages.length - 1}
            gotoPage={gotoPage}
            index={index}
            arrayIndex={pages.length - 1}
          />
        </>
      }
    </PaginationArrows>
  );
};

const paginationLogic = (
  pages: any,
  prevPage: any,
  gotoPage: any,
  nextPage: any,
  index: any,
  pageCount: any
) => {
  if (index + 1 < 5) {
    return (
      <FrontPagination
        pages={pages}
        prevPage={prevPage}
        gotoPage={gotoPage}
        nextPage={nextPage}
        index={index}
        pageCount={pageCount}
      />
    );
  }
  if (index + 1 > 4 && index + 1 < pageCount - 3) {
    return (
      <MidPagination
        pages={pages}
        prevPage={prevPage}
        gotoPage={gotoPage}
        nextPage={nextPage}
        index={index}
        pageCount={pageCount}
      />
    );
  }
  if (index + 1 > pageCount - 4) {
    return (
      <RearPagination
        pages={pages}
        prevPage={prevPage}
        gotoPage={gotoPage}
        nextPage={nextPage}
        index={index}
        pageCount={pageCount}
      />
    );
  }
  return null;
};

export const Pagination = ({
  prevPage,
  nextPage,
  pages,
  gotoPage,
  index,
  pageCount,
  pageSize,
}: PaginationProps) => {
  return pageCount > 10 ? (
    paginationLogic(pages, prevPage, gotoPage, nextPage, index, pageCount)
  ) : (
    <PaginationArrows nextPage={nextPage} prevPage={prevPage}>
      {pages.map((page, i) => {
        return (
          <Number
            page={page}
            gotoPage={gotoPage}
            index={index}
            arrayIndex={i}
            key={i}
          />
        );
      })}
    </PaginationArrows>
  );
};
