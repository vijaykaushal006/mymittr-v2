import { createClient } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login?redirect=/dashboard/admin");
    }

    // Strict Role Check for ALL admin routes
    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (profile?.role !== "admin") {
        redirect("/dashboard"); // Redirect unauthorized users
    }

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Admin Sidebar could go here */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Admin Header could go here */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
