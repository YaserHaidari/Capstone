import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://oydfaptdsmckloyhfkbd.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95ZGZhcHRkc21ja2xveWhma2JkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwNTMzNTAsImV4cCI6MjA2MDYyOTM1MH0.GOKO2RrUi3OC9FJfsN7qIhm6lbXOMQMksAn0ahdW7N0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})