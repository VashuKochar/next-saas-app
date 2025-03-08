import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
      <div>
      <h1 className="tracking-wider font-sans items-center justify-center text-3xl sm:text-5xl md:text-6xl lg:text-7xl mb-6">
        Next SaaS App Template
        <br />
      </h1>
      <hr className="border-t-2 border-orange-500 my-4" />
      <p className="text-xl mb-12 font-light">
      Modify the text on the files
      </p>
      <div className="flex justify-center space-x-6">
        <Button size={"lg"} asChild>
          <Link href="/sign-up" className={cn("font-semibold transition duration-300")}>Get Started →</Link>
        </Button>
      </div>
      </div>
  );
}
