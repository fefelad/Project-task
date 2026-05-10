export const forceLocalLogout = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

  if (supabaseUrl) {
    const projectRef = new URL(supabaseUrl).hostname.split('.')[0];
    const authKey = `sb-${projectRef}-auth-token`;

    localStorage.removeItem(authKey);
    sessionStorage.removeItem(authKey);
  }

  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('sb-') && key.endsWith('-auth-token')) {
      localStorage.removeItem(key);
    }
  });

  Object.keys(sessionStorage).forEach((key) => {
    if (key.startsWith('sb-') && key.endsWith('-auth-token')) {
      sessionStorage.removeItem(key);
    }
  });
};