import cheerio from 'cheerio'
import axios from 'axios'

// Helper
import {
  getArticleDetail,
  getArticleTitle,
  getArticleThumb,
  getArticleTags,
  getDate,
} from '../../../helper/antara'

export default async (req, res) => {
  if (req.method === 'GET') {
    const { id } = req.query

    if (id) {
      try {
        const response = await axios.get(`https://www.antaranews.com/${id}`)
        const $ = cheerio.load(response.data)
        const article = $('body').find('div[id="main"] > div[id="main-container"] > div[class="main-content mag-content clearfix"] > div[class="row blog-content"] > div[class="col-md-8"] > article')

        res.status(200).json({
          response: {
            status: 200,
            message: 'OK'
          },
          data: {
            title: getArticleTitle(article),
            thumbnail: getArticleThumb(article),
            date: getDate(article),
            detail: getArticleDetail(article),
            tags: getArticleTags($, article)
          }
        })
      }
      catch (err) {
        res.status(404).json({
          response: {
            status: 404,
            message: 'Not Found'
          },
          data: {
            message: 'Not Found',
            failure: `Article id ${id} is not found`
          }
        })
      }
    } else {
      res.status(422).json({
        response: {
          status: 422,
          message: 'Unporcessable Entity'
        },
        data: {
          message: 'Unporcessable Entity',
          failure: 'Article id cannot be blank'
        }
      })
    }
  } else {
    res.status(405).json({
      response: {
        status: 405,
        message: 'Method Not Allowed'
      },
      data: {
        message: 'Method Not Allowed',
        failure: 'Only GET methods are allowed for this endpoint.'
      }
    })
  }
}