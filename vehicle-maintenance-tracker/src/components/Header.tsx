import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link
            to="/"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-200"
          >
            Back to Car List
          </Link>
          <Link
            to="/add-car"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors duration-200"
          >
            Add Car
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
