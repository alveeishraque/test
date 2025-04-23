import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../provider/Authprovider';
import Entroprojectlist from '../Projectlist/Entroprojectlist';

const EntrepreneurDash = () => {
    const { userInfo } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-base-100 px-4 sm:px-10 py-8">
            {/* Welcome Header */}
            <div className="text-center mb-10">
                <h1 className="text-4xl sm:text-5xl font-bold text-green-600 mb-2">
                    Welcome, {userInfo?.name}!
                </h1>
                <p className="text-gray-600 text-lg">
                    Here's a list of your projects added for investment.
                </p>
            </div>

            {/* Add Project Call-To-Action */}
            <div className="bg-base-200 rounded-xl shadow-md mb-12 py-10 px-6 flex flex-col items-center text-center">
                <h2 className="text-3xl font-semibold text-primary mb-4">Grow More</h2>
                <p className="text-gray-700 mb-6 max-w-xl">
                    Whether you're building a product, launching a startup, or changing the world — it all starts here.
                </p>
                <button
                    onClick={() => navigate('/addproject')}
                    className="btn btn-primary px-6"
                >
                    Add Project
                </button>
            </div>

            {/* Project List Section */}
            <div className="">
                <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                    Your Projects
                </h3>
                <Entroprojectlist />
            </div>
        </div>
    );
};

export default EntrepreneurDash;
