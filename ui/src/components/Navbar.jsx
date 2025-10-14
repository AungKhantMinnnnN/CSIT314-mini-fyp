import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const navigation = [
    { name: 'Menu Item 1', href: "#", current: true },
    { name: 'Menu Item 2', href: "#", current: true },
    { name: 'Menu Item 3', href: "#", current: true },
    { name: 'Menu Item 4', href: "#", current: true },
]

const Navbar = () => {

    const [username, setUsername] = useState("");
    const {logout} = useAuth();
    const navigate = useNavigate();

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    useEffect(() => {
        const storedUsername = localStorage.getItem("user");
        setUsername(storedUsername);
    }, []);

    const handleLogOut = async (e) => {
        e.preventDefault();

        console.log("Hanlde logout called.");

        try{
            const username = localStorage.getItem("user");
            console.log("Handle logout username: " + username);
            var response = await logout(username);
            console.log(response);
        }
        catch (error){
            console.error(error.message);
            console.error(error.stack);
        }
    }

    const handleLogInRedirect = () => {
        navigate("/login")
    }


    return (
        <Disclosure as="nav" className="relative bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="hidden sm:ml-6 sm:block">
                        <div className="flex space-x-4">
                            {navigation.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                aria-current={item.current ? 'page' : undefined}
                                className={classNames(
                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white',
                                'rounded-md px-3 py-2 text-sm font-medium',
                                )}
                            >
                                {item.name}
                            </a>
                            ))}
                        </div>
                    </div>

                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {/* If there is NO username stored in sessionStorage → show LogIn button */}
                        {!username ? (
                            <button
                            type="button"
                            onClick={handleLogInRedirect}
                            className="justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                            LogIn
                            </button>
                        ) : (
                            // ✅ If there IS a username → show user menu
                            <Menu as="div" className="relative ml-3">
                            <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">Open user menu</span>
                                <img
                                alt=""
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
                                />
                            </MenuButton>

                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline outline-black/5 transition data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[enter]:ease-out data-[leave]:duration-75 data-[leave]:ease-in"
                            >
                                <MenuItem>
                                <button
                                    onClick={handleLogOut}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    LogOut
                                </button>
                                </MenuItem>
                            </MenuItems>
                            </Menu>
                        )}
                    </div>
                </div>
            </div>
        </Disclosure>
    );
}

export default Navbar;