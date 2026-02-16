import { createClient } from "@/lib/supabaseServer";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function GroupsPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login?redirect=/services/groups");
    }

    // Fetch user's groups
    const { data: myGroups } = await supabase
        .from("group_members")
        .select(`
      *,
      groups (*)
    `)
        .eq("user_id", user.id)
        .eq("status", "approved");

    // Fetch suggested groups
    const { data: suggestedGroups } = await supabase
        .from("groups")
        .select("*")
        .eq("privacy", "public")
        .limit(6);

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Groups</h1>
                    <p className="text-gray-600">Connect with people who share your interests</p>
                </div>

                {/* My Groups */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Your Groups</h2>
                        <Link
                            href="/services/groups/create"
                            className="px-6 py-2 bg-[#1e4d45] text-white rounded-lg font-semibold hover:bg-[#153a33] transition-colors"
                        >
                            Create Group
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {myGroups && myGroups.length > 0 ? (
                            myGroups.map((membership: any) => (
                                <Link
                                    key={membership.id}
                                    href={`/services/groups/${membership.groups.id}`}
                                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                                >
                                    <div className="h-32 bg-gradient-to-br from-[#1e4d45] to-[#2a6b5e]" />
                                    <div className="p-4">
                                        <h3 className="font-bold text-lg text-gray-900 mb-1">
                                            {membership.groups.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                            {membership.groups.description}
                                        </p>
                                        <div className="flex items-center justify-between text-sm text-gray-500">
                                            <span>{membership.groups.members_count} members</span>
                                            <span className="capitalize">{membership.role}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 bg-white rounded-xl">
                                <p className="text-gray-600 mb-4">You haven't joined any groups yet</p>
                                <Link
                                    href="/services/groups/create"
                                    className="text-[#1e4d45] font-semibold hover:underline"
                                >
                                    Create your first group
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Suggested Groups */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Discover Groups</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {suggestedGroups?.map((group: any) => (
                            <Link
                                key={group.id}
                                href={`/services/groups/${group.id}`}
                                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                            >
                                <div className="h-32 bg-gradient-to-br from-blue-500 to-purple-600" />
                                <div className="p-4">
                                    <h3 className="font-bold text-lg text-gray-900 mb-1">{group.name}</h3>
                                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                        {group.description}
                                    </p>
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <span>{group.members_count} members</span>
                                        <span className="capitalize">{group.privacy}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
