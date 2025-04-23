import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../provider/Authprovider';
import { useNavigate } from 'react-router-dom';

const EntrepreneurProfile = () => {
    const { userInfo } = useContext(AuthContext);
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (!userInfo?._id) {
            console.error('User ID is missing.');
            return;
        }

        fetch(`http://localhost:3000/entrepreneur-profile/${userInfo._id}`)
            .then((response) => response.json())
            .then((data) => {
                setProfile(data); 
                console.log("data", data);
            })
            .catch((error) => {
                console.error('Error fetching profile data:', error);
            });
    }, [userInfo?._id]);

    const handleMissingInfo = (value) => {
        return value ? value : 'NaN';
    };

    const handleEditClick = () => {
        navigate('/entrepreneur-edit-profile');
    };

    return (
        <div className="min-h-screen p-6 bg-base-200">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-blue-600">
                    {handleMissingInfo(profile?.name)}'s Profile
                </h1>
            </div>

            <div className="max-w-4xl p-6 mx-auto rounded-lg shadow-lg bg-slate-400">
                <div className="flex justify-center mb-6">
                    <img
                        src={handleMissingInfo(profile?.image)}
                        alt="Profile"
                        className="object-cover w-40 h-40 border-4 border-blue-600 rounded-full"
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <h2 className="text-lg font-medium text-gray-700">Name:</h2>
                        <p className="text-sm text-black">{handleMissingInfo(profile?.name)}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                        <h2 className="text-lg font-medium text-gray-700">Email:</h2>
                        <p className="text-sm text-black">{handleMissingInfo(profile?.email)}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                        <h2 className="text-lg font-medium text-gray-700">Contact Info:</h2>
                        <p className="text-sm text-black">{handleMissingInfo(profile?.contactInfo)}</p>
                    </div>
                </div>

                <div className="flex items-center mt-6 space-x-2">
                    <h2 className="text-lg font-medium text-gray-700">Documents:</h2>
                    <p className="text-sm text-black">
                        {profile?.documents ? (
                            <a
                                href={profile?.documents}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline transition-all duration-200 hover:text-blue-700"
                            >
                                View Document
                            </a>
                        ) : (
                            'NaN'
                        )}
                    </p>
                </div>

                <button
                    onClick={handleEditClick}
                    className="mt-4 btn btn-active btn-primary"
                >
                    Edit
                </button>
                <button
                    onClick={() => navigate('/entrepreneur-dashboard')}
                    className="mt-4 ml-4 btn btn-active btn-secondary"
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default EntrepreneurProfile;
