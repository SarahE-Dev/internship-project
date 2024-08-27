'use client'
import {useState} from 'react'
import { useRouter } from 'next/navigation';

export default function page() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title, author, content})
            })
            if (response.ok) {
                console.log('Article created successfully');
                setAuthor('');
                setTitle('');
                setContent('');
                router.push('/articles');
            } else {
                console.log('Failed to create article');
            }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className='flex flex-col items-center justify-center h-screen p-4'>
        <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold text-center mb-6 text-black">New Article</h2>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
        Title
      </label>
      <input
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-600"
        id="title"
        type="text"
        placeholder="Article Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Autho">
        Author
      </label>
      <input
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-600"
        id="author"
        type="text"
        placeholder="Article Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
        Content
      </label>
      <textarea
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-600"
        id="content"
        rows="4"
        placeholder="Article Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
    <div className="flex items-center justify-between">
      <button
        className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Send
      </button>
    </div>
  </form>
    </div>
  )
}
