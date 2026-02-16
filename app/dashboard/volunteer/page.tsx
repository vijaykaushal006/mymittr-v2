export default function VolunteerDashboard() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-[#1e4d45] mb-8">
        Volunteer Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow">
          Assigned Seniors
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          Upcoming Visits
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          Activity Reports
        </div>

      </div>
    </div>
  );
}
