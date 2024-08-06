import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],     
  enrolled: [],     
};

const classSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {
    loadClasses: (state, action) => {
      state.list = action.payload;
    },
    enrollClass: (state, action) => {
      if (!state.enrolled.includes(action.payload)) {
        state.enrolled.push(action.payload);
      }
    },
    setEnrolledClasses: (state, action) => {
      state.enrolled = action.payload;
    },
    setCourseDetails: (state, action) => {
      const updatedCourses = state.list.map(course => 
        action.payload.find(enrolledCourse => enrolledCourse._id === course._id) || course
      );
      state.list = updatedCourses;
    },
  },
});

export const { loadClasses, enrollClass, setEnrolledClasses, setCourseDetails } = classSlice.actions;
export const classReducer = classSlice.reducer;
