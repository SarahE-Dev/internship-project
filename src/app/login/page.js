'use client'
import { useRouter } from 'next/navigation';
import {useEffect, useState} from 'react'
import { useAuth } from '../components/context/AuthContext';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useAuth();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter()
  const {user} = useAuth();
  useEffect(() => {
    if(user){
      router.push('/')
    }
  }, [user, router])
  

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setIsSubmitting(true);
    setError('');
    fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
     .then((response) => response.json())
     .then((data) => {
        login(data)
        router.push('/')
        
      })
  };
  return (
    <div className="max-w-md mx-auto p-4 bg-gray-800 text-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-purple-500 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:border-purple-600"
            placeholder="Enter your email"
            title="Enter a valid email address"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="mt-1 block w-full px-4 py-2 border border-purple-500 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:border-purple-600"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300"
        >
          {isSubmitting ? 'Submitting...' : 'Login'}
        </button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-gray-700 ">
          Don't have an account?
          <Link className="text-purple-600 hover:underline" href="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
