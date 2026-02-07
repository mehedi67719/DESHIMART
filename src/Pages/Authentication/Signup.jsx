import { useForm } from 'react-hook-form';
import { CgProfile } from 'react-icons/cg';
import { FaGooglePlus } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';
import Useauth from '../../Component/Useauth';
import Swal from 'sweetalert2';


const Signup = () => {


    const { signupwithemail, Loginwithgoogle } = Useauth()
    const navigate = useNavigate()

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const password = watch("password");

    const onsubmit = (data) => {
        signupwithemail(data.email, data.password,data.name)

            .then(() => {
                Swal.fire({

                    icon: 'success',
                    title: 'Account Created!',
                    text: 'Your account has been created successfully.',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true



                })
                    .then(() => {
                        navigate("/")
                    })
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: err.message,
                    confirmButtonColor: '#ef4444'
                });
            })
    };


    const handleGoogleLogin = () => {
        Loginwithgoogle()
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Account Created!',
                    text: 'Your account has been created successfully.',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true
                })
                    .then(() => {
                        navigate("/")
                    })
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: err.message,
                    confirmButtonColor: '#ef4444'
                });
            })
    }

    return (
        <div className='w-full max-w-lg mx-auto rounded-3xl my-20 p-6 md:p-10 bg-white shadow-2xl'>

            <div className='flex justify-center mb-5'>
                <CgProfile className='text-green-500 text-8xl' />
            </div>

            <h2 className='text-3xl font-bold text-center mb-2'>Create Account</h2>
            <p className='text-center text-gray-500 mb-8'>Sign up to get started with your account</p>

            <form onSubmit={handleSubmit(onsubmit)} className='flex flex-col gap-6'>

                <div className='flex flex-col'>
                    <label className='text-lg font-semibold text-gray-700 mb-2'>Full Name</label>
                    <input
                        type="text"
                        {...register("name", { required: "Name is required" })}
                        placeholder='Enter your name'
                        className='outline-none border-2 border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 py-3 px-4 rounded-xl transition-all duration-200'
                    />
                    {errors.name && <p className='text-red-500 mt-1'>{errors.name.message}</p>}
                </div>

                <div className='flex flex-col'>
                    <label className='text-lg font-semibold text-gray-700 mb-2'>Email Address</label>
                    <input
                        type="email"
                        {...register("email", { required: "Email is required" })}
                        placeholder='Enter your email'
                        className='outline-none border-2 border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 py-3 px-4 rounded-xl transition-all duration-200'
                    />
                    {errors.email && <p className='text-red-500 mt-1'>{errors.email.message}</p>}
                </div>

                <div className='flex flex-col'>
                    <label className='text-lg font-semibold text-gray-700 mb-2'>Password</label>
                    <input
                        type="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be at least 6 characters" }
                        })}
                        placeholder='Enter your password'
                        className='outline-none border-2 border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 py-3 px-4 rounded-xl transition-all duration-200'
                    />
                    {errors.password && <p className='text-red-500 mt-1'>{errors.password.message}</p>}
                </div>

                <div className='flex flex-col'>
                    <label className='text-lg font-semibold text-gray-700 mb-2'>Confirm Password</label>
                    <input
                        type="password"
                        {...register("confirmpassword", {
                            required: "Confirm Password is required",
                            validate: value => value === password || "Passwords do not match"
                        })}
                        placeholder='Confirm your password'
                        className='outline-none border-2 border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 py-3 px-4 rounded-xl transition-all duration-200'
                    />
                    {errors.confirmpassword && <p className='text-red-500 mt-1'>{errors.confirmpassword.message}</p>}
                </div>

                <button
                    type='submit'
                    className='py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-bold text-xl rounded-2xl shadow-lg hover:from-green-500 hover:to-green-700 hover:scale-105 transition-all duration-300'
                >
                    Sign Up
                </button>
            </form>

            <div className='flex items-center my-6'>
                <hr className='flex-1 border-gray-300' />
                <span className='mx-2 text-gray-400'>OR</span>
                <hr className='flex-1 border-gray-300' />
            </div>

            <button
                onClick={handleGoogleLogin}
                className='flex items-center justify-center gap-3 py-3 mb-10 w-full border-2 hover:bg-green-500 border-gray-300 rounded-xl shadow hover:shadow-md transition-all duration-300 '
            >
                <FaGooglePlus className='text-black text-3xl ' />
                <span className='text-gray-700  font-semibold text-lg'>
                    Continue with Google
                </span>
            </button>

            <p className='text-center text-gray-500'>
                Already have an account?{' '}
                <Link to="/sign-in" className='text-green-500 font-semibold hover:underline'>
                    Sign In
                </Link>
            </p>
        </div>
    );
};

export default Signup;
