import Link from "next/link";

const NotFound = () => {
    return (
        <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6">
            <div className="text-center">
                <p className="font-oswald text-sm tracking-[0.2em] text-lime-400">
                    404
                </p>

                <h1 className="mt-2 font-oswald text-5xl font-bold">
                    WORKOUT NOT FOUND
                </h1>

                <p className="mt-3 text-gray-400">
                    The page you’re looking for doesn’t exist.
                </p>

                <Link
                    href="/"
                    className="mt-6 inline-block rounded-lg bg-lime-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-lime-300"
                >
                    BACK TO WORKOUTS
                </Link>
            </div>
        </main>
    );
};

export default NotFound;