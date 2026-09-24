import Link from "next/link";
const Navbar = () => {
    return (
        <div className="flex justify-between p-6">
            <div>
                <Link href="/">FITLOG</Link>
            </div>
            
            <div className="flex gap-3">
                <Link href="/workouts">Workouts</Link>
                <Link href="/my-plan">My Plan</Link>
            </div>

            <div className="flex gap-3">
                <Link href="/">Saved</Link>
                <Link href="/">Plan</Link>
            </div>

        </div>
    );
};

export default Navbar;