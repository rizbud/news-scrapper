export const getListTitle = selector => {
  return selector.find('article[class="simple-post simple-big clearfix"] > header > h3 > a').text()
}

export const getListUrl = selector => {
  return selector.find('article[class="simple-post simple-big clearfix"] > header > h3 > a').attr('href')
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
