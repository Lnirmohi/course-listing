export type TCourse = {
  id: number;
  name: string;
  instructor: string;
  description: string;
  enrollmentStatus: string;
  thumbnail: string;
  duration: string;
  schedule: string;
  location: string;
  prerequisites: string[];
  syllabus: {
    week: number;
    topic: string;
    content: string;
  }[];
  studentsEnrolled: number[];
};

export type TStudent = {
  "id": number;
  "name": string;
  "email": string;
  "enrolledCourses": number[];
};

export type TCourseResponse = {
  status: string;
  data: TCourse[];
};