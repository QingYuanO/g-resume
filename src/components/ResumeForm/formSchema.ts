import { zodResolver } from "@hookform/resolvers/zod";
import { FieldPath } from "react-hook-form";
import * as z from "zod";

export const baseInfoSchema = z.object({
  baseInfo: z.object({
    avatar: z.string().optional(),
    name: z.string().optional(),
    job: z.string().optional(),
    jobAddress: z.string().default("").optional(),
    phone: z
      .string()
      .regex(/^1[3456789]\d{9}$/, { message: "手机号格式不正确" })
      .optional(),
    email: z.string().email({ message: "邮箱格式不正确" }).optional(),
    birthday: z.string().optional(),
    weChat: z.string().optional(),
    introduce: z.string().optional(),
    hobby: z.array(z.string()).optional(),
    certificate: z.array(z.string()).optional(),
    customUrls: z
      .array(
        z.object({
          name: z.string(),
          url: z.string(),
        }),
      )
      .optional(),
  }),
});

export const workExperienceSchema = z.object({
  workExperience: z.array(
    z.object({
      company: z.string(),
      position: z.string(),
      jobName: z.string(),
      rangeDate: z.string(),
      projects: z.array(
        z.object({
          name: z.string(),
          description: z.string().optional(),
          content: z.string().optional(),
        }),
      ),
    }),
  ),
});

export const educationSchema = z.object({
  education: z.array(
    z.object({
      school: z.string(),
      level: z.string().optional(),
      major: z.string().optional(),
      rangeDate: z.string().optional(),
    }),
  ),
});

export const skillsSchema = z.object({
  skills: z.array(
    z.object({
      description: z.string(),
      content: z.string().optional(),
    }),
  ),
});

export type BaseInfoSchemaType = z.infer<typeof baseInfoSchema>;
export type WorkExperienceSchemaType = z.infer<typeof workExperienceSchema>;
export type EducationSchemaType = z.infer<typeof educationSchema>;
export type SkillsSchemaType = z.infer<typeof skillsSchema>;

export type ResumeSchemaType = BaseInfoSchemaType &
  WorkExperienceSchemaType &
  EducationSchemaType &
  SkillsSchemaType;

export type ResumeFieldPath = FieldPath<ResumeSchemaType>;
