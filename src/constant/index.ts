import { getA4RatioHeight } from "@/utils";

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

export const RESUME_SETTINGS: ResumeSettings = {
  t1: {
    height: getA4RatioHeight(780),
    width: 780,
    scale: 0.7,
  },
  t2: {
    height: getA4RatioHeight(640),
    width: 640,
    scale: 0.8,
  },
};
