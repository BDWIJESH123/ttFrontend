
import { useState } from "react";

export default function Dashboard({ onLogout }) {
  const [activePage, setActivePage] = useState("Dashboard");
  const [search, setSearch] = useState("");

  // Room data entered by the user
  const [rooms, setRooms] = useState([]);

  // Add room form
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [newRoom, setNewRoom] = useState({
    name: "",
    type: "Classroom",
    capacity: "",
    location: "",
  });

  // Booking form
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [message, setMessage] = useState("");

  // Booking history
  const [bookings, setBookings] = useState([]);

  const filteredRooms = rooms.filter((room) =>
    `${room.name} ${room.type} ${room.location}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function handleAddRoom(event) {
    event.preventDefault();

    const room = {
      id: Date.now(),
      name: newRoom.name.trim(),
      type: newRoom.type,
      capacity: Number(newRoom.capacity),
      location: newRoom.location.trim(),
      status: "Available",
    };

    if (
      !room.name ||
      !room.location ||
      !Number.isFinite(room.capacity) ||
      room.capacity < 1
    ) {
      setMessage("Enter valid room details and capacity.");
      return;
    }

    setRooms((previousRooms) => [...previousRooms, room]);

    setNewRoom({
      name: "",
      type: "Classroom",
      capacity: "",
      location: "",
    });

    setShowAddRoom(false);
    setMessage("Room added successfully.");
  }

  function handleBooking(event) {
    event.preventDefault();

    if (!selectedRoom || !date || !startTime || !endTime) {
      setMessage("Please complete all booking details.");
      return;
    }

    if (date < new Date().toLocaleDateString("en-CA")) {
      setMessage("Please select today or a future date.");
      return;
    }

    if (startTime >= endTime) {
      setMessage("End time must be later than start time.");
      return;
    }

    // Prevent overlapping bookings for the same room and date
    const conflict = bookings.some(
      (booking) =>
        booking.roomId === selectedRoom.id &&
        booking.date === date &&
        booking.status === "Confirmed" &&
        startTime < booking.endTime &&
        endTime > booking.startTime
    );

    if (conflict) {
      setMessage("This room already has a booking during that time.");
      return;
    }

    const booking = {
      id: Date.now(),
      roomId: selectedRoom.id,
      roomName: selectedRoom.name,
      date,
      startTime,
      endTime,
      status: "Confirmed",
    };

    setBookings((previousBookings) => [...previousBookings, booking]);
    setMessage(`Booking confirmed for ${selectedRoom.name}.`);

    setSelectedRoom(null);
    setDate("");
    setStartTime("");
    setEndTime("");
    setActivePage("My Bookings");
  }

  function cancelBooking(bookingId) {
    setBookings((previousBookings) =>
      previousBookings.filter((booking) => booking.id !== bookingId)
    );
    setMessage("Booking cancelled.");
  }

  function changePage(page) {
    setActivePage(page);
    setMessage("");
    setSelectedRoom(null);
    setShowAddRoom(false);
  }

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h2 className="brand">🏫 RoomBook</h2>
        <p className="sidebar-caption">CAMPUS BOOKING SYSTEM</p>

        {["Dashboard", "Rooms", "My Bookings", "Profile"].map((item) => (
          <button
            key={item}
            type="button"
            className={`nav-item ${activePage === item ? "active" : ""}`}
            onClick={() => changePage(item)}
          >
            {item === "Dashboard" && "▦"}
            {item === "Rooms" && "▤"}
            {item === "My Bookings" && "▣"}
            {item === "Profile" && "◉"}
            {" "}{item}
          </button>
        ))}

        <button
          type="button"
          className="nav-item logout"
          onClick={onLogout}
        >
          ↪ Sign Out
        </button>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">ROOMBOOK / CAMPUS</p>
            <h1>{activePage}</h1>
            <p>Manage your classrooms and meeting spaces.</p>
          </div>
          <div className="user-avatar">U</div>
        </header>

        {/* Dashboard home */}
        {activePage === "Dashboard" && (
          <section className="welcome-panel">
            <div>
              <p>WELCOME TO ROOMBOOK!</p>
              <h2>Manage your campus spaces in one place.</h2>
              <span>
                Add your rooms, check booking schedules, and organize your sessions.
              </span>
              <br />
              <button
                type="button"
                className="primary-button"
                onClick={() => changePage("Rooms")}
              >
                Explore rooms →
              </button>
            </div>
            <div className="welcome-icon">🏢</div>
          </section>
        )}

        {/* Room directory */}
        {activePage === "Rooms" && (
          <>
            <div className="rooms-heading">
              <div>
                <h2>Room Directory</h2>
                <p>Add and manage your campus spaces.</p>
              </div>

              <button
                type="button"
                className="primary-button"
                onClick={() => {
                  setShowAddRoom((previous) => !previous);
                  setSelectedRoom(null);
                  setMessage("");
                }}
              >
                {showAddRoom ? "Close form" : "+ Add Room"}
              </button>
            </div>

            {showAddRoom && (
              <form className="booking-form" onSubmit={handleAddRoom}>
                <h2>Add a New Room</h2>

                <label htmlFor="room-name">Room Name</label>
                <input
                  id="room-name"
                  value={newRoom.name}
                  onChange={(event) =>
                    setNewRoom({ ...newRoom, name: event.target.value })
                  }
                  placeholder="e.g. Classroom A-101"
                  required
                />

                <label htmlFor="room-type">Room Type</label>
                <select
                  id="room-type"
                  value={newRoom.type}
                  onChange={(event) =>
                    setNewRoom({ ...newRoom, type: event.target.value })
                  }
                  required
                >
                  <option value="Classroom">Classroom</option>
                  <option value="Meeting Room">Meeting Room</option>
                  <option value="Laboratory">Laboratory</option>
                  <option value="Seminar Hall">Seminar Hall</option>
                </select>

                <label htmlFor="room-capacity">Capacity</label>
                <input
                  id="room-capacity"
                  type="number"
                  min="1"
                  step="1"
                  value={newRoom.capacity}
                  onChange={(event) =>
                    setNewRoom({ ...newRoom, capacity: event.target.value })
                  }
                  placeholder="Number of people"
                  required
                />

                <label htmlFor="room-location">Location / Block</label>
                <input
                  id="room-location"
                  value={newRoom.location}
                  onChange={(event) =>
                    setNewRoom({ ...newRoom, location: event.target.value })
                  }
                  placeholder="e.g. Block A"
                  required
                />

                <button type="submit" className="primary-button">
                  Save Room
                </button>

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowAddRoom(false)}
                >
                  Cancel
                </button>
              </form>
            )}

            <input
              className="search-input"
              placeholder="Search rooms, types, or blocks..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            {filteredRooms.length > 0 ? (
              <section className="rooms-grid">
                {filteredRooms.map((room) => (
                  <article className="room-card" key={room.id}>
                    <div className="room-icon">🏢</div>

                    <span className="room-status available">
                      Available
                    </span>

                    <h3>{room.name}</h3>
                    <p>{room.type} · {room.location}</p>
                    <p>Capacity: {room.capacity} people</p>

                    <button
                      type="button"
                      className="primary-button"
                      onClick={() => {
                        setSelectedRoom(room);
                        setShowAddRoom(false);
                        setDate("");
                        setStartTime("");
                        setEndTime("");
                        setMessage("");
                      }}
                    >
                      Book this room
                    </button>
                  </article>
                ))}
              </section>
            ) : (
              <section className="empty-state">
                <div>🏢</div>
                <h2>{search ? "No rooms found" : "No rooms added yet"}</h2>
                <p>
                  {search
                    ? "Try another search term."
                    : "Add your first room to get started."}
                </p>
                {!search && (
                  <button
                    type="button"
                    className="primary-button"
                    onClick={() => setShowAddRoom(true)}
                  >
                    + Add Your First Room
                  </button>
                )}
              </section>
            )}

            {/* Booking form */}
            {selectedRoom && (
              <form className="booking-form" onSubmit={handleBooking}>
                <h2>Book {selectedRoom.name}</h2>
                <p>
                  {selectedRoom.location} · Capacity: {selectedRoom.capacity}
                </p>

                <label htmlFor="booking-date">Booking Date</label>
                <input
                  id="booking-date"
                  type="date"
                  min={new Date().toLocaleDateString("en-CA")}
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  required
                />

                <label htmlFor="booking-start">Start Time</label>
                <input
                  id="booking-start"
                  type="time"
                  value={startTime}
                  onChange={(event) => setStartTime(event.target.value)}
                  required
                />

                <label htmlFor="booking-end">End Time</label>
                <input
                  id="booking-end"
                  type="time"
                  value={endTime}
                  onChange={(event) => setEndTime(event.target.value)}
                  required
                />

                <button type="submit" className="primary-button">
                  Confirm Booking
                </button>

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setSelectedRoom(null)}
                >
                  Cancel
                </button>
              </form>
            )}
          </>
        )}

        {/* Booking history */}
        {activePage === "My Bookings" && (
          <section>
            {bookings.length === 0 ? (
              <div className="empty-state">
                <div>📅</div>
                <h2>No bookings yet</h2>
                <p>Your confirmed bookings will appear here.</p>
                <button
                  type="button"
                  className="primary-button"
                  onClick={() => changePage("Rooms")}
                >
                  Browse Rooms
                </button>
              </div>
            ) : (
              <div className="rooms-grid">
                {bookings.map((booking) => (
                  <article className="room-card" key={booking.id}>
                    <span className="room-status available">
                      {booking.status}
                    </span>
                    <h3>{booking.roomName}</h3>
                    <p>Date: {booking.date}</p>
                    <p>
                      Time: {booking.startTime} – {booking.endTime}
                    </p>
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={() => cancelBooking(booking.id)}
                    >
                      Cancel Booking
                    </button>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Profile */}
        {activePage === "Profile" && (
          <section className="empty-state">
            <div>👤</div>
            <h2>Your Profile</h2>
            <p>Profile information can be connected to your account later.</p>
          </section>
        )}

        {message && (
          <p className="notice" role="status">
            {message}
          </p>
        )}
      </main>
    </div>
  );
}
