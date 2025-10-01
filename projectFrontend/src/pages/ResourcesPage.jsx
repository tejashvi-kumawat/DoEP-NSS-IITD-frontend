import React from "react";

const team = [
    { name: "Aryan Rathore", role: "Project Secretary", img: "/assets/1.jpg" },
    { name: "Priya Verma", role: "Project Executive", img: "/assets/1.jpg" },
    { name: "Harsh Patel", role: "Project Executive", img: "/assets/1.jpg" },
    // Add more as needed
];

const TeamPage = () => {
    return (
        <div className="min-h-screen relative bg-gradient-to-br from-[#1f2937] via-[#374151] to-[#111827] px-8 py-20 text-gray-100 font-sans">
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-24 left-16 w-60 h-60 rounded-full bg-gradient-to-tr from-green-500/40 via-green-600/25 to-transparent blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 rounded-3xl bg-gradient-to-bl from-green-700/35 via-green-800/20 to-transparent blur-2xl animate-pulse-slow animation-delay-2000"></div>
            </div>

            <header className="max-w-5xl mx-auto text-center mb-16">
                <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-green-400 via-lime-300 to-green-200 bg-clip-text text-transparent drop-shadow-lg">
                    Team
                </h1>
                <p className="mt-4 text-lg md:text-xl font-light text-gray-300">
                    Meet the amazing people behind our project.
                </p>
            </header>

            <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {team.map((person, idx) => (
                    <div
                        key={idx}
                        className="relative rounded-3xl overflow-hidden border border-green-700 shadow-xl bg-green-900/40 backdrop-blur-md cursor-default hover:scale-[1.03] transition-transform duration-300"
                    >
                        <img
                            src={person.img}
                            alt={person.name}
                            className="w-full h-72 object-cover rounded-t-3xl"
                            loading="lazy"
                        />
                        <div className="p-6">
                            <h3 className="text-2xl font-bold text-green-300">{person.name}</h3>
                            <p className="mt-2 text-green-400 font-light">{person.role}</p>
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

export default TeamPage;
