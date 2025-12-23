import React, { useEffect, useMemo, useState } from 'react';
import { studentsAPI, teachingAPI } from '../api/api';
import { useAuth } from '../context/AuthContext';
import { getProjectKeyFromSubdomain } from '../utils/projectConfig';

const StudentPerformance = () => {
    const { user } = useAuth();
    const projectKey = useMemo(() => getProjectKeyFromSubdomain(), []);

    const [activeTab, setActiveTab] = useState('profile');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [reports, setReports] = useState([]);
    const [student, setStudent] = useState(null);

    const load = async () => {
        try {
            setLoading(true);
            setError('');
            const email = String(user?.email || '').trim();
            const [perfRes, studentRes] = await Promise.all([
                teachingAPI.getStudentPerformance({ projectKey }),
                email ? studentsAPI.getStudentByEmail(email) : Promise.resolve(null),
            ]);

            const payload = perfRes?.data || perfRes;
            setReports(payload?.reports || []);

            const s = studentRes?.data || studentRes;
            setStudent(s || null);
        } catch (e) {
            setError(e.message || 'Failed to load performance');
            setReports([]);
            setStudent(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const totalReports = reports.length;
    const latestReportDate = reports[0]?.date || reports[0]?.session?.date || null;

    const tabs = [
        { key: 'profile', label: 'Personal info' },
        { key: 'progress', label: 'Daily progress' },
        { key: 'attendance', label: 'Attendance' },
        { key: 'tests', label: 'Tests' },
    ];

    const Stat = ({ label, value }) => (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="text-xs text-gray-500">{label}</div>
            <div className="text-2xl font-black text-gray-900 mt-1">{value}</div>
        </div>
    );

    const renderReports = () => {
        if (loading) return <div className="py-10 text-gray-600">Loading…</div>;
        if (reports.length === 0) return <div className="py-10 text-gray-600">No reports found yet.</div>;

        return (
            <div className="mt-5 space-y-3">
                {reports.map((r) => {
                    const dt = r.date ? new Date(r.date) : (r.session?.date ? new Date(r.session.date) : null);
                    const dateStr = dt ? dt.toLocaleDateString() : '—';
                    const volunteerName = r.volunteer?.name || r.volunteer?.kerberosid || 'Volunteer';

                    return (
                        <div key={r._id} className="rounded-xl border border-gray-200 bg-white p-4">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                <div>
                                    <div className="font-bold text-gray-900">{dateStr}</div>
                                    <div className="text-xs text-gray-500 mt-1">By: {volunteerName}</div>
                                </div>
                                <div className="text-xs text-gray-500">
                                    {r.session?.start_time && r.session?.end_time ? `${r.session.start_time}–${r.session.end_time}` : ''}
                                </div>
                            </div>
                            {r.summary && <div className="mt-3 text-sm text-gray-800 whitespace-pre-wrap">{r.summary}</div>}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="min-h-screen pt-20 bg-gray-50">
            <div className="max-w-5xl mx-auto px-4">
                <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
                    <div
                        className="px-6 py-6"
                        style={{ background: `linear-gradient(135deg, var(--color-primary), var(--color-secondary))` }}
                    >
                        <h1 className="text-2xl md:text-3xl font-black text-white">My profile</h1>
                        <p className="text-white/90 mt-1">Personal info, daily progress, attendance, and tests.</p>
                    </div>

                    <div className="p-6">
                        {error && (
                            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                                {error}
                            </div>
                        )}

                        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                            <button
                                onClick={load}
                                className="px-4 py-2.5 rounded-lg font-semibold bg-gray-100 text-gray-800 hover:bg-gray-200"
                            >
                                Refresh
                            </button>
                            <div className="text-sm text-gray-600 md:ml-auto">
                                Project: <span className="font-semibold">{projectKey}</span>
                            </div>
                        </div>

                        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
                            <Stat label="Total reports" value={totalReports} />
                            <Stat
                                label="Attendance"
                                value={student?.attendance ?? '—'}
                            />
                            <Stat
                                label="Latest report"
                                value={latestReportDate ? new Date(latestReportDate).toLocaleDateString() : '—'}
                            />
                        </div>

                        <div className="mt-6 border-b border-gray-200">
                            <div className="flex flex-wrap gap-2">
                                {tabs.map((t) => (
                                    <button
                                        key={t.key}
                                        type="button"
                                        onClick={() => setActiveTab(t.key)}
                                        className={`px-4 py-2 rounded-t-lg text-sm font-semibold border ${activeTab === t.key
                                                ? 'bg-white border-gray-200 border-b-white text-gray-900'
                                                : 'bg-gray-50 border-transparent text-gray-600 hover:text-gray-900'
                                            }`}
                                    >
                                        {t.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-4">
                            {activeTab === 'profile' && (
                                <div className="rounded-xl border border-gray-200 bg-white p-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-xs text-gray-500">Name</div>
                                            <div className="font-semibold text-gray-900">{student?.name || user?.name || '—'}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500">Email</div>
                                            <div className="font-semibold text-gray-900">{student?.email || user?.email || '—'}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500">Grade</div>
                                            <div className="font-semibold text-gray-900">{student?.grade ?? '—'}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500">Phone</div>
                                            <div className="font-semibold text-gray-900">{student?.phone || '—'}</div>
                                        </div>
                                        <div className="md:col-span-2">
                                            <div className="text-xs text-gray-500">Address</div>
                                            <div className="font-semibold text-gray-900 whitespace-pre-wrap">{student?.address || '—'}</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'progress' && renderReports()}

                            {activeTab === 'attendance' && (
                                <div className="rounded-xl border border-gray-200 bg-white p-4">
                                    <div className="font-black text-gray-900">Attendance</div>
                                    <div className="text-sm text-gray-700 mt-2">
                                        Current attendance value: <span className="font-semibold">{student?.attendance ?? '—'}</span>
                                    </div>
                                    <div className="text-sm text-gray-600 mt-2">
                                        Detailed attendance-by-date will appear here when attendance tracking is enabled.
                                    </div>
                                </div>
                            )}

                            {activeTab === 'tests' && (
                                <div className="rounded-xl border border-gray-200 bg-white p-4">
                                    <div className="font-black text-gray-900">Tests</div>
                                    <div className="text-sm text-gray-600 mt-2">No test scores recorded yet.</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentPerformance;
