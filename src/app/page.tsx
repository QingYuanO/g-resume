"use client";
import CVForm, { FormValues } from "@/components/CVForm";
import PDFDocument from "@/components/CVTemp/PDFDocument";
import { isMobile } from "@/utils";
import { Font } from "@react-pdf/renderer";

Font.register({
  family: "NotoSansSC",
  fonts: [
    {
      src: "/font/NotoSansSC-Regular.ttf",
      fontWeight: "normal",
    },
    {
      src: "/font/NotoSansSC-Bold.ttf",
      fontWeight: 600,
    },
  ],
});

export default function Home() {
  return (
    <main className="container relative grid grid-cols-3 gap-x-4 md:grid-cols-6">
      <div className="relative col-span-3">
        <CVForm />
      </div>
      <div className="col-span-3 hidden md:block">
        {!isMobile && <PDFDocument />}
      </div>
    </main>
  );
}
