export default function ServiceLayout({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen pt-28 px-6 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-[#1e4d45]">
          {title}
        </h1>

        <p className="mt-6 text-xl text-gray-600 max-w-3xl">
          {description}
        </p>

        <div className="mt-16">{children}</div>
      </div>
    </main>
  );
}
