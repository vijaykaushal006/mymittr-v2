export default function ProviderDashboard() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-[#1e4d45] mb-8">
        Service Provider Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow">
          New Service Requests
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          Scheduled Visits
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          Earnings Summary
        </div>

      </div>
    </div>
  );
}
