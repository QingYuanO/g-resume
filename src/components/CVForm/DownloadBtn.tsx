"use client";
import React, { useEffect, useMemo } from "react";
import { Button } from "../ui/button";
import { DownloadIcon } from "lucide-react";
import useResumeStore from "@/store/resume";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useFormContext } from "react-hook-form";
import { FormValues } from ".";
import T1 from "../CVTemp/T1";

export default function DownloadBtn() {
  const changeData = useResumeStore((state) => state.changeData);
  const data = useResumeStore((state) => state.data);
  const { watch } = useFormContext<FormValues>();
  const pdf = useMemo(() => <T1 resume={data} />, [data]);
  useEffect(() => {
    const subscription = watch((value) => {
      changeData(value as FormValues);
    });
    return () => subscription.unsubscribe();
  }, [watch, changeData]);

  return (
    <Button
      className="fixed bottom-20 right-5 flex items-center justify-center rounded-full md:hidden"
      size="icon"
      type="button"
      asChild
    >
      <PDFDownloadLink document={pdf} fileName={data.job}>
        <DownloadIcon className="h-5 w-5" />
      </PDFDownloadLink>
    </Button>
  );
}
