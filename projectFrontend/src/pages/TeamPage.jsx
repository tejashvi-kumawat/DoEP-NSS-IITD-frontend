// src/pages/TeamPage.jsx
import React from "react";

const team = [
    { name: "Aryan Rathore", role: "Project Secretary", img: "/assets/1.jpg" },
    { name: "Priya Verma", role: "Project Executive", img: "/assets/1.jpg" },
    { name: "Harsh Patel", role: "Project Executive", img: "/assets/1.jpg" }
    // Add more as needed
];

const TeamPage = () => (
    <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Project Team</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((person) => (
                <div
                    className="bg-white rounded-lg shadow p-6 flex flex-col items-center"
                    key={person.name}
                >
                    <img
                        src={person.img}
                        alt={person.name}
                        className="h-24 w-24 object-cover rounded-full mb-4"
                    />
                    <h3 className="text-xl font-semibold">{person.name}</h3>
                    <p className="text-gray-500">{person.role}</p>
                </div>
            ))}
        </div>
    </div>
);

export default TeamPage;
