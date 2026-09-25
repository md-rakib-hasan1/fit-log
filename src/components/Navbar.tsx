"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useWorkout } from "@/context/WorkoutContext";
import Image from 'next/image'


const Navbar = () => {
    const { plan, saved } = useWorkout();
    const pathname = usePathname();

    return (
        <nav className="w-full h-16 px-7 flex items-center justify-between bg-[#0a0a0a] text-white border-b border-gray-800">
            <div className="flex items-center gap-3">
                <Image
                    src="/assets/logo.png"
                    alt="fit-log"
                    width={28}
                    height={28}
                />

                <h2 className="font-oswald text-lg font-bold tracking-wide">
                    FITLOG
                </h2>
            </div>

            <div className="flex items-center gap-2">
                <Link
                    href="/"
                    className={` text-xs px-4 py-2 rounded-full transition-colors ${pathname === "/"
                        ? "bg-lime-900 text-lime-200"
                        : "text-gray-400 hover:text-white"
                        }`}
                >
                    Workouts
                </Link>

                <Link
                    href="/my-plan"
                    className={`text-xs px-4 py-2 rounded-full transition-colors ${pathname === "/my-plan"
                        ? "bg-lime-900 text-lime-200"
                        : "text-gray-400 hover:text-white"
                        }`}
                >
                    My Plan
                </Link>
            </div>

            <div className="flex items-center gap-6  text-xs">

                <Link
                    href="/my-plan"
                    className="flex items-center gap-2 text-gray-300"
                >
                    <span>Plan</span>

                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-lime-400 text-[10px] font-bold text-black">
                        {plan.length}
                    </span>
                </Link>

                <Link
                    href="/my-plan"
                    className="flex items-center gap-2 text-gray-400"
                >
                    <span>Saved</span>

                    <span className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-600 text-[10px]">
                        {saved.length}
                    </span>
                </Link>

            </div>
        </nav>
    );
};

export default Navbar;