import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      
      if (user) {
        setIsAuthenticated(true);
      } else {
        router.push('/login');
      }
    }, [router]);

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;
