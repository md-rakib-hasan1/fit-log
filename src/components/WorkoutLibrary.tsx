import { getWorkouts } from "@/lib/api";
import type { Workout } from "@/types/workout";
import Link from "next/link";

const WorkoutLibrary = async () => {
    const workouts: Workout[] = await getWorkouts();

    return (
        <section id="library" className="px-7 py-7">
            <div>

                <h1 className="font-oswald text-3xl font-bold">
                    THE LIBRARY
                </h1>

                <p className="text-gray-400 pb-10">
                    Twelve lifts covering every major muscle group.
                </p>
            </div>



            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {workouts.map((workout) => (
                    <Link
                        href={`/workouts/${workout.id}`}
                        key={workout.id}
                        className="block overflow-hidden rounded-xl border border-gray-800 bg-[#111318] transition hover:border-lime-400"
                    >

                        <img
                            src={workout.image}
                            alt={workout.name}
                            className="h-52 w-full object-cover"
                        />


                        <div className="p-5">


                            <div className="mb-3 flex flex-wrap gap-2">
                                {workout.muscleGroups.map((muscle) => (
                                    <span
                                        key={muscle}
                                        className="rounded-full bg-lime-400 px-3 py-1 text-xs font-bold text-black"
                                    >
                                        {muscle}
                                    </span>
                                ))}
                            </div>


                            <h3 className="font-oswald text-2xl font-bold">
                                {workout.name}
                            </h3>


                            <p className="pb-4 text-xs text-gray-500">
                                {workout.equipment}
                            </p>

                            <hr className="border-gray-800" />


                            <div className="flex items-center gap-5 pt-4 text-sm text-gray-300">

                                <div className="flex items-center gap-1.5">
                                    <span>◷</span>
                                    <span>{workout.duration} min</span>
                                </div>

                                <div className="flex items-center gap-1.5">
                                    <span>🔥</span>
                                    <span>{workout.caloriesBurned} kcal</span>
                                </div>

                                <div className="flex items-center gap-1.5">
                                    <span>★</span>
                                    <span>{workout.rating}</span>
                                </div>

                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default WorkoutLibrary;