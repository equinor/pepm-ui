/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CoordinateEqualityComparer } from './CoordinateEqualityComparer';
import type { CoordinateSequenceFactory } from './CoordinateSequenceFactory';
import type { GeometryOverlay } from './GeometryOverlay';
import type { PrecisionModel } from './PrecisionModel';

export type NtsGeometryServices = {
    geometryOverlay?: GeometryOverlay;
    coordinateEqualityComparer?: CoordinateEqualityComparer;
    readonly defaultSRID?: number;
    defaultCoordinateSequenceFactory?: CoordinateSequenceFactory;
    defaultPrecisionModel?: PrecisionModel;
};

