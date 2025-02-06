import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tvoucrpaycfeqtytelmx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2b3VjcnBheWNmZXF0eXRlbG14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg4NDgwNTUsImV4cCI6MjA1NDQyNDA1NX0.BlXHrDjf11fAhTIAdcbUw3o8q3Hidk3ji_nTg8u4_zU';

export const supabase = createClient(supabaseUrl, supabaseKey);
