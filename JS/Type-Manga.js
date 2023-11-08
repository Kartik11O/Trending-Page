var query = `
query ($page: Int, $perPage: Int, $search: String) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
      }
      media(search: $search, type: MANGA , sort: TRENDING_DESC) {
        id
        
        title {
          romaji
          english
          native
        }
        
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
      }
    }
  }
`
var variables = {
  id: 15125,
  page: 1,
  perPage: 10
};

// Start Fetching the Api Data
let Manga_List = fetch('https://graphql.anilist.co', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query: query,
    variables: variables,
    Media: {
      Type: 'Anime'
    }
  })

})

Manga_List.then((Data_M) => Data_M.json())
  .then((Manga) => {
    let ML = Manga.data.Page.media

    // Here Maped the Data
    ML.map((items2) => {
      let Poster_Manga = items2.coverImage.extraLarge
      let Manga_Name = items2.title.romaji
      let gen_manga = items2.genres

      // Here API Data make design
      let Container_Manga = `
            <div class="Holder" data-aos="zoom-in">>
            <div class="IMGholder" style="background-image: url(${Poster_Manga});"></div>
            <h2 class="Anime-Headline">${Manga_Name}</h2>
            <span class="Anime-GEN">${gen_manga[0]}</span>
            <span class="Anime-GEN">${gen_manga[1]}</span>
            <span class="Anime-GEN">${gen_manga[2]}</span>
          </div>

        
                    `
      // Added the Api Data to HTML
      document.getElementById("Row-2").innerHTML += Container_Manga
    })
  })


