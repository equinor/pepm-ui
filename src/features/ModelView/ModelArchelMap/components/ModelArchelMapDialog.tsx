import { useState } from 'react';
import { Button, Dialog, Typography } from '@equinor/eds-core-react';
import * as StyledDialog from '../../../../styles/addRowDialog/AddRowDialog.styled';
import { ArchelDialogWrapper } from '../ModelArchelMap.styled';
import { ModelArchelMapSelectTable } from './ModelArchelMapSelectTable';
import { CustomPutArchelRequest } from '../types/CustomPutArchelRequest';
import {
  GetAnalogueModelQueryResponse,
  ListComputeSettingsQueryResponse,
  putApiV1AnalogueModelsByAnalogueModelIdConfigurationByArchelIdArchelMap,
} from '../../../../api';
import { useMutation } from '@tanstack/react-query';
import { usePepmContextStore } from '../../../../stores/GlobalStore';
import { useErrorStore } from '../../../../stores/ErrorStore';
import { queryClient } from '../../../../auth/queryClient';
import { useIsOwnerOrAdmin } from '../../../../hooks/useIsOwnerOrAdmin';
/* eslint-disable max-lines-per-function */

export const ModelArchelMapDialog = () => {
  const isOwnerOrAdmin = useIsOwnerOrAdmin();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedArchelMaps, setSelectedArchelMaps] = useState(
    [] as CustomPutArchelRequest[],
  );
  const { analogueModel, setAnalogueModel, setComputeSettings } =
    usePepmContextStore();
  const { addError } = useErrorStore();

  const putArchelMap = useMutation({
    mutationFn: async (requestBatch: CustomPutArchelRequest[]) => {
      const result = await Promise.allSettled(
        requestBatch.map(async (req) => {
          try {
            return putApiV1AnalogueModelsByAnalogueModelIdConfigurationByArchelIdArchelMap(
              {
                body: { smdaGeologyStandardId: req.geologyStandardId },
                path: {
                  analogueModelId: analogueModel.analogueModelId,
                  archelId: req.archelId,
                },
              },
            );
          } catch (error) {
            addError(`Failed to add mapping for archel. ${req.archelId}`);
          }
        }),
      );
      return await result;
    },
    onSuccess: () => {
      queryClient
        .fetchQuery({
          queryKey: ['analogue-model', analogueModel.analogueModelId],
        })
        .then((res) => {
          const response = res as GetAnalogueModelQueryResponse;
          if (response.success) setAnalogueModel(response.data);
          setSelectedArchelMaps([]);
        });
      queryClient
        .fetchQuery({
          queryKey: ['compute-settings', analogueModel.analogueModelId],
        })
        .then((res) => {
          const response = res as ListComputeSettingsQueryResponse;
          if (response.success) setComputeSettings(response.data);
        });
    },
    onError: (error: string) => {
      addError(error);
      setSelectedArchelMaps([]);
    },
  });

  const handleClose = () => {
    setIsOpen(false);
    setSelectedArchelMaps([]);
  };
  const handleSaveClose = () => {
    putArchelMap.mutate(selectedArchelMaps);
    setIsOpen(false);
  };
  const handleOpen = () => {
    setIsOpen(true);
  };
  return (
    <div>
      {isOwnerOrAdmin && (
        <Button
          aria-haspopup="dialog"
          color="primary"
          variant="outlined"
          onClick={handleOpen}
        >
          Map architectural elements
        </Button>
      )}
      <ArchelDialogWrapper
        open={isOpen}
        onClose={handleClose}
        isDismissable={false}
      >
        <Dialog.Header>
          <Dialog.Title>Define architectural elements mapping</Dialog.Title>
        </Dialog.Header>
        <StyledDialog.Content>
          <Typography variant="body_short">
            Select the corresponding element in PEPM for each of the elements
            provided in the model.
          </Typography>

          <ModelArchelMapSelectTable
            selectedArchelMaps={selectedArchelMaps}
            setSelectedArchelMaps={setSelectedArchelMaps}
          />
        </StyledDialog.Content>
        <StyledDialog.Actions>
          <Button onClick={handleSaveClose}>Save and close</Button>
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
        </StyledDialog.Actions>
      </ArchelDialogWrapper>
    </div>
  );
};
