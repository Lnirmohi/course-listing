import React, { RefObject } from "react";

export default function Search({
  searchRef,
  handleClear,
}: {
  searchRef: RefObject<HTMLInputElement>;
  handleClear: () => void;
}) {
  return (
    <div className="px-2 py-4 flex gap-2 bg-[#e4e4e4]">
      <input
        type="search"
        ref={searchRef}
        className="py-1 pl-2 basis-9/12 outline-none ring-2 ring-sky-200 focus:ring-sky-400 border-0 rounded"
        placeholder="Search courses"
      />
      <button
        className="active:scale-95 hover:cursor-pointer mr-2 basis-1/4 rounded bg-primary text-white hover:bg-primary-dark"
        onClick={handleClear}
      >
        Clear
      </button>
    </div>
  );
}
