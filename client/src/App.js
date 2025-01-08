import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { useEffect, useState } from 'react';
import { fetchPatients, addPatient, dischargePatient } from './patientSlice';

function App() {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients.list);
  const [newPatient, setNewPatient] = useState({ name: '', age: '', bedNumber: '' });

  useEffect(() => {
    dispatch(fetchPatients())
  }, [dispatch]);

  const handleAddPatient = () => {
    dispatch(addPatient(newPatient));
    setNewPatient({ name: "", age: "", bedNumber: "" })
  }

  const handleDischarge = (id) => {
    dispatch(dischargePatient(id));
  };

  return (
    <div className="App">
      <h1>Hospital Management</h1>
      <h2>All Patients</h2>
      <ul>
        {patients.length > 0 ? (
          patients.map((patient) => {
            return (
              <li key={patient._id}>
                <p><strong>Name:</strong> {patient.name}</p>
                <p><strong>Age:</strong> {patient.age}</p>
                <p><strong>Bed Number:</strong> {patient.bedNumber}</p>
                <button onClick={() => handleDischarge(patient._id)}>Discharge</button>
              </li>
            );
          })
        ) : (
          <p>No patients available.</p>
        )}
      </ul>
      <h2>Add New Patient</h2>
      <input
        type="text"
        placeholder="Name"
        value={newPatient.name}
        onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Age"
        value={newPatient.age}
        onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
      />
      <input
        type="number"
        placeholder="Bed Number"
        value={newPatient.bedNumber}
        onChange={(e) => setNewPatient({ ...newPatient, bedNumber: e.target.value })}
      />
      <button onClick={handleAddPatient}>Add Patient</button>
    </div>
  );
}

export default App;
