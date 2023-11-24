import {variables_5 , query4 } from "/components/Api.js";

  
let Popular = fetch(`https://graphql.anilist.co`,{
    method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            query: query4,
            variables: variables_5,
            Media: {
              Type: 'Anime'
            }
          })
    
})

Popular.then((res) => res.json())
    .then((get)=>{
        console.log(get)

    let Popu = get.data.Page.media
        Popu.map((items) =>{
            let Poster_Anime = items.coverImage.extraLarge
            let Name_AnimeE = items.title.english
            let Name_Anime = items.title.romaji
            let Year = items.startDate.year
            let status = items.status
            let season = items.season
            let avg = items.averageScore
            let gen = items.genres
            let des = items.description
      
            // This remove the <Br> in card description
            $('.card__description').each(function () {
              $(this).html($(this).html().split('<br>')[0]);
            });
      
            // Here API Data make design
            let Pic_Container = ` 
            <div class="Holder card" data-aos="zoom-in">
            <div class="card__content">
            <p class="card__title">${Name_AnimeE || Name_Anime}</p>
            <p class="card__description">${des}</p>
            <p class="card__Status extra1 ALL"><b>Status:</b> ${status} , ${season} ${Year}</p>
            <p class="card__Gen extra2 ALL"><b>Genre:</b> ${gen[1] || gen[0] || gen[2] || gen[3]}, ${gen[0]}, ${gen[2]} </p>
            <p class="card__Popularity extra3 ALL"><b>Popularity:</b> ${avg} &#128516 </p>
      
          </div>
          <div class="IMGholder" style="background-image: url(${Poster_Anime});">
          </div>
      
             <h2 class="Anime-Headline">${Name_AnimeE || Name_Anime}</h2>
             <span class="Anime-GEN">${gen[0]}</span>
             <span class="Anime-GEN">${gen[1]}</span>
             <span class="Anime-GEN">${gen[2]}</span>
      
          </div>
          
             `
      
            // Added the Api Data to HTML
            document.getElementById("Row-6").innerHTML += Pic_Container
      
        })



    })