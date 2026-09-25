import Image from "next/image";

const Hero = () => {
    return (
        <section className="w-full px-7 py-10">
            <div className="flex flex-col items-center justify-between gap-8 rounded-xl border border-gray-800 bg-[#111318] p-6 md:p-8 lg:flex-row">

                <div className="w-full max-w-xl">

                    <p className="pb-7 text-xs font-bold text-lime-400">
                        WORKOUT LIBRARY
                    </p>

                    <h1 className="pb-7 text-3xl font-oswald font-bold sm:text-4xl lg:text-5xl">
                        TRAIN WITH INTENT.LOG
                        <br />
                        EVERY SET.
                    </h1>

                    <p className="max-w-lg pb-7 text-sm leading-6 text-gray-400">
                        FitLog is a dark, no-nonsense gym companion:
                        pick a lift, lock it into today's plan,
                        and watch the week's work add up.
                    </p>

                    <a
                        href="#library"
                        className="inline-block rounded-lg bg-[#C2F800] px-5 py-3 font-bold text-black transition hover:bg-[#d4ff33]"
                    >
                        BROWSE WORKOUTS
                    </a>
                </div>


                <div className="relative w-full max-w-xl">
                    <Image
                        src="/assets/banner.png"
                        alt="Workout banner"
                        width={700}
                        height={450}
                        className="h-auto w-full rounded-lg object-cover"
                    />
                </div>

            </div>
        </section>
    );
};

export default Hero;