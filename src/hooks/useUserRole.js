import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

// TODO: Move this to Firestore
const ADMIN_EMAIL = 'admin@admin.com';

export function useUserRole() {
  const { currentUser } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (currentUser && currentUser.email === ADMIN_EMAIL) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [currentUser]);

  return { isAdmin };
}
