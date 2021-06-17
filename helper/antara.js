export const getListTitle = selector => {
  return selector.find('article[class="simple-post simple-big clearfix"] > header > h3 > a').text()
}

export const getInfo = selector => {
  const path = selector.find('article[class="simple-post simple-big clearfix"] > header > h3 > a').attr('href').replace('https://www.antaranews.com', '')
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

export const getListTime = selector => {
  return selector.find('article[class="simple-post simple-big clearfix"] > header > p[class="simple-share"] > span').text()
}
