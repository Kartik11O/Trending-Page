// import { query, variables } from "../componentss/Api.js";
//  Fetching form Components (TYPE ANIME)



// This Show the View More
$("#trending").on('click', () => {
  $("#SEC-4-View-More").fadeIn()
  $("#SEC-4").fadeIn()
  $("#SEC-4").css({
    display: 'flex'
  })
  $("#SEC-4-View-More").css({
    display: 'flex'
  })
  $("#SEC-2").fadeOut()
  $("#SEC-3").fadeOut()
  $("#SEC-5").fadeOut()

})
// This Close the View More
$(".View-Back").on('click', () => {
  $("#SEC-4-View-More").fadeOut()
  $("#SEC-4").fadeOut()
  $("#SEC-2").fadeIn()
  $("#SEC-3").fadeIn()
  $("#SEC-5").fadeIn()
})


// Start Fetching the Api Data
function View(_variables) {
  const api = fetch(`https://graphql.anilist.co`, {
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
  // Adding_Holder()





  api.then((req) => req.json())
    .then((res) => {
      let Data = res.data.Page.media
      console.log(Data)
      Data.map(items => {
        // let Poster_Anime = res.data.Page.media.coverImage.extraLarge
        let Poster_Anime = items.coverImage.extraLarge
        let Name_AnimeE = items.title.english
        // let Photos = [Poster_Anime]
        // console.log(Photos)    
        let array = ['https://i.pinimg.com/564x/f4/f9/c3/f4f9c3fecddc0937a738f64d632107b8.jpg',
        'https://i.pinimg.com/564x/7c/5e/1e/7c5e1e2d96ce1dd6aaafe6e926031a48.jpg', 
        'https://i.pinimg.com/736x/2f/5b/7b/2f5b7b1c97b7bcb5a073f3cf8f5d9a96.jpg', 
        'https://i.pinimg.com/564x/f6/13/b1/f613b10a22a2d162ed046402e8cb1213.jpg', 
        'https://i.pinimg.com/564x/70/d5/83/70d5839175c450635d360e07ad1629ac.jpg', 
        'https://i.pinimg.com/564x/f4/f9/c3/f4f9c3fecddc0937a738f64d632107b8.jpg', 
        'https://i.pinimg.com/564x/f4/f9/c3/f4f9c3fecddc0937a738f64d632107b8.jpg', 
      ]
      // let names = ['raghav','binu']
    
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
        
        let Pic_Container = ` 
      <div class="Holder card" data-aos="zoom-in">
      <div class="card__content">
      <p class="card__title">${ Name_AnimeE || Name_Anime}</p>
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
       document.getElementById("Row-3").innerHTML += Pic_Container

        let divElement = document.querySelectorAll(".IMG_2")
        // console.log(divElement)
        divElement.forEach((divElement, index ) => {
          // Get the corresponding image URL based on index (assuming order matches)
          const imageUrl =  array[index];
      
          // Set the background image of the div
          // divElement.style.backgroundImage = `url('${imageUrl}')`;
      
          // Get the img element inside the div
          const imgElement = divElement.querySelector("img[data-pic]");
          console.log(imgElement)
          // Set the src attribute of the img element
          imgElement.src = imageUrl;
        });
      //   Photos.forEach(el6 =>{
      //     $(".IMG_2").prepend('<img class="imageClass" src='+ el6 + '>')
      // })

      
      })


    })






}


// Get a reference to the target element you want to observe
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

View(variables);


function Adding_Holder() {
  for (let i = 0; i < 10; i++) {

    let container = ` 
    <div id="test" class="Holder card" data-aos="zoom-in">
    <div class="card__content">
    <p class="card__title">{Name_AnimeE || Name_Anime}</p>
    <p class="card__description">{des}</p>
    <p class="card__Status extra1 ALL"><b>Status:</b> {status} , {season} {Year}</p>
    <p class="card__Gen extra2 ALL"><b>Genre:</b> {gen[1] || gen[0] || gen[2] || gen[3]}, {gen[0]}, {gen[2]} </p>
    <p class="card__Popularity extra3 ALL"><b>Popularity:</b> {avg} &#128516 </p>

  </div>
  <div id="test1"  class="IMGholder IMG_2 Skeleton" style="background-image: url();">
  <img class="adding" src="" alt="" data-pic> 
  </div>

  <div id="Anime-Name-Wapper" class="Skeleton">
  <h2 class="Anime-Headline">{Name_AnimeE || Name_Anime}</h2>
</div>
  </div>
  
     `
    // Added the Api Data to HTML
    document.getElementById("Row-3").innerHTML += container
  }
}


// let Pic_Container = `
// <div class="Holder card" data-aos="zoom-in">
// <div class="card__content">
// <p class="card__title">${ Name_AnimeE || Name_Anime}</p>
// <p class="card__description">${des}</p>
// <p class="card__Status extra1 ALL"><b>Status:</b> ${status} , ${season} ${Year}</p>
// <p class="card__Gen extra2 ALL"><b>Genre:</b> ${gen[1] || gen[0] || gen[2] || gen[3]}, ${gen[0]}, ${gen[2]} </p>
// <p class="card__Popularity extra3 ALL"><b>Popularity:</b> ${avg} &#128516 </p>

// </div>
// <div class="IMGholder" style="background-image: url(${Poster_Anime});">
// </div>

// <div id="Anime-Name-Wapper">
// <h2 class="Anime-Headline">${Name_AnimeE || Name_Anime}</h2>
// </div>


// </div>

// `  