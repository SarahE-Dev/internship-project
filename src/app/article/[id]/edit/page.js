'use client'
import {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation';

export default function page({params}) {
    const {id} = params;
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();
    useEffect(() => {
      fetch(`/api/articles/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title);
        setAuthor(data.author);
        setContent(data.content);
      })
    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/articles/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title, author, content, id})
            })
            if (response.ok) {
                console.log('Article updated successfully');
                setAuthor('');
                setTitle('');
                setContent('');
                router.push('/articles');
            } else {
                console.log('Failed to update article');
            }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Article</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 text-purple-800"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="author" className="block text-gray-700 font-medium mb-2">Author</label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 text-purple-800"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 font-medium mb-2">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 text-purple-800"
            rows="6"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  )
}
