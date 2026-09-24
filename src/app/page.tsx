import { getWorkouts } from "@/lib/api";

const HomePage = async () => {
  const workouts = await getWorkouts();

  console.log(workouts);

  return <h1>Fit Log</h1>;
};

export default HomePage;