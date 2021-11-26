import { NextComponentType } from "next";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { MenuAlt3Icon } from "@heroicons/react/solid";
import { LogoutIcon } from "@heroicons/react/outline";
import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";
import { useDispatch } from "react-redux";
import * as types from "../types";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const MenuNavbar: NextComponentType = () => {
  const { user, error, isLoading } = useUser();
  const dispatch = useDispatch();

  return (
    <Menu as="div" className="relative inline-block text-left ml-8 z-50">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          <MenuAlt3Icon className="h-10 w-10 cursor-pointer" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {/* <Menu.Item>
              {({ active }) => (
                <div className="flex items-center w-full text-left px-4 py-2 text-base sm:hidden">
                  <Image
                    src={user?.picture}
                    alt={user?.name}
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full ring-gray-900 ring-1 hover:opacity-80"
                  />
                  <p className="text-base ml-4 cursor-default">{user?.name}</p>
                </div>
              )}
            </Menu.Item> */}
            <Menu.Item>
              <a
                onClick={() => {
                  dispatch({ type: types.LOGOUT });
                }}
                href="/api/auth/logout"
                className={classNames(
                  "hover:bg-gray-100 hover:text-gray-900 text-gray-700 w-full flex items-center text-left px-4 py-2 text-base"
                )}
              >
                <LogoutIcon className="h-6 w-6 mr-2" />
                Log out
              </a>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default MenuNavbar;
