import { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [issignIn, setIsSignIn] = useState(true);
  const [isError, setIsError] = useState(null);
  // const navigate = useNavigate();

  const handleSignIn = () => {
    setIsSignIn(!issignIn);
  };

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const HandleLogin = async () => {
    const bodyData = !issignIn
      ? { email: email.current.value, password: password.current.value }
      : {
          name: name.current.value,
          email: email.current.value,
          password: password.current.value,
        };

    if (
      !email.current.value ||
      !password.current.value ||
      (issignIn && !name.current.value)
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const endpoint = !issignIn
      ? "http://localhost:3030/signIn"
      : "http://localhost:3030/signUp";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      const result = await response.json();

      if (!response.ok) {
        setIsError(result.message);
        setTimeout(() => {
          setIsError(null);
        }, 4000);
      }
      setIsError(result.message);
      // navigate("/main");
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  return (
    <>
      <div className="min-w-[200px] w-[17vw] px-[3em] py-[2em] h-[500px]  bg-white rounded-md drop-shadow-lg flex flex-col justify-between border-2 border-black">
        <div className="">
          <div className="text-3xl font-bold text-center mb-[1.4em]">
            <h1 className="text-gray-600">
              {issignIn ? "Sign Up" : "Sign In"}
            </h1>
          </div>
          <div className=" flex flex-col gap-[0.7em]">
            {issignIn ? (
              <div className="flex flex-col gap-[0.4em]">
                <h3 className="text-lg font-semibold text-gray-600">Name</h3>
                <input
                  type="text"
                  ref={name}
                  placeholder="Enter your name"
                  className="outline-none text-gray-600 px-2 font-sans"
                />
                <div className="w-[100%] h-[1px] bg-gray-500 rounded-lg"></div>
              </div>
            ) : (
              <></>
            )}
            <div className="flex flex-col gap-[0.4em]">
              <h3 className="text-lg font-semibold text-gray-600">Email</h3>
              <input
                type="text"
                placeholder="Enter your email"
                ref={email}
                className="outline-none text-gray-600 px-2 font-sans"
              />
              <div className="w-[100%] h-[1px] bg-gray-500 rounded-lg"></div>
            </div>
            <div className="flex flex-col gap-[0.4em]">
              <h3 className="text-lg font-semibold text-gray-600">Password</h3>
              <input
                type="password"
                ref={password}
                placeholder="Enter your password"
                className="outline-none text-gray-600 px-2 font-sans"
              />
              <div className="w-[100%] h-[1px] bg-gray-500 rounded-lg"></div>
            </div>

            {!issignIn ? (
              <div className="text-end text-gray-500">
                <p>Forgot Password?</p>
              </div>
            ) : (
              <></>
            )}
            <div className="mt-3"></div>
            <button
              className="w-[100%] bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-pink-200 to-90%  rounded-3xl py-[0.4em] font-sans font-medium"
              onClick={HandleLogin}
            >
              {issignIn ? "Sign Up" : "Login"}
            </button>
            <div className="text-red-600 font-thin">
              {isError ? <p>{isError}</p> : <></>}
            </div>
            <div className="text-center mt-[1em] text-gray-600">
              <p>
                {!issignIn
                  ? "Don`t have an account? "
                  : "Already have an account? "}
                <span
                  className="text-red-600 cursor-pointer"
                  onClick={handleSignIn}
                >
                  {!issignIn ? "Sign Up" : "Sign In"}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="text-gray-500 font-thin text-sm text-center">
          <p>All rights reserved &#169; 2024 </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
