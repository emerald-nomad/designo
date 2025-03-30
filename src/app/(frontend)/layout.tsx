import { Jost } from "next/font/google";
import "@/styles/globals.scss";
import Header from "@/components/Header";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jost.variable}`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
