import Image from "next/image";
import Link from "next/link";
import Header from "./components/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-b from-violet-50 to-violet-400 dark:bg-gradient-to-t dark:from-gray-900 dark:to-violet-950"></main>
    </div>
  );
}
