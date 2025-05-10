import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../supabase/supabaseClient';

export async function POST(req: NextRequest) {
  const { userId } = await req.json();
  // Get user by ID
  const { data, error: userError } = await supabase.auth.admin.getUserById(userId);
  const user = data?.user;
  if (userError || !user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  const plan = user.user_metadata?.plan || 'starter';
  // Return data based on plan
  if (plan === 'pro') {
    return NextResponse.json({ data: 'This is PRO data for user ' + user.email });
  } else {
    return NextResponse.json({ data: 'This is STARTER data for user ' + user.email });
  }
} 