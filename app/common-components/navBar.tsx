import { Link } from "@remix-run/react";
import { useState } from "react";

export const NavBar = () => {
  const [openMobileNav, setOpenMobileNav] = useState(false);

  const links = [
    {
      name: "Calendar",
      route: "/",
    },
    {
      name: "Full Series Timeline",
      route: "/timeline",
    },
    {
      name: "Map of Filming Locations",
      route: "/map",
    },
    {
      name: "drinking game cues",
      route: "/drinkingCues",
    },
  ];
  return (
    <div>
      <div className="block lg:hidden m-4">
        <button
          className="flex items-center px-3 py-2 border-2 bg-gradient-to-r from-cyan-800 to-white rounded text-red-500 border-red-500 font-bold text-xl mx-2.5"
          onClick={() => setOpenMobileNav(!openMobileNav)}
        >
          menu
        </button>
        {openMobileNav && (
          <div className="bg-gray-700 rounded-md mt-2">
            <ul className="flex flex-col items-center justify-between min-h-[250px]">
              {links.map((link, index) => (
                <li className="font-medium lowercase my-8" key={index}>
                  <a href={link.route}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="lg:flex justify-between hidden bg-gradient-to-r from-cyan-100 to-white px-8 py-2 mb-4">
        {links.map((link) => {
          return (
            <Link to={link.route}>
              <button className="text-red-500 lowercase font-semibold text-lg">
                {link.name}
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
