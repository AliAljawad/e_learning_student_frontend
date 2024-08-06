import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loadClasses,
  enrollClass,
  setEnrolledClasses,
} from "../../data_source/redux/classSlice/slice";
import "./courses.css";

const CoursesPage = () => {
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { list: courses, enrolled } = useSelector((state) => state.classes);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:8080/classes");
        dispatch(loadClasses(response.data));
      } catch (err) {
        setError("Failed to fetch courses. Please try again.");
      }
    };

    const fetchEnrolledClasses = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/enrollments/${currentUser.user._id}/classes`);
        const enrolledClasses = response.data.map(enrollment => enrollment.classId._id);
        dispatch(setEnrolledClasses(enrolledClasses));
      } catch (err) {
        setError("Failed to fetch enrolled classes. Please try again.");
      }
    };

    fetchCourses();
    fetchEnrolledClasses();
  }, [dispatch, currentUser.user._id]);

  const handleEnroll = async (courseId) => {
    try {
      await axios.post("http://localhost:8080/enrollments/enroll", {
        classId: courseId,
        userId: currentUser.user._id,
      });
      dispatch(enrollClass(courseId));
    } catch (err) {
      setError("Enrollment failed. Please try again.");
    }
  };

  const isEnrolled = (courseId) => enrolled.includes(courseId);

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="courses-page">
      <h2>Available Courses</h2>
      {error && <p className="error">{error}</p>}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      <button onClick={() => navigate('/dashboard')}>My Courses</button> 
      </div>
      <div className="courses-list">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div key={course._id} className="course-card">
              <img src={course.image} alt={course.name} className="course-image" />
              <div className="course-details">
                <h3>{course.name}</h3>
                <p>{course.description}</p>
                {!isEnrolled(course._id) ? (
                  <button onClick={() => handleEnroll(course._id)}>Enroll</button>
                ) : (
                  <button disabled>Already Enrolled</button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No courses found</p>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
