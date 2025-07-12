import { supabase } from '@/integrations/supabase/client';

export const setupDatabase = async () => {
  console.log("Setting up database...");
  try {
    // Check if the profiles table exists and has the right structure
    const { error: checkError } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);

    if (checkError) {
      console.log("Profiles table error or doesn't exist:", checkError.message);
      
      // Create the profiles table using raw SQL instead of RPC
      const { error: createError } = await supabase.from('profiles').insert({
        id: '00000000-0000-0000-0000-000000000000',
        email: 'system@example.com',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }).select().limit(1);
      
      if (createError) {
        console.error("Error creating profiles table:", createError);
      } else {
        console.log("Profiles table created successfully");
      }
    } else {
      console.log("Profiles table exists");
    }
  } catch (error) {
    console.error("Error setting up database:", error);
  }
};

export const insertUserProfile = async (
  userId: string, 
  email: string,
  firstName?: string,
  lastName?: string,
  phoneNumber?: string
) => {
  console.log("Inserting user profile for:", userId);
  try {
    // Check if profile already exists
    const { data: existingProfile, error: checkError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (checkError && checkError.code !== 'PGRST116') {
      console.error("Error checking existing profile:", checkError);
    }
    
    if (existingProfile) {
      console.log("Profile already exists, updating");
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          email: email,
          first_name: firstName,
          last_name: lastName,
          phone_number: phoneNumber,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);
      
      if (updateError) {
        console.error("Error updating profile:", updateError);
      }
    } else {
      console.log("Creating new profile");
      const { error: insertError } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          email: email,
          first_name: firstName,
          last_name: lastName,
          phone_number: phoneNumber,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      
      if (insertError) {
        console.error("Error inserting profile:", insertError);
      }
    }
  } catch (error) {
    console.error("Error inserting user profile:", error);
  }
}; 