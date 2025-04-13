import React, { useState, useRef } from 'react';
import Button from '../components/Button.jsx';
import axios from "axios";
import { useNavigate } from 'react-router';
import { useAuth } from '../utils/AuthProvider.jsx';

const Auth = () => {
  let name= useRef();
  let password= useRef();
  const {setAuth}= useAuth();
  let navigate = useNavigate();
  let phone= useRef();
  const [signIn, setSignIn] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameValue = name?.current?.value || null;
    const phoneValue = phone?.current?.value || null;
    const passwordValue = password?.current?.value || null;
  
    if (signIn) {
      if (!phoneValue || !passwordValue) {
        alert("All fields are mandatory!");
      } else {
        const data = {
          email: phoneValue.trim(),
          password: passwordValue.trim(),
        };
        makeLogin(data);
      }
    } else {
      if (!nameValue || !phoneValue || !passwordValue) {
        alert("All fields are mandatory!");
      } else {
        const data = {
          name: nameValue.trim(),
          email: phoneValue.trim(),
          password: passwordValue.trim(),
        };
        makeLogin(data);
      }
    }
  };

  const makeLogin = async (data) => {
    try {
      const res = await axios.post(`${apiUrl}/user${signIn ? `/signIn` : `/signUp`}`, data, {withCredentials: true});
      if(res.data.ok){
        console.log(res.data.ok)
        setAuth({ isAuth: true, user: res.data.data})
         return navigate("/home");
      }
    } catch (error) {
      console.log("Error occurred", error);
    }
  };

  const toggleSignIn = () => {
    setSignIn((prev) => !prev);
  }

  const FormInput = ({ placeholderText, type, name}) => {
    return (
      <div className="w-full border px-3 py-2 rounded-sm dark:border-neutral-500 dark:text-gray-200 dark:bg-gray-800  border-gray-300 text-gray-700 bg-white">
        <input type={type} placeholder={placeholderText} className="w-full bg-transparent text-inherit placeholder-gray-400 focus:outline-none" ref={name}/>
      </div>
    )
  }

  return (
    <div className={` my-28 mx-auto w-full max-w-[450px] box-border`}>
      <div className={`border-2 py-3 px-14 rounded-sm mb-2.5 dark:border-gray-700 dark:bg-gray-900 border-gray-300 bg-gray-100 `}>
        <div className={`text-[42px] font-bold font-opensans text-center  dark:text-gray-200 text-gray-800`}>
          {/* Logo */}
          InstaSocial
        </div>
        <form className='mt-10 flex flex-col item-center gap-2'>
          {/* input */}
          {signIn ||
            <FormInput key={`name`}  placeholderText={`Enter your name`} type={`text`} name={name} />
          }
          <FormInput key={`phone`}  placeholderText={`Phone number, username, or email`} type={`text`}  name={phone}/>
          <FormInput key={`password`} placeholderText={`Password`} type={`password`} name={password} />

          <div className='mt-2'>
            <Button text={'Log in'} handleClick={handleSubmit} disabled={false} />
          </div>
        </form>
        <div className='flex items-center mt-4 justify-center'>
          {/* border */}
          <div className={`border dark:border-white border-gray-300 mr-4 mt-1 w-[40%]`}></div>
          <div className={`dark:text-gray-200 text-gray-700`}>or</div>
          <div className={`border dark:border-white border-gray-300 ml-4 mt-1 w-[40%]`}></div>
        </div>
        <div className='text-blue-400 flex-col flex items-center gap-4 mt-4'>
          {/* OAuth */}
          <span className=''>{signIn ? `Sign Up` : `Sign In`} with Google</span>
          <span className='text-gray-500'>Forgot Password</span>
        </div>
      </div>
      <div className={`border-2 rounded-sm py-3 px-14 dark:border-gray-700 dark:bg-gray-900 border-gray-300 bg-gray-100 `}>
        <h3 className={`py-2 text-center dark:text-gray-300 text-gray-700 `}>{signIn ? `Didn't have an Account?` : `Already have an account?`} <span className='text-blue-400 cursor-pointer' onClick={toggleSignIn}>{signIn ? `Sign Up` : `Sign In`}</span></h3>
      </div>
    </div>
  );
};

export default Auth;