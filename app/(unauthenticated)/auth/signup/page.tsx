import { FC } from "react";
import { signup } from "./signup.action";
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
            <h1 className="text-white text-2xl font-bold">SIGN UP</h1>
          </div>
        </div>
        <div className="p-6">
          <form action={signup}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium">
                Name
              </label>
              <input
                type="name"
                name="name"
                autoComplete="name"
                id="name"
                placeholder="Enter name"
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
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
              Sign Up
            </button>
          </form>
        </div>
      </div>
      {/* <form action={signup}>
        <div>
          <input name="name" placeholder="Enter your name..." required />
        </div>

        <div>
          <input
            name="email"
            placeholder="Enter your email..."
            required
            type="email"
          />
        </div>

        <div>
          <input
            name="password"
            placeholder="Enter your password..."
            required
            type="password"
          />
        </div>

        <button type="submit">Signup</button>
      </form> */}
    </>
  );
};

export default Page;
