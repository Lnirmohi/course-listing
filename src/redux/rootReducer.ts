import { combineReducers } from 'redux';
import courses from './features/courses/courseSlice';

const rootReducer = combineReducers({
  courses
});

export default rootReducer;