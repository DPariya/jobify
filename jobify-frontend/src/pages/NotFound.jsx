import React from "react";
import { Link } from "react-router";
const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white py-48">
      <div className="flex flex-col">
        <div className="flex flex-col items-center">
          <div className="text-indigo-500 font-bold text-7xl">404</div>

          <div className="font-bold text-3xl xl:text-7xl lg:text-6xl md:text-5xl mt-10">
            This page does not exist
          </div>

          <div className="text-gray-400 font-medium text-sm md:text-xl lg:text-2xl mt-8">
            The page you are looking for could not be found.
          </div>
        </div>

        <div className="flex flex-col mt-48">
          <div className="text-gray-400 font-bold uppercase">Continue With</div>

          <div className="flex flex-col items-stretch mt-5">
            <div
              className="flex flex-row group px-4 py-8
                    border-t hover:cursor-pointer
                    transition-all duration-200 delay-100"
            >
              <Link to="/dashboard">
                <div className="grow flex flex-col pl-5 pt-2">
                  <div className="font-bold text-sm md:text-lg lg:text-xl group-hover:underline">
                    Home Page
                  </div>

                  <div
                    className="font-semibold text-sm md:text-md lg:text-lg
                            text-gray-400 group-hover:text-gray-500
                            transition-all duration-200 delay-100"
                  >
                    Everything starts here
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
