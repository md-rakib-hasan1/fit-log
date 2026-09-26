const Loading = () => {
    return (
        <main className="flex min-h-[70vh] items-center justify-center">
            <div className="flex flex-col items-center gap-4">

                <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-700 border-t-lime-400" />

                <p className="text-sm text-gray-400">
                    Loading workouts…
                </p>

            </div>
        </main>
    );
};

export default Loading;