"use client";
import ResumeForm from "@/components/ResumeForm";
import Resume from "@/components/Resume";
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
    <main className="container relative grid grid-cols-3 gap-x-4 md:grid-cols-7">
      <div className="relative col-span-3 md:col-span-3">
        <ResumeForm />
      </div>
      <div className="col-span-3 md:col-span-4 md:block">
        <Resume />
      </div>
    </main>
  );
}
