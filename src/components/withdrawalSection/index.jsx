import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';

const WithdrawalsSection = ({ userId }) => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/withdrawals/${userId}`);
        console.log('API Response:', response.data);
        if (Array.isArray(response.data)) {
          setWithdrawals(response.data);
        } else {
          console.error('Invalid data format');
          setError('Invalid data format received from server.');
        }
      } catch (err) {
        console.error('Fetch Error:', err);
        setError('Failed to fetch withdrawals. Please try again.');
      }
    };

    if (userId) {
      fetchWithdrawals();
    }
  }, [userId]);

  return (
    <section className="withdrawals-section">
      <h2>Your Withdrawals</h2>
      {error ? (
        <div className="error-message">{error}</div>
      ) : withdrawals.length === 0 ? (
        <p>No withdrawals found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {withdrawals.map((withdrawal) => (
              <tr key={withdrawal._id}>
                <td>{withdrawal.classId?.name || 'N/A'}</td>
                <td>{withdrawal.reason || 'N/A'}</td>
                <td>{withdrawal.status || 'Pending'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default WithdrawalsSection;
