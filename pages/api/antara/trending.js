import cheerio from 'cheerio'
import axios from 'axios'

// Helper
import { getListTitle, getInfo, getListThumb, getListCategory, getListTime } from '../../../helper/antara'

export default async (req, res) => {
  if (req.method === 'GET') {
    const { page = 1 } = req.query

    try {
      const response = await axios.get(`https://www.antaranews.com/top-news/${page}`)
      const $ = cheerio.load(response.data)
      const recents = $('body').find('div[id="main"] > div[id="main-container"] > div[class="main-content mag-content clearfix"] > div[class="row"] > div[class="col-md-8"] > article')

      const data = Array.from(recents)?.map((el, index) => {
        const selector = $(el)
        
        return {
          title: getListTitle(selector),
          thumbnail: getListThumb(selector),
          category: getListCategory(selector),
          date: getListTime(selector),
          info: getInfo(selector),
        }
      })
      
      res.status(200).json({
        response: {
          status: 200,
          message: 'OK',
          page: Number(page),
          lastPage: Number(100)
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