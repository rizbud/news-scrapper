import cheerio from 'cheerio'
import axios from 'axios'

// Helper
import {
  getTrendingTitle,
  getTrendingThumb,
  getTrendingPages,
  getTrendingUrl,
} from '../../../helper/merdeka'

export default async (req, res) => {
  if (req.method === 'GET') {
    const { page = 1 } = req.query
    
    try {
      const response = await axios.get(`https://www.merdeka.com/trending/index${page}`)
      const $ = cheerio.load(response.data)
      const recents = $('body').find('div[id="mdk-body"] > div[id="mdk-body-wrap"] > div[id="mdk-content-ben"] > div[id="mdk-content-center"] > div[class="inner-content"] > ul > li')

      const data = recents?.map((index, el) => {
        if (index !== 0) {
          const selector = $(el)

          return {
            title: getTrendingTitle(selector),
            url: getTrendingUrl(selector),
            thumbnail: getTrendingThumb(selector)
          }
        }
      }).get()

      res.status(200).json({
        response: {
          status: 200,
          message: 'OK',
          page: Number(page),
          totalPage: getTrendingPages($)
        },
        data
      })
    }
    catch (err) {
      res.status(500).json({
        response: {
          status: 500,
          message: 'Internal Server Error'
        },
        data: {
          message: 'Internal Server Error',
          failure: err
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
