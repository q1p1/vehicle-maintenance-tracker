import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import CarDetails from "./components/CarDetails";
import AddMaintenance from "./components/AddMaintenance";
import AddCar from "./components/AddCar";

const App = () => {
  return (
    <Router>
      <div>
        <header className="bg-gray-800 text-white p-4 fixed top-0 left-0 w-full z-10 shadow-lg">
          <nav className="container mx-auto flex justify-between">
            <Link to="/" className="text-lg font-bold">
              Car Maintenance App
            </Link>
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="hover:text-gray-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/add-car" className="hover:text-gray-400">
                  Add Car
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <main className="pt-20 p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/car/:id" element={<CarDetails />} />
            <Route path="/add-maintenance/:id" element={<AddMaintenance />} />
            <Route path="/add-car" element={<AddCar />} />{" "}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
