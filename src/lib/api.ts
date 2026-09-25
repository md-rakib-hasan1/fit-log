import type { Workout } from "../types/workout"; 

export const getWorkouts= async ():Promise<Workout[]>=> {
    const response = await fetch("https://api.abcz.workers.dev/api/fitlog");
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    const data = await response.json();

    return data;

};

export const getWorkoutById=async(id:string):Promise<Workout>=>{
    const response=await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);

    if(!response.ok){
        throw new Error("Failed to fetch workout");
    }

    const data =await response.json();
     return data;

};