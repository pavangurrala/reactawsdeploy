import React, { useState, useEffect } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "./api";

const App = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ ID:"", Name: "", Email: "" });
  const [updateUserDetails, setUpdateUserDetails] = useState({ ID: "", Name: "", Email: "" });
  const [deleteUserId, setDeleteUserId] = useState("");

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const { data } = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Create a new user
  const handleCreateUser = async () => {
    try {
      await createUser(newUser);
      setNewUser({ ID: "", Name: "", Email: "" });
      fetchUsers();
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };

  // Update a user
  const handleUpdateUser = async () => {
    try {
      await updateUser(updateUserDetails.ID, {
        Name: updateUserDetails.Name,
        Email: updateUserDetails.Email,
      });
      setUpdateUserDetails({ ID: "", Name: "", Email: "" });
      fetchUsers();
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  // Delete a user
  const handleDeleteUser = async () => {
    try {
      await deleteUser(deleteUserId);
      setDeleteUserId("");
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div>
      <h1>User Management</h1>

      {/* User Table */}
      <div>
        <h2>All Users</h2>
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.ID}>
                <td>{user.ID}</td>
                <td>{user.Name}</td>
                <td>{user.Email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create User */}
      <div>
        <h2>Create User</h2>
        <input
          type="text"
          placeholder="ID"
          value={newUser.ID}
          onChange={(e) => setNewUser({ ...newUser, ID: e.target.value })}
        />
        <input
          type="text"
          placeholder="Name"
          value={newUser.Name}
          onChange={(e) => setNewUser({ ...newUser, Name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.Email}
          onChange={(e) => setNewUser({ ...newUser, Email: e.target.value })}
        />
        <button onClick={handleCreateUser}>Create</button>
      </div>

      {/* Update User */}
      <div>
        <h2>Update User</h2>
        <input
          type="text"
          placeholder="ID"
          value={updateUserDetails.ID}
          onChange={(e) => setUpdateUserDetails({ ...updateUserDetails, ID: e.target.value })}
        />
        <input
          type="text"
          placeholder="Name"
          value={updateUserDetails.Name}
          onChange={(e) => setUpdateUserDetails({ ...updateUserDetails, Name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={updateUserDetails.Email}
          onChange={(e) => setUpdateUserDetails({ ...updateUserDetails, Email: e.target.value })}
        />
        <button onClick={handleUpdateUser}>Update</button>
      </div>

      {/* Delete User */}
      <div>
        <h2>Delete User</h2>
        <input
          type="text"
          placeholder="User ID"
          value={deleteUserId}
          onChange={(e) => setDeleteUserId(e.target.value)}
        />
        <button onClick={handleDeleteUser}>Delete</button>
      </div>
    </div>
  );
};

export default App;
