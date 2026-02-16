export default function FamilyDashboard() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-[#1e4d45] mb-8">
        Family Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow">
          Linked Senior Profile
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          Health Updates
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          Emergency Alerts
        </div>

      </div>
    </div>
  );
}
