import React, { useEffect, useMemo, useState } from 'react';
import { contentAPI } from '../api/api';
import { useAuth } from '../context/AuthContext';
import { getProjectKeyFromSubdomain } from '../utils/projectConfig';

const Resources = () => {
  const { user } = useAuth();
  const role = String(user?.role || '').toLowerCase();
  const projectKey = useMemo(() => getProjectKeyFromSubdomain(), []);
  const isStudent = role === 'student';

  const [activeTab, setActiveTab] = useState(isStudent ? 'all' : 'all');

  const [viewerItems, setViewerItems] = useState([]);
  const [myItems, setMyItems] = useState([]);
  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [scopeType, setScopeType] = useState('general');
  const [grade, setGrade] = useState('');
  const [studentId, setStudentId] = useState('');
  const [kind, setKind] = useState('file');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const openUrl = (item) => {
    const base = import.meta.env.VITE_API_BASE_URL || '';
    if (item?.kind === 'link') return item?.url || '';
    if (item?.file?.path) return `${base}${item.file.path}`;
    return '';
  };

  const load = async () => {
    try {
      setLoading(true);
      setError('');

      if (isStudent) {
        const viewerRes = await contentAPI.listItemsForViewer({ contentType: 'resource', projectKey });
        setViewerItems(viewerRes?.data || viewerRes || []);
        setMyItems([]);
        setStudents([]);
      } else {
        setViewerItems([]);
        const [mineRes, studentsRes] = await Promise.all([
          contentAPI.listMyItems({ contentType: 'resource', projectKey }),
          contentAPI.listStudents({ projectKey }),
        ]);
        setMyItems(mineRes?.data || mineRes || []);
        setStudents(studentsRes?.data || studentsRes || []);
      }
    } catch (e) {
      setError(e?.message || 'Failed to load resources');
      setViewerItems([]);
      setMyItems([]);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setScopeType('general');
    setGrade('');
    setStudentId('');
    setKind('file');
    setUrl('');
    setFile(null);
  };

  const validate = () => {
    if (!title.trim()) return 'Title is required';
    if (!scopeType) return 'Scope is required';
    if (scopeType === 'grade' && !String(grade).trim()) return 'Grade is required';
    if (scopeType === 'student' && !studentId) return 'Student is required';
    if (kind === 'link' && !url.trim()) return 'URL is required';
    if (kind === 'file' && !file) return 'File is required';
    return '';
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      await contentAPI.uploadItem({
        projectKey,
        contentType: 'resource',
        title: title.trim(),
        description: description.trim(),
        scopeType,
        grade: scopeType === 'grade' ? String(grade).trim() : undefined,
        studentId: scopeType === 'student' ? studentId : undefined,
        kind,
        url: kind === 'link' ? url.trim() : undefined,
        file: kind === 'file' ? file : undefined,
      });
      resetForm();
      await load();
    } catch (e2) {
      setError(e2?.message || 'Upload failed');
    } finally {
      setSubmitting(false);
    }
  };

  const renderItems = (items, scopeFilter) => {
    if (loading) return <div className="py-8 text-gray-600">Loading…</div>;
    if (!items || items.length === 0) return <div className="py-8 text-gray-600">No resources yet.</div>;

    const groups = { general: [], grade: [], student: [] };

    for (const it of items) {
      const k = it?.scopeType === 'grade' ? 'grade' : it?.scopeType === 'student' ? 'student' : 'general';
      groups[k].push(it);
    }

    const Group = ({ title, list }) => {
      if (!list.length) return null;
      return (
        <div className="mt-5">
          <div className="text-sm font-black text-gray-900">{title}</div>
          <div className="mt-3 space-y-3">
            {list.map((it) => {
              const href = openUrl(it);
              const scopeLabel =
                it.scopeType === 'general' ? 'General' : it.scopeType === 'grade' ? `Class ${it.grade}` : 'Student';
              const typeLabel = it.kind === 'link' ? 'Link' : 'File';
              return (
                <div key={it._id} className="rounded-xl border border-gray-200 bg-white p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs text-gray-500">{scopeLabel} • {typeLabel}</div>
                      <div className="font-bold text-gray-900 mt-1">{it.title}</div>
                    </div>
                  </div>
                  {it.description && (
                    <div className="text-sm text-gray-700 mt-2 whitespace-pre-wrap">{it.description}</div>
                  )}
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block mt-3 px-4 py-2 rounded-lg font-semibold text-white"
                      style={{ backgroundColor: 'var(--color-primary)' }}
                    >
                      Open
                    </a>
                  ) : (
                    <div className="text-xs text-gray-400 mt-3">No attachment</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    };

    if (scopeFilter && scopeFilter !== 'all') {
      const title = scopeFilter === 'general' ? 'General' : scopeFilter === 'grade' ? 'Class' : 'Student';
      return (
        <div>
          <Group title={title} list={groups[scopeFilter] || []} />
        </div>
      );
    }

    return (
      <div>
        <Group title="General" list={groups.general} />
        <Group title="Class" list={groups.grade} />
        <Group title="Student" list={groups.student} />
      </div>
    );
  };

  const tabs = isStudent
    ? [
      { key: 'all', label: 'All' },
      { key: 'general', label: 'General' },
      { key: 'grade', label: 'Class' },
      { key: 'student', label: 'Student' },
    ]
    : [
      { key: 'all', label: 'All' },
      { key: 'general', label: 'General' },
      { key: 'grade', label: 'Class' },
      { key: 'student', label: 'Student' },
      { key: 'upload', label: 'Upload' },
    ];

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
          <div
            className="px-6 py-6"
            style={{ background: `linear-gradient(135deg, var(--color-primary), var(--color-secondary))` }}
          >
            <h1 className="text-2xl md:text-3xl font-black text-white">Resources</h1>
            <p className="text-white/90 mt-1">General / class / student resources.</p>
          </div>

          <div className="p-6">
            {error && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">{error}</div>
            )}

            <div className="mb-6 flex flex-wrap gap-2">
              {tabs.map((t) => {
                const active = activeTab === t.key;
                return (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setActiveTab(t.key)}
                    className={
                      'px-4 py-2 rounded-full text-sm font-semibold border ' +
                      (active
                        ? 'text-white border-transparent'
                        : 'bg-white text-gray-800 border-gray-200 hover:bg-gray-50')
                    }
                    style={active ? { backgroundColor: 'var(--color-primary)' } : undefined}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>

            {!isStudent && activeTab === 'upload' && (
              <form onSubmit={onSubmit} className="rounded-xl border border-gray-200 p-4 mb-6">
                <div className="text-sm font-black text-gray-900 mb-3">Upload resource</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Title</label>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Scope</label>
                    <select
                      value={scopeType}
                      onChange={(e) => setScopeType(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
                    >
                      <option value="general">General</option>
                      <option value="grade">Class (grade)</option>
                      <option value="student">Student</option>
                    </select>
                  </div>

                  {scopeType === 'grade' && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700">Grade</label>
                      <input
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
                        placeholder="e.g. 5"
                      />
                    </div>
                  )}

                  {scopeType === 'student' && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700">Student</label>
                      <select
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
                      >
                        <option value="">Select a student</option>
                        {students.map((s) => (
                          <option key={s._id} value={s._id}>
                            {s.name} ({s.grade})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700">Description (optional)</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Type</label>
                    <select
                      value={kind}
                      onChange={(e) => setKind(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
                    >
                      <option value="file">File</option>
                      <option value="link">Link</option>
                    </select>
                  </div>

                  {kind === 'link' ? (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700">URL</label>
                      <input
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
                        placeholder="https://..."
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700">File</label>
                      <input
                        type="file"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
                      />
                    </div>
                  )}
                </div>

                <div className="mt-4 flex flex-col md:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2.5 rounded-lg font-semibold text-white disabled:opacity-60"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    {submitting ? 'Uploading…' : 'Upload'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2.5 rounded-lg font-semibold bg-gray-100 text-gray-800 hover:bg-gray-200"
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    onClick={load}
                    className="px-4 py-2.5 rounded-lg font-semibold bg-gray-100 text-gray-800 hover:bg-gray-200 md:ml-auto"
                  >
                    Refresh
                  </button>
                </div>
              </form>
            )}

            {isStudent ? renderItems(viewerItems, activeTab) : renderItems(myItems, activeTab === 'upload' ? 'all' : activeTab)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
