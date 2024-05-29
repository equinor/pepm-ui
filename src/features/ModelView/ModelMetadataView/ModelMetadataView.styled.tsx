import { Dialog, Table } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { spacings } from '../../../tokens/spacings';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  row-gap: ${spacings.XXX_LARGE};

  > button {
    width: fit-content;
  }
`;

export const Metadata = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.LARGE};
`;

export const MetadataInfo = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.MEDIUM};

  max-width: 60%;
`;

const DataTable = styled(Table)`
  min-width: 256px;
  width: 85%;
`;

export const DescriptionWrapper = styled.div`
  min-height: 200px;
`;

export const DataCell = styled(Table.Cell)`
  display: flex;
  flex-direction: row;
  align-items: center;

  > p {
    padding-right: 10px;
  }
`;

export const Actions = styled(Dialog.Actions)`
  display: flex;
  column-gap: ${spacings.SMALL};
`;

export { DataTable as Table };
