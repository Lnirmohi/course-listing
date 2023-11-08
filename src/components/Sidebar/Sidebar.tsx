import React from "react";
import { HeadlessSearch } from "./HeadlessSearch";
import Search from "./Search";
import { useAppSelector } from "../../redux/typedHooks";

export default function Sidebar() {
  const { courses, isLoading } = useAppSelector((state) => state.courses);

  return (
    <div className="basis-1/4 h-full flex flex-col">
      <HeadlessSearch callback={() => {}}>
        {(debouncedSearch, searchRef, handleClear) => {
          return <Search searchRef={searchRef} handleClear={handleClear} />;
        }}
      </HeadlessSearch>

      <ul className="grow list-none border-r-2 border-[#e4e4e4] overflow-scroll overflow-x-hidden">
        {courses.map((course) => (
          <li
            key={course.id}
            className="px-4 py-2 text-primary font-semibold border-b border-b-slate-300 hover:bg-primary hover:text-white hover:cursor-pointer"
          >
            <button
              className="active:scale-95 w-full h-full text-left"
              onClick={() => {}}
            >
              {course.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
