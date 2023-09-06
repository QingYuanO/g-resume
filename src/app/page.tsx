import CVForm, { FormValues } from "@/components/CVForm";
import PDFDocument from "@/components/CVTemp/PDFDocument";

export default function Home() {
  return (
    <main className="container relative grid grid-cols-3 gap-x-4 md:grid-cols-6">
      <div className="relative col-span-3">
        <CVForm />
      </div>
      <div className="col-span-3 md:block">
        <PDFDocument />
      </div>
    </main>
  );
}
