import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-black shadow-md">
      <div className="flex items-center justify-between px-6 py-4 text-lg">
        <Link to="/">Home</Link>
        <Link to="/">Trending</Link>
        <Link to="/discover">Discover</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/footer">About</Link>
      </div>
    </nav>
  );
};

export default NavBar;
