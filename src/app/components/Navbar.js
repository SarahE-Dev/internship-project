'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Simulate checking if user is logged in (replace with actual auth logic)
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData)); 
      setIsLoggedIn(true);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left side: Logo or Home */}
        <Link href="/" className="text-2xl font-bold text-white">
          MyApp
        </Link>

        
        <div className="hidden md:flex space-x-4 items-center">
          

          {isLoggedIn ? (
            <>
              <Link href="/articles" className="border border-purple-500 text-purple-500 py-2 px-4 rounded hover:bg-purple-500 hover:text-white transition duration-300">
                Articles
              </Link>
              <Link href="/create" className="border border-purple-500 text-purple-500 py-2 px-4 rounded hover:bg-purple-500 hover:text-white transition duration-300">
                Create Article
              </Link>
              <div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="px-4 py-2 border border-purple-500 rounded text-black"
                />
              </div>
              <span className="text-white">Logged in as {user?.name}</span>
              <button onClick={handleLogout} className="border border-purple-500 text-purple-500 py-2 px-4 rounded hover:bg-purple-500 hover:text-white transition duration-300">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="border border-purple-500 text-purple-500 py-2 px-4 rounded hover:bg-purple-500 hover:text-white transition duration-300">
                Login
              </Link>
              <Link href="/signup" className="border border-purple-500 text-purple-500 py-2 px-4 rounded hover:bg-purple-500 hover:text-white transition duration-300">
                Signup
              </Link>
            </>
          )}
        </div>

        
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-gray-800 text-white p-4`}>
        <div className="flex flex-col space-y-4">
          
          {isLoggedIn ? (
            <>
              <Link href="/articles" className="border border-purple-500 text-purple-500 py-2 px-4 rounded hover:bg-purple-500 hover:text-white transition duration-300">
                Articles
              </Link>
              <Link href="/create" className="border border-purple-500 text-purple-500 py-2 px-4 rounded hover:bg-purple-500 hover:text-white transition duration-300">
                Create Article
              </Link>
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 border border-purple-500 rounded text-black"
              />
              <span className="text-white">Logged in as {user?.name}</span>
              <button onClick={handleLogout} className="border border-purple-500 text-purple-500 py-2 px-4 rounded hover:bg-purple-500 hover:text-white transition duration-300">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="border border-purple-500 text-purple-500 py-2 px-4 rounded hover:bg-purple-500 hover:text-white transition duration-300">
                Login
              </Link>
              <Link href="/signup" className="border border-purple-500 text-purple-500 py-2 px-4 rounded hover:bg-purple-500 hover:text-white transition duration-300">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

