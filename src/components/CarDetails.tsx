import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

interface Car {
  id: number;
  name: string;
  type: string;
  year: string;
  lastMaintenance: string;
  nextMaintenanceDate: string;
  maintenanceHistory: MaintenanceEntry[];
}

interface MaintenanceEntry {
  id: number;
  date: string;
  type: string;
  cost: string;
  distanceBefore: string;
  distanceNext: string;
}

const CarDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // استخدام useNavigate للتوجيه
  const [car, setCar] = useState<Car | null>(null);
  const [isEditing, setIsEditing] = useState(false); // للتحكم في التعديل
  const [carName, setCarName] = useState<string>("");
  const [carType, setCarType] = useState<string>("");
  const [carYear, setCarYear] = useState<string>("");

  useEffect(() => {
    const storedCars: Car[] = JSON.parse(localStorage.getItem("cars") || "[]");
    const carDetails = storedCars.find((car) => car.id === Number(id));
    if (carDetails) {
      setCar(carDetails);
      setCarName(carDetails.name);
      setCarType(carDetails.type);
      setCarYear(carDetails.year);
    }
  }, [id]);

  const handleEdit = () => {
    if (!car) return;
    const storedCars: Car[] = JSON.parse(localStorage.getItem("cars") || "[]");
    const updatedCars = storedCars.map((c) => {
      if (c.id === car.id) {
        return { ...c, name: carName, type: carType, year: carYear };
      }
      return c;
    });
    localStorage.setItem("cars", JSON.stringify(updatedCars));
    setCar({ ...car, name: carName, type: carType, year: carYear });
    setIsEditing(false); // إغلاق وضع التعديل
  };

  const handleDelete = () => {
    if (!car) return;
    const storedCars: Car[] = JSON.parse(localStorage.getItem("cars") || "[]");
    const updatedCars = storedCars.filter((c) => c.id !== car.id);
    localStorage.setItem("cars", JSON.stringify(updatedCars));
    navigate("/"); // توجيه المستخدم للصفحة الرئيسية بعد الحذف
  };

  const handleAddMaintenance = () => {
    // توجيه المستخدم إلى صفحة إضافة صيانة
    navigate(`/add-maintenance/${id}`);
  };

  if (!car) {
    return <p>Car not found.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        {isEditing ? "Edit Car" : `${car.name} Details`}
      </h1>

      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Car Name</label>
            <input
              type="text"
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Car Type</label>
            <input
              type="text"
              value={carType}
              onChange={(e) => setCarType(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Car Year</label>
            <input
              type="text"
              value={carYear}
              onChange={(e) => setCarYear(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 ml-2"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-lg">
              <thead className="bg-gray-700 text-gray-300">
                <tr>
                  <th className="py-3 px-6 text-left">Property</th>
                  <th className="py-3 px-6 text-left">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-700 transition-colors duration-200">
                  <td className="border-t border-gray-700 py-3 px-6">
                    Car Name
                  </td>
                  <td className="border-t border-gray-700 py-3 px-6">
                    {car.name}
                  </td>
                </tr>
                <tr className="hover:bg-gray-700 transition-colors duration-200">
                  <td className="border-t border-gray-700 py-3 px-6">Type</td>
                  <td className="border-t border-gray-700 py-3 px-6">
                    {car.type}
                  </td>
                </tr>
                <tr className="hover:bg-gray-700 transition-colors duration-200">
                  <td className="border-t border-gray-700 py-3 px-6">Year</td>
                  <td className="border-t border-gray-700 py-3 px-6">
                    {car.year}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Maintenance History */}

          {car.maintenanceHistory && car.maintenanceHistory.length > 0 ? (
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-lg">
                <thead className="bg-gray-700 text-gray-300">
                  <tr>
                    <th className="py-3 px-6 text-left">Date</th>
                    <th className="py-3 px-6 text-left">Type</th>
                    <th className="py-3 px-6 text-left">Cost</th>
                    <th className="py-3 px-6 text-left">Distance Before</th>
                    <th className="py-3 px-6 text-left">
                      Distance for Next Maintenance
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {car.maintenanceHistory.map((entry) => (
                    <tr
                      key={entry.id}
                      className="hover:bg-gray-700 transition-colors duration-200"
                    >
                      <td className="border-t border-gray-700 py-3 px-6">
                        {entry.date}
                      </td>
                      <td className="border-t border-gray-700 py-3 px-6">
                        {entry.type}
                      </td>
                      <td className="border-t border-gray-700 py-3 px-6">
                        {entry.cost}
                      </td>
                      <td className="border-t border-gray-700 py-3 px-6">
                        {entry.distanceBefore}
                      </td>
                      <td className="border-t border-gray-700 py-3 px-6">
                        {entry.distanceNext}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p></p>
          )}

          {/* Edit, Delete, and Add Maintenance Buttons */}
          <div className="mt-6 flex space-x-4">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-700"
            >
              Edit Car
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
            >
              Delete Car
            </button>
            <button
              onClick={handleAddMaintenance}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Add Maintenance
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;
