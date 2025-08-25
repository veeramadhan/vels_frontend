'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

const PAGE_SIZE = 9;

function PropertyCard({ property }) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 cursor-pointer flex flex-col">
      {property.image_url ? (
        <img
          src={property.image_url}
          alt={property.title || 'Property Image'}
          className="w-full h-48 object-cover rounded-t-xl"
        />
      ) : (
        <div className="w-full h-48 bg-gray-300 flex items-center justify-center rounded-t-xl text-gray-500 font-semibold">
          No Image Available
        </div>
      )}

      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold text-gray-900">{property.title}</h2>
        <p className="text-sm text-gray-600">{property.location}</p>
        <p className="text-blue-700 font-bold text-lg mt-2">₹{property.price}</p>
        <p className="text-sm text-gray-700 mt-3 flex-grow">{property.description}</p>
      </div>
    </div>
  );
}

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get('https://vels-backend-xkam.onrender.com/api/property/')
      .then(res => setProperties(res.data))
      .catch(err => console.error('Failed to load properties', err));
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(properties.length / PAGE_SIZE);
  const paginatedProperties = properties.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handlePrev = () => setCurrentPage(p => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage(p => Math.min(p + 1, totalPages));

  return (
    <section
      id="properties"
      className="relative min-h-screen w-full bg-gradient-to-b from-gray-900 to-gray-700 py-16 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-14">
          Our Premium Properties
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Top row - first 3 cards */}
          {paginatedProperties.slice(0, 3).map((p, i) => (
            <PropertyCard key={p._id || i} property={p} />
          ))}
        </div>

        {/* Bottom nested grid - next 6 cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {paginatedProperties.slice(3, 9).map((p, i) => (
            <PropertyCard key={p._id || i} property={p} />
          ))}
        </div>

        {/* Pagination controls */}
        <div className="flex justify-center mt-12 space-x-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md font-semibold ${
              currentPage === 1
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            } transition`}
          >
            Previous
          </button>
          <span className="px-4 py-2 font-semibold text-white self-center">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md font-semibold ${
              currentPage === totalPages
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            } transition`}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
