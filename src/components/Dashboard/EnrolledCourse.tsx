import React, { useState } from "react";

import {
  TCourseProgression,
  TStudentDetail,
  getStudentDetail,
  updateStudentDetail,
} from "../../redux/features/student/studentSlice";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useAppDispatch } from "../../redux/typedHooks";

export default function EnrolledCourse({
  course,
  activeStudent,
}: {
  course: TCourseProgression;
  activeStudent: TStudentDetail;
}) {
  const dispatch = useAppDispatch();
  const { name, instructor, progress, completed, thumbnail, dueDate } = course;

  const handleCourseCompletion = () => {
    const updatedInfo: TStudentDetail = {
      ...activeStudent,
      courseProgression: activeStudent.courseProgression.map((item) => {
        if (item.name === name) {
          return {
            ...item,
            completed: true,
            progress: 100,
          };
        }

        return item;
      }),
    };

    dispatch(
      updateStudentDetail({
        studentId: activeStudent.id!,
        data: updatedInfo,
      })
    );

    dispatch(getStudentDetail(201));
  };

  return (
    <div className="relative bg-white rounded-lg hover:shadow-xl ring-2 hover:ring-black transition duration-300 ease-in-out px-4 pt-1 flex flex-col w-3/12 hover:cursor-pointer text-primary">
      <div className="absolute top-2 right-2">
        <CourseOptions
          completed={completed}
          handleCourseCompletion={handleCourseCompletion}
        />
      </div>
      <div className="mb-2">
        <p className="font-normal text-sm text-red-500 py-2">
          Due date:&nbsp;
          {new Date(dueDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
        <div className="h-48 py-2">
          <img
            src={thumbnail}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <p className="font-semibold text-lg">{name}</p>
        <p className="text-md text-black">{instructor}</p>
      </div>

      <div className="py-4 bg-[#F0F0F8] rounded-md">
        <p className="px-2 mb-2">Progress</p>
        <div className="px-2">
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CourseOptions({
  completed,
  handleCourseCompletion,
}: {
  completed: boolean;
  handleCourseCompletion: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="text-sm font-semibold text-gray-400 shadow-sm hover:text-black hover:cursor-pointer"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => {
            setMenuOpen((prev) => !prev);
          }}
        >
          <EllipsisVerticalIcon className="w-8 h-8" />
        </button>
      </div>

      {menuOpen ? (
        <div
          className="absolute right-0 z-10 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1">
            <button
              type="button"
              className="hover:bg-gray-200 text-gray-700 block px-4 py-2 text-sm w-full disabled:text-gray-400 cursor-pointer"
              role="menuitem"
              tabIndex={-1}
              onClick={() => {
                setMenuOpen(false);
                handleCourseCompletion();
              }}
              disabled={completed}
            >
              Mark as completed
            </button>
          </div>
        </div>
      ) : (
        false
      )}
    </div>
  );
}
