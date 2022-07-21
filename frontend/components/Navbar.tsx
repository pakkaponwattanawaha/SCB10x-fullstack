import { useRouter } from "next/router";
import Link from "next/link";
import Rocket from "public/Rocket.png";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, getUserState, logout } from "store/user/userSlice";
import { useState } from "react";
export const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  // dispatch(getUserDetails());
  const { token } = useSelector(getUserState);
  const [isOpen, setIsOpen] = useState(false);
  const createNavLink = (label: string, endpoint: string) => {
    const activeStyle =
      router.pathname.endsWith(endpoint) && !router.pathname.endsWith("login")
        ? "text-gray-500 border-b-2 border-purple-800"
        : "text-white hover:text-gray-400";

    return (
      <Link
        className="flex items-center border "
        href={{ pathname: `${endpoint}` }}
        replace
      >
        <a
          className={` hover:bg-gray-500/20  hover:text-white transition duration-500 text-white px-3 py-2 text-md font-medium mr-5 ${activeStyle}`}
        >
          {label}
        </a>
      </Link>
    );
  };
  const createDropDownLink = (label: string, endpoint: string) => {
    return (
      <Link
        className="flex items-center border "
        href={{ pathname: `${endpoint}` }}
        replace
      >
        <a
          className={` text-gray-300 hover:bg-gray-500/20  hover:text-white transition duration-500 block px-5 py-2 rounded-md text-base font-medium `}
        >
          {label}
        </a>
      </Link>
    );
  };
  const logoutHandler = () => {
    dispatch(logout());
    dispatch(getUserDetails());
  };

  return (
    <div className=" absolute w-full z-50">
      <nav className=" bg-colour-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30  border-b border-gray-200 border-opacity-20 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href={{ pathname: "/" }} replace>
                  <a>
                    <div className="ml-2 mt-[13px] mb-2 flex flex-row items-center  justify-center">
                      <img
                        className="w-[24px] mr-2"
                        alt="icon"
                        src="/Rocket.png"
                      />
                      <h1 className="font-medium  text-xl">10XDev</h1>
                    </div>
                  </a>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {createNavLink("Party", "/")}
                {createNavLink("Create", "/create")}
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
            <div className="flex items-center  -mr-2 hidden md:block">
              {token ? (
                <button onClick={() => logoutHandler()}>
                  <span
                    className={` hover:bg-gray-500/20 transition duration-500 text-white px-5 py-2 text-md font-medium mr-5 `}
                  >
                    Logout
                  </span>
                </button>
              ) : (
                <>{createNavLink("Login", "/login")}</>
              )}
            </div>
          </div>
        </div>
        {isOpen ? (
          <div>
            <div className="md:hidden z-50" id="mobile-menu">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {createDropDownLink("Party", "/")}
                {createDropDownLink("Create", "/create")}
                {token ? (
                  <div className="text-gray-300 hover:bg-gray-500/20 transition duration-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium ">
                    <button
                      className="flex w-full"
                      onClick={() => logoutHandler()}
                    >
                      <span className={``}>Logout</span>
                    </button>
                  </div>
                ) : (
                  <>{createDropDownLink("Login", "/login")}</>
                )}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </nav>
    </div>
  );
};
