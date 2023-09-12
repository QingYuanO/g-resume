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
    <main className="flex min-h-screen flex-col flex-wrap items-center gap-10 bg-transparent p-10 md:flex-row">
      {templates.map((item) => {
        return (
          <Link
            key={item.type}
            href={`/resume-builder/${item.type}`}
            className="block aspect-[21/29.7] w-full overflow-hidden rounded shadow duration-200 hover:scale-110 md:w-[calc(100vw/3-10rem/2)]"
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
  );
}
