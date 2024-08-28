'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/app/components/context/AuthContext';
import withAuth from '@/app/components/auth/WithAuth';

const page = ({ params }) => {
  const { query } = params; 
  const { user } = useAuth(); 
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(`/api/search/${user?.id}?query=${encodeURIComponent(query)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchArticles();
    }
  }, [query, user]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {articles.length === 0 && !loading && <p className="text-gray-500">No articles found.</p>}
      <ul className="space-y-4">
        {articles.map((article) => (
          <li key={article.id} className="p-4 bg-gray-100 border border-gray-300 rounded-md shadow-sm">
            <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
            <p className="text-gray-700 mb-2">{article.content.slice(0, 200)}...</p>
            <a href={`/articles/${article.id}`} className="text-purple-600 hover:underline">Read more</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default withAuth(page);

