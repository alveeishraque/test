import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StaffDash = () => {
    const [pendingProjects, setPendingProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchPendingProjects = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/staff/pending-projects', {
                withCredentials: true
            });
            setPendingProjects(response.data);
            setLoading(false);
        } catch (err) {
            if (err.response?.status === 403) {
                navigate('/login');
            }
            setError('Failed to fetch pending projects');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingProjects();
    }, []);

    const handleApproval = async (projectId, action) => {
        try {
            await axios.patch(
                `http://localhost:3000/api/staff/${action}-project/${projectId}`,
                {},
                { withCredentials: true }
            );
            // Refresh the list after approval/rejection
            fetchPendingProjects();
        } catch (err) {
            setError(`Failed to ${action} project`);
        }
    };

    if (loading) return <div className="text-center mt-5">Loading...</div>;
    if (error) return <div className="text-center mt-5 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Staff Dashboard - Pending Projects</h1>
            
            {pendingProjects.length === 0 ? (
                <p className="text-gray-600">No pending projects to review.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pendingProjects.map((project) => (
                        <div key={project._id} className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                            <p className="text-gray-600 mb-4">{project.description}</p>
                            
                            <div className="mb-4">
                                <p className="text-sm text-gray-500">
                                    <strong>Entrepreneur:</strong> {project.createdBy?.name || 'N/A'}
                                </p>
                                <p className="text-sm text-gray-500">
                                    <strong>Contact:</strong> {project.createdBy?.email || 'N/A'}
                                </p>
                                <p className="text-sm text-gray-500">
                                    <strong>Funding Goal:</strong> ${project.fundingGoal?.toLocaleString() || '0'}
                                </p>
                            </div>

                            {project.img && (
                                <img 
                                    src={project.img} 
                                    alt={project.title}
                                    className="w-full h-48 object-cover rounded-md mb-4"
                                />
                            )}
                            
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={() => handleApproval(project._id, 'reject')}
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                >
                                    Reject
                                </button>
                                <button
                                    onClick={() => handleApproval(project._id, 'approve')}
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                                >
                                    Approve
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StaffDash;