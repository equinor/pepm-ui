import styled from 'styled-components';
import { spacings } from '../../../../tokens/spacings';
import { theme } from '../../../../tokens/theme';

export const CaseResultView = styled.div`
  display: flex;
  flex-direction: column;

  row-gap: ${spacings.MEDIUM};
  padding-left: ${spacings.LARGE};
  padding-bottom: ${spacings.LARGE};

  > h2 {
    margin-bottom: ${spacings.SMALL};
  }
  > h3 {
    margin: ${spacings.SMALL};
  }
`;

export const CaseResultList = styled.div`
  display: flex;
  flex-direction: column;

  row-gap: ${spacings.LARGE};
`;

export const CaseResultCard = styled.div`
  display: flex;
  flex-direction: row;
  row-gap: ${spacings.LARGE};

  width: 60vw;
  padding: ${spacings.X_LARGE};

  border-radius: ${spacings.CARD_ROUNDED};
  box-shadow: ${theme.light.ui.elevation.raised};

  > div {
    width: 50%;
  }
`;
export const CaseResultStatus = styled.div`
  display: flex;
  flex-direction: column;

  padding: ${spacings.SMALL};
  row-gap: ${spacings.SMALL};
`;

export const CaseLeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.LARGE};

  > table {
    width: 80%;
  }
`;

export const CaseStatusDisplay = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: ${spacings.LARGE};
`;

export const CaseStatusButtons = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: ${spacings.SMALL};
  padding-top: ${spacings.SMALL};

  > button {
    width: ${spacings.COMPUTE_BUTTON};
  }
`;
