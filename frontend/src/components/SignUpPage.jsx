export default function SignUpPage() {
  //this should go to signup route
  const signUp = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className=" text-sm bg-white fixed top-[50%] left-[50%] z-50 w-full translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg max-w-md">
        <form onSubmit={(e) => signUp(e)} className="flex flex-col">
          <h2 className=" font-semibold">Create an Account</h2>
          <label className="font-semibold">Name</label>
          <input
            type="password"
            placeholder="p"
            className=" rounded-md border px-3 py-1 text-base"
          />

          <label className="font-semibold">Email</label>
          <input
            type="password"
            placeholder="p"
            className=" rounded-md border px-3 py-1 text-base"
          />

          <label className="font-semibold">Password</label>
          <input
            type="password"
            placeholder="p"
            className=" rounded-md border px-3 py-1 text-base"
          />

          <label className="font-semibold">Confirm Password</label>
          <input
            type="password"
            placeholder="p"
            className=" rounded-md border px-3 py-1 text-base"
          />

          <button className="mr-auto px-3 py-1 bg-black text-white rounded-sm">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}
