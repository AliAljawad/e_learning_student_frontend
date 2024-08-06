import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setEnrolledClasses } from '../../data_source/redux/classSlice/slice';
import { setWithdrawals } from '../../data_source/redux/withdrawalSlice/slice'; 
import { FaTrash } from 'react-icons/fa';
import './style.css';

const CoursesSection = ({ userId }) => {
  const dispatch = useDispatch();
  const enrolledCourses = useSelector((state) => state.classes.enrolled);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/enrollments/${userId}/classes`);
        dispatch(setEnrolledClasses(response.data));
      } catch (err) {
        setError('Failed to fetch enrolled courses. Please try again.');
      }
    };

    fetchEnrolledCourses();
  }, [userId, dispatch]);

  const handleWithdraw = async (classId) => {
    const reason = prompt('Please provide a reason for withdrawal:');

    if (!reason) {
      alert('Withdrawal reason is required.');
      return;
    }

    try {
      await axios.post('http://localhost:8080/withdrawals/request', { userId, classId, reason });
      dispatch(setWithdrawals({ userId, classId, reason })); 
      alert('Withdrawal request submitted successfully.');
    } catch (err) {
      setError('Failed to request withdrawal. Please try again.');
    }
  };

  if (error) return <div className="error-message">{error}</div>;

  return (
    <section className="courses-section">
      <h2>Your Courses</h2>
      <table>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Enrollment Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {enrolledCourses.map((enrollment) => (
            <tr key={enrollment._id}>
              <td>{enrollment.classId.name}</td>
              <td>{new Date(enrollment.enrollmentDate).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleWithdraw(enrollment.classId._id)} className="withdraw-btn">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default CoursesSection;
