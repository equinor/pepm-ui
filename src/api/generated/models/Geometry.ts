/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Coordinate } from './Coordinate';
import type { Dimension } from './Dimension';
import type { Envelope } from './Envelope';
import type { GeometryFactory } from './GeometryFactory';
import type { OgcGeometryType } from './OgcGeometryType';
import type { Point } from './Point';
import type { PrecisionModel } from './PrecisionModel';

export type Geometry = {
    factory?: GeometryFactory;
    userData?: any;
    srid?: number;
    readonly geometryType?: string | null;
    ogcGeometryType?: OgcGeometryType;
    precisionModel?: PrecisionModel;
    coordinate?: Coordinate;
    readonly coordinates?: Array<Coordinate> | null;
    readonly numPoints?: number;
    readonly numGeometries?: number;
    readonly isSimple?: boolean;
    readonly isValid?: boolean;
    readonly isEmpty?: boolean;
    readonly area?: number;
    readonly length?: number;
    centroid?: Point;
    interiorPoint?: Point;
    pointOnSurface?: Point;
    dimension?: Dimension;
    boundary?: Geometry;
    boundaryDimension?: Dimension;
    envelope?: Geometry;
    envelopeInternal?: Envelope;
    readonly isRectangle?: boolean;
};

