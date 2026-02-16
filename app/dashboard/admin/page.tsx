import { createClient } from '@/lib/supabaseServer'

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch real stats if possible, otherwise placeholder
  // Since we verified the user is admin in layout.tsx, we can just fetch data here.

  return (
    <div>
      <h1 className="text-4xl font-bold text-red-600 mb-8">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-2">Total Users</h2>
          <p className="text-3xl font-bold text-gray-800">1,234</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-2">Pending Approvals</h2>
          <p className="text-3xl font-bold text-yellow-600">56</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-2">Platform Analytics</h2>
          <p className="text-gray-500">View detailed stats &rarr;</p>
        </div>

      </div>
    </div>
  );
}
