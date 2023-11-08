import React from "react";
import { useAppSelector } from "../../redux/typedHooks";
import EnrolledCourse from "./EnrolledCourse";

export default function Dashboard() {

  const student = useAppSelector((state) => state.student);

  const { courseProgression } = student;

  return (
    <section className="w-full h-full overflow-y-scroll">
      <div className="p-4">
        <p className="inline-block mb-2 font-bold text-xl text-slate-500 pb-1 border-b-2 border-slate-500">Enrolled Courses</p>

        {courseProgression.length === 0 ? (
          <p>You have not enrolled into any course.</p>
        ) : (
          <div className="py-4 flex gap-4 flex-wrap">
            {courseProgression.map(course => {
              return (
                <EnrolledCourse key={course.name} course={course} activeStudent={student} />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}