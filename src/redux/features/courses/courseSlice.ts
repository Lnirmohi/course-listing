import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TCourse, TCourseResponse } from "./courses.types";
import axiosInstance from "../../../services/axiosInstance";
import { AxiosResponse } from "axios";

export type TCoursesInitialState = {
  isLoading: boolean;
  courses: TCourse[];
};

const initialState: TCoursesInitialState = {
  isLoading: true,
  courses: [],
};

export const getCourses = createAsyncThunk<
  {
    courses: TCourse[];
  },
  undefined
>("courses/fetchCourses", async () => {
  try {
    const result: AxiosResponse<TCourseResponse> = await axiosInstance.get(
      "/courses"
    );

    if (result.status === 200) {
      return {
        courses: result.data,
      };
    }

    return {
      courses: [],
    };
  } catch (error) {
    return {
      courses: [],
    };
  }
});

const { reducer } = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCourses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCourses.rejected, (state) => {
        state.isLoading = false;
        state.courses = [];
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.courses = action.payload.courses;
        state.isLoading = false;
      });
  },
});

export default reducer;
