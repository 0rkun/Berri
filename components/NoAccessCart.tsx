import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import logo from "@/images/logo.png";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

const NoAccessCart = () => {
  return (
    <div className="flex justify-center items-center py-12 md:py-32 bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center">
            <Image
              src={logo}
              alt="logo"
              width={80}
              height={80}
              className="mb-4"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Welcome Back!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-center mb-2">
            Login to view your cart items and checkout.
          </p>
          <SignInButton mode="modal">
            <Button className="w-full" size="lg">
              Sign In
            </Button>
          </SignInButton>

          <SignUpButton mode="modal">
            <Button className="w-full" variant="outline" size="lg">
              Sign Up
            </Button>
          </SignUpButton>
        </CardContent>
      </Card>
    </div>
  );
};

export default NoAccessCart;
