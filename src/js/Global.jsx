/**
 * 全局静态变量
 */

const BOOK = 'book';
const MUSIC = 'music';
const FILM = 'film';
const BOOK_CATEGORY = [
  { name: '童话', category: 'fairy_tale', baseURL: 'https://api.douban.com/v2/book/search?q=童话&start=0&count=3&' },
  { name: '小说', category: 'novel', baseURL: 'https://api.douban.com/v2/book/search?q=小说&start=0&count=3&' },
  { name: '寓言神话', category: 'fable_myth', baseURL: 'https://api.douban.com/v2/book/search?q=寓言神话&start=0&count=3&' },
  { name: '散文诗歌', category: 'prose_poetry', baseURL: 'https://api.douban.com/v2/book/search?q=散文诗歌&start=0&count=3&' },
  { name: '名人传记', category: 'biography', baseURL: 'https://api.douban.com/v2/book/search?q=名人传记&start=0&count=3&' },
]
const MUSIC_CATEGORY = [
  { name: '周杰伦', category: 'Jay_Chou', baseURL: 'https://api.douban.com/v2/music/search?tag=周杰伦&start=0&count=3&' },
  { name: '陈奕迅', category: 'Eason_Chan', baseURL: 'https://api.douban.com/v2/music/search?tag=陈奕迅&start=0&count=3&' },
  { name: '薛之谦', category: 'Joker_Xue', baseURL: 'https://api.douban.com/v2/music/search?tag=薛之谦&start=0&count=3&' },
  { name: '容祖儿', category: 'Joey_Yung', baseURL: 'https://api.douban.com/v2/music/search?tag=容祖儿&start=0&count=3&' },
  { name: '杨千嬅', category: 'Miriam_Yeung', baseURL: 'https://api.douban.com/v2/music/search?tag=杨千嬅&start=0&count=3&' },
]
const FILM_CATEGORY = [
  { name: '正在热映', category: 'in_theaters', baseURL: 'https://api.douban.com/v2/movie/in_theaters?start=0&count=3&' },
  { name: '即将上映', category: 'coming_soon', baseURL: 'https://api.douban.com/v2/movie/coming_soon?start=0&count=3&' },
  { name: 'TOP250', category: 'top250', baseURL: 'https://api.douban.com/v2/movie/top250?start=0&count=3&' },
]

const BOOK_DETAILS_BASE_URL = 'https://api.douban.com/v2/book/';
const MUSIC_DETAILS_BASE_URL = 'https://api.douban.com/v2/music/';
const FILM_DETAILS_BASE_URL = 'https://api.douban.com/v2/movie/subject/';

const Global = { 
  BOOK,
  MUSIC,
  FILM,
  BOOK_CATEGORY,
  MUSIC_CATEGORY,
  FILM_CATEGORY,
  BOOK_DETAILS_BASE_URL,
  MUSIC_DETAILS_BASE_URL,
  FILM_DETAILS_BASE_URL,
}

export default Global;