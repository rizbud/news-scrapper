export const getListTitle = selector => {
  return selector.find('article[class="simple-post simple-big clearfix"] > header > h3 > a').text()
}

export const getInfo = selector => {
  const path = selector.find('article > header > h3 > a').attr('href').replace('https://www.antaranews.com', '').split('?utm_source')[0]
  const tag = path.split('/')[1]
  const id = path.split('/')[2]

  return {
    path,
    tag,
    article_id: id
  }
}

export const getListThumb = selector => {
  return selector.find('article[class="simple-post simple-big clearfix"] > div[class="simple-thumb"] > a > picture > img').attr('data-src')
}

export const getListCategory = selector => {
  return selector.find('article[class="simple-post simple-big clearfix"] > header > p[class="simple-share"] > a').text()
}

export const getDate = selector => {
  return String(selector.find('header > p[class="simple-share"] > span').text()).substr(1)
}

export const getArticleTitle = selector => {
  return selector.find('header > h1').text()
}

export const getArticleThumb = selector => {
  const url = selector.find('header > figure > picture > img').attr('data-src')
  const temp_caption = selector.find('header > div[class="wp-caption"] > p[class="wp-caption-text"]').text()
  const caption = temp_caption.split(' ANTARA')[0]

  return {
    url,
    caption
  }
}

export const getArticleDetail = selector => {
  selector.find('p[class="text-muted small mt10"]').remove()
  const article = selector.find('div[class="post-content clearfix"]').text()
  const final = article.split('(ANTARA) - ')[1]

  return final.split('\n\t\t\t\t')[0]
}

export const getArticleTags = ($, selector) => {
  const wrapper = selector.find('footer > div[class="tags-wrapper"] > ul > li')
  const arr = Array.from(wrapper).splice(1)
  const tags = arr?.map(el => {
    const data = $(el)

    return data.find('li > a').text()
  })

  return tags
}

export const getRelatedArticles = $ => {
  const wrapper = $('body').find('div[id="main"] > div[id="main-container"] > div[class="main-content mag-content clearfix"] > div[class="row blog-content"] > div[class="col-md-8"] > div[class="related-posts clearfix"] > div[class="row"] > div')

  const articles = Array.from(wrapper).map(el => {
    const data = $(el)
    
    return {
      title: data.find('div[class="col-md-3"] > article > header > h3 > a').text(),
      thumbnail: data.find('div[class="col-md-3"] > article > a > picture > img').attr('data-src'),
      info: getInfo(data)
    }
  })

  return articles
}
