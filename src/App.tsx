import "./App.css";
import { Route, Routes } from "react-router";
import BaseLayout from "./components/BaseLayout/BaseLayout";
import Dashboard from "./components/Dashboard/Dashboard";
import CourseDetail from "./components/CourseDetail/CourseDetail";

function App() {

  return (
    <Routes>
      <Route path="/" element={<BaseLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<CourseDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
