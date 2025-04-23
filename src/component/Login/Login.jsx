// import React, { useContext, useState } from 'react';
// import { AuthContext } from '../../provider/Authprovider';
// import { Link, useNavigate } from 'react-router-dom';
// import { signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase login method
// import { auth } from '../../firebase.init';

// const Login = () => {
//     const [errorMsg, setErrorMsg] = useState('');
//     const [isSuccess, setIsSuccess] = useState(false);
//     const { userlogin, setUser } = useContext(AuthContext);
//     const navigate = useNavigate(); // Hook to navigate to another page after login

   
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const form = new FormData(e.target);
//         const email = form.get('email');
//         const password = form.get('password');

//         console.log({ email, password });

//         // Firebase authentication method for login
//         // signInWithEmailAndPassword(auth, email, password)
//         try {
//             const result = await userlogin(email, password);
//             const user = result.user;
            
//             const response = await fetch('http://localhost:3000/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 credentials: 'include', // this is CRUCIAL for session to work
//                 body: JSON.stringify({ email, password }),
//             });
//             const data = await response.json();

//             setUser(user);
//             setErrorMsg('');
//             setIsSuccess(true);
//             // navigate('/projectlist');

//                      // Redirect based on role
//                      if (data.user.role === 'investor') {
//                         navigate('/investor-dashboard');
//                     } else if (data.user.role === 'entrepreneur') {
//                         navigate('/entrepreneur-dashboard');
//                     } else if (data.user.role === 'staff') {
//                         navigate('/staff-dashboard');
//                     } else {
//                         navigate('/');
//                     }
//                 //  } else {
//                 //     setErrorMsg(data.message);
//                 // }
//         } catch (error) {
//             console.error('Error:', error);
//             setErrorMsg(error.message);
//             setIsSuccess(false); // Hide success message if error occurs
//         }
//     };

//     return (
//         <div>
//             <div>
//                 {/* <h1>Login</h1> */}
//                 <div className="hero min-h-screen bg-base-200">
//                     <div className="hero-content flex-col lg:flex-row-reverse">
//                         <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
//                             <h3 className="text-2xl font-bold">Login</h3>
//                             <form onSubmit={handleSubmit} className="card-body">
//                                 <div className="form-control">
//                                     <label className="label">
//                                         <span className="label-text">Email</span>
//                                     </label>
//                                     <input type="email" name="email" placeholder="email" className="input input-bordered" required />
//                                 </div>
//                                 <div className="form-control">
//                                     <label className="label">
//                                         <span className="label-text">Password</span>
//                                     </label>
//                                     <input type="password" name="password" placeholder="password" className="input input-bordered" required />
//                                     <label className="label">
//                                         <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
//                                     </label>
//                                 </div>
//                                 <div className="form-control mt-6">
//                                     <button className="btn btn-primary">Login</button>
//                                 </div>
//                                 <div>
//                                     {errorMsg && <p className="text-red-500 mt-2">{errorMsg}</p>}
//                                     {isSuccess && <p className="text-green-500 mt-2">Login Successful</p>}
//                                 </div>
//                             </form>
//                             <p>Don't have an account? {''}
//                                 <Link to='/register'>Register</Link>
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;


import React, { useContext, useState } from 'react';
import { AuthContext } from '../../provider/Authprovider';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [errorMsg, setErrorMsg] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData(e.target);
        const email = form.get('email');
        const password = form.get('password');

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Server did not return JSON. Maybe a redirect or error page?");
            }

            const data = await response.json();

            if (response.ok) {
                setUser(data.user);
                setIsSuccess(true);
                setErrorMsg('');

                if (data.user.role === 'investor') {
                    navigate('/investor-dashboard');
                } else if (data.user.role === 'entrepreneur') {
                    navigate('/entrepreneur-dashboard');
                } else if (data.user.role === 'staff') {
                    navigate('/staff-dashboard');
                } else {
                    navigate('/');
                }
            } else {
                setErrorMsg(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrorMsg(error.message);
            setIsSuccess(false);
        }
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <h3 className="text-2xl font-bold text-center mt-4">Login</h3>
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label"><span className="label-text">Email</span></label>
                            <input type="email" name="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Password</span></label>
                            <input type="password" name="password" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        {errorMsg && <p className="text-red-500 mt-2">{errorMsg}</p>}
                        {isSuccess && <p className="text-green-500 mt-2">Login Successful</p>}
                    </form>
                    <p className="text-center mb-4">
                        Don't have an account? <Link to="/register" className="text-blue-500 underline">Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
