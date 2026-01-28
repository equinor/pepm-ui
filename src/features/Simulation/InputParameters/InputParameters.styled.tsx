import styled from 'styled-components';
import { spacings } from '../../../tokens/spacings';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.LARGE};
  padding: 0;
  background: transparent;
  width: fit-content;
  min-width: 55%;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Description = styled.div`
  background: #f7f7f7;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

export const DescriptionText = styled.p`
  margin: 0.5rem 0 0 0;
  color: #3d3d3d;
  line-height: 1.5;
`;

export const TemplateSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const TemplateName = styled.div`
  margin: 0.5rem 0;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 0.5rem;
  flex-wrap: nowrap;
`;
