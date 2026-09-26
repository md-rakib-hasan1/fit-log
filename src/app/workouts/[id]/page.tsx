import Link from "next/link";
import { getWorkoutById } from "@/lib/api";
import WorkoutActions from "@/components/WorkoutActions";

interface WorkoutDetailsPageProps {
    params: Promise<{
        id: string;
    }>;
}

const WorkoutDetailsPage = async ({
    params,
}: WorkoutDetailsPageProps) => {
    const { id } = await params;

    const workout = await getWorkoutById(id);

    return (
        <main className="min-h-[calc(100vh-4rem)] px-6 py-8 md:px-8 lg:px-10">

            <div className="mx-auto max-w-6xl">

                <div className="grid gap-8 lg:grid-cols-2">

                    <div>
                        <img
                            src={workout.image}
                            alt={workout.name}
                            className="aspect-[4/5] w-full rounded-xl object-cover"
                        />
                    </div>

                    <div className="flex flex-col">


                        <h1 className="font-oswald text-3xl font-bold uppercase leading-tight sm:text-4xl">
                            {workout.name}
                        </h1>


                        <p className="mt-3 max-w-xl text-sm leading-6 text-gray-400">
                            {workout.description}
                        </p>


                        <div className="mt-4 flex flex-wrap gap-2">
                            {workout.muscleGroups.map((muscle) => (
                                <span
                                    key={muscle}
                                    className="rounded-full bg-lime-400 px-3 py-1 text-xs font-bold text-black"
                                >
                                    {muscle}
                                </span>
                            ))}
                        </div>


                        <div className="mt-5 overflow-hidden rounded-xl border border-gray-800 bg-[#111318]">


                            <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3">
                                <span className="text-[10px] uppercase tracking-wide text-gray-500">
                                    Equipment
                                </span>

                                <span className="text-xs text-gray-300">
                                    {workout.equipment}
                                </span>
                            </div>


                            <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3">
                                <span className="text-[10px] uppercase tracking-wide text-gray-500">
                                    Difficulty
                                </span>

                                <span className="text-xs text-gray-300">
                                    {workout.difficulty}
                                </span>
                            </div>


                            <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3">
                                <span className="text-[10px] uppercase tracking-wide text-gray-500">
                                    Sets
                                </span>

                                <span className="text-xs text-gray-300">
                                    {workout.sets}
                                </span>
                            </div>


                            <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3">
                                <span className="text-[10px] uppercase tracking-wide text-gray-500">
                                    Reps
                                </span>

                                <span className="text-xs text-gray-300">
                                    {workout.reps}
                                </span>
                            </div>


                            <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3">
                                <span className="flex items-center gap-2 text-[10px] uppercase tracking-wide text-gray-500">
                                    Duration
                                </span>

                                <span className="text-xs text-gray-300">
                                    {workout.duration} min
                                </span>
                            </div>


                            <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3">
                                <span className="flex items-center gap-2 text-[10px] uppercase tracking-wide text-gray-500">
                                    Calories
                                </span>

                                <span className="text-xs text-gray-300">
                                    {workout.caloriesBurned} kcal
                                </span>
                            </div>


                            <div className="flex items-center justify-between px-4 py-3">
                                <span className="flex items-center gap-2 text-[10px] uppercase tracking-wide text-gray-500">
                                    Rating
                                </span>

                                <span className="text-xs text-gray-300">
                                    {workout.rating}
                                </span>
                            </div>

                        </div>


                        <div className="mt-6">

                            <h2 className="font-oswald text-lg font-bold uppercase">
                                Instructions
                            </h2>

                            <div className="mt-3 space-y-3">
                                {workout.instructions.map(
                                    (instruction, index) => (
                                        <div
                                            key={index}
                                            className="flex gap-3"
                                        >
                                            <span className="text-xs text-gray-500">
                                                {index + 1}.
                                            </span>

                                            <p className="text-xs leading-5 text-gray-400">
                                                {instruction}
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>

                        </div>

                        <WorkoutActions workout={workout} />

                    </div>
                </div>
            </div>
        </main>
    );
};

export default WorkoutDetailsPage;