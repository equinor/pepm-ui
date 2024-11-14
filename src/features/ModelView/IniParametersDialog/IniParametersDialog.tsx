import { Accordion, Button, Dialog, Table } from '@equinor/eds-core-react';
import { useState } from 'react';
import { AnalogueModelConfigurationDto } from '../../../api/generated';
import {
  IniDialogContent,
  IniParamAccordion,
  IniParamDialog,
  IniParamTable,
} from './IniParametersDialog.style';

export function IniParametersDialog(props: {
  iniParameters: AnalogueModelConfigurationDto;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleOpen}>
        See Parameters
      </Button>
      <IniParamDialog open={isOpen} isDismissable onClose={handleClose}>
        <Dialog.Header>
          <Dialog.Title>Ini Parameters</Dialog.Title>
        </Dialog.Header>
        <IniDialogContent scrollable>
          <IniParamAccordion>
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
                    <IniParamTable>
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
                          {Object.entries(parameter)
                            .filter(([key, value]) => value !== '')
                            .map(([key, value]) => (
                              <Table.Row key={key}>
                                <Table.Cell>{key}</Table.Cell>
                                <Table.Cell>{value}</Table.Cell>
                              </Table.Row>
                            ))}
                        </Table.Body>
                      </Table>
                    </IniParamTable>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
          </IniParamAccordion>
        </IniDialogContent>
        <Dialog.Actions>
          <Button onClick={handleClose}>Close</Button>
        </Dialog.Actions>
      </IniParamDialog>
    </>
  );
}
