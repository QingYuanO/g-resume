"use client";
import useResumeStore from "@/store/resume";
import ResumePDF from "./ResumePDF";
import { ResumeIframeCSR } from "./ResumeIframe";
import { useMemo, useState } from "react";
import { RESUME_SETTINGS } from "@/constant";
import { ResumeControlBarCSR } from "./ResumeControlBar";

const isPDF = false;
const type = "t1";
const Resume = () => {
  const resume = useResumeStore((state) => ({
    baseInfo: state.baseInfo,
    workExperience: state.workExperience,
    skills: state.skills,
    education: state.education,
  }));
  const { height: initHeight } = RESUME_SETTINGS[type];
  const [height, setHeight] = useState(initHeight);
  const pdf = useMemo(
    () => <ResumePDF resume={resume} type={type} isPDF />,
    [resume],
  );

  return (
    <div className="relative flex items-center justify-center">
      <div className="relative ">
        <section className="flex justify-center overflow-hidden overflow-y-auto pt-16 md:h-[calc(100vh-5rem)]">
          <ResumeIframeCSR enablePDFViewer={isPDF} type={type} height={height}>
            <ResumePDF resume={resume} type={type} isPDF={isPDF} />
          </ResumeIframeCSR>
        </section>
        <ResumeControlBarCSR
          height={height}
          setHeight={setHeight}
          document={pdf}
          fileName={resume.baseInfo.job}
        />
        <div className="absolute bottom-20 w-full border-t-2 bg-gray-50"></div>
      </div>
    </div>
  );
};

export default Resume;
