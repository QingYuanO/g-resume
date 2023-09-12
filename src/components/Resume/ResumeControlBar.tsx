import { usePDF } from "@react-pdf/renderer";
import React, { ReactElement, useEffect } from "react";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import dynamic from "next/dynamic";
import { Button } from "../ui/button";
import { throttle } from "lodash-es";
import { Loader2, Search } from "lucide-react";

export default function ResumeControlBar(props: {
  document: ReactElement;
  scale: number;
  fileName?: string;
  setScale: (height: number) => void;
}) {
  const { document, scale, setScale, fileName } = props;

  const [instance, update] = usePDF({ document });

  useEffect(() => {
    update(document);
  }, [update, document]);
  const setDebounceHeight = throttle(
    (v: number) => {
      setScale(v);
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
    <div className=" sticky inset-x-0 bottom-0 z-50 flex h-20 w-full items-center justify-between self-baseline bg-background md:min-w-fit">
      <div className="flex flex-grow items-center">
        <Label>
          <Search size={18} />
        </Label>
        <Slider
          defaultValue={[scale]}
          max={100}
          min={50}
          step={1}
          className="w-32"
          onValueChange={(v) => handleHeightChange(v[0])}
        />
        <span>{scale}%</span>
      </div>
      <div className="flex w-full flex-grow items-center justify-end">
        <div className="mr-2 h-4 w-4 ">
          {instance.loading && <Loader2 className="h-4 w-4 animate-spin" />}
        </div>
        <Button variant="outline" asChild>
          <a href={instance.url!} download={fileName}>
            下载
          </a>
        </Button>
      </div>
    </div>
  );
}

export const ResumeControlBarCSR = dynamic(
  () => Promise.resolve(ResumeControlBar),
  {
    ssr: false,
  },
);
