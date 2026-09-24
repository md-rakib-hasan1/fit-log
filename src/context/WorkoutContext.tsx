"use client";
import { createContext, useContext, useState } from "react";
import type { Workout } from "../types/workout";

interface WorkoutContextType {
    plan: Workout[];
    saved: Workout[];
    addToPlan: (workout: Workout) => void;
    saveWorkout: (workout: Workout) => void;
};


const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider = ({ children }: { children: React.ReactNode }) => {
    const [plan, setPlan] = useState<Workout[]>([]);
    const [saved, setSaved] = useState<Workout[]>([]);

    const addToPlan = (workout: Workout) => {
        setPlan((previousPlan) => [...previousPlan, workout]);

    }

    const saveWorkout = (workout: Workout) => {
        setSaved((previousSaved) => [...previousSaved, workout]);
    }
    return (
        <WorkoutContext.Provider
            value={{
                plan,
                saved,
                addToPlan,
                saveWorkout,
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