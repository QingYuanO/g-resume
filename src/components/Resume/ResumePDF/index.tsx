import { ResumeSchemaType } from "@/components/ResumeForm/formSchema";
import React from "react";
import T1 from "./T1";
import { SuppressResumePDFErrorMessage } from "./SuppressResumePDFErrorMessage";
import { ResumeType } from "@/constant";

export type ResumePDFType = {
  type: ResumeType;
  resume: ResumeSchemaType;
  isPDF?: boolean;
  height:number
}

export default function ResumePDF({
  type,
  resume,
  isPDF = false,
  height
}: ResumePDFType) {
  return (
    <>
      {{ t1: <T1 resume={resume} isPDF={isPDF} type={type} height={height} />, t2: "" }[type]}
      <SuppressResumePDFErrorMessage />
    </>
  );
}
