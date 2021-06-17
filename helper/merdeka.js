export const getTrendingTitle = selector => {
  return selector.find('li > div > div > h3 > a').text()
}

export const getTrendingUrl = selector => {
  const url = selector.find('li > div > div > h3 > a').attr('href')
  return `https://merdeka.com${url}`
}

export const getTrendingThumb = selector => {
  return selector.find('li > div > div > a > img').attr('src')
}

export const getTrendingPages = $ => {
  const pages = $('body').find('div[id="mdk-body"] > div[id="mdk-body-wrap"] > div[id="mdk-content-ben"] > div[id="mdk-content-center"] > div[class="paging-container"] > a[class="link_last"]')
  const lastPage = $(pages[pages.length - 1]).attr('href')
  const final = lastPage.replace('https://www.merdeka.com/trending/index', '').replace('/', '')

  return Number(final)
}
