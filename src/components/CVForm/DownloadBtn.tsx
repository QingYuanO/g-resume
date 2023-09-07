"use client";
import React, { useEffect, useMemo } from "react";
import { Button } from "../ui/button";
import { DownloadIcon } from "lucide-react";
import useOpenKeyStore from "@/store/openKey";
import useResumeStore from "@/store/resume";
import initValues from "@/utils/initValues";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePDF } from "@react-pdf/renderer";
import { useForm, useFormContext } from "react-hook-form";
import { FormValues } from ".";
import T1 from "../CVTemp/T1";

export default function DownloadBtn() {
  const changeData = useResumeStore((state) => state.changeData);
  const data = useResumeStore((state) => state.data);
  const { watch, handleSubmit } = useFormContext<FormValues>();
  const [instance, update] = usePDF({ document: <T1 resume={data} /> });

  useEffect(() => {
    // update(<T1 resume={data} />);
  }, [update, data]);

  const test = () => {
    handleSubmit((resume) => {
      update(<T1 resume={resume} />);
      console.log(resume);
      console.log(instance.loading);
      setTimeout(() => {
        console.log(instance.loading);
        let a = document.createElement("a");
        //注意，需要为文件设置一个名称
        a.download = resume.job ?? "简历";
        a.href = instance.url!;
        a.click();
      }, 1000);
    })();
  };
  return (
    <Button
      className="fixed bottom-20 right-5 flex items-center justify-center rounded-full md:hidden"
      size="icon"
      type="button"
      onClick={test}
    >
      <DownloadIcon className="h-5 w-5" />
      {/* <a href={instance.url!} download={data.job} className=" block">
      </a> */}
      {/* <ViewIcon className="h-5 w-5" /> */}
    </Button>
  );
}
