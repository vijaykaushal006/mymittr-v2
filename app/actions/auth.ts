"use server";

import { createClient } from "@/lib/supabaseServer";
import { Database } from "@/types/supabase"

type SignupFormData = {
    email: string;
    password?: string;
    fullName: string;
    role: Database['public']['Tables']['profiles']['Row']['role'];
    // Role specific
    age?: string;
    city?: string;
    medicalNotes?: string;
    seniorName?: string;
    relationship?: string;
    skills?: string;
    availability?: string;
    serviceType?: string;
    experience?: string;
};

export async function signupUser(formData: SignupFormData) {
    const supabase = await createClient();

    // 1. Create Auth User
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password!, // Password is required for email signup
        options: {
            data: {
                full_name: formData.fullName,
                role: formData.role, // Metadata is okay, but we trust the profile table more
            }
        }
    });

    if (authError) {
        return { error: authError.message };
    }

    if (!authData.user) {
        return { error: "User creation failed" };
    }

    const userId = authData.user.id;

    // 2. Insert into Profiles (Server-Side Validation of Role could happen here if needed)
    // For now, we trust the role sent *to this function*, but since this is a server action,
    // we can enforce rules (e.g., prevent 'admin' role creation if we wanted).

    if (formData.role === 'admin') {
        return { error: "Cannot sign up as admin directly." };
    }

    const { error: profileError } = await supabase.from("profiles").insert({
        id: userId,
        role: formData.role,
        full_name: formData.fullName,
    });

    if (profileError) {
        return { error: `Profile creation failed: ${profileError.message}` };
    }

    // 3. Insert Role-Specific Data
    let roleError = null;

    if (formData.role === "senior") {
        const { error } = await supabase.from("senior_profiles").insert({
            id: userId,
            age: Number(formData.age),
            city: formData.city,
            medical_notes: formData.medicalNotes,
        });
        roleError = error;
    } else if (formData.role === "family") {
        const { error } = await supabase.from("family_profiles").insert({
            id: userId,
            senior_name: formData.seniorName,
            relationship: formData.relationship,
        });
        roleError = error;
    } else if (formData.role === "volunteer") {
        const { error } = await supabase.from("volunteer_profiles").insert({
            id: userId,
            skills: formData.skills,
            availability: formData.availability,
        });
        roleError = error;
    } else if (formData.role === "provider") {
        const { error } = await supabase.from("provider_profiles").insert({
            id: userId,
            service_type: formData.serviceType,
            experience_years: Number(formData.experience),
        });
        roleError = error;
    }

    if (roleError) {
        return { error: `Role profile processing failed: ${roleError.message}` };
    }

    return { success: true, redirectUrl: `/dashboard/${formData.role}` };
}
