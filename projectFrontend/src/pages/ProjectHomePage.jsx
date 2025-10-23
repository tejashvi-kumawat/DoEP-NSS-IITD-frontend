import React from 'react';
import { useProjectConfig } from '../context/ProjectConfigContext';

/**
 * Example component showing how to use project configuration
 * This replaces the static JSON approach with dynamic API-based config
 */
const ProjectHomePage = () => {
    const { config, loading, error, refreshConfig } = useProjectConfig();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading project configuration...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="text-red-600 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Failed to Load Configuration</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={refreshConfig}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen" style={{ backgroundColor: config.theme?.background || '#f9fafb' }}>
            {/* Hero Section */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-5xl font-bold mb-6" style={{ color: config.theme?.primary }}>
                        {config.name}
                    </h1>
                    <p className="text-xl text-gray-700 mb-8">
                        {config.description}
                    </p>
                </div>
            </section>

            {/* Stats Section */}
            {config.stats && (
                <section className="py-16 px-4 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <StatCard
                                label="Students"
                                value={config.stats.students}
                                color={config.theme?.primary}
                            />
                            <StatCard
                                label="Volunteers"
                                value={config.stats.volunteers}
                                color={config.theme?.secondary}
                            />
                            <StatCard
                                label="Total Hours"
                                value={config.stats.hours?.toLocaleString()}
                                color={config.theme?.primary}
                            />
                            <StatCard
                                label="Classes"
                                value={config.stats.classes}
                                color={config.theme?.secondary}
                            />
                        </div>
                    </div>
                </section>
            )}

            {/* Testimonials Section */}
            {config.testimonials && config.testimonials.length > 0 && (
                <section className="py-16 px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: config.theme?.primary }}>
                            What People Say
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {config.testimonials.map((testimonial, index) => (
                                <TestimonialCard key={index} testimonial={testimonial} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Curriculum Section */}
            {config.curriculum && config.curriculum.length > 0 && (
                <section className="py-16 px-4 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: config.theme?.primary }}>
                            Our Curriculum
                        </h2>
                        <div className="space-y-6">
                            {config.curriculum.map((item, index) => (
                                <CurriculumItem key={index} item={item} themeColor={config.theme?.primary} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Contact Section */}
            {config.contact && (
                <section className="py-16 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-8" style={{ color: config.theme?.primary }}>
                            Get in Touch
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {config.contact.email && (
                                <ContactItem icon="📧" label="Email" value={config.contact.email} />
                            )}
                            {config.contact.phone && (
                                <ContactItem icon="📱" label="Phone" value={config.contact.phone} />
                            )}
                            {config.contact.address && (
                                <ContactItem icon="📍" label="Address" value={config.contact.address} />
                            )}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

// Helper Components
const StatCard = ({ label, value, color }) => (
    <div className="text-center p-6 rounded-lg border-2" style={{ borderColor: color }}>
        <div className="text-4xl font-bold mb-2" style={{ color }}>
            {value}
        </div>
        <div className="text-gray-600">{label}</div>
    </div>
);

const TestimonialCard = ({ testimonial }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-start space-x-4">
            {testimonial.image && (
                <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-16 h-16 rounded-full object-cover"
                />
            )}
            <div className="flex-1">
                <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                <div className="font-semibold text-gray-900">{testimonial.author}</div>
                <div className="text-sm text-gray-600">{testimonial.role}</div>
            </div>
        </div>
    </div>
);

const CurriculumItem = ({ item, themeColor }) => (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
        <div className="flex items-start space-x-4">
            <div
                className="text-xl font-bold px-4 py-2 rounded"
                style={{ backgroundColor: `${themeColor}20`, color: themeColor }}
            >
                {item.week}
            </div>
            <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2" style={{ color: themeColor }}>
                    {item.title}
                </h3>
                <p className="text-gray-700 mb-3">{item.description}</p>
                {item.topics && item.topics.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                        {item.topics.map((topic, idx) => (
                            <span
                                key={idx}
                                className="px-3 py-1 text-sm rounded-full"
                                style={{ backgroundColor: `${themeColor}15`, color: themeColor }}
                            >
                                {topic}
                            </span>
                        ))}
                    </div>
                )}
                {item.resources && item.resources.length > 0 && (
                    <div className="space-y-1">
                        <div className="text-sm font-semibold text-gray-600">Resources:</div>
                        {item.resources.map((resource, idx) => (
                            <a
                                key={idx}
                                href={resource.url}
                                className="text-sm hover:underline block"
                                style={{ color: themeColor }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                📄 {resource.name}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </div>
    </div>
);

const ContactItem = ({ icon, label, value }) => (
    <div className="p-4">
        <div className="text-3xl mb-2">{icon}</div>
        <div className="text-sm font-semibold text-gray-600 mb-1">{label}</div>
        <div className="text-gray-800">{value}</div>
    </div>
);

export default ProjectHomePage;
