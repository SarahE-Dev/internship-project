'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import withAuth from "@/app/components/auth/WithAuth";
function page({params}) {
    const [article, setArticle] = useState({})
    const {id} = params;
    const router = useRouter();
    useEffect(() => {
      fetch(`/api/articles/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setArticle(data)
      })
    }, [])
    
    if((Object.keys(article).length === 0)) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        )
    }
    const getInitials = (author) => {
        const initials = author.split(' ').map((word) => word[0]).join('');
        return initials;
    }
    const handleDelete = async () => {
        try {
          const response = await fetch(`/api/articles`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
          });
          router.push('/articles'); 
        } catch (error) {
          console.error('Error deleting article:', error);
        }
      };
      const handleEdit = () => {
        router.push(`/article/${id}/edit`);
      };
  return (
    <div className="container mx-auto p-6 max-w-lg">
      
      <h1 className="text-3xl font-bold mb-6">{article.title}</h1>
      <div className="text-gray-700 mb-4">
        <p>{article.content}</p>
      </div>
      <div className="flex items-center ">
        <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center text-lg font-semibold">
          {getInitials(article.author.name)}
        </div>
        <div className="ml-4">
          <p className="text-gray-700 text-sm">
            {article.author.name}
          </p>
        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={handleEdit}
          className="mr-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-pink-700 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default withAuth(page)
