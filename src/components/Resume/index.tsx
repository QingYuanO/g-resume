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
import { useMemo, useState, useTransition } from "react";
import { RESUME_SETTINGS } from "@/constant";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { debounce, throttle } from 'lodash-es'

const isPDF = false;
const type = "t1";
const Resume = () => {
  const resume = useResumeStore((state) => ({
    baseInfo: state.baseInfo,
    workExperience: state.workExperience,
    skills: state.skills,
    education: state.education,
  }));
  const {  height:initHeight } = RESUME_SETTINGS[type];
  const [height, setHeight] = useState(initHeight);
  const pdf = useMemo(
    () => <ResumePDF resume={resume} type={type} isPDF={isPDF} height={height} />,
    [resume,height],
  );
  const setDebounceHeight =  throttle((v:number) => {
    setHeight(v)
  },800,{
    trailing:false,
    leading:true
  })
  const handleHeightChange = (v:number) => {
    setDebounceHeight(v)
  }

  return (
    <div className="relative flex items-center justify-center">
      <div className="relative ">
        <section className="flex justify-center overflow-hidden overflow-y-auto pt-16 md:h-[calc(100vh-5rem)]">
          <ResumeIframeCSR enablePDFViewer={isPDF} type={type} height={height} >
            <ResumePDF resume={resume} type={type} isPDF={isPDF} height={height} />
          </ResumeIframeCSR>
        </section>
        <div className=" sticky inset-x-0 bottom-0 flex h-20 origin-top-left  items-center justify-between">
          <div className="flex-grow flex items-center">
            <Label>高度</Label>
            <Slider
              defaultValue={[height]}
              max={1400}
              step={1}
              className="w-[50%]"
              onValueChange={(v) => handleHeightChange(v[0])}
            />
          </div>

          <Button variant="outline">
            <DynamicPDFDownloadLink document={pdf} fileName={resume.baseInfo.job}>下载</DynamicPDFDownloadLink>
          </Button>
        </div>
        <div className="absolute bottom-20 w-full border-t-2 bg-gray-50"></div>
      </div>
    </div>
  );
};

export default Resume;
const DynamicPDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((module) => module.PDFDownloadLink),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <Image src="/Infinity.svg" width={20} height={20} alt="加载中..." />
      </div>
    ),
  },
);