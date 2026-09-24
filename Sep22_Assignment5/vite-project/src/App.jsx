import { useState, useEffect } from "react";
import "./App.css";

const API_BASE_URL = "http://localhost:5000";

function App() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("Academic");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");

  // Editing state: stores the ID of request currently being edited
  const [editingId, setEditingId] = useState(null);

  // Fetch all requests
  const fetchRequests = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/requests`);
      if (response.ok) {
        const data = await response.json();
        setRequests(data);
      }
    } catch (error) {
      console.error("Failed to fetch requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Reset form inputs
  const resetForm = () => {
    setStudentName("");
    setEmail("");
    setCategory("Academic");
    setDescription("");
    setPriority("Medium");
    setEditingId(null);
  };

  // Submit new request or Update existing request
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!studentName.trim() || !email.trim() || !description.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    const payload = {
      studentName: studentName.trim(),
      email: email.trim(),
      category: category.trim(),
      description: description.trim(),
      priority: priority,
    };

    try {
      if (editingId) {
        // PUT request: update existing
        const response = await fetch(`${API_BASE_URL}/api/requests/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          resetForm();
          fetchRequests();
        }
      } else {
        // POST request: create new
        const response = await fetch(`${API_BASE_URL}/api/requests`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          resetForm();
          fetchRequests();
        }
      }
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };

  // Populate form with request data for editing
  const handleEditClick = (item) => {
    setEditingId(item.id);
    setStudentName(item.studentName);
    setEmail(item.email);
    setCategory(item.category);
    setDescription(item.description);
    setPriority(item.priority || "Medium");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete a request
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/requests/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        if (editingId === id) resetForm();
        fetchRequests();
      }
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  // Quick Status Toggle (Pending -> In Progress -> Resolved)
  const handleStatusToggle = async (item) => {
    const nextStatus =
      item.status === "Pending"
        ? "In Progress"
        : item.status === "In Progress"
        ? "Resolved"
        : "Pending";

    try {
      const response = await fetch(`${API_BASE_URL}/api/requests/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: nextStatus }),
      });

      if (response.ok) {
        fetchRequests();
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="helpdesk-container">
      {/* Header */}
      <header className="helpdesk-header">
        <h1>Campus Help Desk</h1>
        <p>Submit and track campus-related issues and student requests</p>
      </header>

      {/* Top Section: Submit / Edit Request Form */}
      <section className="card-section form-section">
        <h2 className="section-title">
          {editingId ? "Update Request" : "Submit New Request"}
        </h2>

        <form className="helpdesk-form" onSubmit={handleSubmit}>
          <div className="form-row-2">
            <div className="form-field">
              <label htmlFor="studentName">Student Name *</label>
              <input
                id="studentName"
                type="text"
                placeholder="Enter your full name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="email">College Email *</label>
              <input
                id="email"
                type="email"
                placeholder="e.g. rollno@abes.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-field">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Academic">Academic</option>
                <option value="Hostel">Hostel</option>
                <option value="Mess">Mess / Canteen</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="IT Support">IT Support & Wi-Fi</option>
                <option value="Library">Library</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="priority">Priority *</label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="description">Problem Description *</label>
            <textarea
              id="description"
              rows="3"
              placeholder="Describe the issue in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {editingId ? "Save Changes" : "Submit Request"}
            </button>
            {editingId && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      {/* Bottom Section: Requests List */}
      <section className="card-section list-section">
        <h2 className="section-title">Submitted Requests</h2>

        {loading ? (
          <p className="status-message">Loading requests...</p>
        ) : requests.length === 0 ? (
          <p className="status-message">No requests submitted yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="requests-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Student Info</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((item) => (
                  <tr key={item.id}>
                    <td className="col-id">#{item.id}</td>
                    <td className="col-student">
                      <div className="student-name">{item.studentName}</div>
                      <div className="student-email">{item.email}</div>
                    </td>
                    <td>
                      <span className="badge category-badge">
                        {item.category}
                      </span>
                    </td>
                    <td className="col-desc">{item.description}</td>
                    <td>
                      <span className={`badge priority-${(item.priority || "medium").toLowerCase()}`}>
                        {item.priority || "Medium"}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className={`status-btn status-${(item.status || "pending").toLowerCase().replace(" ", "-")}`}
                        onClick={() => handleStatusToggle(item)}
                        title="Click to toggle status"
                      >
                        {item.status || "Pending"}
                      </button>
                    </td>
                    <td className="col-actions">
                      <button
                        type="button"
                        className="btn-action btn-edit"
                        onClick={() => handleEditClick(item)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn-action btn-delete"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;