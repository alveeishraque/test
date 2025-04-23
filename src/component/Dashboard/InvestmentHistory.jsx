import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../provider/Authprovider';
import { toast } from 'react-toastify';

const InvestmentHistory = () => {
    const { userInfo } = useContext(AuthContext);
    const [investments, setInvestments] = useState([]);
    const [totalInvested, setTotalInvested] = useState(0);

    useEffect(() => {
        if (userInfo?._id) {
            fetchInvestments();
        }
    }, [userInfo]);

    const fetchInvestments = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/investments/investor/${userInfo._id}`,
                { credentials: 'include' }
            );
            const data = await response.json();
            setInvestments(data.investments);
            setTotalInvested(data.totalInvested);
        } catch (error) {
            console.error('Error fetching investments:', error);
            toast.error('Failed to load investment history');
        }
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-primary">Investment History</h2>
                <p className="text-gray-600 mt-2">
                    Total Amount Invested: ${totalInvested.toLocaleString()}
                </p>
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Project</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Project Goal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {investments.map(investment => (
                            <tr key={investment._id}>
                                <td>{investment.projectId.title}</td>
                                <td>${investment.amount.toLocaleString()}</td>
                                <td>{new Date(investment.timestamp).toLocaleDateString()}</td>
                                <td>
                                    <span className={`badge ${
                                        investment.status === 'completed' ? 'badge-success' :
                                        investment.status === 'pending' ? 'badge-warning' :
                                        'badge-error'
                                    }`}>
                                        {investment.status}
                                    </span>
                                </td>
                                <td>${investment.projectId.fundingGoal.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                {investments.length === 0 && (
                    <div className="text-center py-4 text-gray-500">
                        No investments made yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default InvestmentHistory;