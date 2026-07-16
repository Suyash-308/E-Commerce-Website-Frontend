import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/authApi";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(form);

      console.log("Login Response:", response.data);

      if (!response.data || !response.data.token) {
        alert("Token not received from backend");
        console.log("Response:", response.data);
        return;
      }

      localStorage.setItem("token", response.data.token);

      console.log(
        "Saved Token:",
        localStorage.getItem("token")
      );

      alert("Login Successful");

      navigate("/");

    } catch (error) {
      console.log("Login Error:", error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
      }

      alert("Login Failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
          required
          autoComplete="email"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
          required
          autoComplete="current-password"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;