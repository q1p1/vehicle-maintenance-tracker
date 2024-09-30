import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

interface MaintenanceEntry {
  id: number;
  date: string;
  type: string;
  cost: string;
  distanceBefore: string;
  distanceNext: string;
}

const AddMaintenance = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [type, setType] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [cost, setCost] = useState<string>("");
  const [distanceBefore, setDistanceBefore] = useState<string>("");
  const [distanceNext, setDistanceNext] = useState<string>("");
  const [maintenanceHistory, setMaintenanceHistory] = useState<
    MaintenanceEntry[]
  >([]);
  const [editEntryId, setEditEntryId] = useState<number | null>(null);

  useEffect(() => {
    const history: MaintenanceEntry[] = JSON.parse(
      localStorage.getItem(`maintenance_${id}`) || "[]"
    );
    setMaintenanceHistory(history);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newEntry: MaintenanceEntry = {
      id: editEntryId ? editEntryId : maintenanceHistory.length + 1,
      type,
      date,
      cost,
      distanceBefore,
      distanceNext,
    };

    let updatedHistory;
    if (editEntryId) {
      updatedHistory = maintenanceHistory.map((entry) =>
        entry.id === editEntryId ? newEntry : entry
      );
    } else {
      updatedHistory = [...maintenanceHistory, newEntry];
    }

    setMaintenanceHistory(updatedHistory);
    localStorage.setItem(`maintenance_${id}`, JSON.stringify(updatedHistory));

    setType("");
    setDate("");
    setCost("");
    setDistanceBefore("");
    setDistanceNext("");
    setEditEntryId(null);

    navigate(`/car/${id}`);
  };

  const handleEdit = (entryId: number) => {
    const entryToEdit = maintenanceHistory.find(
      (entry) => entry.id === entryId
    );
    if (entryToEdit) {
      setType(entryToEdit.type);
      setDate(entryToEdit.date);
      setCost(entryToEdit.cost);
      setDistanceBefore(entryToEdit.distanceBefore);
      setDistanceNext(entryToEdit.distanceNext);
      setEditEntryId(entryToEdit.id);
    }
  };

  const handleDelete = (entryId: number) => {
    const updatedHistory = maintenanceHistory.filter(
      (entry) => entry.id !== entryId
    );
    setMaintenanceHistory(updatedHistory);
    localStorage.setItem(`maintenance_${id}`, JSON.stringify(updatedHistory));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {editEntryId ? "Edit Maintenance" : "Add Maintenance"} for Car {id}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-gray-800 text-white p-6 rounded-lg shadow-md"
      >
        <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-lg">
          <tbody>
            <tr>
              <td className="border px-4 py-2 font-semibold">
                Type of Maintenance:
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                  className="border border-gray-300 p-2 rounded-md bg-white text-black"
                />
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Date:</td>
              <td className="border px-4 py-2">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="border border-gray-300 p-2 rounded-md bg-white text-black"
                />
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Cost:</td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  required
                  className="border border-gray-300 p-2 rounded-md bg-white text-black"
                />
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">
                Distance Before Maintenance:
              </td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  value={distanceBefore}
                  onChange={(e) => setDistanceBefore(e.target.value)}
                  required
                  className="border border-gray-300 p-2 rounded-md bg-white text-black"
                />
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">
                Distance for Next Maintenance:
              </td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  value={distanceNext}
                  onChange={(e) => setDistanceNext(e.target.value)}
                  required
                  className="border border-gray-300 p-2 rounded-md bg-white text-black"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {editEntryId ? "Update Maintenance" : "Add Maintenance"}
        </button>
      </form>

      <h2 className="text-xl font-bold mt-6">Maintenance History</h2>
      {maintenanceHistory.length === 0 ? (
        <p>No maintenance records available.</p>
      ) : (
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
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {maintenanceHistory.map((entry) => (
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
                <td className="border-t border-gray-700 py-3 px-6">
                  <button
                    onClick={() => handleEdit(entry.id)}
                    className="text-yellow-500 hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AddMaintenance;
