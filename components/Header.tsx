import Link from "next/link";

import { useEffect, useState } from "react";
import Category from "../model/Category";
import { getCategories } from "../services";

import { Go, Home, Menu } from "../assets";

function Header() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    getCategories(true).then((newCategories: Category[]) =>
      setCategories(newCategories)
    );
  }, []);

  const MenuButton = ({
    phone,
    close,
  }: {
    phone?: Boolean;
    close?: Boolean;
  }) => (
    <button
      type="button"
      onClick={() => setMenuOpen((prev) => !prev)}
      className={`float-right h-[40px] w-[40px] rounded-full ${
        phone ? "bg-black" : "bg-white"
      }  flex items-center justify-center`}
    >
      {close ? (
        <span className="font-light text-xl">X</span>
      ) : (
        <Menu phone={phone} />
      )}
    </button>
  );

  return (
    <>
      {/* PC nav */}
      <nav className="container mx-auto px-10 mb-8 hidden md:block">
        <div className="border-b w-full flex justify-between items-center border-blue-400 py-8">
          <div className="md:float-left block">
            <Link href="/">
              <span className="cursor-pointer font-bold text-2xl md:text-4xl text-white md:bg-white/25 rounded-md md:py-4 md:px-2">
                CMS Blog
              </span>
            </Link>
          </div>
          <div>
            <MenuButton />
          </div>
        </div>
      </nav>
      {/* Phone nav */}
      <nav className="fixed bottom-0 z-10 md:hidden bg-black/40 flex items-center justify-end w-screen h-[40px]">
        <div className="absolute right-2 -top-2">
          <MenuButton phone />
        </div>
      </nav>
      {/* Sidebar menu */}
      <aside
        className={`fixed top-0  h-screen w-2/3 md:w-2/6 lg:w-1/6 bg-gradient-to-tl from-white/10 to-[#483D8B] backdrop-blur-lg z-10 p-6  smooth-transition ${
          menuOpen ? "left-0" : "-left-full"
        }`}
      >
        <div className="hidden md:block">
          <MenuButton close />
        </div>
        <div className="flex flex-col w-full justify-start items-start h-full gap-6 overflow-y-scroll hide-scrollbar">
          <Link onClick={() => setMenuOpen(false)} href="/">
            <div className="flex justify-between items-center w-full cursor-pointer">
              <Home />
              <span className="mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                Home
              </span>
            </div>
          </Link>

          <hr className="border-gray-700 h-2 w-full" />
          {categories.map((category: Category) => (
            <Link
              key={category.slug}
              onClick={() => setMenuOpen(false)}
              href={`/category/${category.slug}`}
            >
              <div className="flex justify-between items-center w-full">
                <Go />
                <span className="mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                  {category.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
}

export default Header;
