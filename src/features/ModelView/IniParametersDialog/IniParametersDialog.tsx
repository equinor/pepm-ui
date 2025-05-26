/* eslint-disable max-lines-per-function */
import { useState } from 'react';
import {
  AnalogueModelConfigurationDto,
  ConfigurationArchelDto,
  ConfigurationParameterDto,
} from '../../../api/generated';
import { IniDialogContent, IniParamDialog } from './IniParametersDialog.style';
import { Accordion, Button, Dialog, Table } from '@equinor/eds-core-react';

export const IniParametersDialog = (props: {
  iniParameters: AnalogueModelConfigurationDto;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const ArchelArray = Array<ConfigurationArchelDto>;

  function isArchelArray(
    arg: string | Array<ConfigurationArchelDto> | ConfigurationParameterDto,
  ): boolean {
    if (arg instanceof ArchelArray) return true;
    else return false;
  }

  return (
    <>
      <Button variant="outlined" onClick={handleOpen}>
        See parameters
      </Button>
      <IniParamDialog open={isOpen} isDismissable onClose={handleClose}>
        <Dialog.Header>
          <Dialog.Title>Ini parameters</Dialog.Title>
        </Dialog.Header>
        <IniDialogContent scrollable>
          <Accordion>
            {Object.entries(props.iniParameters)
              .filter(([key, value]) => typeof value !== 'string')
              .map(([key, parameter]) => (
                <Accordion.Item key={key}>
                  <Accordion.Header>
                    {key.charAt(0).toUpperCase() +
                      String(key)
                        .slice(1)
                        .replace(/([A-Z][a-z])/g, ' $1')
                        .trim()}
                  </Accordion.Header>
                  <Accordion.Panel>
                    <Table>
                      <Table.Head>
                        <Table.Row>
                          <Table.Cell key={`head-name-${key.toString}`}>
                            Name
                          </Table.Cell>
                          <Table.Cell key={`head-value-${key.toString}`}>
                            Value
                          </Table.Cell>
                        </Table.Row>
                      </Table.Head>
                      <Table.Body>
                        {!isArchelArray(parameter) &&
                          Object.entries(parameter)
                            .filter(([key, value]) => value !== '')
                            .map(([key, value]) => (
                              <Table.Row key={key}>
                                <Table.Cell>{key}</Table.Cell>
                                <Table.Cell>{value}</Table.Cell>
                              </Table.Row>
                            ))}
                        {Array.isArray(parameter) &&
                          parameter.map((element) => (
                            <Table.Row
                              key={element.analogueModelConfigurationArchelId}
                            >
                              <Table.Cell>{element.name}</Table.Cell>
                              <Table.Cell>{element.value}</Table.Cell>
                            </Table.Row>
                          ))}
                      </Table.Body>
                    </Table>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
          </Accordion>
        </IniDialogContent>
        <Dialog.Actions>
          <Button onClick={handleClose}>Close</Button>
        </Dialog.Actions>
      </IniParamDialog>
    </>
  );
};
