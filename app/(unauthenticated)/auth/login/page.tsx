import { FC } from "react";
import { login } from "./login.action";
import Image from "next/image";

const Page: FC = () => {
  return (
    <>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative">
          <Image
            src="/bg-01.jpg"
            width={500}
            height={500}
            alt="Background Image"
            className="w-full h-40 object-cover"
          />
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <h1 className="text-white text-2xl font-bold">SIGN IN</h1>
          </div>
        </div>
        <div className="p-6">
          <form action={login}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                autoComplete="email"
                id="email"
                placeholder="Enter Email"
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                name="password"
                autoComplete="password"
                id="password"
                placeholder="Enter password"
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
            >
              Login
            </button>
            <div className="flex items-center mb-6">
              <span className="text-gray-700"> Do not have an account? </span>
              <a
                href="/auth/signup"
                className="text-sm text-green-500 hover:underline"
              >
                {" "}
                Sign Up
              </a>
            </div>
          </form>
        </div>
      </div>
      {/* <form action={login}>
      <div>
        <input autoComplete="username" name="email" type="email" />
      </div>

      <div>
        <input autoComplete="current-password" name="password" type="password" />
      </div>

      <button type="submit">
        Login
      </button>

      <hr />

      <p>
        No account? <Link href="/auth/signup">Signup</Link>
      </p>
      <p>
        <Link href="/userlist">All Users</Link>
      </p>
    </form> */}
    </>
  );
};

export default Page;
