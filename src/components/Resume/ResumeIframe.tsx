"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";
import Frame from "react-frame-component";
import { RESUME_SETTINGS, ResumeType } from "@/constant";
import { useMediaQuery } from "react-responsive";

export default function ResumeIframe({
  children,
  enablePDFViewer = false,
  scale,
  type,
}: {
  children: React.ReactNode;
  enablePDFViewer?: boolean;
  scale: number;
  type: ResumeType;
}) {
  let { height, width } = RESUME_SETTINGS[type];
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isSmall = useMediaQuery({ maxWidth: 850 });
  const isMiddle = useMediaQuery({ maxWidth: 1000 });
  isMobile && (scale = scale * 0.6);
  isSmall && (scale = scale * 0.8);
  isMiddle && (scale = scale * 0.9);
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
        maxHeight: `${height * 2 * scale}px`,
      }}
    >
      <div
        style={{
          width: `${width}px`,
          height: `${height * 2}px`,
          transform: `scale(${scale})`,
        }}
        className={`relative origin-top-left shadow-lg`}
      >
        <Frame
          style={{ width: "100%", height: "100%" }}
          initialContent={iframeInitialContent}
        >
          {children}
        </Frame>
        <div
          className="absolute inset-x-0 border border-dashed border-gray-300 opacity-50 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:translate-y-1/2 after:select-none after:text-sm after:text-gray-400 after:content-['分页'] "
          style={{ top: `${height}px` }}
        ></div>
      </div>
    </div>
  );
}

const DynamicPDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((module) => module.PDFViewer),
  {
    ssr: false,
  },
);

export const ResumeIframeCSR = dynamic(() => Promise.resolve(ResumeIframe), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <Image src="/Infinity.svg" width={80} height={80} alt="加载中..." />
    </div>
  ),
});
