'use client'

import { useEffect, useState } from 'react';
import Article from '../components/Article';
import withAuth from '../components/auth/WithAuth';



function page() {
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        fetch('/api/articles')  
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
          setArticles(data)
        })
      }, [])
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

export default withAuth(page)
