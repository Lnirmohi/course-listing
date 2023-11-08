import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axiosInstance from "../../../services/axiosInstance";
import { RootState } from "../../store";

export type TCourseProgression = {
  dueDate: Date;
  instructor: string;
  name: string;
  progress: number;
  thumbnail: string;
  completed: boolean;
};

export type TStudentDetail = {
  id: number | null;
  name: string;
  email: string;
  enrolledCourses: number[];
  courseProgression: TCourseProgression[];
}

type TStudentInitialState = TStudentDetail & {
  isLoading: boolean;
};

const initialState: TStudentInitialState = {
  id: null,
  name: "",
  email: "",
  enrolledCourses: [],
  courseProgression: [],
  isLoading: true,
};

export const updateStudentDetail = createAsyncThunk<
  TStudentDetail,
  { studentId: number; data: TStudentDetail },
  {
    state: RootState;
  }
>("student/updateStudentInfo", async ({ studentId, data }, { getState }) => {
  
  const {student: studentState} = getState();

  try {
    const result: AxiosResponse<Omit<TStudentDetail, "id"> & { id: number }> =
      await axiosInstance.put(`/students/${studentId}`, data);

    if (result.status === 200) {
      return result.data;
    }

    return {
      id: studentState.id,
      name: studentState.name,
      email: studentState.email,
      enrolledCourses: studentState.enrolledCourses,
      courseProgression: studentState.courseProgression,
    };
  } catch (error) {
    console.log(`Error while updating student detail: ${error}`);
    return {
      id: studentState.id,
      name: studentState.name,
      email: studentState.email,
      enrolledCourses: studentState.enrolledCourses,
      courseProgression: studentState.courseProgression,
    };
  }
});

export const getStudentDetail = createAsyncThunk<
  TStudentDetail,
  number
>("student/fetchStudentInfo", async (id) => {
  try {
    const result: AxiosResponse<Omit<TStudentInitialState, "id"> & { id: number }> =
      await axiosInstance.get(`/students/${id}`);

    if (result.status === 200) {
      return result.data;
    }

  } catch (error) {
    console.error("Error while fetching student detail");
  }

  return {
    id: null,
    name: "",
    email: "",
    enrolledCourses: [],
    courseProgression: [],
  };
});

const { reducer } = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getStudentDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudentDetail.rejected, (state) => {
        state.isLoading = false;

        const { id, name, enrolledCourses, email, courseProgression } =
          initialState;
        state.id = id;
        state.name = name;
        state.enrolledCourses = enrolledCourses;
        state.email = email;
        state.courseProgression = courseProgression;
      })
      .addCase(getStudentDetail.fulfilled, (state, action) => {
        state.isLoading = false;

        const { id, name, enrolledCourses, email, courseProgression } =
          action.payload;
        state.id = id;
        state.name = name;
        state.enrolledCourses = enrolledCourses;
        state.email = email;
        state.courseProgression = courseProgression;
      })
      .addCase(updateStudentDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStudentDetail.rejected, (state) => {
        state.isLoading = false;

        const { id, name, enrolledCourses, email, courseProgression } = state;
        state.id = id;
        state.name = name;
        state.enrolledCourses = enrolledCourses;
        state.email = email;
        state.courseProgression = courseProgression;
      })
      .addCase(updateStudentDetail.fulfilled, (state, action) => {
        state.isLoading = false;

        const { id, name, enrolledCourses, email, courseProgression } = action.payload;
        state.id = id;
        state.name = name;
        state.enrolledCourses = enrolledCourses;
        state.email = email;
        state.courseProgression = courseProgression;
      });
  },
});

export default reducer;
