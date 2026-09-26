"use client";

import Link from "next/link";
import { useState } from "react";
import { useWorkout } from "@/context/WorkoutContext";

const MyPlanPage = () => {
    const {
        plan,
        saved,
        removeFromPlan,
        removeFromSaved,
    } = useWorkout();

    const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
    const [loading, setLoading] = useState(false);
    const [doneIds, setDoneIds] = useState<number[]>([]);
    const [toast, setToast] = useState("");
    const [sortBy, setSortBy] = useState<"duration" | "calories" | "rating">(
        "duration"
    );

    const totalMinutes = plan.reduce(
        (total, workout) => total + workout.duration,
        0
    );

    const totalCalories = plan.reduce(
        (total, workout) => total + workout.caloriesBurned,
        0
    );

    const showToast = (message: string) => {
        setToast(message);

        setTimeout(() => {
            setToast("");
        }, 2000);
    };

    const handleRemovePlan = (id: number, name: string) => {
        removeFromPlan(id);
        showToast(`${name} removed from today's plan`);
    };

    const handleRemoveSaved = (id: number, name: string) => {
        removeFromSaved(id);
        showToast(`${name} removed from saved`);
    };

    const handleMarkDone = (id: number, name: string) => {
        setDoneIds((previousIds) => {
            if (previousIds.includes(id)) {
                return previousIds;
            }

            return [...previousIds, id];
        });

        showToast(`${name} marked as done`);
    };

    const handleTabChange = (tab: "plan" | "saved") => {
        setLoading(true);
        setActiveTab(tab);

        setTimeout(() => {
            setLoading(false);
        }, 300);
    };

    const currentWorkouts = [...(activeTab === "plan" ? plan : saved)].sort(
        (a, b) => {
            if (sortBy === "duration") {
                return a.duration - b.duration;
            }

            if (sortBy === "calories") {
                return a.caloriesBurned - b.caloriesBurned;
            }

            return b.rating - a.rating;
        }
    );

    return (
        <main className="min-h-screen bg-black px-4 py-10 text-white sm:px-6 lg:px-8">

            <div className="mx-auto max-w-6xl">


                <section>

                    <h1 className="font-oswald text-4xl font-bold tracking-tight sm:text-5xl">
                        MY PLAN
                    </h1>

                    <p className="mt-3 max-w-xl text-sm leading-6 text-gray-400 sm:text-base">
                        Cap of five lifts for today. Finish them, then load more.
                    </p>
                </section>

                <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

                    <div className="rounded-xl border border-gray-800 bg-gray-950 p-5">
                        <p className="text-sm text-gray-400">
                            Exercises
                        </p>

                        <p className="mt-2 text-3xl font-bold">
                            {plan.length}
                        </p>
                    </div>

                    <div className="rounded-xl border border-gray-800 bg-gray-950 p-5">
                        <p className="text-sm text-gray-400">
                            Minutes
                        </p>

                        <p className="mt-2 text-3xl font-bold">
                            {totalMinutes}
                        </p>
                    </div>

                    <div className="rounded-xl border border-gray-800 bg-gray-950 p-5">
                        <p className="text-sm text-gray-400">
                            Calories
                        </p>

                        <p className="mt-2 text-3xl font-bold">
                            {totalCalories}
                        </p>
                    </div>

                </section>

                <section className="mt-10 border-b border-gray-800">

                    <div className="flex items-center justify-between">


                        <div className="flex gap-8">

                            <button
                                onClick={() => handleTabChange("plan")}
                                className={`relative pb-4 text-sm font-semibold transition ${activeTab === "plan"
                                    ? "text-lime-400"
                                    : "text-gray-500 hover:text-white"
                                    }`}
                            >
                                Today's Plan

                                {activeTab === "plan" && (
                                    <span className="absolute bottom-0 left-0 h-0.5 w-full bg-lime-400" />
                                )}
                            </button>

                            <button
                                onClick={() => handleTabChange("saved")}
                                className={`relative pb-4 text-sm font-semibold transition ${activeTab === "saved"
                                    ? "text-lime-400"
                                    : "text-gray-500 hover:text-white"
                                    }`}
                            >
                                Saved

                                {activeTab === "saved" && (
                                    <span className="absolute bottom-0 left-0 h-0.5 w-full bg-lime-400" />
                                )}
                            </button>

                        </div>

                        <div className="relative flex items-center gap-2 pb-3">

                            <span className="text-xs text-gray-500">
                                Sort By
                            </span>

                            <div className="relative">

                                <select
                                    value={sortBy}
                                    onChange={(event) =>
                                        setSortBy(
                                            event.target.value as
                                            | "duration"
                                            | "calories"
                                            | "rating"
                                        )
                                    }
                                    className="appearance-none rounded-lg border border-gray-700 bg-[#111318] py-2 pl-3 pr-8 text-xs text-gray-300 outline-none transition hover:border-gray-500 focus:border-lime-400"
                                >
                                    <option value="duration">
                                        Duration
                                    </option>

                                    <option value="calories">
                                        Calories
                                    </option>

                                    <option value="rating">
                                        Rating
                                    </option>
                                </select>

                                <svg
                                    className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="m6 9 6 6 6-6" />
                                </svg>

                            </div>

                        </div>

                    </div>

                </section>


                <section className="mt-8">

                    {loading ? (
                        <div className="py-20 text-center">
                            <p className="text-gray-400">
                                Loading workouts…
                            </p>
                        </div>

                    ) : currentWorkouts.length === 0 ? (


                        <div className="rounded-xl border border-gray-800 bg-gray-950 px-6 py-20 text-center">

                            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-gray-700 text-gray-500">
                                +
                            </div>

                            <h2 className="font-oswald text-xl font-bold tracking-wide">
                                NOTHING HERE YET
                            </h2>

                            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-400">
                                Browse the library and add a lift to get today moving.
                            </p>

                            <Link
                                href="/"
                                className="mt-7 inline-flex rounded-lg bg-lime-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-lime-300"
                            >
                                Go to workouts
                            </Link>

                        </div>

                    ) : (

                        <div className="space-y-4">

                            {currentWorkouts.map((workout) => {

                                const isDone = doneIds.includes(workout.id);

                                return (
                                    <article
                                        key={workout.id}
                                        className={`overflow-hidden rounded-xl border bg-gray-950 transition ${isDone
                                            ? "border-lime-400/40"
                                            : "border-gray-800"
                                            }`}
                                    >

                                        <div className="flex flex-col md:flex-row">

                                            <div className="h-52 w-full shrink-0 md:h-auto md:w-56">

                                                <img
                                                    src={workout.image}
                                                    alt={workout.name}
                                                    className="h-full w-full object-cover"
                                                />

                                            </div>

                                            <div className="flex min-w-0 flex-1 flex-col justify-center p-5 sm:p-6">

                                                <div>


                                                    <div className="flex flex-wrap gap-2">

                                                        {workout.muscleGroups.map(
                                                            (muscle) => (
                                                                <span
                                                                    key={muscle}
                                                                    className="rounded-full bg-lime-400 px-3 py-1 text-[10px] font-bold uppercase text-black"
                                                                >
                                                                    {muscle}
                                                                </span>
                                                            )
                                                        )}

                                                    </div>

                                                    <h2
                                                        className={`mt-3 font-oswald text-2xl font-bold uppercase ${isDone
                                                            ? "text-gray-500 line-through"
                                                            : "text-white"
                                                            }`}
                                                    >
                                                        {workout.name}
                                                    </h2>



                                                    <p className="mt-2 text-sm text-gray-500">
                                                        {workout.equipment}
                                                    </p>

                                                    <div className="mt-5 flex flex-wrap items-center gap-5 text-xs text-gray-400">


                                                        <span className="flex items-center gap-2">

                                                            <svg
                                                                width="14"
                                                                height="14"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                            >
                                                                <circle
                                                                    cx="12"
                                                                    cy="12"
                                                                    r="9"
                                                                />
                                                                <polyline points="12 7 12 12 15 14" />
                                                            </svg>

                                                            {workout.duration} min

                                                        </span>



                                                        <span className="flex items-center gap-2">

                                                            <svg
                                                                width="14"
                                                                height="14"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                            >
                                                                <path d="M12 3c2 3 5 4 5 9a5 5 0 0 1-10 0c0-2 1-4 3-6" />
                                                                <path d="M12 21a3 3 0 0 0 3-3c0-2-2-3-3-5-1 2-3 3-3 5a3 3 0 0 0 3 3z" />
                                                            </svg>

                                                            {workout.caloriesBurned} kcal

                                                        </span>

                                                        <span className="flex items-center gap-2">

                                                            <svg
                                                                width="14"
                                                                height="14"
                                                                viewBox="0 0 24 24"
                                                                fill="currentColor"
                                                            >
                                                                <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3z" />
                                                            </svg>

                                                            {workout.rating}

                                                        </span>

                                                    </div>

                                                </div>

                                            </div>


                                            <div className="flex shrink-0 items-center gap-2 p-5 md:ml-auto md:px-6">


                                                <Link
                                                    href={`/workouts/${workout.id}`}
                                                    className="whitespace-nowrap rounded-lg border border-gray-700 px-4 py-2.5 text-xs font-medium text-gray-300 transition hover:border-gray-500 hover:text-white"
                                                >
                                                    View Details
                                                </Link>



                                                {activeTab === "plan" && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleMarkDone(
                                                                workout.id,
                                                                workout.name
                                                            )
                                                        }
                                                        disabled={isDone}
                                                        className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-xs font-semibold transition ${isDone
                                                            ? "cursor-default bg-lime-400/20 text-lime-400"
                                                            : "bg-lime-400 text-black hover:bg-lime-300"
                                                            }`}
                                                    >
                                                        <svg
                                                            width="14"
                                                            height="14"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2.5"
                                                        >
                                                            <polyline points="20 6 9 17 4 12" />
                                                        </svg>

                                                        {isDone ? "Done" : "Mark as Done"}
                                                    </button>
                                                )}

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        activeTab === "plan"
                                                            ? handleRemovePlan(
                                                                workout.id,
                                                                workout.name
                                                            )
                                                            : handleRemoveSaved(
                                                                workout.id,
                                                                workout.name
                                                            )
                                                    }
                                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-700 text-gray-400 transition hover:border-red-500 hover:text-red-400"
                                                    aria-label={`Remove ${workout.name}`}
                                                >
                                                    <svg
                                                        width="14"
                                                        height="14"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                    >
                                                        <line x1="18" y1="6" x2="6" y2="18" />
                                                        <line x1="6" y1="6" x2="18" y2="18" />
                                                    </svg>
                                                </button>


                                            </div>

                                        </div>

                                    </article>
                                );
                            })}

                        </div>
                    )}

                </section>

            </div>

            {toast && (
                <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg border border-gray-700 bg-[#17191f] px-5 py-3 text-sm text-white shadow-xl">
                    {toast}
                </div>
            )}

        </main>
    );
};

export default MyPlanPage;