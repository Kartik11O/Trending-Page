// import { query, variables } from "/components/Api.js";
// //  Fetching form Components (TYPE ANIME)

// $("#testP").on("click" , ()=>{
//     console.log("start")

//     // Start Fetching the Api Data
//     let Anime = fetch(`https://graphql.anilist.co`, {
//   method: 'POST',
//   headers: {
//       'Content-Type': 'application/json',
//     'Accept': 'application/json',
//   },
//   body: JSON.stringify({
//       query: query,
//       variables: variables,
//       Media: {
//           Type: 'Anime'
//         }
//     })
// })

// Anime.then((DataReq) => DataReq.json())
// .then((VV) => {
//     let DD = VV.data.Page.media[1]
//     console.log(DD)
//     // Here Maped the Data
//     DD[1].map((items) => {
//         let Poster_Anime = items.coverImage.extraLarge
//         console.log(Poster_Anime)
//         let Name_AnimeE = items.title.english
//         let Name_Anime = items.title.romaji
//         let Year = items.startDate.year
//         let status = items.status
//       let season = items.season
//       let avg = items.averageScore
//       let gen = items.genres
//       let des = items.description

//       // This remove the <Br> in card description
//       $('.card__description').each(function () {
//         $(this).html($(this).html().split('<br>')[0]);
//       });

//       // Here API Data make design
//       let Pic_Container = ` 
//     <div class="IMGholder" style="background-image: url(${Poster_Anime});">
//     </div>

     
    
//        `
       
//       // Added the Api Data to HTML
//       document.getElementById("testP").innerHTML += Pic_Container

//     })

//   })
  
// })