"use client";
/* eslint-disable jsx-a11y/alt-text */
import {
  StyleSheet,
  Font,
  PDFViewer,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import useResumeStore from "@/store/resume";
import Image from "next/image";
import ResumePDF from "./ResumePDF";
import { ResumeIframeCSR } from "./ResumeIframe";
import { Button } from "../ui/button";
import { useMemo } from "react";

const isPDF = false;
const Resume = () => {
  const resume = useResumeStore((state) => ({
    baseInfo: state.baseInfo,
    workExperience: state.workExperience,
    skills: state.skills,
    education: state.education,
  }));
  const pdf = useMemo(
    () => <ResumePDF resume={resume} type="t1" isPDF={isPDF} />,
    [resume],
  );
  return (
    <div className="relative">
      <section className="overflow-hidden flex justify-center md:h-[calc(100vh-2.5rem)]">
        <ResumeIframeCSR enablePDFViewer={isPDF}>
          <ResumePDF resume={resume} type="t1" isPDF={isPDF} />
        </ResumeIframeCSR>
      </section>
      <div className=" h-10">
        <Button>
          <PDFDownloadLink document={pdf}>下载</PDFDownloadLink>
        </Button>
      </div>
    </div>
  );
};

export default Resume;
