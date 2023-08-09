import { components, paths } from './schema'

export type AnalogueModel = components['schemas']['AnalogueModelList']

export type SuccessResponse =
  paths['/api/analoguemodels']['get']['responses']['200']['content']['application/json']
