import React, { useMemo, useState } from 'react';
import { studentsAPI } from '../api/api';
import { getProjectKeyFromSubdomain } from '../utils/projectConfig';

const AddStudent = () => {
  const projectKey = useMemo(() => getProjectKeyFromSubdomain(), []);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [grade, setGrade] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('pass123');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const reset = () => {
    setName('');
    setEmail('');
    setGrade('');
    setAge('');
    setPhone('');
    setAddress('');
    setPassword('pass123');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name.trim()) return setError('Name is required');
    if (!email.trim()) return setError('Email is required');

    try {
      setSubmitting(true);

      await studentsAPI.addStudent({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        age: age ? Number(age) : undefined,
        grade: grade ? Number(grade) : undefined,
        phone: phone.trim() || undefined,
        address: address.trim() || undefined,
        projectKey,
        project_involved: projectKey,
      });

      if (password && String(password).trim().length >= 6) {
        await studentsAPI.setStudentPassword(email.trim().toLowerCase(), String(password).trim());
      }

      setSuccess('Student enrolled successfully.');
      reset();
    } catch (err) {
      setError(err?.message || 'Failed to enroll student');
    } finally {
      setSubmitting(false);
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
            <h1 className="text-2xl md:text-3xl font-black text-white">Enroll student</h1>
            <p className="text-white/90 mt-1">Add a student to this project and set a login password.</p>
          </div>

          <div className="p-6">
            {error && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">{error}</div>
            )}
            {success && (
              <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-800">
                {success}
              </div>
            )}

            <form onSubmit={onSubmit} className="rounded-xl border border-gray-200 p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700">Email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700">Grade (optional)</label>
                  <input
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
                    placeholder="e.g. 5"
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700">Age (optional)</label>
                  <input
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
                    placeholder="e.g. 12"
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700">Phone (optional)</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700">Password</label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
                    placeholder="Min 6 chars"
                    disabled={submitting}
                  />
                  <div className="text-xs text-gray-500 mt-1">Default is pass123.</div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700">Address (optional)</label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
                    rows={3}
                    disabled={submitting}
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-col md:flex-row gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2.5 rounded-lg font-semibold text-white disabled:opacity-60"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  {submitting ? 'Enrolling…' : 'Enroll student'}
                </button>
                <button
                  type="button"
                  onClick={reset}
                  disabled={submitting}
                  className="px-4 py-2.5 rounded-lg font-semibold bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-60"
                >
                  Clear
                </button>
                <div className="text-sm text-gray-600 md:ml-auto">Project: {projectKey}</div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
