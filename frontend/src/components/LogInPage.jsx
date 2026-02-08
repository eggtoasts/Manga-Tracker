import axios from "axios";
import { use } from "react";
import { AuthContext } from "../context/AuthContext";

// gets user info!
async function fetchUserInfo(setUser) {
  const ENDPOINT =
    "https://manga-tracker-backend-al0s.onrender.com/users/profile";

  const token = localStorage.getItem("accessToken");

  if (!token) {
    console.log("user has no token.");
    return;
  }

  try {
    //go to route that will give us user info
    const response = await axios.get(ENDPOINT, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // the router responds w/ a user object holding userInfo
    const data = response.data.user;
    setUser(data);

    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

async function userRequest(username, password, setUser) {
  const ENDPOINT =
    "https://manga-tracker-backend-al0s.onrender.com/users/login";
  try {
    const res = await axios.post(ENDPOINT, {
      username: username,
      password: password,
    });
    const data = res.data;
    console.log(data);

    // If user has a JWT, we store it in local storage.
    if (data.accessToken) {
      console.log(data.accessToken);
      await fetchUserInfo(setUser);
      localStorage.setItem("accessToken", data.accessToken);
    }
  } catch (err) {
    console.log(err);
  }
}

export default function LogInPage({ setSelectedDialog }) {
  const { user, setUser } = use(AuthContext);
  const logIn = async (e) => {
    e.preventDefault();

    const { username, password } = e.target;
    userRequest(username.value, password.value, setUser);
  };

  return (
    <>
      <div className="text-sm absolute top-16 right-4 w-80 bg-white border rounded-lg shadow-lg z-50 p-6">
        <form onSubmit={(e) => logIn(e)} className="flex flex-col">
          <h3 className="font-bold">Sign In</h3>

          <label>Username</label>
          <input
            className="  rounded-md border border-gray-300 px-2.5 py-0.5 text-base"
            type="text"
            placeholder=""
            name="username"
          />

          <label>Password</label>
          <input
            className="  rounded-md border border-gray-300 px-2.5 py-0.5 text-base"
            id="password"
            type="password"
            name="password"
          />

          <button className="mt-2 mr-auto px-3 py-1 main rounded-sm text-white">
            Sign In
          </button>

          <div>
            <h3 className="text-gray-400 mt-2">Don't have an Account?</h3>
            <span
              className="font-semibold cursor-pointer"
              onClick={() => {
                setSelectedDialog("sign-up");
              }}
            >
              Create one
            </span>
          </div>
        </form>
      </div>
    </>
  );
}
