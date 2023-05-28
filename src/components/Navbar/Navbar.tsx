import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/header.css";
import {
  getAuthRole,
  getAuthToken,
  useIsAuthJwt,
} from "../trainer/hooks/useIsAuthJwt";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "Team", href: "/team", current: false },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export const NavBar = () => {
  const token = getAuthToken();
  const role = getAuthRole();
  return (
    <>
      <header>
        {token ? (
          role == "trainer" ? (
            <div className="head">
              {/* //<div>token y trainer</div> */}
              <Link to="/">Home</Link>
              <Link to="/trainer/clients">Clients</Link>
              <Link to="/client_invitation">Client Invitation</Link>
              <Link to="/trainer/create_training">Create training</Link>
              <Link to="/trainer/trainings">Trainings</Link>
              <Link to="trainer/create_exercise">Create Exercises</Link>
              <Link to="/trainer/asign_schedule_training">
                Asign Scheduled training
              </Link>
              <Link to="/logout">Logout</Link>
            </div>
          ) : (
            // <div>token y client</div>
            <div className="Navbar">
              <Link to="/">Home</Link>
              <Link to="/client/scheduled_training">Scheduled training</Link>
              <Link to="/logout">Logout</Link>
            </div>
          )
        ) : (
          <Disclosure as="nav" className="bg-customDark">
            {({ open }: any) => (
              <>
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                  <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                      {/* Mobile menu button*/}
                      <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <Bars3Icon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                      <div className="flex flex-shrink-0 items-center">
                        <img
                          className="block h-8 w-auto lg:hidden"
                          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                          alt="Your Company"
                        />
                        <img
                          className="hidden h-8 w-auto lg:block"
                          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                          alt="Your Company"
                        />
                      </div>
                      <div className="hidden sm:ml-6 sm:block">
                        <div className="flex space-x-4">
                          {navigation.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? "bg-gray-900 text-white"
                                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                "rounded-md px-3 py-2 text-sm font-medium"
                              )}
                              aria-current={item.current ? "page" : undefined}
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="sm:hidden">
                  <div className="space-y-1 px-2 pb-3 pt-2">
                    {navigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "block rounded-md px-3 py-2 text-base font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        )}
      </header>
    </>
  );
};
