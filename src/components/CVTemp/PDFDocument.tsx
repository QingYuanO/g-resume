"use client";
/* eslint-disable jsx-a11y/alt-text */
import { StyleSheet, Font, PDFViewer } from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import useResumeStore from "@/store/resume";
import T1 from "./T1";
import Image from "next/image";

const PDFDocument = () => {
  const resume = useResumeStore((state) => state.data);
  return (
    <DynamicPDFViewer className="h-screen w-full">
      <T1 resume={resume} />
    </DynamicPDFViewer>
  );
};

export default PDFDocument;

const DynamicPDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((module) => module.PDFViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <Image src="/Infinity.svg" width={80} height={80} alt="加载中..." />
      </div>
    ),
  },
);
