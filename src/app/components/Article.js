import Link from "next/link";

export default function Article({article}) {
    const {title, author, content} = article;
    console.log(article);
    const initials = author?.name[0].toUpperCase();
  return (
    <Link href={`/article/${article.id}`} passHref>
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-purple-600">{title}</div>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-purple-800 text-white flex items-center justify-center text-lg font-semibold">
            {initials}
          </div>
          <div className="ml-4">
            <p className="text-gray-700 text-sm">
              {author?.name}
            </p>
          </div>
        </div>
      </div>
    </div>
    </Link>
  )
}
