import { Link, Paper, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import moment from 'moment';
import React from 'react';
import styled, { css } from 'styled-components';
import { IIncident } from '../../../../api/api';
import bikePhotoPlaceholder from './bike_photo_placeholder.svg';

interface IIncidentItemProps {
  className?: string;
  data: IIncident;
}
const IncidentItem: React.FC<IIncidentItemProps> = ({ className, data }) => {
  const descriptionHtml = !!data.description && (
    <StyledDescriptionWrap>
      {data.description}
    </StyledDescriptionWrap>
  );

  const occurredDate = moment(data.occurred_at).format('LL');
  const reportedDate = moment(data.updated_at).format('LL');
  const reportedDateHtml = (occurredDate !== reportedDate) && ` (Reported on ${reportedDate})`;

  return (
    <StyledWrap className={className}>
      <StyledPhoto
        isPlaceholder={!data.media.image_url_thumb}
        src={data.media.image_url_thumb || bikePhotoPlaceholder}
        alt="bike"
      />
      <div>
        <StyledTitleWrap>
          <Link variant="h5" href={data.source.html_url} target="_blank" rel="noopener">
            {data.title}
          </Link>
        </StyledTitleWrap>
        {descriptionHtml}
        <Typography>{data.address} - {occurredDate} {reportedDateHtml}</Typography>
      </div>
    </StyledWrap>
  );
};
export default IncidentItem;

const StyledWrap = styled(Paper)`
  display: flex;
  align-items: flex-start;
  padding: 20px;
`;

interface IStyledPhotoProps {
  isPlaceholder: boolean;
}
const photoSize = '250px';
const StyledPhoto = styled.img<IStyledPhotoProps>`
  flex-shrink: 0;
  margin-right: 20px;
  width: ${photoSize};
  height: ${photoSize};
  background-color: ${grey[300]};
  
  ${props => props.isPlaceholder && css`
    padding: 20px;
  `}
`;

const StyledTitleWrap = styled.div`
  margin-bottom: 10px;
`;

const StyledDescriptionWrap = styled(Typography)`
  margin-bottom: 10px;
`;
