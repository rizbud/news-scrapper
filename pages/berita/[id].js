import axios from 'axios'
import Head from 'next/head'

// Components
import Container from '../../components/container'
import Article from '../../components/article'
import Footer from '../../components/footer'

export const getServerSideProps = async ({ req, query, res }) => {
  const { host } = req.headers
  const { id } = query
  const protocol = req.headers['x-forwarded-proto'] || 'http'
  
  try {
    const article = await axios.get(`${protocol}://${host}/api/antara/article?id=${id}`)

    if (!article) {
      res.statusCode = 302
      res.setHeader('Location', '/404')
      return {
        props: {},
      }
    }

    return {
      props: {
        article: article?.data?.data,
      }
    }
  }
  catch {
    res.statusCode = 302
    res.setHeader('Location', '/404')
    return {
      props: {}
    }
  }
}

const Berita = props => {
  const { article } = props

 return (
   <div className="bg-white">
     <Head>
       <title>{article?.title}</title>
     </Head>

     <Container
        main={(
          <>
          <h3 className="font-bold text-3xl py-2 mb-3">{article?.title}</h3>
            <img width="100%" src={article?.thumbnail?.url} className="mb-1" />
            <p className="mb-3 text-gray-500 text-center">{article?.thumbnail?.caption}</p>
            <p>{article?.detail}</p>
          </>
        )}
        sidebar={(
          <>
            <h3 className="font-bold text-xl border-l-4 border-red-500 bg-gray-100 py-2 pl-2 mb-3">Berita Terkait</h3>
            {article?.related_articles?.map((item, index) => <Article key={index} data={item} type='sidebar' />)}
          </>
        )}
      />

      <Footer />
   </div>
 )
}

export default Berita