import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User, FormError } from "../../types/user";
import axios from "axios";
import { validateForm } from "../utils/validateFields";

export const UserForm: React.FC<{ user?: User }> = ({ user }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    role: user?.role || "",
    department: user?.department || "",
    location: user?.location || "",
  });

  const [errors, setErrors] = useState<FormError[]>([]);
  const [apiError, setApiError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    setErrors(newErrors);
    setApiError("");

    if (newErrors.length === 0) {
      try {
        setLoading(true);
        if (user) {
          // Edit user
          await axios.put(
            `${import.meta.env.VITE_BASE_URL}/${user.id}/update`,
            formData
          );
        } else {
          // Add user
          await axios.post(`${import.meta.env.VITE_BASE_URL}/create`, formData);
        }
        navigate("/");
      } catch (error: any) {
        setApiError(error.response?.data?.error || "Failed to save user");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 mt-10">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">
          {user ? "Edit User" : "Add User"}
        </h2>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-500 text-white p-2 rounded cursor-pointer"
        >
          back
        </button>
      </div>
      {apiError && <p className="text-red-500 mb-4">{apiError}</p>}
      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 md:gap-8 gap-4 grid-cols-1"
      >
        <div>
          <label className="block font-medium uppercase">
            First Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.find((e) => e.field === "firstName") && (
            <p className="text-red-500 text-sm">
              {errors.find((e) => e.field === "firstName")?.message}
            </p>
          )}
        </div>
        <div>
          <label className="block font-medium uppercase">
            Last Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.find((e) => e.field === "lastName") && (
            <p className="text-red-500 text-sm">
              {errors.find((e) => e.field === "lastName")?.message}
            </p>
          )}
        </div>
        <div>
          <label className="block font-medium uppercase">
            Email ID<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.find((e) => e.field === "email") && (
            <p className="text-red-500 text-sm">
              {errors.find((e) => e.field === "email")?.message}
            </p>
          )}
        </div>
        <div>
          <label className="block uppercase font-medium">
            Phone Number<span className="text-red-500">*</span>
          </label>
          <input
            type="Number"
            name="phone"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.find((e) => e.field === "phone") && (
            <p className="text-red-500 text-sm">
              {errors.find((e) => e.field === "phone")?.message}
            </p>
          )}
        </div>
        <div>
          <label className="block uppercase font-medium">
            Role<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.find((e) => e.field === "role") && (
            <p className="text-red-500 text-sm">
              {errors.find((e) => e.field === "role")?.message}
            </p>
          )}
        </div>
        <div>
          <label className="block uppercase font-medium">
            Department<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="department"
            placeholder="Enter department"
            value={formData.department}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.find((e) => e.field === "department") && (
            <p className="text-red-500 text-sm">
              {errors.find((e) => e.field === "department")?.message}
            </p>
          )}
        </div>
        <div>
          <label className="block uppercase font-medium">
            Location<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="location"
            placeholder="Enter location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.find((e) => e.field === "location") && (
            <p className="text-red-500 text-sm">
              {errors.find((e) => e.field === "location")?.message}
            </p>
          )}
        </div>
        {loading ? (
          <button
            className="bg-blue-500 md:col-span-2 col-span-1 text-white p-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            Loading...
          </button>
        ) : (
          <button
            type="submit"
            className="bg-blue-500 md:col-span-2 col-span-1 text-white p-2 rounded hover:bg-blue-600"
          >
            {user ? "Update User" : "Add User"}
          </button>
        )}
      </form>
    </div>
  );
};
