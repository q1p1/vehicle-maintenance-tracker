import { useState } from "react";

const AddCar = () => {
  const [carName, setCarName] = useState("");
  const [carType, setCarType] = useState("");
  const [carYear, setCarYear] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // تخزين السيارة في localStorage
    const cars = JSON.parse(localStorage.getItem("cars") || "[]");
    const newCar = {
      id: cars.length + 1,
      name: carName,
      type: carType,
      year: carYear,
    };
    cars.push(newCar);
    localStorage.setItem("cars", JSON.stringify(cars));

    // إعادة تعيين الحقول
    setCarName("");
    setCarType("");
    setCarYear("");
    alert("Car added successfully!");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add a New Car</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Car Name</label>
          <input
            type="text"
            value={carName}
            onChange={(e) => setCarName(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Car Type</label>
          <input
            type="text"
            value={carType}
            onChange={(e) => setCarType(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Year</label>
          <input
            type="number"
            value={carYear}
            onChange={(e) => setCarYear(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
          Add Car
        </button>
      </form>
    </div>
  );
};

export default AddCar;
