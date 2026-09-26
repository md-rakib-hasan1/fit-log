import Image from 'next/image'

const Footer = () => {
    return (
        <footer className="text-white">
            <div className="mx-auto max-w-7xl px-4 py-6">
                
                <div className="border-t border-gray-800 pt-5">
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

                        <div className="flex items-center gap-2">
                            <Image
                                src="/assets/logo.png"
                                alt="FitLog Logo"
                                width={28}
                                height={28}
                            />

                            <span className="text-xl font-oswald font-bold tracking-wide">
                                FITLOG
                            </span>
                        </div>

                        <p className="text-center text-sm text-gray-400 md:text-right">
                            © 2026 FitLog — Workout Library. Train hard, log honest.
                        </p>

                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;