// src/pages/GalleryPage.jsx
import React from "react";

const images = [
    { src: "/assets/1.jpg", title: "Sample 1", desc: "First sample image" },
    { src: "/assets/1.jpg", title: "Sample 2", desc: "Second sample image" },
    { src: "/assets/1.jpg", title: "Sample 3", desc: "Third sample image" }
];

const GalleryPage = () => (
    <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Gallery</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {images.map((img) => (
                <div
                    className="bg-white rounded-lg shadow p-4 flex flex-col items-center"
                    key={img.src}
                >
                    <img src={img.src} alt={img.title} className="h-40 w-full object-cover rounded mb-2" />
                    <h3 className="text-xl font-semibold">{img.title}</h3>
                    <p className="text-gray-500">{img.desc}</p>
                </div>
            ))}
        </div>
    </div>
);

export default GalleryPage;

