import { Lato } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700", "900"] });

export const metadata = {
  title: "Lynkx",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <main>
          <Header />
          <div className="max-w-4xl mx-auto sm:p-6 p-4">{children}</div>
        </main>
      </body>
    </html>
  );
}
