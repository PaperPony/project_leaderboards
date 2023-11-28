import Image from "next/image";
import Header from "./components/Header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-b from-violet-50 to-violet-400 dark:bg-gradient-to-t dark:from-gray-900 dark:to-violet-950">
      <Header />
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-center">
        <a className="p-6 mt-6 text-center w-96">
          <Image
            src="/leaderboards.png"
            alt="Next.js"
            width={160}
            height={160}
            // center
            layout="responsive"
          />
          <h2 className="mt-8 text-2xl font-bold text-center">
            Project Leaderboards
          </h2>
          <p className="mt-4 text-xl text-center">
            Time to make the magic happen.
          </p>
        </a>
      </div>
    </main>
  );
}
