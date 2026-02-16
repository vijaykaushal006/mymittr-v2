import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">

        <Header />

        {/* Content Wrapper */}
        <main className="flex-1 pt-28">
          {children}
        </main>

        <Footer />

      </body>
    </html>
  );
}
