import { ResumeSchemaType } from "@/components/ResumeForm/formSchema";
import React from "react";
import T1 from "./T1";
import { SuppressResumePDFErrorMessage } from "./SuppressResumePDFErrorMessage";
export type ResumeType = "t1";

export default function ResumePDF({
  type,
  resume,
  isPDF = false,
}: {
  type: ResumeType;
  resume: ResumeSchemaType;
  isPDF?: boolean;
}) {
  return (
    <>
      {{ t1: <T1 resume={resume} isPDF={isPDF} /> }[type]}
      <SuppressResumePDFErrorMessage />
    </>
  );
}
