import { useEffect } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./redux/typedHooks";
import { getCourses } from "./redux/features/courses/courseSlice";
import { Route, Routes } from "react-router";
import BaseLayout from "./components/BaseLayout/BaseLayout";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCourses());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<BaseLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
