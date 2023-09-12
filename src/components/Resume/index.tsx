"use client";
import useResumeStore from "@/store/resume";
import ResumePDF from "./ResumePDF";
import { ResumeIframeCSR } from "./ResumeIframe";
import { useMemo, useState } from "react";
import { RESUME_SETTINGS, ResumeType } from "@/constant";
import { ResumeControlBarCSR } from "./ResumeControlBar";
import { ScrollArea } from "../ui/scroll-area";

const isPDF = false;
const Resume = ({ type = "t1" }: { type?: ResumeType }) => {
  const resume = useResumeStore((state) => ({
    baseInfo: state.baseInfo,
    workExperience: state.workExperience,
    skills: state.skills,
    education: state.education,
  }));
  const setting = RESUME_SETTINGS[type];
  const [scale, setScale] = useState((setting?.scale ?? 0) * 100);
  const pdf = useMemo(
    () => <ResumePDF resume={resume} type={type} isPDF />,
    [resume, type],
  );
  if (!setting)
    return (
      <div className="flex h-full items-center justify-center">
        无法找到模板
      </div>
    );
  return (
    <div className="relative flex flex-col items-center  md:h-screen">
      <div className="relative  max-w-full ">
        <ScrollArea className="mt-16 pb-5 flex justify-center overflow-hidden overflow-y-auto md:h-[calc(100vh-9rem)]">
          <ResumeIframeCSR
            enablePDFViewer={isPDF}
            type={type}
            scale={scale / 100}
          >
            <ResumePDF resume={resume} type={type} isPDF={isPDF} />
          </ResumeIframeCSR>
        </ScrollArea>
      </div>
      <ResumeControlBarCSR
        scale={scale}
        setScale={setScale}
        document={pdf}
        fileName={resume.baseInfo.job}
      />
      <div className="absolute bottom-20 w-full border-t-2 bg-gray-50"></div>
    </div>
  );
};

export default Resume;
