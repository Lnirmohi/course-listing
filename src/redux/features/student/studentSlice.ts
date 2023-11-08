import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axiosInstance from "../../../services/axiosInstance";

type TInitialState = {
  id: number | null;
  name: string;
  email: string;
  enrolledCourses: number[];
  isLoading: boolean;
};

const initialState: TInitialState = {
  id: null,
  name: "",
  email: "",
  enrolledCourses: [],
  isLoading: true,
};

export const getStudentDetail = createAsyncThunk<Omit<TInitialState, "isLoading">, number>(
  "student/fetchStudentInfo",
  async (id) => {
    try {
      const result: AxiosResponse<Omit<TInitialState, "id"> & { id: number }> =
        await axiosInstance.get(`/students/${id}`);

      if (result.status === 200) {
        return result.data;
      }

      return {
        id: null,
        name: "",
        email: "",
        enrolledCourses: [],
      };
    } catch (error) {
      console.error("Error while fetching student detail");
      return {
        id: null,
        name: "",
        email: "",
        enrolledCourses: [],
      };
    }
  }
);

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

        const { id, name, enrolledCourses, email } = initialState;
        state.id = id;
        state.name = name;
        state.enrolledCourses = enrolledCourses;
        state.email = email;
      })
      .addCase(getStudentDetail.fulfilled, (state, action) => {
        state.isLoading = false;

        const { id, name, enrolledCourses, email } = action.payload;
        state.id = id;
        state.name = name;
        state.enrolledCourses = enrolledCourses;
        state.email = email;
      });
  },
});

export default reducer;
