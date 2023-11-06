import React from "react";

import { Outlet } from "react-router";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

export default function BaseLayout() {
  return (
    <div className="min-h-screen max-h-screen bg-[#F3F3F2] grid grid-cols-4 grid-rows-12">
      <Header />

      <main className="row-start-2 row-end-13">
        <Sidebar />

        <aside>
          <Outlet />
        </aside>
      </main>
    </div>
  );
}
