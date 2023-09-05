"use client";
/* eslint-disable jsx-a11y/alt-text */
import { StyleSheet, Font,PDFViewer } from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import useResumeStore from "@/store/resume";
import T1 from "./T1";

Font.register({
  family: "LXGWFasmartGothic",
  src: "/font/LXGWFasmartGothic.ttf",
});



const PDFDocument = () => {
  const resume = useResumeStore((state) => state.data);
  return (
    <PDFViewer className="h-screen w-full">
      <T1 resume={resume} />
    </PDFViewer>
  );
};

export default PDFDocument;

const DynamicPDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((module) => module.PDFViewer),
  {
    ssr: false,
  },
);
