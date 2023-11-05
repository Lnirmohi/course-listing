export type TCourse = {
  name: string;
  id: number;
  instructor: string;
  description: string;
};

export type TCourseResponse = {
  status: string;
  data: TCourse[];
};