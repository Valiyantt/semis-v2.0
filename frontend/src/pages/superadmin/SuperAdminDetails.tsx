import { useEffect, useState } from 'react';
import { getById, type SuperAdmin } from '../../services/superadminService';
import { useParams, useNavigate } from 'react-router-dom';

export default function SuperAdminDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<SuperAdmin | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const data = await getById(Number(id));
        setItem(data);
      } catch (err) {
        console.error(err);
        alert('Failed to load');
      }
    })();
  }, [id]);

  if (!item) return <div>Loading…</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">SuperAdmin Details</h2>
          <p className="text-sm text-gray-500">Details and contact information</p>
        </div>
        <div>
          <button onClick={() => navigate(-1)} className="text-sm text-gray-500">Back</button>
        </div>
      </div>

      <div className="bg-white/90 backdrop-blur-sm shadow-md rounded-2xl p-6 max-w-md">
        <div className="mb-3 text-sm text-gray-500"><strong>ID:</strong> {item.superAdminId}</div>
        <div className="mb-3"><strong className="text-gray-700">Name:</strong> <div className="mt-1 text-lg font-semibold">{item.fullName}</div></div>
        <div className="mb-3"><strong className="text-gray-700">Email:</strong> <div className="mt-1 text-sm text-gray-600">{item.email}</div></div>
      </div>
    </div>
  );
}
