import { Button } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

const VISIBLE_PAGE_NUM_COUNT = 5;

interface IPaginationProps {
  className?: string;
  activePage: number;
  itemsCountPerPage: number;
  totalItemsCount: number;
  onChange(page: number): void;
}
const Pagination: React.FC<IPaginationProps> = ({
  className,
  activePage,
  itemsCountPerPage,
  totalItemsCount,
  onChange,
}) => {
  const numButtonsHtml: React.ReactNode[] = [];
  const visiblePageCountToOneSide = Math.floor((VISIBLE_PAGE_NUM_COUNT - 1) / 2);
  const totalPagesCount = Math.ceil(totalItemsCount / itemsCountPerPage);
  const firstPageNum = Math.max(1, activePage - visiblePageCountToOneSide);
  const lastPageNum = Math.min(totalPagesCount, activePage + visiblePageCountToOneSide);
  for (let i = firstPageNum; i <= lastPageNum; i++) {
    numButtonsHtml.push((
      <ButtonWithNum
        key={i}
        variant="contained"
        color={i === activePage ? 'secondary' : undefined}
        onClick={() => onChange(i)}
      >
        {i}
      </ButtonWithNum>
    ));
  }

  return (
    <StyledWrap className={className}>
      <ButtonWithText disabled={activePage === 1} variant="contained" onClick={() => onChange(1)}>
        {'<< First'}
      </ButtonWithText>
      <ButtonWithText
        disabled={activePage === 1}
        variant="contained"
        onClick={() => onChange(activePage - 1)}
      >
        {'< Prev'}
      </ButtonWithText>
      {numButtonsHtml}
      <ButtonWithText
        disabled={activePage === totalPagesCount}
        variant="contained"
        onClick={() => onChange(activePage + 1)}
      >
        {'Next >'}
      </ButtonWithText>
      <ButtonWithText
        disabled={activePage === totalPagesCount}
        variant="contained"
        onClick={() => onChange(totalPagesCount)}
      >
        {'Last >>'}
      </ButtonWithText>
    </StyledWrap>
  );
};
export default Pagination;

const StyledWrap = styled.div`
  & > *:not(:last-child) {
    margin-right: 20px;
  }
`;

const ButtonWithText = styled(Button)`
  min-width: 100px;
`;

const ButtonWithNum = styled(Button)`
  min-width: auto;
`;
