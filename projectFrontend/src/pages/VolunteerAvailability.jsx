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

const gradeOptions = Array.from({ length: 12 }, (_, i) => i + 1);

const VolunteerAvailability = () => {
    const projectKey = useMemo(() => getProjectKeyFromSubdomain(), []);

    const [dateKey, setDateKey] = useState(toDateKey(addDays(new Date(), 1)));
    const [selectedGrades, setSelectedGrades] = useState([]);
    const [notes, setNotes] = useState('');

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [items, setItems] = useState([]);

    const load = async () => {
        try {
            setLoading(true);
            setError('');
            const today = toDateKey(new Date());
            const res = await teachingAPI.getMyAvailability(projectKey, today);
            setItems(res.data || res);
        } catch (e) {
            setError(e.message || 'Failed to load availability');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggleGrade = (g) => {
        setSelectedGrades((prev) =>
            prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
        );
    };

    const save = async () => {
        try {
            setSaving(true);
            setError('');
            await teachingAPI.setAvailability({ projectKey, dateKey, teachableGrades: selectedGrades, notes });
            await load();
            setNotes('');
        } catch (e) {
            setError(e.message || 'Failed to save availability');
        } finally {
            setSaving(false);
        }
    };

    const remove = async (id) => {
        if (!window.confirm('Remove this availability?')) return;
        try {
            setError('');
            await teachingAPI.deleteAvailability(id);
            await load();
        } catch (e) {
            setError(e.message || 'Failed to delete availability');
        }
    };

    return (
        <div className="min-h-screen pt-20 bg-gray-50">
            <div className="max-w-5xl mx-auto px-4">
                <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
                    <div
                        className="px-6 py-6"
                        style={{
                            background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)`,
                        }}
                    >
                        <h1 className="text-2xl md:text-3xl font-black text-white">Set your availability</h1>
                        <p className="text-white/90 mt-1">
                            Choose a future date (at least 1 day advance) and what classes/grades you can teach.
                        </p>
                    </div>

                    <div className="p-6">
                        {error && (
                            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="md:col-span-1">
                                <label className="block text-sm font-semibold text-gray-800 mb-1">Date</label>
                                <input
                                    type="date"
                                    value={dateKey}
                                    min={toDateKey(addDays(new Date(), 1))}
                                    onChange={(e) => setDateKey(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-1"
                                    style={{
                                        '--tw-ring-color': 'var(--color-primary)',
                                    }}
                                />
                                <p className="text-xs text-gray-500 mt-2">
                                    Project: <span className="font-semibold">{projectKey}</span>
                                </p>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-800 mb-2">Grades you can teach</label>
                                <div className="flex flex-wrap gap-2">
                                    {gradeOptions.map((g) => {
                                        const active = selectedGrades.includes(g);
                                        return (
                                            <button
                                                key={g}
                                                type="button"
                                                onClick={() => toggleGrade(g)}
                                                className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition ${active
                                                        ? 'text-white border-transparent'
                                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                                    }`}
                                                style={
                                                    active
                                                        ? { backgroundColor: 'var(--color-primary)' }
                                                        : undefined
                                                }
                                            >
                                                {g}
                                            </button>
                                        );
                                    })}
                                </div>

                                <label className="block text-sm font-semibold text-gray-800 mt-4 mb-1">Notes (optional)</label>
                                <input
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="e.g., prefer younger kids / can take 3 students"
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-1"
                                    style={{
                                        '--tw-ring-color': 'var(--color-primary)',
                                    }}
                                />

                                <div className="mt-4 flex items-center gap-3">
                                    <button
                                        onClick={save}
                                        disabled={saving}
                                        className="px-5 py-2.5 rounded-lg font-semibold text-white shadow-sm disabled:opacity-60"
                                        style={{ backgroundColor: 'var(--color-primary)' }}
                                    >
                                        {saving ? 'Saving…' : 'Save availability'}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedGrades([]);
                                            setNotes('');
                                        }}
                                        type="button"
                                        className="px-4 py-2.5 rounded-lg font-semibold bg-gray-100 text-gray-800 hover:bg-gray-200"
                                    >
                                        Clear
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-bold text-gray-900">Your upcoming availability</h2>
                                <button
                                    onClick={load}
                                    className="text-sm font-semibold text-gray-700 hover:text-gray-900"
                                >
                                    Refresh
                                </button>
                            </div>

                            {loading ? (
                                <div className="py-10 text-gray-600">Loading…</div>
                            ) : items.length === 0 ? (
                                <div className="py-10 text-gray-600">No upcoming availability set yet.</div>
                            ) : (
                                <div className="mt-3 space-y-2">
                                    {items.map((it) => (
                                        <div
                                            key={it._id}
                                            className="flex flex-col md:flex-row md:items-center justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
                                        >
                                            <div>
                                                <div className="font-semibold text-gray-900">
                                                    {it.dateKey} <span className="text-gray-500 font-normal">•</span>{' '}
                                                    <span className="text-gray-700">{it.projectKey}</span>
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    Grades: {Array.isArray(it.teachableGrades) && it.teachableGrades.length ? it.teachableGrades.join(', ') : '—'}
                                                    {it.notes ? ` • ${it.notes}` : ''}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => remove(it._id)}
                                                className="px-3 py-2 rounded-lg font-semibold text-red-600 bg-red-50 hover:bg-red-100"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VolunteerAvailability;
