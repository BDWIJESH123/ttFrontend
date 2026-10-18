import { useEffect, useState } from "react";
import api from "./services/api";

function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/rooms")
      .then((response) => {
        setRooms(response.data);
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load rooms. Check the backend.");
      });
  }, []);

  return (
    <div>
      <h2>Available Rooms</h2>

      {error && <p>{error}</p>}

      {rooms.map((room) => (
        <div key={room.id}>
          <h3>{room.name}</h3>
          <p>Type: {room.type}</p>
          <p>Capacity: {room.capacity}</p>
          <p>Location: {room.location}</p>
          <p>Status: {room.status}</p>
        </div>
      ))}
    </div>
  );
}


export default RoomList;
