import React, { useEffect } from "react";

import { Outlet } from "react-router";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { getCourses } from "../../redux/features/courses/courseSlice";
import { useAppDispatch } from "../../redux/typedHooks";
import { getStudentDetail } from "../../redux/features/student/studentSlice";

export default function BaseLayout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCourses());
    dispatch(getStudentDetail(201));
  }, [dispatch]);
  
  return (
    <div className="min-h-screen max-h-screen bg-[#F3F3F2] grid grid-cols-4 grid-rows-12">
      <Header />

      <main className="col-start-1 col-end-6 row-start-2 row-end-13 flex">
        <Sidebar />

        <aside className="">
          <Outlet />
        </aside>
      </main>
    </div>
  );
}
