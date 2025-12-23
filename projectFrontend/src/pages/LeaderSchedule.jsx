import React, { useEffect, useMemo, useState } from 'react';
import { teachingAPI } from '../api/api';
import { getProjectKeyFromSubdomain } from '../utils/projectConfig';

const toDateKey = (d) => {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};

const addDays = (d, days) => {
    const copy = new Date(d);
    copy.setDate(copy.getDate() + days);
    return copy;
};

const LeaderSchedule = () => {
    const projectKey = useMemo(() => getProjectKeyFromSubdomain(), []);

    const [dateKey, setDateKey] = useState(toDateKey(addDays(new Date(), 1)));
    const [startTime, setStartTime] = useState('17:00');
    const [endTime, setEndTime] = useState('19:00');

    const [loading, setLoading] = useState(false);
    const [creating, setCreating] = useState(false);
    const [error, setError] = useState('');

    const [students, setStudents] = useState([]);
    const [availability, setAvailability] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [result, setResult] = useState(null);

    const [assignToSessionId, setAssignToSessionId] = useState('');

    const load = async () => {
        try {
            setLoading(true);
            setError('');
            setResult(null);

            const [scheduleRes, availRes] = await Promise.all([
                teachingAPI.getSchedule(projectKey, dateKey),
                teachingAPI.getAvailability(projectKey, dateKey),
            ]);

            const scheduleData = scheduleRes.data || scheduleRes;
            setSessions(scheduleData.sessions || []);
            setStudents(scheduleData.unassignedStudents || []);
            setAvailability(availRes.data || availRes);

            // keep assignment dropdown sane
            if (!assignToSessionId && Array.isArray(scheduleData.sessions) && scheduleData.sessions.length) {
                setAssignToSessionId(String(scheduleData.sessions[0]._id));
            }
        } catch (e) {
            setError(e.message || 'Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const createSchedule = async () => {
        if (!window.confirm('Create schedule for this date? This cannot be duplicated (for now).')) return;
        try {
            setCreating(true);
            setError('');
            const res = await teachingAPI.createSchedule({ projectKey, dateKey, startTime, endTime });
            setResult(res.data || res);
            await load();
        } catch (e) {
            setError(e.message || 'Failed to create schedule');
        } finally {
            setCreating(false);
        }
    };

    const removeStudentFromSession = async (sessionId, studentId) => {
        try {
            setError('');
            const current = sessions.find((s) => String(s._id) === String(sessionId));
            const existingIds = (current?.students || []).map((st) => st._id);
            const nextIds = existingIds.filter((id) => String(id) !== String(studentId));
            await teachingAPI.updateSession(sessionId, { studentIds: nextIds });
            await load();
        } catch (e) {
            setError(e.message || 'Failed to remove student');
        }
    };

    const assignStudentToSession = async (studentId) => {
        if (!assignToSessionId) return;
        try {
            setError('');
            const current = sessions.find((s) => String(s._id) === String(assignToSessionId));
            const existingIds = (current?.students || []).map((st) => st._id);
            const nextIds = Array.from(new Set([...existingIds.map(String), String(studentId)]));
            await teachingAPI.updateSession(assignToSessionId, { studentIds: nextIds });
            await load();
        } catch (e) {
            setError(e.message || 'Failed to assign student');
        }
    };

    return (
        <div className="min-h-screen pt-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
                <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
                    <div
                        className="px-6 py-6"
                        style={{ background: `linear-gradient(135deg, var(--color-primary), var(--color-secondary))` }}
                    >
                        <h1 className="text-2xl md:text-3xl font-black text-white">Schedule classes (Leader)</h1>
                        <p className="text-white/90 mt-1">
                            Auto-assign students to volunteers who marked availability for the selected date.
                        </p>
                    </div>

                    <div className="p-6">
                        {error && (
                            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-1">Date</label>
                                <input
                                    type="date"
                                    value={dateKey}
                                    min={toDateKey(addDays(new Date(), 1))}
                                    onChange={(e) => setDateKey(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-1"
                                    style={{ '--tw-ring-color': 'var(--color-primary)' }}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-1">Start</label>
                                <input
                                    type="time"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-1"
                                    style={{ '--tw-ring-color': 'var(--color-primary)' }}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-1">End</label>
                                <input
                                    type="time"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-1"
                                    style={{ '--tw-ring-color': 'var(--color-primary)' }}
                                />
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={load}
                                    disabled={loading}
                                    className="px-4 py-2.5 rounded-lg font-semibold bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-60"
                                >
                                    {loading ? 'Loading…' : 'Load'}
                                </button>
                                <button
                                    onClick={createSchedule}
                                    disabled={creating || loading}
                                    className="px-4 py-2.5 rounded-lg font-semibold text-white disabled:opacity-60"
                                    style={{ backgroundColor: 'var(--color-primary)' }}
                                >
                                    {creating ? 'Creating…' : 'Auto-assign & create'}
                                </button>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="font-bold text-gray-900">Unassigned students</h2>
                                    <span className="text-sm text-gray-600">{students.length}</span>
                                </div>

                                {sessions.length > 0 && (
                                    <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-2">
                                        <div className="text-sm font-semibold text-gray-800">Assign to:</div>
                                        <select
                                            value={assignToSessionId}
                                            onChange={(e) => setAssignToSessionId(e.target.value)}
                                            className="rounded-lg border border-gray-300 px-3 py-2 bg-white"
                                        >
                                            {sessions.map((s) => (
                                                <option key={s._id} value={s._id}>
                                                    {s.volunteer?.name || 'Volunteer'} ({(s.students || []).length} students)
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                <div className="mt-3 max-h-80 overflow-auto space-y-2">
                                    {students.length === 0 ? (
                                        <div className="text-gray-600">
                                            No unassigned students for {projectKey} on {dateKey}.
                                        </div>
                                    ) : (
                                        students.map((s) => (
                                            <div key={s._id} className="flex items-center justify-between rounded-lg bg-white border border-gray-200 px-3 py-2">
                                                <div>
                                                    <div className="font-semibold text-gray-900">{s.name}</div>
                                                    <div className="text-xs text-gray-500">{s.email}{s.grade ? ` • Grade ${s.grade}` : ''}</div>
                                                </div>
                                                <button
                                                    type="button"
                                                    disabled={!sessions.length}
                                                    onClick={() => assignStudentToSession(s._id)}
                                                    className="px-3 py-2 rounded-lg font-semibold text-white disabled:opacity-60"
                                                    style={{ backgroundColor: 'var(--color-primary)' }}
                                                >
                                                    Assign
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="font-bold text-gray-900">Available volunteers</h2>
                                    <span className="text-sm text-gray-600">{availability.length}</span>
                                </div>
                                <div className="mt-3 max-h-80 overflow-auto space-y-2">
                                    {availability.length === 0 ? (
                                        <div className="text-gray-600">No volunteers have marked availability for {dateKey}.</div>
                                    ) : (
                                        availability.map((a) => (
                                            <div key={a._id} className="rounded-lg bg-white border border-gray-200 px-3 py-2">
                                                <div className="font-semibold text-gray-900">{a.volunteer?.name || 'Volunteer'}</div>
                                                <div className="text-xs text-gray-500">
                                                    {a.volunteer?.kerberosid || ''}
                                                    {Array.isArray(a.teachableGrades) && a.teachableGrades.length ? ` • Grades: ${a.teachableGrades.join(', ')}` : ''}
                                                    {a.notes ? ` • ${a.notes}` : ''}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-4">
                            <div className="flex items-center justify-between">
                                <h2 className="font-bold text-gray-900">Scheduled sessions</h2>
                                <span className="text-sm text-gray-600">{sessions.length}</span>
                            </div>

                            {sessions.length === 0 ? (
                                <div className="mt-3 text-gray-600">
                                    No sessions exist yet for {dateKey}. Use “Auto-assign & create” first.
                                </div>
                            ) : (
                                <div className="mt-4 space-y-3">
                                    {sessions.map((sess) => (
                                        <div key={sess._id} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                                <div>
                                                    <div className="font-bold text-gray-900">
                                                        {sess.volunteer?.name || 'Volunteer'} • {sess.start_time}–{sess.end_time}
                                                    </div>
                                                    <div className="text-sm text-gray-600">
                                                        Students: <span className="font-semibold">{sess.students?.length || 0}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {Array.isArray(sess.students) && sess.students.length > 0 ? (
                                                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                                                    {sess.students.map((st) => (
                                                        <div key={st._id} className="rounded-lg border border-gray-200 bg-white px-3 py-2 flex items-center justify-between gap-3">
                                                            <div>
                                                                <div className="font-semibold text-gray-900">{st.name}</div>
                                                                <div className="text-xs text-gray-500">{st.email}{st.grade ? ` • Grade ${st.grade}` : ''}</div>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => removeStudentFromSession(sess._id, st._id)}
                                                                className="px-3 py-2 rounded-lg font-semibold text-red-600 bg-red-50 hover:bg-red-100"
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="mt-3 text-gray-600">No students assigned yet.</div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {result && (
                            <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-green-800">
                                <div className="font-bold">Schedule created</div>
                                <div className="text-sm mt-1">
                                    Sessions: {result.sessionsCreated} • Students assigned: {result.studentsAssigned} • Volunteers considered: {result.volunteersConsidered}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeaderSchedule;
