import type { Metadata } from "next";

import "../styles/global.css";
import { Header } from "@/components";
import ReduxProvider from "@/store/ReduxProvider";

export const metadata: Metadata = {
  title: "X-Data-Ilonius",
  description: "Enter in space of x-data",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={"app"}>{children}</body>
    </html>
  );
}
