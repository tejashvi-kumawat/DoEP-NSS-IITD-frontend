import React from "react";

const images = [
    { src: "/assets/1.jpg", title: "Sample 1", desc: "First sample image" },
    { src: "/assets/1.jpg", title: "Sample 2", desc: "Second sample image" },
    { src: "/assets/1.jpg", title: "Sample 3", desc: "Third sample image" },
    // Add more image objects as needed
];

const GalleryPage = () => {
    return (
        <div className="min-h-screen relative bg-gradient-to-br from-[#1f2937] via-[#374151] to-[#111827] px-8 py-20 text-gray-100 font-sans">
            {/* Background blurred gradient blobs */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-24 left-16 w-60 h-60 rounded-full bg-gradient-to-tr from-green-500/40 via-green-600/25 to-transparent blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 rounded-3xl bg-gradient-to-bl from-green-700/35 via-green-800/20 to-transparent blur-2xl animate-pulse-slow animation-delay-2000"></div>
            </div>

            <header className="max-w-5xl mx-auto text-center mb-16">
                <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-green-400 via-lime-300 to-green-200 bg-clip-text text-transparent drop-shadow-lg">
                    Gallery
                </h1>
                <p className="mt-4 text-lg md:text-xl font-light text-gray-300">
                    A collection of moments and highlights showcasing our projects.
                </p>
            </header>

            <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {images.map((img, idx) => (
                    <div
                        key={idx}
                        className="relative rounded-3xl shadow-xl border border-green-700 bg-green-900/40 backdrop-blur-md cursor-pointer hover:scale-[1.03] transition-transform duration-300"
                        aria-label={`Image titled ${img.title}`}
                    >
                        <img
                            src={img.src}
                            alt={img.title}
                            className="w-full h-60 rounded-t-3xl object-cover"
                            loading="lazy"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-bold text-green-300">{img.title}</h3>
                            <p className="mt-2 text-green-400 text-sm font-light">{img.desc}</p>
                        </div>
                    </div>
                ))}
            </section>

            <style jsx>{`
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
        </div>
    );
};

export default GalleryPage;

