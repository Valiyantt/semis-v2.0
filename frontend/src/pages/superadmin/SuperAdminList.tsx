import { useEffect, useState } from 'react';
import { getAll, remove, type SuperAdmin } from '../../services/superadminService';
import { Link, useNavigate } from 'react-router-dom';

export default function SuperAdminList() {
  const [items, setItems] = useState<SuperAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function load() {
    setLoading(true);
    try {
      const data = await getAll();
      setItems(data);
    } catch (err) {
      console.error('Failed loading superadmins', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id?: number) {
    if (!id) return;
    if (!confirm('Delete this super admin?')) return;
    try {
      await remove(id);
      load();
    } catch (err) {
      console.error('Delete failed', err);
      alert('Delete failed');
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Super Admins</h2>
          <p className="text-sm text-gray-500">Manage users with the SuperAdmin role</p>
        </div>
        <div>
          <button onClick={() => navigate('/superadmin/superadmins/new')} className="px-4 py-2 bg-rose-600 text-white rounded-lg shadow">New SuperAdmin</button>
        </div>
      </div>

      {loading ? (
        <div>Loading…</div>
      ) : (
        <div className="grid gap-4">
          {items.length === 0 ? (
            <div className="bg-white/90 backdrop-blur-sm shadow-md rounded-2xl p-6">No super admins found.</div>
          ) : (
            items.map((it) => (
              <div key={it.superAdminId} className="bg-white/90 backdrop-blur-sm shadow-md rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">ID #{it.superAdminId}</div>
                  <div className="text-lg font-semibold">{it.fullName}</div>
                  <div className="text-sm text-gray-500">{it.email}</div>
                </div>
                <div className="flex items-center gap-3">
                  <Link to={`/superadmin/superadmins/${it.superAdminId}`} className="text-blue-600">View</Link>
                  <Link to={`/superadmin/superadmins/${it.superAdminId}/edit`} className="text-green-600">Edit</Link>
                  <button onClick={() => handleDelete(it.superAdminId)} className="text-red-600">Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
