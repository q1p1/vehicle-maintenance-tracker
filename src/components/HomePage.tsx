import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

interface Car {
  id: number;
  name: string;
  type: string;
  year: string;
  lastMaintenance: string;
  nextMaintenanceDate: string;
}

const HomePage = () => {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
     const storedCars: Car[] = JSON.parse(localStorage.getItem("cars") || "[]");
    setCars(storedCars);
  }, []);

  return (
    <div className="container mx-auto p-4 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          Car List
        </h1>

         <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden">
            <thead className="bg-gray-700 text-gray-300">
              <tr>
                <th className="py-3 px-6 text-left">Car Name</th>
                <th className="py-3 px-6 text-left">Type</th>
                <th className="py-3 px-6 text-left">Year</th>
                <th className="py-3 px-6 text-left">Last Maintenance</th>
                <th className="py-3 px-6 text-left">Next Maintenance Date</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.length > 0 ? (
                cars.map((car) => (
                  <tr
                    key={car.id}
                    className="hover:bg-gray-700 transition-colors duration-200"
                  >
                    <td className="border-t border-gray-700 py-3 px-6">
                      {car.name}
                    </td>
                    <td className="border-t border-gray-700 py-3 px-6">
                      {car.type}
                    </td>
                    <td className="border-t border-gray-700 py-3 px-6">
                      {car.year}
                    </td>
                    <td className="border-t border-gray-700 py-3 px-6">
                      {car.lastMaintenance}
                    </td>
                    <td className="border-t border-gray-700 py-3 px-6">
                      {car.nextMaintenanceDate}
                    </td>
                    <td className="border-t border-gray-700 py-3 px-6">
                      <Link
                        to={`/car/${car.id}`}
                        className="text-blue-500 hover:underline hover:text-blue-400 transition-colors"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-300">
                    No cars available. Add a new car.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
