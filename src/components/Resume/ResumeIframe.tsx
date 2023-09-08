"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";
import Frame from "react-frame-component";
import { RESUME_SETTINGS, ResumeSetting, ResumeType } from "@/constant";

// const isMobile = window?.innerWidth < 768

export default function ResumeIframe({
  children,
  enablePDFViewer = false,
  height,
  type,
}: {
  children: React.ReactNode;
  enablePDFViewer?: boolean;
  height: number;
  type: ResumeType;
}) {
  let { scale, width } = RESUME_SETTINGS[type];  
  // isMobile && (scale = scale * 0.5);
  const iframeInitialContent = `<!DOCTYPE html>
  <html style='height:100%'>
    <head>
    <link rel="preload" as="font" href="/font/NotoSansSC-Regular.ttf" type="font/ttf" crossorigin="anonymous">
    <link rel="preload" as="font" href="/font/NotoSansSC-Bold.ttf" type="font/ttf" crossorigin="anonymous">
      <style>
        @font-face {font-family: "NotoSansSC"; src: url("/font/NotoSansSC-Regular.ttf");}
        @font-face {font-family: "NotoSansSC"; src: url("/font/NotoSansSC-Bold.ttf"); font-weight: bold;}

        .frame-content{
          height: 100%;
        }
      </style>
    </head>
    <body style='overflow: hidden; width: ${width}px;height:100%; margin: 0; padding: 0; -webkit-text-size-adjust:none;'>
      <div style='height: 100%;'></div>
    </body>
  </html>`;

  if (enablePDFViewer) {
    return (
      <DynamicPDFViewer className="h-screen w-full">
        {children as any}
      </DynamicPDFViewer>
    );
  }
  return (
    <div
      style={{
        maxWidth: `${width * scale}px`,
        maxHeight: `${height * scale}px`,
      }}
    >
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          transform: `scale(${scale})`,
        }}
        className={`origin-top-left shadow-lg `}
      >
        <Frame
          style={{ width: "100%", height: "100%" }}
          initialContent={iframeInitialContent}
        >
          {children}
        </Frame>
      </div>
    </div>
  );
}

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

export const ResumeIframeCSR = dynamic(() => Promise.resolve(ResumeIframe), {
  ssr: false,
});
