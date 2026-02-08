import axios from "axios";
import { useState } from "react";
async function connectToSignUpRoute(username, email, password) {
  // tbh i dont think we rlly need email
  console.log(username, email, password);
  const ENDPOINT =
    "https://manga-tracker-backend-al0s.onrender.com/users/signup";
  try {
    const res = await axios.post(ENDPOINT, {
      username: username,
      password: password,
    });
    const data = res.data;
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

export default function SignUpPage() {
  const [passwordError, setPasswordError] = useState(false);

  const signUp = async (e) => {
    e.preventDefault();

    console.log(e.target.password.value, e.target.confirmPassword.value);

    if (!e.target.password.value) {
      setPasswordError("Please enter a password.");
      return;
    }

    if (e.target.password.value !== e.target.confirmPassword.value) {
      setPasswordError("Passwords do not match.");
      return;
    }

    setPasswordError("Match");

    const { username, email, password } = e.target;

    connectToSignUpRoute(username.value, email.value, password.value);
  };

  return (
    <>
      <div className=" text-sm bg-white fixed top-[50%] left-[50%] z-50 w-full translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg max-w-md">
        <form onSubmit={(e) => signUp(e)} className="flex flex-col gap-2">
          <h2 className=" font-bold">Create an Account</h2>
          <label className="font-semibold">Username</label>
          <input
            name="username"
            type="text"
            placeholder=""
            className=" rounded-md border px-3 py-1 text-base"
            minLength={3}
            maxLength={25}
          />

          {/* <label className="font-semibold">Email</label>
          <input
            name="email"
            type="password"
            placeholder="p"
            className=" rounded-md border px-3 py-1 text-base"
          /> */}

          <label className="font-semibold">Password</label>
          <input
            name="password"
            type="password"
            placeholder=""
            className=" rounded-md border px-3 py-1 text-base"
          />

          <label className="font-semibold">Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Re-enter password"
            className=" rounded-md border px-3 py-1 text-base"
          />

          {passwordError && passwordError !== "Match" && (
            <p className="text-red-500">{passwordError}</p>
          )}

          <button className="mt-2 mr-auto px-3 py-1 main text-white rounded-sm">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}
