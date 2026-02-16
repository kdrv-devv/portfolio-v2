"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const headerRoutes = [
    {
      path: "/",
      title: "Home",
    },
    {
      path: "/projects",
      title: "Projects",
    },
    {
      path: "/guestbook",
      title: "Guestbook",
    },
  ];

  const pathName = usePathname();
  
  return (
    <header className="header sticky top-10 left-0 z-40 flex items-center justify-between my-10 w-[90%] md:w-[50%] mx-auto p-4 glass rounded-[50px]">
      {/* <Image src={"/image.png"} alt="Icon" width={50} height={50}/> */}
      <Link href={"/"} >
      <h1  className="font-[600] text-xl md:text-2xl">
        Kadirov<span className="text-[#f7df1f]">JS</span>
      </h1>
      </Link>
      <nav className="flex items-center gap-2 md:gap-4">
        {headerRoutes.map(({ title, path }) => {
          const isActive = path == pathName;
          return (
            <Link
              key={path}
              href={path}
              className={`font-[500] ${isActive ? "!border-js border-b-2" : ""} border-transparent transition-all duration-200 border-b-2 text-base md:text-xl hover:text-[#f7df1f] duration-200`}
            >
              {title}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};

export default Header;
