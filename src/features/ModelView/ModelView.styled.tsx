import styled from 'styled-components'
import { spacings } from '../../tokens/spacings'

export const MetadataWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding: ${spacings.X_LARGE};
  row-gap: ${spacings.XXX_LARGE};
  column-gap: ${spacings.X_LARGE};
  overflow-y: scroll;

  @media (max-width: 1350px) {
    flex-direction: column;
  }
`
export const InnerMetadataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.XXX_LARGE};

  .edit-metadata-button {
    margin-top: 12px;
  }

  .metadata-view {
    width: 100%;
    min-width: 256px;

    > div {
      > table {
        width: 480px;

        > tbody {
          > tr {
            > .table-row {
            }

            > .table-first-col {
              width: 80px;
              padding-right: ${spacings.X_LARGE};
            }
          }
        }
      }
    }
  }

  .source-view {
    width: 100%;
    min-width: 256px;
    max-width: 640px;

    > table {
      width: 480px;

      > thead,
      tbody {
        > tr {
          > .table-row {
          }

          > .table-first-col {
            width: 376px;
            padding-right: ${spacings.X_LARGE};
          }
        }
      }
    }
  }
`
