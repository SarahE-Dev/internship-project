'use client'

import { useEffect, useState } from 'react';
import Article from '../components/Article';



export default function page() {
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        fetch('/api/articles')  
        .then((response) => response.json())
        .then((data) => {
          setArticles(data)
        })
      }, [])
  return (
    <div>
        {articles.map((article)=>(
            <Article key={article.id} article={article} />
        ))}
    </div>
  )
}
