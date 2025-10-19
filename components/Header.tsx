import Image from "next/image";
import React from "react";
import logo from "@/images/logo.png";
import Container from "@/components/Container";
import Form from "next/form";
import Link from "next/link";
import CartIcon from "./CartIcon";
import { FaShoppingBasket, FaUser } from "react-icons/fa";
import { currentUser } from "@clerk/nextjs/server";
import { ClerkLoaded, SignedIn, SignInButton, UserButton } from "@clerk/nextjs";

const Header = async () => {
  const user = await currentUser();

  return (
    <header className="w-full bg-white/60 py-2 border-b border-gray-400 sticky z-50 top-0 backdrop-blur-md ">
      <Container className="flex items-center justify-between gap-5">
        <Link href="/">
          <Image src={logo} alt="logo" className="w-24" priority />
        </Link>

        <Form action="/search" className="flex-1 hidden md:flex">
          <input
            type="text"
            name="query"
            placeholder="Search for products..."
            className="w-full border border-gray-400 px-4 py-2 rounded-md focus-visible:border-darkBlue outline-none"
          />
        </Form>
        <div className="flex items-center gap-5 text-lg ">
          <CartIcon />

          {/* sepet */}
          <SignedIn>
            <Link
              href="/orders"
              className="flex items-center border  border-gray-200 px-2 py-3 text-sm gap-2 rounded-md shadow-md hover:shadow-none hoverEffect"
            >
              <FaShoppingBasket className="h-6 w-6 text-darkBlue" />
              <div>
                <p className="font-semibold">Orders</p>
              </div>
            </Link>
          </SignedIn>

          {/* user */}

          <ClerkLoaded>
            {user ? (
              <div className="flex gap-2 border border-gray-200 px-2 py-1 text-sm rounded-md shadow-md hover:shadow-none hoverEffect ">
                <UserButton />

                <div className="flex flex-col">
                  <p>Welcome back</p>
                  <p className="font-semibold"> {user?.fullName} </p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal">
                <div className="flex items-center gap-2 border border-gray-200 rounded-md px-2 py-1 text-sm shadow-md hover:shadow-none  hoverEffect">
                  <FaUser className="h-5 w-5 text-darkBlue" />
                  <div className="flex flex-col text-xs ">
                    <p className="text-xs">
                      <span>Account</span>
                    </p>
                    <p className="font-semibold text-xs">Login</p>
                  </div>
                </div>
              </SignInButton>
            )}
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  );
};

export default Header;
