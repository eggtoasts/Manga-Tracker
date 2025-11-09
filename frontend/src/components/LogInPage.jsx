async function userRequest() {
  const ENDPOINT = "";
}

export default function LogInPage() {
  const logIn = async (e) => {
    e.preventDefault();
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
          />

          <label>Password</label>
          <input
            className="  rounded-md border border-gray-300 px-2.5 py-0.5 text-base"
            id="password"
            type="password"
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
