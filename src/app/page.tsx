import CVForm, { FormValues } from "@/components/CVForm";
import PDFDocument from "@/components/CVTemp/PDFDocument";

export default function Home() {
  return (
    <main className="container relative grid grid-cols-3 gap-x-4 md:grid-cols-6">
      <div className="relative col-span-3 md:col-span-3">
        <CVForm />
      </div>
      <div className="hidden md:block md:col-span-3">
        <PDFDocument />
      </div>
    </main>
  );
}
