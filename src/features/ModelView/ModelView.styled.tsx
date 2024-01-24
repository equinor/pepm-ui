import styled from 'styled-components';
import { spacings } from '../../tokens/spacings';

export const MetadataWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: calc(100% - 75.5px);
  width: 100%;
  padding: ${spacings.X_LARGE};
  row-gap: ${spacings.XXX_LARGE};
  column-gap: ${spacings.X_LARGE};

  @media (max-width: 1350px) {
    flex-direction: column;
  }
`;
export const InnerMetadataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.XXX_LARGE};
  width: 80%;

  .source-view {
    width: 100%;
    min-width: 256px;
    max-width: 100%;

    > table {
      width: 85%;

      > thead,
      tbody {
        > tr {
          > .table-row {
          }

          > .table-first-col {
            width: 80%;
            padding-right: ${spacings.X_LARGE};
          }
        }
      }
    }
  }
`;
