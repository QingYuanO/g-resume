export interface ResumeSetting {
  height: number;
  width: number;
  scale: number;
}
export interface ResumeSettings {
  t1: ResumeSetting;
  t2: ResumeSetting;
}
export type ResumeType = keyof ResumeSettings;

//高宽比
const a4Ratio = 29.7 / 21;

export const RESUME_SETTINGS: ResumeSettings = {
  t1: {
    height: Math.floor(780 * a4Ratio) ,
    width: 780,
    scale: 0.7,
  },
  t2: {
    height: 960,
    width: 780,
    scale: 0.8,
  },
};
