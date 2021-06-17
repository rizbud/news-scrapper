import cheerio from 'cheerio'
import axios from 'axios'

// Helper
import { getListTitle, getListUrl, getListThumb, getListCategory, getListTime } from '../../../helper/antara'

export default async (req, res) => {
  if (req.method === 'GET') {
    const { page = 1 } = req.query

    const response = await axios.get(`https://www.antaranews.com/terkini/${page}`)
    const $ = cheerio.load(response.data)
    const recents = $('body').find('div[id="main"] > div[id="main-container"] > div[class="main-content mag-content clearfix"] > div[class="row"] > div[class="col-md-8"] > article')

    const data = Array.from(recents)?.map((el, index) => {
      const selector = $(el)
      
      return {
        title: getListTitle(selector),
        url: getListUrl(selector),
        thumbnail: getListThumb(selector),
        category: getListCategory(selector),
        time: getListTime(selector)
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