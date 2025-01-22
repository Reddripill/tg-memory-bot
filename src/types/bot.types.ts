import { Scenes } from "telegraf";

export type LangModeType = {
   from: string;
   to: string;
};

export interface ISceneContext<
   T extends Scenes.SceneSessionData = ILangModeSession
> extends Scenes.SceneContext<T> {
   scene: Scenes.SceneContextScene<ISceneContext<T>, T>;
   session: Scenes.SceneSession<T>;
}

export interface ILangModeSession extends Scenes.SceneSessionData {
   mode?: LangModeType;
   words?: string;
   step?: string;
}

export interface IWordEntry {
   id: number;
   user_id: number;
   word_pairs: string[][];
   from_lang: string;
   to_lang: string;
   added_at: Date;
}
