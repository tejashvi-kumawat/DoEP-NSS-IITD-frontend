import React, { useEffect, useMemo, useState } from 'react';
import { teachingAPI } from '../api/api';
import { getProjectKeyFromSubdomain } from '../utils/projectConfig';

const StudentPerformance = () => {
    const projectKey = useMemo(() => getProjectKeyFromSubdomain(), []);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [reports, setReports] = useState([]);

    const load = async () => {
        try {
            setLoading(true);
            setError('');
            const res = await teachingAPI.getStudentPerformance({ projectKey });
            const payload = res.data || res;
            setReports(payload?.reports || []);
        } catch (e) {
            setError(e.message || 'Failed to load performance');
            setReports([]);
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
                        <h1 className="text-2xl md:text-3xl font-black text-white">My learning reports</h1>
                        <p className="text-white/90 mt-1">Daily class reports submitted by volunteers.</p>
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
                        ) : reports.length === 0 ? (
                            <div className="py-10 text-gray-600">No reports found yet.</div>
                        ) : (
                            <div className="mt-5 space-y-3">
                                {reports.map((r) => {
                                    const dt = r.date ? new Date(r.date) : (r.session?.date ? new Date(r.session.date) : null);
                                    const dateStr = dt ? dt.toLocaleDateString() : '—';
                                    const volunteerName = r.volunteer?.name || r.volunteer?.kerberosid || 'Volunteer';

                                    return (
                                        <div key={r._id} className="rounded-xl border border-gray-200 bg-white p-4">
                                            <div className="font-bold text-gray-900">{dateStr}</div>
                                            <div className="text-xs text-gray-500 mt-1">By: {volunteerName}</div>
                                            <div className="mt-3 text-sm text-gray-800 whitespace-pre-wrap">{r.summary}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentPerformance;
