import axios from 'axios'
import Head from 'next/head'

// Components
import Article from '../components/article'
import Footer from '../components/footer'

export const getServerSideProps = async ({ req, query }) => {
  const { host } = req.headers
  const { page = 1 } = query
  const protocol = req.headers['x-forwarded-proto'] || 'http'
  const recents = await axios.get(`${protocol}://${host}/api/antara/recent?page=${page}`)
  const trending = await axios.get(`${protocol}://${host}/api/antara/trending?page=${page}`)

  return {
    props: {
      recents: recents.data,
      trending: trending.data,
    }
  }
}

export default function Home(props) {
  const { recents, trending } = props

  const _nextPage = () => {
    const { page, lastPage } = recents?.response

    return page < lastPage && (
      <a href={`?page=${page + 1}`} className="mx-1">
        <span className="bg-white border border-gray-300 p-2">»</span>
      </a>
    )
  }

  const _prevPage = () => {
    const { page, lastPage } = recents?.response

    return page > 1 && (
      <a href={`?page=${page - 1}`} className="mx-1">
        <span className="bg-white border border-gray-300 p-2">«</span>
      </a>
    )
  }

  return (
    <div className="bg-white">
      <Head>
        <title>Bray News</title>
      </Head>

      <main className="md:grid md:grid-cols-10">
        <div className="md:col-span-6 md:col-start-1 p-5">
          <h3 className="font-bold text-xl border-l-4 border-red-500 pl-2 py-2 mb-3">Berita Terkini</h3>
          {recents?.data?.map((item, index) => <Article key={index} data={item} type='main' />)}
          <div className="flex flex-row justify-center items-center mt-10">
            {_prevPage()}
            <span className="font-regular mx-2 text-black">{recents?.response?.page}</span>
            {_nextPage()}
          </div>
        </div>
        <div className="md:col-span-4 md:col-start-7 p-5">
          <h3 className="font-bold text-xl border-l-4 border-red-500 bg-gray-100 py-2 pl-2 mb-3">#Trending</h3>
          {trending?.data?.map((item, index) => <Article key={index} data={item} type='sidebar' />)}
        </div>
      </main>

      <Footer />
    </div>
  )
}
