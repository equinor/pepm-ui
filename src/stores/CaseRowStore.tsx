/* eslint-disable max-lines-per-function */
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type ICaseRowStore = {
  indicatorParams: boolean;
  indicatorVariogramModel: boolean;
  indicatorModelArea: boolean;
  netToGrossGrain: boolean;
  netToGrossVariogramModel: boolean;
  netToGrossModelArea: boolean;
  contParamParameters: boolean;
  contParamArchel: boolean;
  contParamVariogramModel: boolean;
  contParamModelArea: boolean;
  channelModelArea: boolean;
  objectModelArea: boolean;
};

type ICaseRowStoreActions = {
  setIndicatorParams: (bool: boolean) => void;
  setIndicatorVariogramModel: (bool: boolean) => void;
  setIndicatorModelArea: (bool: boolean) => void;
  setNetToGrossGrain: (bool: boolean) => void;
  setNetToGrossVariogramModel: (bool: boolean) => void;
  setNetToGrossModelArea: (bool: boolean) => void;
  setContParamParameters: (bool: boolean) => void;
  setContParamArchel: (bool: boolean) => void;
  setContParamVariogramModel: (bool: boolean) => void;
  setContParamModelArea: (bool: boolean) => void;
  setChannelModelArea: (bool: boolean) => void;
  setObjectModelArea: (bool: boolean) => void;
};

export const useCaseRowStore = create<ICaseRowStore & ICaseRowStoreActions>()(
  immer((set) => ({
    indicatorParams: true,
    indicatorVariogramModel: true,
    netToGrossGrain: true,
    netToGrossVariogramModel: true,
    contParamParameters: true,
    contParamArchel: true,
    contParamVariogramModel: true,
    indicatorModelArea: true,
    netToGrossModelArea: true,
    contParamModelArea: true,
    channelModelArea: true,
    objectModelArea: true,
    setIndicatorParams: (bool: boolean) =>
      set((state) => {
        state.indicatorParams = bool;
      }),
    setIndicatorVariogramModel: (bool: boolean) =>
      set((state) => {
        state.indicatorVariogramModel = bool;
      }),
    setNetToGrossGrain: (bool: boolean) =>
      set((state) => {
        state.netToGrossGrain = bool;
      }),
    setNetToGrossVariogramModel: (bool: boolean) =>
      set((state) => {
        state.netToGrossVariogramModel = bool;
      }),
    setContParamParameters: (bool: boolean) =>
      set((state) => {
        state.contParamParameters = bool;
      }),
    setContParamArchel: (bool: boolean) =>
      set((state) => {
        state.contParamArchel = bool;
      }),
    setContParamVariogramModel: (bool: boolean) =>
      set((state) => {
        state.contParamVariogramModel = bool;
      }),
    setIndicatorModelArea: (bool: boolean) =>
      set((state) => {
        state.indicatorModelArea = bool;
      }),
    setNetToGrossModelArea: (bool: boolean) =>
      set((state) => {
        state.netToGrossModelArea = bool;
      }),
    setContParamModelArea: (bool: boolean) =>
      set((state) => {
        state.contParamModelArea = bool;
      }),
    setChannelModelArea: (bool: boolean) =>
      set((state) => {
        state.channelModelArea = bool;
      }),
    setObjectModelArea: (bool: boolean) =>
      set((state) => {
        state.objectModelArea = bool;
      }),
  })),
);
