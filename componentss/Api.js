export { query, variables , queryM , variables_Manga , queryA , queryF};

var query = `
query ($page: Int, $perPage: Int, $pageFavorites: Int, $perPageFavorites: Int, $pagePopularity: Int, $perPagePopularity: Int, $searchAnime: String, $searchManga: String) {
  anime: Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media(search: $searchAnime, type: ANIME, sort: TRENDING_DESC) {
      ...mediaFields
    }
  }

  manga: Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media(search: $searchManga, type: MANGA, sort: TRENDING_DESC) {
      ...mediaFields
    }
  }
  favourites: Page(page: $pageFavorites, perPage: $perPageFavorites) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media(search: $searchManga, type: ANIME, sort: FAVOURITES_DESC) {
      ...mediaFields
    }
  }
  popularity: Page(page: $pagePopularity, perPage: $perPagePopularity) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media(search: $searchManga, type: ANIME, sort: POPULARITY_DESC) {
      ...mediaFields
    }
  }
}

fragment mediaFields on Media {
  id
  title {
    romaji
    english
    native
  }
  bannerImage
  coverImage {
    extraLarge
  }
  characters {
    edges {
      id
      node {
        image {
          large
        }
      }
    }
  }
  studios(isMain: true) {
    nodes {
      name
    }
  }
  startDate {
    year
    month
    day
  }
  endDate {
    year
    month
    day
  }
  format
  trending
  isAdult
  type
  genres
  episodes
  duration
  status
  popularity
  averageScore
  season
  siteUrl
  description
}


`

var variables = {
  page: 1,
  perPage: 10,

  pageFavorites: 1,
  perPageFavorites: 5,

  pagePopularity: 1,
  perPagePopularity: 5,

}

// This one Fetch Manga View Content 
var variables_Manga = {
  id: 15125,
  page: 1,
  perPage: 10
}
// ViewMore_Manga
var queryM = `
query ($page: Int, $perPage: Int, $search: String) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
      currentPage
      lastPage
      hasNextPage
      perPage

      }
      media(search: $search, type: MANGA , sort: TRENDING_DESC) {
        id
        
        title {
          romaji
          english
          native
        }
        bannerImage
        coverImage  {
            extraLarge
        }
       characters {
          edges {
            id
            node {
              image {
                large
              }
            }
          }
        }
          
        studios(isMain: true) {
          nodes {
            name
          }
        }
         
        startDate {
            year
            month
            day
        }
        endDate{
            year
            month
            day 
        }
        format
        trending
        isAdult
        type
        genres
        episodes
        duration
        status
        popularity
        averageScore
        season
        siteUrl
        description
      }
    }
  }
`
//  ViewMore_All Time Propuler
var queryA =`
query ($page: Int, $perPage: Int, $search: String) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
      currentPage
      lastPage
      hasNextPage
      perPage

      }
      media(search: $search, type: ANIME , sort: POPULARITY_DESC) {
        id
        
        title {
          romaji
          english
          native
        }
        bannerImage
        coverImage  {
            extraLarge
        }
       characters {
          edges {
            id
            node {
              image {
                large
              }
            }
          }
        }
          
        studios(isMain: true) {
          nodes {
            name
          }
        }
         
        startDate {
            year
            month
            day
        }
        endDate{
            year
            month
            day 
        }
        format
        trending
        isAdult
        type
        genres
        episodes
        duration
        status
         popularity
         averageScore
       season
       siteUrl
         description
       }
     }
   
    
    }
`
//   ViewMore_All tiMe fAVourites
var queryF = `
query ($page: Int, $perPage: Int, $search: String) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
      currentPage
      lastPage
      hasNextPage
      perPage

      }
      media(search: $search, type: ANIME , sort: FAVOURITES_DESC) {
        id
        
        title {
          romaji
          english
          native
        }
        bannerImage
        coverImage  {
            extraLarge
        }
       characters {
          edges {
            id
            node {
              image {
                large
              }
            }
          }
        }
          
        studios(isMain: true) {
          nodes {
            name
          }
        }
         
        startDate {
            year
            month
            day
        }
        endDate{
            year
            month
            day 
        }
        format
        trending
        isAdult
        type
        genres
        episodes
        duration
        status
        popularity
        averageScore
        season
        siteUrl
        description
      }
    }
  }
`
