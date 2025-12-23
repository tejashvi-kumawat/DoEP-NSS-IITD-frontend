import React, { useEffect, useMemo, useState } from 'react';
import { teachingAPI } from '../api/api';
import { getProjectKeyFromSubdomain } from '../utils/projectConfig';

const MySessions = () => {
    const projectKey = useMemo(() => getProjectKeyFromSubdomain(), []);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [items, setItems] = useState([]);
    const [openReportFor, setOpenReportFor] = useState(null);
    const [reportSummary, setReportSummary] = useState('');
    const [submittingReport, setSubmittingReport] = useState(false);
    const [studentReports, setStudentReports] = useState({});

    const load = async () => {
        try {
            setLoading(true);
            setError('');
            const res = await teachingAPI.getMySessions({ projectKey });
            setItems(res.data || res);
        } catch (e) {
            setError(e.message || 'Failed to load sessions');
            setItems([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const checkIn = async (id) => {
        try {
            setError('');
            await teachingAPI.checkIn(id);
            await load();
        } catch (e) {
            setError(e.message || 'Failed to check in');
        }
    };

    const checkOut = async (id) => {
        try {
            setError('');
            await teachingAPI.checkOut(id);
            await load();
        } catch (e) {
            setError(e.message || 'Failed to check out');
        }
    };

    const submitReport = async (sessionId) => {
        try {
            setSubmittingReport(true);
            setError('');
            await teachingAPI.submitSessionReport(sessionId, { summary: reportSummary });
            setOpenReportFor(null);
            setReportSummary('');
            await load();
        } catch (e) {
            setError(e.message || 'Failed to submit report');
        } finally {
            setSubmittingReport(false);
        }
    };

    const loadStudentReports = async (studentId) => {
        try {
            setStudentReports((prev) => ({
                ...prev,
                [studentId]: { loading: true, error: '', data: prev?.[studentId]?.data || null },
            }));
            const res = await teachingAPI.getStudentReports(studentId, { projectKey, limit: 3 });
            const payload = res.data || res;
            setStudentReports((prev) => ({
                ...prev,
                [studentId]: { loading: false, error: '', data: payload || [] },
            }));
        } catch (e) {
            setStudentReports((prev) => ({
                ...prev,
                [studentId]: {
                    loading: false,
                    error: e.message || 'Failed to load reports',
                    data: prev?.[studentId]?.data || null,
                },
            }));
        }
    };

    return (
        <div className="min-h-screen pt-20 bg-gray-50">
            <div className="max-w-5xl mx-auto px-4">
                <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
                    <div
                        className="px-6 py-6"
                        style={{ background: `linear-gradient(135deg, var(--color-primary), var(--color-secondary))` }}
                    >
                        <h1 className="text-2xl md:text-3xl font-black text-white">My classes</h1>
                        <p className="text-white/90 mt-1">See your assigned students and mark entry/exit attendance.</p>
                    </div>

                    <div className="p-6">
                        {error && (
                            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                                {error}
                            </div>
                        )}

                        <div className="flex flex-col md:flex-row md:items-end gap-3 md:gap-4">
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
                        ) : items.length === 0 ? (
                            <div className="py-10 text-gray-600">No classes found yet.</div>
                        ) : (
                            <div className="mt-5 space-y-4">
                                {items.map((s) => {
                                    const checkedIn = Boolean(s.volunteerCheckInAt);
                                    const checkedOut = Boolean(s.volunteerCheckOutAt);
                                    const dateStr = s.date ? new Date(s.date).toLocaleDateString() : '—';
                                    const reportPending = Boolean(checkedOut && !s.reportSubmitted);

                                    return (
                                        <div key={s._id} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                                                <div>
                                                    <div className="font-bold text-gray-900">
                                                        {dateStr} • {s.projectKey?.toUpperCase() || s.program} • {s.start_time}–{s.end_time}
                                                    </div>
                                                    <div className="text-sm text-gray-600">
                                                        Students: <span className="font-semibold">{s.students?.length || 0}</span>
                                                        {' • '}Status: <span className="font-semibold">{s.status}</span>
                                                        {' • '}Report:{' '}
                                                        <span className="font-semibold">
                                                            {s.reportSubmitted ? 'Submitted' : reportPending ? 'Pending' : '—'}
                                                        </span>
                                                    </div>
                                                    <div className="text-xs text-gray-500 mt-1">
                                                        Check-in: {s.volunteerCheckInAt ? new Date(s.volunteerCheckInAt).toLocaleString() : '—'}
                                                        {' • '}
                                                        Check-out: {s.volunteerCheckOutAt ? new Date(s.volunteerCheckOutAt).toLocaleString() : '—'}
                                                    </div>
                                                    {reportPending && (
                                                        <div className="mt-2 text-sm text-red-700 font-semibold">
                                                            Report pending — please submit what you taught for this class.
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() => checkIn(s._id)}
                                                        disabled={checkedIn}
                                                        className="px-4 py-2 rounded-lg font-semibold text-white disabled:opacity-60"
                                                        style={{ backgroundColor: 'var(--color-primary)' }}
                                                    >
                                                        {checkedIn ? 'Checked in' : 'Check in'}
                                                    </button>
                                                    <button
                                                        onClick={() => checkOut(s._id)}
                                                        disabled={!checkedIn || checkedOut}
                                                        className="px-4 py-2 rounded-lg font-semibold bg-gray-900 text-white disabled:opacity-60"
                                                    >
                                                        {checkedOut ? 'Checked out' : 'Check out'}
                                                    </button>
                                                    {checkedOut && (
                                                        <button
                                                            onClick={() => {
                                                                setOpenReportFor((prev) => (prev === s._id ? null : s._id));
                                                                setReportSummary('');
                                                            }}
                                                            className="px-4 py-2 rounded-lg font-semibold bg-white border border-gray-300 text-gray-900 hover:bg-gray-50"
                                                        >
                                                            {s.reportSubmitted ? 'Update report' : 'Submit report'}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>

                                            {openReportFor === s._id && (
                                                <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4">
                                                    <div className="text-sm font-semibold text-gray-800 mb-2">Class report</div>
                                                    <textarea
                                                        value={reportSummary}
                                                        onChange={(e) => setReportSummary(e.target.value)}
                                                        rows={4}
                                                        placeholder="What did you teach today? Any homework / next steps?"
                                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-1"
                                                        style={{ '--tw-ring-color': 'var(--color-primary)' }}
                                                    />
                                                    <div className="mt-3 flex gap-3">
                                                        <button
                                                            onClick={() => submitReport(s._id)}
                                                            disabled={submittingReport || !reportSummary.trim()}
                                                            className="px-4 py-2 rounded-lg font-semibold text-white disabled:opacity-60"
                                                            style={{ backgroundColor: 'var(--color-primary)' }}
                                                        >
                                                            {submittingReport ? 'Submitting…' : 'Save report'}
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setOpenReportFor(null);
                                                                setReportSummary('');
                                                            }}
                                                            className="px-4 py-2 rounded-lg font-semibold bg-gray-100 text-gray-800 hover:bg-gray-200"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            {Array.isArray(s.students) && s.students.length > 0 && (
                                                <div className="mt-4">
                                                    <div className="text-sm font-semibold text-gray-800 mb-2">Assigned students</div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                        {s.students.map((st) => (
                                                            <div key={st._id} className="rounded-lg border border-gray-200 bg-white px-3 py-2">
                                                                <div className="font-semibold text-gray-900">{st.name}</div>
                                                                <div className="text-xs text-gray-500">
                                                                    {st.email}{st.grade ? ` • Grade ${st.grade}` : ''}
                                                                </div>

                                                                <div className="mt-2">
                                                                    <button
                                                                        onClick={() => loadStudentReports(st._id)}
                                                                        className="text-sm font-semibold text-gray-900 underline"
                                                                    >
                                                                        View recent reports
                                                                    </button>
                                                                </div>

                                                                {studentReports?.[st._id]?.loading && (
                                                                    <div className="mt-2 text-xs text-gray-500">Loading reports…</div>
                                                                )}
                                                                {studentReports?.[st._id]?.error && (
                                                                    <div className="mt-2 text-xs text-red-600">{studentReports[st._id].error}</div>
                                                                )}
                                                                {Array.isArray(studentReports?.[st._id]?.data) && (
                                                                    <div className="mt-2 space-y-2">
                                                                        {studentReports[st._id].data.length === 0 ? (
                                                                            <div className="text-xs text-gray-500">No previous reports yet.</div>
                                                                        ) : (
                                                                            studentReports[st._id].data.map((r) => {
                                                                                const rDate = r.date
                                                                                    ? new Date(r.date).toLocaleDateString()
                                                                                    : r.session?.date
                                                                                        ? new Date(r.session.date).toLocaleDateString()
                                                                                        : '—';
                                                                                const vName = r.volunteer?.name || r.volunteer?.kerberosid || 'Volunteer';
                                                                                return (
                                                                                    <div key={r._id} className="rounded-md border border-gray-200 bg-gray-50 px-2 py-2">
                                                                                        <div className="text-[11px] text-gray-600 font-semibold">
                                                                                            {rDate} • {vName}
                                                                                        </div>
                                                                                        <div className="text-xs text-gray-800 whitespace-pre-wrap mt-1">
                                                                                            {r.summary}
                                                                                        </div>
                                                                                    </div>
                                                                                );
                                                                            })
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
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

export default MySessions;
