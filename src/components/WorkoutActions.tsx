"use client";

import { useWorkout } from "@/context/WorkoutContext";
import type { Workout } from "@/types/workout";
import { useState } from "react";

interface WorkoutActionsProps {
    workout: Workout;
}

const WorkoutActions = ({ workout }: WorkoutActionsProps) => {
    const { plan, saved, addToPlan, saveWorkout } = useWorkout();

    const [added, setAdded] = useState(
        plan.some((item) => item.id === workout.id)
    );

    const [savedWorkout, setSavedWorkout] = useState(
        saved.some((item) => item.id === workout.id)
    );

    const [toast, setToast] = useState("");
    const [toastType, setToastType] = useState<"success" | "error">("success");

    const showToast = (
        message: string,
        type: "success" | "error" = "success"
    ) => {
        setToast(message);
        setToastType(type);

        setTimeout(() => {
            setToast("");
        }, 2000);
    };

    const handleAddToPlan = () => {
        
        if (plan.some((item) => item.id === workout.id)) {
            showToast("Already added to today's plan", "error");
            return;
        }

        
        if (plan.length >= 5) {
            showToast(
                "Today's plan is full (maximum 5 workouts)",
                "error"
            );
            return;
        }

        addToPlan(workout);
        setAdded(true);

        showToast("Added to today's plan", "success");
    };

    const handleSave = () => {
        saveWorkout(workout);
        setSavedWorkout(true);

        showToast("Saved for later", "success");
    };

    return (
        <>
            <div className="mt-7 flex flex-wrap gap-3">

                <button
                    onClick={handleAddToPlan}
                    className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition ${
                        added
                            ? "bg-lime-400 text-black"
                            : "bg-lime-400 text-black hover:bg-lime-300"
                    }`}
                >
                    <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <rect
                            x="3"
                            y="4"
                            width="18"
                            height="18"
                            rx="2"
                        />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>

                    {added
                        ? "Added to today's plan"
                        : "Add to today's plan"}
                </button>

                <button
                    onClick={handleSave}
                    disabled={savedWorkout}
                    className={`flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition ${
                        savedWorkout
                            ? "border-lime-400 text-lime-400"
                            : "border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white"
                    }`}
                >
                    <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M6 3h12v18l-6-4-6 4V3z" />
                    </svg>

                    {savedWorkout ? "Saved" : "Save for later"}
                </button>
            </div>

            {/* Toast */}
            {toast && (
                <div
                    className={`fixed bottom-6 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 overflow-hidden rounded-lg border bg-[#17191f] px-5 py-3 text-sm text-white shadow-xl ${
                        toastType === "success"
                            ? "border-green-500/40"
                            : "border-red-500/40"
                    }`}
                >
                    <p>{toast}</p>

                    <div
                        className={`absolute bottom-0 left-0 h-1 ${
                            toastType === "success"
                                ? "bg-green-500"
                                : "bg-red-500"
                        }`}
                        style={{
                            animation: "toastProgress 2s linear forwards",
                        }}
                    />
                </div>
            )}
        </>
    );
};

export default WorkoutActions;