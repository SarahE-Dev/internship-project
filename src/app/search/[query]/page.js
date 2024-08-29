'use client'
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
    <div className="max-w-xl mx-auto mt-10 p-6 bg-gradient-to-r from-purple-800 to-blue-800 border  rounded-xl shadow-md relative mb-10 ">
      <h1 className='mb-4'>
      <span className="pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#c640ff] from-35% to-[#4089ff] bg-clip-text text-center text-xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
        Search results for "{query}"
      </span>
      </h1>
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {articles.length === 0 && !loading && <p className="text-gray-500">No articles found.</p>}
      <ul className="space-y-4">
        {articles.map((article) => (
          <li key={article.id} className="p-4 bg-gray-100 border border-gray-300 rounded-md shadow-sm">
            <h2 style={{color: '#4089ff'}} className="text-xl font-semibold mb-2">{article.title}</h2>
            <p className="text-gray-700 mb-2">{article.content.slice(0, 200)}...</p>
            <a href={`/article/${article.id}`} className="text-purple-600 hover:underline">Read more</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default withAuth(page);

