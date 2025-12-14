import React from 'react';

import { useLocation, useNavigate } from 'react-router';

import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const SocialLogin = () => {
    const { googleLogin } = useAuth();
    const axiosSecure = useAxiosSecure();
    const location = useLocation();
    const navigate = useNavigate();


    const handleGoogleSignIn = () => {
        googleLogin()
            .then(result => {
                console.log(result.user);


                // create user in the database
                const userInfo = {
                    email: result.user.email,
                    displayName: result.user.displayName,
                    photoURL: result.user.photoURL
                }

                axiosSecure.post('/users', userInfo)
                    .then(res => {
                        console.log('user data has been stored', res.data)
                        navigate(location.state || '/');
                    })

            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className='text-center pb-8'>
            <p className='mb-2'>OR</p>
            <div className="w-full flex items-center justify-center">
                <button onClick={handleGoogleSignIn} className="btn btn-outline w-full hover:bg-base-200 text-base-content/80">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5 mr-1" alt="Google" />
                    Google
                </button>

            </div>
        </div>
    );
};

export default SocialLogin;