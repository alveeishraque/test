import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../provider/Authprovider';
import { useNavigate } from 'react-router-dom';

const EntrepreneurUpdate = () => {
    const { userInfo } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        contactInfo: '',
        image: '',
        documents: ''
    });

    useEffect(() => {
        if (userInfo?._id) {
            fetch(`http://localhost:3000/entrepreneur-profile/${userInfo._id}`)
                .then(response => response.json())
                .then(data => {
                    setProfileData({
                        name: data.name,
                        email: data.email,
                        contactInfo: data.contactInfo,
                        image: data.image,
                        documents: data.documents
                    });
                })
                .catch(error => {
                    console.error('Error fetching profile data:', error);
                });
        }
    }, [userInfo?._id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData({
            ...profileData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        fetch(`http://localhost:3000/entrepreneur-profile/${userInfo._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileData),
            credentials: 'include'
        })
        .then(response => {
            if (!response.ok) throw new Error('Update failed');
            navigate('/entrepreneurprofile');
        })
        .catch(error => {
            console.error('Error updating profile:', error);
        });
    };

    return (
        <div className="min-h-screen p-6 bg-base-200">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-blue-600">
                    Update {userInfo?.name}'s Profile
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="max-w-3xl p-6 mx-auto space-y-6 rounded-lg shadow-lg bg-base-100">
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleInputChange}
                        className="w-full input input-bordered"
                    />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700">Contact Info</label>
                        <input
                            type="text"
                            name="contactInfo"
                            value={profileData.contactInfo}
                            onChange={handleInputChange}
                            className="w-full input input-bordered"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700">Profile Image URL</label>
                    <input
                        type="text"
                        name="image"
                        value={profileData.image}
                        onChange={handleInputChange}
                        className="w-full input input-bordered"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700">Documents URL</label>
                    <input
                        type="text"
                        name="documents"
                        value={profileData.documents}
                        onChange={handleInputChange}
                        className="w-full input input-bordered"
                    />
                </div>

                <button type="submit" className="btn btn-primary">Update Profile</button>
                <button
                    type="button"
                    onClick={() => navigate('/entrepreneur-dashboard')}
                    className="ml-4 btn btn-secondary"
                >
                    Done
                </button>
            </form>
        </div>
    );
};

export default EntrepreneurUpdate;
