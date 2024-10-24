import { Link } from "@remix-run/react";
import { useState } from "react";

export const NavBar = () => {
  const [openMobileNav, setOpenMobileNav] = useState(false);

  const links = [
    {
      name: "Calendar",
      route: "/calendar",
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
      name: "drinking game",
      route: "/drinkingCues",
    },
  ];
  return (
    <div>
      <div className="block lg:hidden m-4">
        <button
          className="flex items-center px-3 py-2 border-2 bg-black rounded text-red-500 border-red-500 font-bold text-xl mx-2.5"
          onClick={() => setOpenMobileNav(!openMobileNav)}
        >
          menu
        </button>
        {openMobileNav && (
          <div className="bg-black/90 text-white rounded-md mt-2">
            <ul className="flex flex-col items-center justify-between">
              {links.map((link, index) => (
                <li className="font-semibold lowercase my-8" key={index}>
                  <a href={link.route}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="lg:flex justify-between hidden bg-black px-8 py-2 mb-4">
        {links.map((link, index) => {
          return (
            <Link to={link.route} key={index}>
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
