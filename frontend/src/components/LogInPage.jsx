import axios from "axios";

// gets user info!
async function fetchUserInfo() {
  const ENDPOINT = "http://localhost:3000/users/profile";

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

    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

async function userRequest(username, password) {
  const ENDPOINT = "http://localhost:3000/users/login";
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
      await fetchUserInfo();
      localStorage.setItem("accessToken", data.accessToken);
    }
  } catch (err) {
    console.log(err);
  }
}

export default function LogInPage() {
  const logIn = async (e) => {
    e.preventDefault();

    const { username, password } = e.target;
    userRequest(username.value, password.value);
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

          <button className="mr-auto px-3 py-1 bg-black rounded-sm text-white">
            Sign In
          </button>

          <div>
            <h3 className="text-gray-400">Don't have an Account?</h3>
            <span className="font-semibold">Create one</span>
          </div>
        </form>
      </div>
    </>
  );
}
