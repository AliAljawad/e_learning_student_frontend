import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import {
  loadClasses,
  enrollClass,
  setEnrolledClasses,
} from "../../data_source/redux/classSlice/slice";
import "./courses.css";

Modal.setAppElement('#root');

const CoursesPage = () => {
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
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

  const openModal = async (course) => {
    try {
      const response = await axios.get(`http://localhost:8080/classes/${course._id}`);
      const coursefiles = await axios.get(`http://localhost:8080/files/class/${course._id}`)
      response.data.files = coursefiles.data;
      setSelectedCourse(response.data);
      setModalIsOpen(true);
    } catch (err) {
      setError("Failed to fetch course details. Please try again.");
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedCourse(null);
  };

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
            <div key={course._id} className="course-card" onClick={() => openModal(course)}>
              <div className="course-details">
                <h3>{course.name}</h3>
                <p>{course.description}</p>
                {!isEnrolled(course._id) ? (
                  <button onClick={(e) => {e.stopPropagation(); handleEnroll(course._id);}}>Enroll</button>
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
      {selectedCourse && (
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Course Details">
          <h2>{selectedCourse.name}</h2>
          <p>{selectedCourse.description}</p>
          <h3>Files</h3>
          {selectedCourse.files && selectedCourse.files.length > 0 ? (
            <ul>
              {selectedCourse.files.map((file) => (
                <li key={file._id}>
                  {isEnrolled(selectedCourse._id) ? (
                    <a href={`http://localhost:8080/${file.path.replace(/\\/g, '/')}`} target="_blank" rel="noopener noreferrer">
                      {file.filename}
                    </a>
                  ) : (
                    <span>{file.filename}</span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No files available</p>
          )}
          <button onClick={closeModal}>Close</button>
        </Modal>
      )}
    </div>
  );
};

export default CoursesPage;
