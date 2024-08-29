'use client'
import {useEffect, useState} from 'react'
import { useAuth } from '../components/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
    const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {login, user} = useAuth();
  const router = useRouter()
  useEffect(() => {
    if(user){
      router.push('/')
    }
  }, [user])
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      setIsSubmitting(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setIsSubmitting(false);
      return;
    }

    fetch('/api/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    })
    .then((response) => response.json())
    .then((data) => {
        login(data)
        setIsSubmitting(false)
        router.push('/')
      })
    .catch((error) => {
        setError(error.message);
        setIsSubmitting(false);
      });
  };
  return (
    <div className="max-w-md mx-auto p-4 bg-gray-800 text-white rounded-lg shadow-md mt-8 mb-8">
    <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full px-4 py-2 border border-purple-500 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:border-purple-600"
          placeholder="Enter your name"
        />
      </div>
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
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={6}
          className="mt-1 block w-full px-4 py-2 border border-purple-500 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:border-purple-600"
          placeholder="Confirm your password"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 px-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300"
      >
        {isSubmitting ? 'Submitting...' : 'Signup'}
      </button>
    </form>
    <div className="mt-6 text-center">
        <p className="text-gray-700">
          Already have an account?{' '}
          <Link href="/login" className="text-purple-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
  </div>
  )
}
