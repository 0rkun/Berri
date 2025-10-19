import { SALE_QUERYResult } from "@/sanity.types";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "./ui/button";

const DiscountBanner = ({ sales }: { sales: SALE_QUERYResult }) => {
  return (
    <Carousel className="w-full max-w-screen-xl mx-auto my-10">
      <CarouselContent>
        {sales.map((sale) => (
          <CarouselItem key={sale?._id}>
            <Card>
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="flex-1 p-6 md:px-12 ">
                    <Badge className="bg-darkBlue w-32 mb-2 md:mb-4">
                      {sale?.badge} {sale?.discountAmount}% off
                    </Badge>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4 ">
                      {" "}
                      {sale?.title}{" "}
                    </h2>

                    <p className="text-muted-foreground mb-2 md:mb-4">
                      {sale?.description}{" "}
                    </p>
                    <p className="mb-2">
                      Use Code:{" "}
                      <span className="font-semibold text-primary uppercase">
                        {sale?.couponCode}
                      </span>
                      <span className="font-semibold">
                        {" "}
                        {sale?.discountAmount}{" "}
                      </span>
                      OFF
                    </p>
                    <Button className="mt-2">Shop Now</Button>
                  </div>

                  {sale?.image && (
                    <div className="w-full md:w-1/2 h-auto flex items-center justify-center py-2">
                      <Image
                        src={urlFor(sale?.image).url()}
                        width={500}
                        height={500}
                        objectFit="cover"
                        alt="banner"
                        className="h-full transition-transform hover:scale-105 hoverEffect"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-0" />
      <CarouselNext className="absolute right-0" />
    </Carousel>
  );
};

export default DiscountBanner;
