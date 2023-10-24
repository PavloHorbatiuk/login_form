"use client";

import { Header } from "@/components";
import Table from "@/components/Table";
import ReduxProvider from "@/store/ReduxProvider";

export default function Home() {
  return (
    <main className="flex flex-col">
      <ReduxProvider>
        <Header />
        <Table />
      </ReduxProvider>
    </main>
  );
}
