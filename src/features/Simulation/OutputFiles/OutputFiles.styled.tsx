import styled from 'styled-components';
import { spacings } from '../../../tokens/spacings';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${spacings.MEDIUM};
  padding: ${spacings.LARGE};
  background: white;
  border-radius: 4px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  min-width: 300px;
`;

export const FileList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${spacings.X_SMALL};
  max-height: 500px;
  overflow-y: auto;
  width: 100%;
`;

export const FileItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${spacings.X_SMALL} ${spacings.SMALL};
  background: #f7f7f7;
  border-radius: 4px;
  transition: background 0.2s;

  &:hover {
    background: #ebebeb;
  }
`;

export const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
`;

export const FileName = styled.span`
  font-weight: 500;
  font-size: 0.875rem;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const FileDetails = styled.span`
  font-size: 0.75rem;
  color: #666;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${spacings.SMALL};
  align-items: center;
`;

export const EmptyState = styled.div`
  padding: ${spacings.LARGE};
  text-align: center;
  color: #666;
`;

export const ErrorMessage = styled.div`
  padding: ${spacings.MEDIUM};
  background: #fff3cd;
  border: 1px solid #ffc107;
  border-radius: 4px;
  color: #856404;
`;
