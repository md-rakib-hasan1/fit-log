"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useWorkout } from "@/context/WorkoutContext";
import Image from "next/image";

const Navbar = () => {
    const { plan, saved } = useWorkout();
    const pathname = usePathname();

    return (
        <nav className="w-full border-b border-gray-800 bg-[#0a0a0a] px-4 py-4 text-white md:h-16 md:px-7 md:py-0">
            <div className="flex flex-wrap items-center justify-between gap-y-5 md:h-full md:flex-nowrap md:gap-y-0">

              
                <div className="flex items-center gap-2 sm:gap-3">
                    <Image
                        src="/assets/logo.png"
                        alt="fit-log"
                        width={28}
                        height={28}
                    />

                    <h2 className="font-oswald text-base font-bold tracking-wide sm:text-lg">
                        FITLOG
                    </h2>
                </div>

                
                <div className="order-2 flex items-center gap-4 text-xs md:order-3 md:gap-6">
                    <Link
                        href="/my-plan"
                        className="flex items-center gap-1.5 text-gray-300"
                    >
                        <span>Plan</span>

                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-lime-400 text-[10px] font-bold text-black">
                            {plan.length}
                        </span>
                    </Link>

                    <Link
                        href="/my-plan"
                        className="flex items-center gap-1.5 text-gray-400"
                    >
                        <span>Saved</span>

                        <span className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-600 text-[10px]">
                            {saved.length}
                        </span>
                    </Link>
                </div>

                
                <div className="order-3 flex w-full items-center justify-center gap-3 md:order-2 md:w-auto md:gap-2">

                    <Link
                        href="/"
                        className={`rounded-full px-4 py-2 text-xs transition-colors ${
                            pathname === "/"
                                ? "bg-lime-900 text-lime-200"
                                : "text-gray-400 hover:text-white"
                        }`}
                    >
                        Workouts
                    </Link>

                    <Link
                        href="/my-plan"
                        className={`rounded-full px-4 py-2 text-xs transition-colors ${
                            pathname === "/my-plan"
                                ? "bg-lime-900 text-lime-200"
                                : "text-gray-400 hover:text-white"
                        }`}
                    >
                        My Plan
                    </Link>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;