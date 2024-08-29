'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const WithAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); 
    const router = useRouter();

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.push('/login');
      }
    }, [router]);

    if (isAuthenticated === null) {
      
      return null;
    }

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  AuthenticatedComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthenticatedComponent;
};

export default WithAuth;


