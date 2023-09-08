"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";
import Frame from "react-frame-component";

export default function ResumeIframe({
  children,
  enablePDFViewer = false,
}: {
  children: React.ReactNode;
  enablePDFViewer?: boolean;
}) {
  const iframeInitialContent = `<!DOCTYPE html>
  <html>
    <head>
    <link rel="preload" as="font" href="/font/NotoSansSC-Regular.ttf" type="font/ttf" crossorigin="anonymous">
    <link rel="preload" as="font" href="/font/NotoSansSC-Bold.ttf" type="font/ttf" crossorigin="anonymous">
      <style>
        @font-face {font-family: "NotoSansSC"; src: url("/font/NotoSansSC-Regular.ttf");}
        @font-face {font-family: "NotoSansSC"; src: url("/font/NotoSansSC-Bold.ttf"); font-weight: bold;}
      </style>
    </head>
    <body style='overflow: hidden; width: 100%; margin: 0; padding: 0; -webkit-text-size-adjust:none;'>
      <div></div>
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
    <div className="h-[960px] w-[780px] scale-90 origin-top-left">
      <Frame
        style={{ width: "100%", height: "100%" }}
        initialContent={iframeInitialContent}
      >
        {children}
      </Frame>
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
