import { ResumeSchemaType } from "@/components/ResumeForm/formSchema";
import React from "react";
import T1 from "./T1";
import { SuppressResumePDFErrorMessage } from "./SuppressResumePDFErrorMessage";
import { ResumeType } from "@/constant";
import T2 from "./T2";

export type ResumePDFType = {
  type: ResumeType;
  resume: ResumeSchemaType;
  isPDF?: boolean;
};

export default function ResumePDF({
  type,
  resume,
  isPDF = false,
}: ResumePDFType) {
  return (
    <>
      {
        {
          t1: <T1 resume={resume} isPDF={isPDF} type={type} />,
          t2: <T2 resume={resume} isPDF={isPDF} type={type} />,
        }[type]
      }
      <SuppressResumePDFErrorMessage />
    </>
  );
}
