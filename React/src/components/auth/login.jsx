import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login(updateState) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("http://localhost:3000/auth/login", 
    {
      email,
      password,
    },
    {
      withCredentials:true,
    });
    if (data.error) {
      return alert("Invalid Credentials");
    }

    if (data.response.role == "instructor") {

      return navigate("instructor");
    }
    if(data.response.isBlocked==true){
      return alert("Your Request is Blocked, Please contact the office");
    }
    if(data.response.isApproved==true){
      return navigate("trainee");;
    }
    if(data.response.isRequested==true){
      return alert("User has requested already, wait for your approval");
    }
    console.log("data", data)
    navigate("onboarding", { state: { userId: data.response.userId } });
    return alert("Logged in Successfully");
  };

  return (
    <div >
      <div className="flex overflow-x-hidden ">
        <div className="flex flex-col min-h-screen w-screen bg-[rgb(9,14,53)] overflow-x-hidden">
          <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
            <h1 className="text-3xl font-semibold text-center text-purple-700 text-bold">
              Login
            </h1>
            <form className="mt-6">
              <div className="mb-2">
                <label
                  className="block text-sm font-semibold text-gray-800"
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="mb-2">
                <label
                  className="block text-sm font-semibold text-gray-800"
                >
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <a
                href="#"
                className="text-xs text-purple-600 hover:underline"
              >
                Forget Password?
              </a>
              <div className="mt-6">
              <button
  disabled={!email || !password}
  onClick={(e) => { login(e) }}
  className={`w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform rounded-md focus:outline-none ${
    !email || !password
      ? "bg-gray-300 cursor-not-allowed hover:outline-none"
      : "bg-purple-700 hover:bg-purple-600 focus:bg-purple-600 focus:ring focus:ring-opacity-40"
  }`}
>
  Login
</button>

              </div>
            </form>

            <p className="mt-8 text-xs font-light text-center text-gray-700">
              {" "}
              Don't have an account?{" "}
              <span
                className="font-medium text-purple-600 hover:underline cursor-pointer"
                onClick={() => {
                  void updateState.updateState(false);
                }}
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
