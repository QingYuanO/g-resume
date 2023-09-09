import resume from "@/store/resume";

import { pdf, usePDF } from "@react-pdf/renderer";
import React, { ReactElement, useEffect } from "react";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Button } from "../ui/button";
import { throttle } from "lodash-es";

export default function ResumeControlBar(props: {
  document: ReactElement;
  height: number;
  fileName?: string;
  setHeight: (height: number) => void;
}) {
  const { document, height, setHeight, fileName } = props;

  const [instance, update] = usePDF({ document });

  // Hook to update pdf when document changes
  useEffect(() => {
    update(document);
  }, [update, document]);
  const setDebounceHeight = throttle(
    (v: number) => {
      setHeight(v);
    },
    800,
    {
      trailing: false,
      leading: true,
    },
  );
  const handleHeightChange = (v: number) => {
    setDebounceHeight(v);
  };
  return (
    <div className=" sticky inset-x-0 bottom-0 z-50 flex h-20 origin-top-left  items-center justify-between bg-white md:min-w-fit">
      <div className="flex flex-grow items-center">
        <Label>高度</Label>
        <Slider
          defaultValue={[height]}
          max={1400}
          step={1}
          className="w-[50%]"
          onValueChange={(v) => handleHeightChange(v[0])}
        />
      </div>

      <Button variant="outline" asChild>
        <a href={instance.url!} download={fileName}>
          下载
        </a>
      </Button>
    </div>
  );
}

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

export const ResumeControlBarCSR = dynamic(
  () => Promise.resolve(ResumeControlBar),
  {
    ssr: false,
  },
);
