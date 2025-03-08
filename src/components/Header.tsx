"use client"

import { useState } from "react";
import Banner from "@/components/banner";
import Navbar from "@/components/navbar";

export default function Header() {
    const [isBannerVisible, setIsBannerVisible] = useState(true);

    return (
        <>
            <Banner 
                title={"Next Saas App"} 
                description={"View on "} 
                linkText={"Github"} 
                linkUrl={"https://github.com/VashuKochar/next-saas-app"} 
                defaultVisible={isBannerVisible}
                onClose={() => setIsBannerVisible(false)}
            />
            <Navbar top={isBannerVisible ? "top-10" : "top-0"} />
        </>
    );
}