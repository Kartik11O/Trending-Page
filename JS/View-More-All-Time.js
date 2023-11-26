import { query4 , variables  } from "/componentss/Api.js";
//  Fetching form Components (TYPE ANIME)



// This Show the View More
$("#Color_B").on('click', () => {
  $("#SEC-5-View-2").fadeIn()
  $("#SEC-5-View-btn-2").fadeIn()
  $("#SEC-5-View-btn-2").css({
    display: 'flex'
  })
  $("#SEC-5-View-2").css({
    display: 'flex'
  })
  $("#SEC-2").fadeOut()
  $("#SEC-3").fadeOut()
  $("#SEC-5").fadeOut()

})
// This Close the View More
$("#View-Back-Time").on('click', () => {
  $("#SEC-5-View-2").fadeOut()
  $("#SEC-5-View-btn-2").fadeOut()
  $("#SEC-2").fadeIn()
  $("#SEC-3").fadeIn()
  $("#SEC-5").fadeIn()
})


// Start Fetching the Api Data
function Time(_variables) {
  const api = fetch(`https://graphql.anilist.co`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query: query4,
      variables: variables,
      Media: {
        Type: 'Anime'
      }
    })
  })



  api.then((req) => req.json())
    .then((res) => {
      let Data = res.data.Page.media

      // Here Maped the Data
      Data.map((items) => {
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
        let container = ` 
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
        document.getElementById("Row-8").innerHTML += container

      })
    })

}


// Get a reference to the target element you want to observe
const targetElement = document.getElementById('SEC-5-View-2');

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
    $(".View__More-Container").css({
      marginBottom: '5rem'
    })
    variables.page++;
    Time(variables);
    console.log("calling")

  }
}





Time(variables);
