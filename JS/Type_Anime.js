import { query, variables } from "../componentss/Api.js"
//  Fetching form Components (TYPE ANIME) Done

// function View(_variables){
// Start Fetching the Api Data
let Anime = fetch(`https://graphql.anilist.co`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query: query,
    variables: variables
  })
})

Anime.then((DataReq) => DataReq.json())
  .then((VV) => {
    console.log(VV)
    let Anime = VV.data.anime.media
    console.log(Anime, 'ANIME')

    let manga = VV.data.manga.media
    console.log(manga, 'MANGA')

    let favourites = VV.data.favourites.media
    console.log(favourites, 'favourites')

    let popularity = VV.data.popularity.media
    console.log(popularity, 'popularity')

    // Here Maped the Data
    
    Anime.map(items => {
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
      let anime = ` 
      <div class="Holder card " data-aos="zoom-in">
      <div class="card__content">
      <p class="card__title">${Name_AnimeE || Name_Anime}</p>
      <p class="card__description">${des}</p>
      <p class="card__Status extra1 ALL"><b>Status:</b> ${status} , ${season} ${Year}</p>
      <p class="card__Gen extra2 ALL"><b>Genre:</b> ${gen[1] || gen[0] || gen[2] || gen[3]}, ${gen[0]}, ${gen[2]} </p>
      <p class="card__Popularity extra3 ALL"><b>Popularity:</b> ${avg} &#128516 </p>

    </div>
    <div class="IMGholder" style="background-image: url(${Poster_Anime});">
    </div>

    <div id="Anime-Name-Wapper">
    <h2 class="Anime-Headline">${Name_AnimeE || Name_Anime}</h2>
  </div>
     

    </div>
    
       `

      // Added the Api Data to HTML
      document.getElementById("Row-1").innerHTML += anime
      document.getElementById("Row-3").innerHTML += anime

    })

    manga.map((items_M) => {
      let Poster_Anime = items_M.coverImage.extraLarge
      let Name_AnimeE = items_M.title.english
      let Name_Anime = items_M.title.romaji
      let Year = items_M.startDate.year
      let status = items_M.status
      let season = items_M.season
      let avg = items_M.averageScore
      let gen = items_M.genres
      let des = items_M.description

      // This remove the <Br> in card description
      $('.card__description').each(function () {
        $(this).html($(this).html().split('<br>')[0]);
      });

      // Here API Data make design
      let manga = ` 
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

<div id="Anime-Name-Wapper">
<h2 class="Anime-Headline">${Name_AnimeE || Name_Anime}</h2>
</div>
 

</div>

   `

      // Added the Api Data to HTML
      document.getElementById("Row-2").innerHTML += manga
    })

    favourites.map((items) => {
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
      let fav = ` 
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

<div id="Anime-Name-Wapper">
<h2 class="Anime-Headline">${Name_AnimeE || Name_Anime}</h2>
</div>
 

</div>

   `

      // Added the Api Data to HTML
      document.getElementById("Row-5").innerHTML += fav

    })

    popularity.map((items) => {
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
      let pov = ` 
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

<div id="Anime-Name-Wapper">
<h2 class="Anime-Headline">${Name_AnimeE || Name_Anime}</h2>
</div>
 

</div>

   `
      // Added the Api Data to HTML
      document.getElementById("Row-6").innerHTML += pov

    })



  })


// }



  const targetElement = document.getElementById('SEC-4');

  // Define the callback function to be executed when the element is visible
  function handleVisibility(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // The target element is fully or partially visible
        // Execute your function here
        isAtBottom();
        window.addEventListener('scroll', isAtBottom);
        // Stop observing if needed
        observer.unobserve(targetElement);
      }
    });
  }
  
  // Create an Intersection Observer
  const observer = new IntersectionObserver(handleVisibility, {
    root: null, // Use the viewport as the root
    rootMargin: '0px', // No margin
    threshold: 0.1, // Trigger when at least 10% of the target is visible
  });
  
  // Start observing the target element
  observer.observe(targetElement);
  
  
  function isAtBottom() {
  
    // Calculate the current scroll position
    const windowHeight = window.innerHeight; // Height of the viewport
    const documentHeight = document.documentElement.scrollHeight; // Total height of the document
    const scrollPosition = window.scrollY; // Current vertical scroll position
  
    // Define a threshold (e.g., 10 pixels) to trigger the action
    const threshold = 2;
  
    // Check if the user has reached the bottom
    if (documentHeight - (scrollPosition + windowHeight) <= threshold) {
      // The user has reached the bottom of the window, do something here
  
      variables.page++;
      View(variables);
      console.log("calling")
  
    }
  }
   


// View(variables);