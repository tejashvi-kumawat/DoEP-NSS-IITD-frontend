import React, { useEffect, useMemo, useState } from 'react';
import { contentAPI } from '../api/api';
import { useAuth } from '../context/AuthContext';
import { getProjectKeyFromSubdomain } from '../utils/projectConfig';

const Curriculum = () => {
  const { user } = useAuth();
  const projectKey = useMemo(() => getProjectKeyFromSubdomain(), []);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [items, setItems] = useState([]);

  const load = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await contentAPI.listItemsForViewer({ contentType: 'curriculum', projectKey });
      setItems(res.data || res);
    } catch (e) {
      setError(e.message || 'Failed to load curriculum');
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openUrl = (item) => {
    const base = import.meta.env.VITE_API_BASE_URL || '';
    if (item.kind === 'link') return item.url;
    if (item.file?.path) return `${base}${item.file.path}`;
    return '';
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
          <div
            className="px-6 py-6"
            style={{ background: `linear-gradient(135deg, var(--color-primary), var(--color-secondary))` }}
          >
            <h1 className="text-2xl md:text-3xl font-black text-white">Curriculum</h1>
            <p className="text-white/90 mt-1">General + class-wise + student-wise updates.</p>
          </div>

          <div className="p-6">
            {String(user?.role || '').toLowerCase() !== 'student' && (
              <div className="mb-4 rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-yellow-800">
                This page is meant for students. Volunteers/leaders should use Curriculum Manage.
              </div>
            )}

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
            ) : items.length === 0 ? (
              <div className="py-10 text-gray-600">No curriculum items yet.</div>
            ) : (
              <div className="mt-5 space-y-3">
                {items.map((it) => {
                  const href = openUrl(it);
                  const scopeLabel =
                    it.scopeType === 'general'
                      ? 'General'
                      : it.scopeType === 'grade'
                        ? `Class ${it.grade}`
                        : 'Student';
                  return (
                    <div key={it._id} className="rounded-xl border border-gray-200 bg-white p-4">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                        <div>
                          <div className="text-xs text-gray-500">
                            {scopeLabel}
                            {it.academicYear ? ` • ${it.academicYear}` : ''}
                          </div>
                          <div className="font-bold text-gray-900 mt-1">{it.title}</div>
                          {it.description && (
                            <div className="text-sm text-gray-700 mt-2 whitespace-pre-wrap">
                              {it.description}
                            </div>
                          )}
                        </div>

                        {href ? (
                          <a
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                            className="px-4 py-2 rounded-lg font-semibold text-white"
                            style={{ backgroundColor: 'var(--color-primary)' }}
                          >
                            Open
                          </a>
                        ) : (
                          <div className="text-xs text-gray-400">No attachment</div>
                        )}
                      </div>
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

export default Curriculum;
