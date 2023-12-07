import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import { ScoresProvider } from "./contexts/Scores";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Project Leaderboards",
  description: "Play interconnected games.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>Project Leaderboards</title>
        <meta
          name="keywords"
          content="leaderboards, games, projects, leaderboard, project leaderboards, project leaderboard"
        />
        <meta name="description" content="Play interconnected games." />
        <meta name="author" content="Areeb and The Areebers" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body className={inter.className}>
        <ScoresProvider>
          <Header />
          <NavBar>{children}</NavBar>
        </ScoresProvider>
        <Footer />
      </body>
    </html>
  );
}
