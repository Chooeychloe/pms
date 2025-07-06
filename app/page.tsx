import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xlr">
            Welcome to <br />
            <span className="text-5xl font-bold text-blue-700 md:text-6xl">
              Patient Management System
            </span>
          </h1>
        </div>
        <div className="text-center max-w-xl flex flex-col items-center justify-center">
          <div className="mb-8">
            This is a patient management system built with Next.js, Clerk, and
            Tailwind CSS.
            <br />
            <span className="text-blue-500">
              Click a button to get started!
            </span>
          </div>
          <div className="flex gap-4">
            {userId ? (
              <>
                <Link href="/dashboard">
                  <Button>View Dashboard</Button>
                </Link>
                <UserButton />
              </>
            ) : (
              <>
                <Link href="/sign-up" className="mb-4">
                  <Button className="md:text-base font-light">
                    New Patient
                  </Button>
                </Link>
                <Link href="/sign-in" className="mb-4">
                  <Button
                    variant="outline"
                    className="mb:text-base underline hover:text-blue-600"
                  >
                    Login to account
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <footer className="mt-8">
        <p className="text-center text-sm">
          &copy; {new Date().getFullYear()} Patient Management System. All
          rights reserved.
        </p>
      </footer>
    </div>
  );
}
