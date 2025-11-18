import { useEffect, useState } from 'react';
import { create, getById, update, type SuperAdmin } from '../../services/superadminService';
import { useNavigate, useParams } from 'react-router-dom';

export default function SuperAdminForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [model, setModel] = useState<Partial<SuperAdmin>>({ fullName: '', email: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id && id !== 'new') {
      (async () => {
        try {
          const data = await getById(Number(id));
          setModel(data);
        } catch (err) {
          console.error(err);
          alert('Failed to load');
        }
      })();
    }
  }, [id]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (!id || id === 'new') {
        await create(model);
      } else {
        await update(Number(id), model);
      }
      navigate('/superadmin/superadmins');
    } catch (err) {
      console.error('Save failed', err);
      alert('Save failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm shadow-md rounded-2xl p-6 max-w-2xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">{id && id !== 'new' ? 'Edit' : 'New'} SuperAdmin</h2>
        <button onClick={() => navigate(-1)} className="text-sm text-gray-500">Back</button>
      </div>

      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full name</label>
          <input value={model.fullName ?? ''} onChange={(e) => setModel({ ...model, fullName: e.target.value })} className="mt-2 px-3 py-2 border rounded-lg w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input value={model.email ?? ''} onChange={(e) => setModel({ ...model, email: e.target.value })} className="mt-2 px-3 py-2 border rounded-lg w-full" />
        </div>
        {(!id || id === 'new') && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" onChange={(e) => setModel({ ...model, passwordHash: e.target.value })} className="mt-2 px-3 py-2 border rounded-lg w-full" />
          </div>
        )}

        <div className="pt-4">
          <button disabled={loading} className="px-4 py-2 bg-rose-600 text-white rounded-lg shadow">Save</button>
        </div>
      </form>
    </div>
  );
}
