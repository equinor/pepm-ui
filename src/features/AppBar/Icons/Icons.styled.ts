import styled from 'styled-components';
import { spacings } from '../../../tokens/spacings';
import { theme } from '../../../tokens/theme';

export const Icons = styled.div`
  display: flex;
  gap: ${spacings.SMALL};

  /* Remove interaction hints since this is no longer a menu */
  .menu-item:hover {
    background: white;
    cursor: default;
  }

  .user-info {
    display: flex;
    flex-direction: column;
    row-gap: ${spacings.X_SMALL};
    list-style: none;
    line-height: 1.5;
    margin: 0;
    padding: 0;

    .name {
      font-weight: 700;
    }

    .role {
      color: ${theme.light.text.staticIconsTertiary};
    }
  }
`;
