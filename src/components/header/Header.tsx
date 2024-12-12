import Image from "next/image";
import logo from "../../images/orion.png";
import cartIcon from "../../images/cartIcon.png";
import { BiCaretDown } from "react-icons/bi";
import { HiOutlineSearch } from "react-icons/hi";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { StateProps } from "../../../type";
import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import PhoneBottomHeader from "./PhoneBottomHeader";
import { removeUser } from "@/store/nextSlice";

const Header = () => {
  const { productData, favoriteData, userInfo } = useSelector(
    (state: StateProps) => state.next
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 41) {
        if (ref2.current) {
          ref2.current.style.borderBottom = "none";
        }

        if (ref.current) {
          ref.current.style.borderBottom = "1px solid #e2e8f0";
          ref.current.style.boxShadow = "0 0 10px rgba(0,0,0,0.1)";
        }
      } else if (window.scrollY < 41) {
        if (ref.current) {
          ref.current.style.border = "none";
          ref.current.style.boxShadow = "none";
        }

        if (ref2.current) {
          ref2.current.style.borderBottom = "1px solid #e2e8f0";
        }
      }
    });
  }, []);

  // Search area
  const [searchQuery, setSearchQuery] = useState("");
  const handleSignOut = () => {
    router.push("/");
    dispatch(removeUser());
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search-results/${searchQuery}`);
  };

  return (
    <>
      <div
        className="z-50 top-0 sticky w-full bg-white transition-all duration-500"
        ref={ref}
      >
        <Box
          ref={ref2}
          className="sm:w-full md:w-[85%] mx-auto sm:h-20 md:h-40 bg-white text-lightText sm:flex sm:flex-column sm:flex-wrap border-b border-gray-300 top-0 sticky z-50"
        >
          <div className="m-0 h-full w-full mx-auto inline-flex items-center justify-between gap-1 md:gap-3 px-4 sm:p-0">
            {/* logo */}
            <Link
              passHref
              href={"/"}
              className="px-2 border border-transparent cursor-pointer duration-300 flex items-center justify-center h-[70%]"
            >
              <Image
                className="w-28 object-cover mt-1"
                src={logo}
                alt="logoImg"
              />
            </Link>
            <div className="w-full flex-1 h-10 hidden md:inline-flex items-center justify-between relative">
              <input
                onChange={handleSearch}
                onKeyDown={(e: any) => {
                  if (e.key === "Enter") handleSearchSubmit(e);
                }}
                value={searchQuery}
                className="w-full h-full rounded-md px-2 placeholder:text-sm text-base text-black border-[2px] border-gray outline-none focus-visible:border-black"
                type="text"
                placeholder="Zoeken..."
              />
              <span className="w-12 h-full bg-black text-black text-2xl flex items-center justify-center absolute right-0 rounded-tr-md rounded-br-md">
                <HiOutlineSearch
                  cursor={"pointer"}
                  onClick={(e) => router.push(`/search-results/${searchQuery}`)}
                  color="white"
                />
              </span>

              {/* ========== Searchfield ========== */}
            </div>
            {/* signin */}
            {userInfo ? (
              <Menu>
                <MenuButton>
                  <div className="flex items-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] gap-1">
                    {/* <Image
                  src={userInfo.image}
                  alt="userImage"
                  className="w-8 h-8 rounded-full object-cover"
                  width={150}
                  height={150}
                /> */}
                    <div className="text-xs text-black flex flex-col justify-between">
                      <p className="text-black font-bold">
                        {userInfo.firstname + " " + userInfo.lastname}
                      </p>
                      <p>{userInfo.email}</p>
                    </div>
                  </div>
                </MenuButton>
                <MenuList textAlign={"right"} p={0} borderRadius={0}>
                  <Link passHref href={"/mijn-account"}>
                    <Button
                      border={"1px solid gray"}
                      borderRadius={0}
                      w={"100%"}
                      bgColor={"white"}
                    >
                      Mijn Account
                    </Button>
                  </Link>
                  <Link passHref href={"/mijn-account?bestellingen"}>
                    <Button
                      border={"1px solid gray"}
                      borderRadius={0}
                      w={"100%"}
                      bgColor={"white"}
                    >
                      Bestellingen
                    </Button>
                  </Link>
                  <Button
                    border={"1px solid gray"}
                    borderRadius={0}
                    w={"100%"}
                    onClick={handleSignOut}
                    bgColor={"white"}
                  >
                    Uitloggen
                  </Button>
                </MenuList>
              </Menu>
            ) : (
              <div className="text-xs text-black flex flex-col justify-center  px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%]">
                <Link passHref href={"/inloggen"}>
                  <Text fontWeight={"semibold"}>Log in</Text>
                  <Text fontWeight={"semibold"}>Register</Text>
                </Link>
              </div>
            )}
            {/* fovorite */}
            <Link
              passHref
              href={"/favorite"}
              className="text-xs text-black flex flex-col justify-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] relative sm:hidden md:inline-flex font-semibold"
            >
              <p>Marked</p>

              {favoriteData?.length > 0 && (
                <p className="text-xs text-black text-center">
                  {favoriteData?.length}
                </p>
              )}

              <p className="text-white font-bold">Favorite</p>
            </Link>
            {/* cart */}
            <Link
              passHref
              href={"/cart"}
              className="flex items-center px-2 sm:px-0 border border-transparent cursor-pointer duration-300 h-[70%] relative mr-2"
            >
              <Image
                className="w-auto object-cover h-8 sm:mt-2 md:mt-0"
                src={cartIcon}
                alt="cartImg"
              />
              <Text
                display={{ base: "none", sm: "none" }}
                className="text-xs text-black font-bold mt-3"
              >
                Cart
              </Text>
              <span className="absolute text-black text-sm sm:top-0 md:top-6 sm:left-[15px] md:left-[15px] font-semibold">
                {productData ? productData?.length : 0}
              </span>
            </Link>
            <div className="hidden items-center px-2 sm:px-0 border border-transparent hover:border-black cursor-pointer duration-300 h-[70%] relative sm:inline-flex md:hidden">
              <PhoneBottomHeader />
            </div>
          </div>
          {/* sm search */}
        </Box>
      </div>
      <div className="m-0 w-full  bg-white flex-1 h-10 md:hidden sm:inline-flex items-center justify-between sticky">
        <input
          onChange={handleSearch}
          onKeyDown={(e: any) => {
            if (e.key === "Enter") handleSearchSubmit(e);
          }}
          value={searchQuery}
          className="w-full h-full rounded-md px-2 placeholder:text-sm text-base text-black border-[2px] border-gray outline-none focus-visible:border-black"
          type="text"
          placeholder="Zoeken..."
        />
        <span className="w-12 h-full bg-black text-black text-2xl flex items-center justify-center relative right-0 rounded-tr-md rounded-br-md">
          <HiOutlineSearch
            cursor={"pointer"}
            onClick={(e) => router.push(`/search-results/${searchQuery}`)}
            color="white"
          />
        </span>
      </div>
    </>
  );
};

export default Header;
