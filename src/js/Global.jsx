/**
 * 全局静态变量
 */

const APPLICATION_ID = 'cb3ba145277bf36c0e899c432cc6cce7';
const REST_API_KEY = '4962df6128294bb610ccb5d8307638d9';

const BOOK = 'book';
const MUSIC = 'music';
const FILM = 'film';
const BOOK_CATEGORY = [
  { name: '童话', category: 'fairy_tale', baseURL: 'https://api.douban.com/v2/book/search?tag=童话&count=5&' },
  { name: '小说', category: 'novel', baseURL: 'https://api.douban.com/v2/book/search?tag=小说&count=5&' },
  { name: '寓言神话', category: 'fable_myth', baseURL: 'https://api.douban.com/v2/book/search?tag=寓言神话&count=5&' },
  { name: '散文诗歌', category: 'prose_poetry', baseURL: 'https://api.douban.com/v2/book/search?tag=散文诗歌&count=5&' },
  { name: '名人传记', category: 'biography', baseURL: 'https://api.douban.com/v2/book/search?tag=名人传记&count=5&' },
]
const MUSIC_CATEGORY = [
  { name: '周杰伦', category: 'Jay_Chou', baseURL: 'https://api.douban.com/v2/music/search?tag=周杰伦&count=5&' },
  { name: '陈奕迅', category: 'Eason_Chan', baseURL: 'https://api.douban.com/v2/music/search?tag=陈奕迅&count=5&' },
  { name: '薛之谦', category: 'Joker_Xue', baseURL: 'https://api.douban.com/v2/music/search?tag=薛之谦&count=5&' },
  { name: '容祖儿', category: 'Joey_Yung', baseURL: 'https://api.douban.com/v2/music/search?tag=容祖儿&count=5&' },
  { name: '杨千嬅', category: 'Miriam_Yeung', baseURL: 'https://api.douban.com/v2/music/search?tag=杨千嬅&count=5&' },
]
const FILM_CATEGORY = [
  { name: '正在热映', category: 'in_theaters', baseURL: 'https://api.douban.com/v2/movie/in_theaters?count=5&' },
  { name: '即将上映', category: 'coming_soon', baseURL: 'https://api.douban.com/v2/movie/coming_soon?count=5&' },
  { name: 'TOP250', category: 'top250', baseURL: 'https://api.douban.com/v2/movie/top250?count=5&' },
]

const BOOK_DETAILS_BASE_URL = 'https://api.douban.com/v2/book/';
const MUSIC_DETAILS_BASE_URL = 'https://api.douban.com/v2/music/';
const FILM_DETAILS_BASE_URL = 'https://api.douban.com/v2/movie/subject/';

const BOOK_SEARCH_BASE_URL = 'https://api.douban.com/v2/book/search';
const MUSIC_SEARCH_BASE_URL = 'https://api.douban.com/v2/music/search';
const FILM_SEARCH_BASE_URL = 'https://api.douban.com/v2/movie/search';

const Global = { 
  APPLICATION_ID,
  REST_API_KEY,
  BOOK,
  MUSIC,
  FILM,
  BOOK_CATEGORY,
  MUSIC_CATEGORY,
  FILM_CATEGORY,
  BOOK_DETAILS_BASE_URL,
  MUSIC_DETAILS_BASE_URL,
  FILM_DETAILS_BASE_URL,
  BOOK_SEARCH_BASE_URL,
  MUSIC_SEARCH_BASE_URL,
  FILM_SEARCH_BASE_URL,
}

export default Global;