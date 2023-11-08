import { combineReducers } from 'redux';
import courses from './features/courses/courseSlice';
import student from './features/student/studentSlice';

const rootReducer = combineReducers({
  courses,
  student
});

export default rootReducer;