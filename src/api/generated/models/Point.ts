/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Coordinate } from './Coordinate';
import type { CoordinateSequence } from './CoordinateSequence';
import type { Dimension } from './Dimension';
import type { Envelope } from './Envelope';
import type { Geometry } from './Geometry';
import type { GeometryFactory } from './GeometryFactory';
import type { OgcGeometryType } from './OgcGeometryType';
import type { PrecisionModel } from './PrecisionModel';

export type Point = {
    factory?: GeometryFactory;
    userData?: any;
    srid?: number;
    precisionModel?: PrecisionModel;
    readonly numGeometries?: number;
    readonly isSimple?: boolean;
    readonly isValid?: boolean;
    readonly area?: number;
    readonly length?: number;
    centroid?: Point;
    interiorPoint?: Point;
    pointOnSurface?: Point;
    envelope?: Geometry;
    envelopeInternal?: Envelope;
    readonly isRectangle?: boolean;
    coordinateSequence?: CoordinateSequence;
    readonly coordinates?: Array<Coordinate> | null;
    readonly numPoints?: number;
    readonly isEmpty?: boolean;
    dimension?: Dimension;
    boundaryDimension?: Dimension;
    'x'?: number;
    'y'?: number;
    coordinate?: Coordinate;
    readonly geometryType?: string | null;
    ogcGeometryType?: OgcGeometryType;
    boundary?: Geometry;
    'z'?: number;
    'm'?: number;
};

