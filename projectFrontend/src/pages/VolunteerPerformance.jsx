import React, { useEffect, useMemo, useState } from 'react';
import { teachingAPI } from '../api/api';
import { getProjectKeyFromSubdomain } from '../utils/projectConfig';

const VolunteerPerformance = () => {
    const projectKey = useMemo(() => getProjectKeyFromSubdomain(), []);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [totals, setTotals] = useState({ totalSessions: 0, completedSessions: 0, totalHours: 0 });
    const [sessions, setSessions] = useState([]);

    const load = async () => {
        try {
            setLoading(true);
            setError('');
            const res = await teachingAPI.getVolunteerPerformance({ projectKey });
            const payload = res.data || res;
            setTotals(payload?.totals || { totalSessions: 0, completedSessions: 0, totalHours: 0 });
            setSessions(payload?.sessions || []);
        } catch (e) {
            setError(e.message || 'Failed to load performance');
            setTotals({ totalSessions: 0, completedSessions: 0, totalHours: 0 });
            setSessions([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="min-h-screen pt-20 bg-gray-50">
            <div className="max-w-5xl mx-auto px-4">
                <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
                    <div
                        className="px-6 py-6"
                        style={{ background: `linear-gradient(135deg, var(--color-primary), var(--color-secondary))` }}
                    >
                        <h1 className="text-2xl md:text-3xl font-black text-white">My performance</h1>
                        <p className="text-white/90 mt-1">Attendance, reports, and total hours.</p>
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

                        {loading ? (
                            <div className="py-10 text-gray-600">Loading…</div>
                        ) : (
                            <>
                                <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                                        <div className="text-xs text-gray-500">Total sessions</div>
                                        <div className="text-2xl font-black text-gray-900">{totals.totalSessions}</div>
                                    </div>
                                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                                        <div className="text-xs text-gray-500">Completed sessions</div>
                                        <div className="text-2xl font-black text-gray-900">{totals.completedSessions}</div>
                                    </div>
                                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                                        <div className="text-xs text-gray-500">Total hours (checked-in)</div>
                                        <div className="text-2xl font-black text-gray-900">{Number(totals.totalHours || 0).toFixed(2)}</div>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <div className="text-sm font-semibold text-gray-800 mb-2">Sessions</div>
                                    {sessions.length === 0 ? (
                                        <div className="py-8 text-gray-600">No sessions found yet.</div>
                                    ) : (
                                        <div className="space-y-3">
                                            {sessions.map((s) => {
                                                const dt = s.date ? new Date(s.date) : null;
                                                const dateStr = dt ? dt.toLocaleDateString() : '—';
                                                return (
                                                    <div key={s._id} className="rounded-xl border border-gray-200 bg-white p-4">
                                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                                                            <div>
                                                                <div className="font-bold text-gray-900">
                                                                    {dateStr} • {s.start_time}–{s.end_time}
                                                                </div>
                                                                <div className="text-sm text-gray-600">
                                                                    Students: <span className="font-semibold">{s.students?.length || 0}</span>
                                                                    {' • '}Status: <span className="font-semibold">{s.status}</span>
                                                                </div>
                                                                <div className="text-xs text-gray-500 mt-1">
                                                                    Report: {s.reportSubmitted ? 'Submitted' : 'Pending'}
                                                                    {typeof s.hours === 'number' ? ` • Hours: ${s.hours.toFixed(2)}` : ''}
                                                                </div>
                                                            </div>
                                                            <div className="text-xs text-gray-500">
                                                                Tip: submit pending reports in “My Classes”.
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VolunteerPerformance;
