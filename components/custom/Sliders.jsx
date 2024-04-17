"use client"
import Image from "next/image";
import {getSliders} from "@/utils/GlobalAPi";
import {useEffect, useState} from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export const Sliders = ({slidersList}) => {

    return (
        <section>
            <Carousel>
                <CarouselContent>
                    {slidersList.map((slide, index) => (
                        <CarouselItem
                            key={index}
                        >
                            <Image
                                src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + slide.attributes.image.data[0].attributes.url}
                                alt={`Picture of ${slide?.attributes?.name}}`}
                                width={1000}
                                height={400}
                                className={"w-full object-cover rounded-2xl"}
                                style={{aspectRatio: 21/9}}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>
        </section>

    )
}