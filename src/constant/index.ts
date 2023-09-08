export interface ResumeSetting {
  height: number;
  width: number;
  scale: number;
}
export interface ResumeSettings { t1: ResumeSetting; t2: ResumeSetting }
export type ResumeType = keyof ResumeSettings

export const RESUME_SETTINGS:ResumeSettings  = {
  t1: {
    height: 960,
    width: 780,
    scale: 0.8,
  },
  t2: {
    height: 960,
    width: 780,
    scale: 0.8,
  },
};
