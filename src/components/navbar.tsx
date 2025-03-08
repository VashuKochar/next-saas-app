import Link from 'next/link';
import Image from 'next/image';

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

import { Button } from "@/components/ui/button";

interface NavbarProps {
  top: string;
}

export default function Navbar({ top }: NavbarProps) {
  return (
    <nav className={`w-full flex justify-center border-b border-b-foreground/10 h-13 sticky ${top} bg-background z-50`}>
        <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>
                  <Image src="/next.svg" alt="logo" width={40} height={40} />
              </Link>
            </div>
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"} className="hover:text-blue-500 transition-colors duration-200">Home</Link>
              <Link href={"/contact"} className="hover:text-blue-500 transition-colors duration-200">Contact Us</Link>
            </div>
            <div className="flex gap-5 items-center font-semibold">
              <SignedOut>
                <SignInButton> 
                  <Button asChild size="sm" variant={"outline"}>
                    <Link href="/sign-in">Sign in</Link>
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button asChild size="sm" variant={"default"}>
                    <Link href="/sign-up">Sign up</Link>
                  </Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
        </div>
    </nav>
  );
}