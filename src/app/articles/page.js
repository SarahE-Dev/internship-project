'use client'

import { useEffect, useState } from 'react';
import Article from '../components/Article';
import withAuth from '../components/auth/WithAuth';
import { useAuth } from '../components/context/AuthContext';



function ArticlesPage() {
    const [articles, setArticles] = useState([]);
    const { user } = useAuth();
    useEffect(() => {
        fetch(`/api/articles/all/${user.id}`)
        .then((res)=>res.json())
        .then((data)=>{
          setArticles(data)
        })
        .catch((error)=>console.log(error))
      }, [user])
  return (
    <div className='container mx-auto p-6'>
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {articles.map((article)=>(
            <Article key={article.id} article={article} />
        ))}
        </div>
    </div>
  )
}

export default withAuth(ArticlesPage)
