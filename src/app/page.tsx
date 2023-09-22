import Link from "next/link";
import Image from "next/image";

const templates = [
  {
    img: "/images/T1.png",
    type: "t1",
  },
  {
    img: "/images/T2.png",
    type: "t2",
  },
];

export default function Home() {
  return (
    <>
      <div className="fixed inset-0 flex justify-center px-8 md:p-0">
        <div className="flex w-full max-w-3xl md:px-8">
          <div className="w-full bg-zinc-50/90 ring-1 ring-zinc-100 dark:bg-zinc-900/80 dark:ring-zinc-400/20" />
        </div>
      </div>
      <main className="relative z-50 mx-auto box-border grid grid-cols-2 place-content-center justify-items-center gap-10 py-10 md:max-w-3xl  md:px-16">
        {templates.map((item, idx) => {
          return (
            <Link
              key={item.type}
              href={`/resume-builder/${item.type}`}
              className="col-span-2 block  w-2/3 overflow-hidden rounded shadow duration-200  hover:scale-110 md:col-span-1 md:w-full md:odd:justify-self-end md:even:justify-self-start"
            >
              <Image
                src={item.img}
                alt={item.type}
                width={640}
                height={730}
                className="w-full"
              />
            </Link>
          );
        })}
      </main>
    </>
  );
}
