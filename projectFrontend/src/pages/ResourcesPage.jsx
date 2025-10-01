import React, { useState } from "react";

const resources = {
    pdfs: [{ name: "Sample PDF", url: "/assets/sample.pdf" }],
    docs: [{ name: "Sample Doc", url: "/assets/sample.docx" }],
    articles: [{ name: "Sample Article", url: "https://www.youtube.com/" }],
    videos: [{ name: "Intro Video", url: "https://www.youtube.com/" }],
};

const tabList = ["pdfs", "docs", "articles", "videos"];

const ResourcesPage = () => {
    const [activeTab, setActiveTab] = useState("pdfs");

    return (
        <div className="min-h-screen relative bg-gradient-to-br from-[#1f2937] via-[#374151] to-[#111827] px-8 py-20 text-gray-100 font-sans">
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-20 left-20 w-60 h-60 rounded-full bg-gradient-to-tr from-green-500/40 via-green-600/25 to-transparent blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 rounded-3xl bg-gradient-to-bl from-green-700/35 via-green-800/20 to-transparent blur-2xl animate-pulse-slow animation-delay-2000"></div>
            </div>

            <header className="max-w-5xl mx-auto text-center mb-12">
                <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-green-400 via-lime-300 to-green-200 bg-clip-text text-transparent drop-shadow-lg">
                    Resources
                </h1>
                <p className="mt-4 text-lg md:text-xl font-light text-gray-300">
                    Explore our collection of helpful resources.
                </p>
            </header>

            {/* Tabs */}
            <div className="max-w-4xl mx-auto flex justify-center gap-8 mb-12">
                {tabList.map((tab) => (
                    <button
                        key={tab}
                        className={`px-5 py-3 rounded-full font-semibold tracking-wide transition-colors duration-300 ${
                            activeTab === tab
                                ? "bg-gradient-to-r from-green-500 to-green-400 text-gray-900 shadow-lg"
                                : "text-green-300 hover:text-green-200"
                        }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {(resources[activeTab] || []).map((res, idx) => (
                    <a
                        key={idx}
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-3xl border border-green-700 bg-green-900/40 backdrop-blur-md p-6 shadow-lg hover:scale-[1.03] transition-transform duration-300 block"
                    >
                        <h3 className="text-xl font-bold text-green-300 mb-2">{res.name}</h3>
                        <p className="text-green-400 text-sm font-light break-words">Link: {res.url}</p>
                    </a>
                ))}
                {(resources[activeTab] || []).length === 0 && (
                    <p className="col-span-full text-center text-green-400 font-light">
                        No resources available in this category.
                    </p>
                )}
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

export default ResourcesPage;
