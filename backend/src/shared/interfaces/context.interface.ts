import { SceneContext } from 'telegraf/typings/scenes';

export interface Context extends Omit<SceneContext, 'session'> {
  startPayload?: string;
  match: any[];
  command: string;
}
