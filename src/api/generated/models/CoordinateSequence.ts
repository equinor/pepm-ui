/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Coordinate } from './Coordinate';
import type { Ordinates } from './Ordinates';

export type CoordinateSequence = {
    readonly dimension?: number;
    readonly measures?: number;
    readonly spatial?: number;
    ordinates?: Ordinates;
    readonly hasZ?: boolean;
    readonly hasM?: boolean;
    readonly zOrdinateIndex?: number;
    readonly mOrdinateIndex?: number;
    first?: Coordinate;
    last?: Coordinate;
    readonly count?: number;
};

