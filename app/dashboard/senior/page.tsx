export default function SeniorDashboard() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-[#1e4d45] mb-8">
        Senior Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow">
          My Appointments
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          Emergency Status
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          Community Events
        </div>

      </div>
    </div>
  );
}
