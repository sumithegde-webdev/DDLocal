// AdminLogin.js
import React, { useState } from "react";
// import { useHistory } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const history = useHistory();

  const handleLogin = () => {
    // Perform authentication logic here
    // If authentication is successful, redirect to the Admin dashboard
    // history.push("/admin/dashboard");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl mb-4">Admin Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-2 p-2 border rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded-md"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
