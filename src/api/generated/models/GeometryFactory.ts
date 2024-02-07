/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CoordinateSequenceFactory } from './CoordinateSequenceFactory';
import type { NtsGeometryServices } from './NtsGeometryServices';
import type { PrecisionModel } from './PrecisionModel';

export type GeometryFactory = {
    precisionModel?: PrecisionModel;
    coordinateSequenceFactory?: CoordinateSequenceFactory;
    readonly srid?: number;
    geometryServices?: NtsGeometryServices;
};

