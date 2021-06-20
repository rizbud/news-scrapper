import { memo } from 'react'
import Link from 'next/link'

const Article = props => {
  const { data, type } = props
  const isSidebar = type === 'sidebar'

  return (
    <div className="md:grid md:grid-cols-5 mb-5 flex flex-col justify-center">
      <a href={`/berita/${data?.info?.article_id}`} className="md:col-span-2 md:col-start-1 md:mb-0 mb-2 hover:opacity-80">
        <img src={data?.thumbnail} width="100%" />
      </a>
      <div className="md:col-span-3 md:col-start-3 md:ml-3">
        {!isSidebar && <p className="text-red-400 font-semibold">{data?.category}</p>}
        <p className={`font-bold line-clamp-3 mb-1 text-black hover:text-red-500 ${isSidebar ? 'md:text-lg text-2xl' : 'text-2xl'}`}>
          <Link href={`/berita/${data?.info?.article_id}`}>{data?.title}</Link>
        </p>
        {!isSidebar && <p className="text-gray-400 text-sm">{data?.date}</p>}
      </div>
    </div>
  )
}

export default memo(Article)