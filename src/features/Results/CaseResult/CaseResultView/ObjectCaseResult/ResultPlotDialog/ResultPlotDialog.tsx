/* eslint-disable max-lines-per-function */
import { Button, Dialog, Label, Radio } from '@equinor/eds-core-react';
import { ChangeEvent, useEffect, useState } from 'react';
import { GetObjectResultsDto } from '../../../../../../api/generated';
import { ExtendedPrecetile, GraphPlot } from '../GraphPlot/GraphPlot';
import { ResultCaseMetadata } from '../ResultArea/ResultCaseMetadata/ResultCaseMetadata';
import * as Styled from './ResultPlotDialog.styled';

export const ResultPlotDialog = ({
  open,
  computeMethod,
  modelArea,
  data,
  toggleOpen,
}: {
  open: boolean;
  computeMethod?: string;
  modelArea: string;
  data: GetObjectResultsDto;
  toggleOpen: () => void;
}) => {
  const [selectedValue, setSelectedValue] = useState('width');
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };
  const [precentilesMinMax, setPrecentilesMinMax] =
    useState<ExtendedPrecetile>();

  // Trigger chart resize after dialog opens
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    if (selectedValue === 'height') {
      setPrecentilesMinMax({
        min: data.height.min,
        p10: data.height.percentiles.p10,
        p20: data.height.percentiles.p20,
        p30: data.height.percentiles.p30,
        p40: data.height.percentiles.p40,
        p50: data.height.percentiles.p50,
        p60: data.height.percentiles.p60,
        p70: data.height.percentiles.p70,
        p80: data.height.percentiles.p80,
        p90: data.height.percentiles.p90,
        max: data.height.max,
      });
    } else if (selectedValue === 'width') {
      setPrecentilesMinMax({
        min: data.width.min,
        p10: data.width.percentiles.p10,
        p20: data.width.percentiles.p20,
        p30: data.width.percentiles.p30,
        p40: data.width.percentiles.p40,
        p50: data.width.percentiles.p50,
        p60: data.width.percentiles.p60,
        p70: data.width.percentiles.p70,
        p80: data.width.percentiles.p80,
        p90: data.width.percentiles.p90,
        max: data.width.max,
      });
    } else if (selectedValue === 'length') {
      setPrecentilesMinMax({
        min: data.length.min,
        p10: data.length.percentiles.p10,
        p20: data.length.percentiles.p20,
        p30: data.length.percentiles.p30,
        p40: data.length.percentiles.p40,
        p50: data.length.percentiles.p50,
        p60: data.length.percentiles.p60,
        p70: data.length.percentiles.p70,
        p80: data.length.percentiles.p80,
        p90: data.length.percentiles.p90,
        max: data.length.max,
      });
    }
  }, [selectedValue, data]);

  return (
    <>
      <Styled.GraphDialog open={open}>
        <Dialog.Header>
          <Dialog.Title></Dialog.Title>
        </Dialog.Header>
        <Styled.Content>
          <ResultCaseMetadata
            computeMethod={computeMethod}
            modelArea={modelArea}
          />
          <div>
            <Label label="X-axis"></Label>
            <Styled.RadioGroup>
              <Styled.RadioButton>
                <Radio
                  id="radio-1"
                  value="width"
                  checked={selectedValue === 'width'}
                  onChange={onChange}
                />
                <Label htmlFor="radio-1" label="width" />
              </Styled.RadioButton>
              <Styled.RadioButton>
                <Radio
                  id="radio-2"
                  value="height"
                  checked={selectedValue === 'height'}
                  onChange={onChange}
                />
                <Label htmlFor="radio-2" label="height" />
              </Styled.RadioButton>
              <Styled.RadioButton>
                <Radio
                  id="radio-3"
                  value="length"
                  checked={selectedValue === 'length'}
                  onChange={onChange}
                />
                <Label htmlFor="radio-3" label="length" />
              </Styled.RadioButton>
            </Styled.RadioGroup>
            <GraphPlot
              data={precentilesMinMax}
              mode={computeMethod + ' ' + selectedValue}
            />
          </div>
        </Styled.Content>
        <Dialog.Actions>
          <Button variant="outlined" onClick={toggleOpen}>
            Close
          </Button>
        </Dialog.Actions>
      </Styled.GraphDialog>
    </>
  );
};
