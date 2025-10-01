// src/pages/ResourcesPage.jsx
import React, { useState } from "react";

const resources = {
    pdfs: [
        { name: "Sample PDF", url: "/assets/sample.docx" }
    ],
    docs: [
        { name: "Sample Doc", url: "/assets/sample.docx" }
    ],
    articles: [
        { name: "Sample Article", url: "https://www.youtube.com/" }
    ],
    videos: [
        { name: "Intro Video", url: "https://www.youtube.com/" }
    ]
};

const tabList = ["pdfs", "docs", "articles", "videos"];

const ResourcesPage = () => {
    const [activeTab, setActiveTab] = useState("pdfs");

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Resources</h1>
            <div className="flex gap-4 mb-8">
                {tabList.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded ${
                            activeTab === tab
                                ? "bg-emerald-600 text-white"
                                : "bg-gray-200 text-gray-800"
                        }`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>
            <div>
                {resources[activeTab].map((item, i) => (
                    <div key={i}>
                        <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-emerald-700"
                        >
                            {item.name}
                        </a>
                    </div>
                ))}
                {resources[activeTab].length === 0 && <p>No resources yet.</p>}
            </div>
        </div>
    );
};

export default ResourcesPage;
