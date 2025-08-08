"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
export default function AdminDashboard() {
  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    description: "",
  });
  const router = useRouter();
  const [imageFile, setImageFile] = useState(null);
  const [properties, setProperties] = useState([]);
  const [message, setMessage] = useState("");
  const [mounted, setMounted] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    setMounted(true);
    const storedToken = localStorage.getItem("admin_token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (token) fetchProperties();
  }, [token]);

  const fetchProperties = async () => {
    try {
      const res = await axios.get("https://vels-backend-xkam.onrender.com/api/property/");
      setProperties(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      setMessage("Please upload an image");
      return;
    }

    try {
      const imageForm = new FormData();
      imageForm.append("file", imageFile);

      const imageRes = await axios.post(
        "https://vels-backend-xkam.onrender.com/api/upload/image",
        imageForm,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const image_url = imageRes.data.image_url;

      await axios.post(
        "https://vels-backend-xkam.onrender.com/api/property/add",
        { ...form, image_url },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage("Property added!");
      fetchProperties();
      setForm({ title: "", location: "", price: "", description: "" });
      setImageFile(null);
    } catch (error) {
      console.error("Add error:", error);
      setMessage("Error adding property");
    }
  };

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`https://vels-backend-xkam.onrender.com/api/property/delete/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Property deleted!");
      fetchProperties();
    } catch (error) {
      console.error("Delete error:", error);
      setMessage("Error deleting property");
    }
  };

  if (!mounted) return null;

  if (!token) {
    return (
      <div className="text-center text-red-600 mt-10 font-semibold text-xl">
        Unauthorized. Please login.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">

       <button
        onClick={() => router.push('/')}
        className="self-start mb-6 text-white  font-semibold transition"
      >
        ← Back to Home
      </button>
      {/* Form Section */}
      <div className="max-w-4xl mx-auto bg-gray-800 bg-opacity-80 rounded-3xl shadow-xl p-8">
        <h2 className="text-4xl font-extrabold text-white mb-8 text-center tracking-wide">
          Admin Dashboard
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {message && (
            <p
              className={`text-center font-semibold py-2 px-4 rounded-md ${
                message.includes("Error")
                  ? "bg-red-500 text-white"
                  : "bg-green-500 text-white"
              }`}
            >
              {message}
            </p>
          )}
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full rounded-xl bg-gray-700 bg-opacity-60 border border-gray-600 p-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full rounded-xl bg-gray-700 bg-opacity-60 border border-gray-600 p-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full rounded-xl bg-gray-700 bg-opacity-60 border border-gray-600 p-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            rows={4}
            className="w-full rounded-xl bg-gray-700 bg-opacity-60 border border-gray-600 p-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full rounded-xl bg-gray-700 bg-opacity-60 border border-gray-600 p-3 text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-2xl text-white font-bold text-lg tracking-wide transition shadow-lg"
          >
            Add Property
          </button>
        </form>
      </div>

      {/* Properties List Section */}
      <div className="max-w-5xl mx-auto mt-16">
        <h3 className="text-3xl font-semibold mb-8 text-white text-center">
          Existing Properties
        </h3>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((p) => (
            <div
              key={p._id}
              className="bg-gray-800 bg-opacity-70 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-[1.02] transition relative"
            >
              {p.image_url?.trim() ? (
                <img
                  src={p.image_url}
                  alt={p.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-600 flex items-center justify-center text-gray-400 font-semibold">
                  No Image
                </div>
              )}
              <div className="p-5">
                <h4 className="text-xl font-bold text-white mb-2 truncate">
                  {p.title}
                </h4>

                {/* Clickable Location */}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    p.location
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline mb-1 block truncate"
                  title={`Open ${p.location} in Google Maps`}
                >
                  {p.location}
                </a>

                <p className="text-blue-400 font-semibold text-lg mb-3">
                  ₹{p.price}
                </p>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {p.description}
                </p>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white rounded-full px-3 py-1 text-sm font-semibold transition shadow-lg"
                  aria-label={`Delete ${p.title}`}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
