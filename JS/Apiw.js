// export {query , variables};
// export {query2};
// export {query3};
// export {query4};
export {variables_S}
// export {variables_5}
// // POPULARITY_DESC
// // This One Fetch Anime Type
// var query = `
// query ($page: Int, $perPage: Int, $search: String) {
//     Page(page: $page, perPage: $perPage) {
//       pageInfo {
//         total
//       currentPage
//       lastPage
//       hasNextPage
//       perPage

//       }
//       media(search: $search, type: ANIME , sort: TRENDING_DESC) {
//         id
        
//         title {
//           romaji
//           english
//           native
//         }
//         bannerImage
//         coverImage  {
//             extraLarge
//         }
//        characters {
//           edges {
//             id
//             node {
//               image {
//                 large
//               }
//             }
//           }
//         }
          
//         studios(isMain: true) {
//           nodes {
//             name
//           }
//         }
         
//         startDate {
//             year
//             month
//             day
//         }
//         endDate{
//             year
//             month
//             day 
//         }
//         format
//         trending
//         isAdult
//         type
//         genres
//         episodes
//         duration
//         status
//         popularity
//         averageScore
//         season
//         siteUrl
//         description
//       }
//     }
//   }
// `

// // This one Fetch Manga Type Content (Query)
// var query2 = `
// query ($page: Int, $perPage: Int, $search: String) {
//     Page(page: $page, perPage: $perPage) {
//       pageInfo {
//         total
//       currentPage
//       lastPage
//       hasNextPage
//       perPage

//       }
//       media(search: $search, type: MANGA , sort: TRENDING_DESC) {
//         id
        
//         title {
//           romaji
//           english
//           native
//         }
//         bannerImage
//         coverImage  {
//             extraLarge
//         }
//        characters {
//           edges {
//             id
//             node {
//               image {
//                 large
//               }
//             }
//           }
//         }
          
//         studios(isMain: true) {
//           nodes {
//             name
//           }
//         }
         
//         startDate {
//             year
//             month
//             day
//         }
//         endDate{
//             year
//             month
//             day 
//         }
//         format
//         trending
//         isAdult
//         type
//         genres
//         episodes
//         duration
//         status
//         popularity
//         averageScore
//         season
//         siteUrl
//         description
//       }
//     }
//   }
// `

// // This one Fetch Anime Type Content (Query) - popular this season
// var query3 = `
// query ($page: Int, $perPage: Int, $search: String) {
//     Page(page: $page, perPage: $perPage) {
//       pageInfo {
//         total
//       currentPage
//       lastPage
//       hasNextPage
//       perPage

//       }
//       media(search: $search, type: ANIME , sort: FAVOURITES_DESC) {
//         id
        
//         title {
//           romaji
//           english
//           native
//         }
//         bannerImage
//         coverImage  {
//             extraLarge
//         }
//        characters {
//           edges {
//             id
//             node {
//               image {
//                 large
//               }
//             }
//           }
//         }
          
//         studios(isMain: true) {
//           nodes {
//             name
//           }
//         }
         
//         startDate {
//             year
//             month
//             day
//         }
//         endDate{
//             year
//             month
//             day 
//         }
//         format
//         trending
//         isAdult
//         type
//         genres
//         episodes
//         duration
//         status
//         popularity
//         averageScore
//         season
//         siteUrl
//         description
//       }
//     }
//   }
// `



// // This one Fetch Anime Type Content (Query) - All tiMe popular
// var query4 = `
// query ($page: Int, $perPage: Int, $search: String) {
//     Page(page: $page, perPage: $perPage) {
//       pageInfo {
//         total
//       currentPage
//       lastPage
//       hasNextPage
//       perPage

//       }
//       media(search: $search, type: ANIME , sort: POPULARITY_DESC) {
//         id
        
//         title {
//           romaji
//           english
//           native
//         }
//         bannerImage
//         coverImage  {
//             extraLarge
//         }
//        characters {
//           edges {
//             id
//             node {
//               image {
//                 large
//               }
//             }
//           }
//         }
          
//         studios(isMain: true) {
//           nodes {
//             name
//           }
//         }
         
//         startDate {
//             year
//             month
//             day
//         }
//         endDate{
//             year
//             month
//             day 
//         }
//         format
//         trending
//         isAdult
//         type
//         genres
//         episodes
//         duration
//         status
//         popularity
//         averageScore
//         season
//         siteUrl
//         description
//       }
//     }
//   }
// `


























// // This one Fetch Anime Type Content (Variables - 10)
// var variables = {
//   id: 15125,
//   page: 1,
//   perPage: 10,
// }

// // This one Fetch Anime Type Content (Variables - 5)
// var variables_5 = {
//   id: 15125,
//   page: 1,
//   perPage: 5,
// }


// // This one Fetch Anime Search Content (Variables)
// var variables_S = {
//   search: target,
//   id: 15125,
//   page: 1,
//   perPage: 50
// }
// //////////////////////////////////////////////////

var query = `
query ($page: Int, $perPage: Int, $pageFavorites: Int, $perPageFavorites: Int, $pagePopularity: Int, $perPagePopularity: Int, $pageSearch: Int, $perPageSearch: Int, $searchAnime: String, $searchManga: String, $searchS: String) {
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
  search: Page(page: $pageSearch, perPage: $perPageSearch) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media(search: $searchS, type: ANIME, sort: TRENDING_DESC) {
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
