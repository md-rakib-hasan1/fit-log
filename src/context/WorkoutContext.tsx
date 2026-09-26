
"use client";

import { createContext, useContext, useState } from "react";
import type { Workout } from "../types/workout";

interface WorkoutContextType {
    plan: Workout[];
    saved: Workout[];
    addToPlan: (workout: Workout) => void;
    saveWorkout: (workout: Workout) => void;
    removeFromPlan: (id: number) => void;
    removeFromSaved: (id: number) => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(
    undefined
);

export const WorkoutProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [plan, setPlan] = useState<Workout[]>([]);
    const [saved, setSaved] = useState<Workout[]>([]);

    const addToPlan = (workout: Workout) => {
        setPlan((previousPlan) => {
            const alreadyExists = previousPlan.some(
                (item) => item.id === workout.id
            );

            if (alreadyExists) {
                return previousPlan;
            }

            return [...previousPlan, workout];
        });
    };

    const saveWorkout = (workout: Workout) => {
        setSaved((previousSaved) => {
            const alreadyExists = previousSaved.some(
                (item) => item.id === workout.id
            );

            if (alreadyExists) {
                return previousSaved;
            }

            return [...previousSaved, workout];
        });
    };

    const removeFromPlan = (id: number) => {
        setPlan((previousPlan) =>
            previousPlan.filter((workout) => workout.id !== id)
        );
    };

    const removeFromSaved = (id: number) => {
        setSaved((previousSaved) =>
            previousSaved.filter((workout) => workout.id !== id)
        );
    };

    return (
        <WorkoutContext.Provider
            value={{
                plan,
                saved,
                addToPlan,
                saveWorkout,
                removeFromPlan,
                removeFromSaved,
            }}
        >
            {children}
        </WorkoutContext.Provider>
    );
};

export const useWorkout = () => {
    const context = useContext(WorkoutContext);

    if (!context) {
        throw new Error("useWorkout must be used inside WorkoutProvider");
    }

    return context;
};

