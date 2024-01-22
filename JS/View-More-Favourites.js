import { queryF, variables } from "../componentss/Api.js";
//  Fetching form Components (TYPE ANIME)

// All Time Favourites

// This Show the View More
$("#Color_O").on('click', () => {
  $("#SEC-5-View").fadeIn()
  $("#SEC-5-View-btn").fadeIn()
  $("#SEC-5-View-btn").css({
    display: 'flex'
  })
  $("#SEC-5-View").css({
    display: 'flex'
  })
  $("#SEC-2").fadeOut()
  $("#SEC-3").fadeOut()
  $("#SEC-5").fadeOut()
  $("#footer").fadeOut()

})
// This Close the View More
$("#View-Back-Popular").on('click', () => {
  $("#SEC-5-View").fadeOut()
  $("#SEC-5-View-btn").fadeOut()
  $("#SEC-2").fadeIn()
  $("#SEC-3").fadeIn()
  $("#SEC-5").fadeIn()
  $("#footer").fadeIn()
})

// Array of Manga Content
let allCoverImages_All_Fav = [];
let allNames_All_Fav = [];
let allSeason_All_Fav = [];
let allYear_All_Fav = [];
let allStatus_All_Fav = [];
let allDescription_All_Fav = [];
let allGen_All_Fav = [];
let allAvg_All_Fav = [];


// Start Fetching the Api Data
function Popular(_variables) {
  const api = fetch(`https://graphql.anilist.co`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query: queryF,
      variables: variables,
      Media: {
        Type: 'Anime'
      }
    })
  })

  Adding_Holder_Fav()

  api.then((req) => req.json())
    .then((res) => {
      let Data = res.data.Page.media

      // Here Maped the Data
      Data.map((items) => {
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


        allSeason_All_Fav.push(season);
        allYear_All_Fav.push(Year)
        allStatus_All_Fav.push(status)
        allDescription_All_Fav.push(des)
        allGen_All_Fav.push(gen)
        allAvg_All_Fav.push(avg)

      })

      // FlatMap Area (STARTING)
      let newCoverImages_All_Fav = Data.flatMap(item => item.coverImage.extraLarge);
      allCoverImages_All_Fav = allCoverImages_All_Fav.concat(newCoverImages_All_Fav);
      // console.log('Updated Image:', allCoverImages_Manga);

      let AnimeName = Data.flatMap(item => item.title.english);
      allNames_All_Fav = allNames_All_Fav.concat(AnimeName);
      // console.log('Updated Name:', allNames);

      // Defining Variable (START)
      let divElements = document.querySelectorAll(".IMG_All_Fav");
      let AnimeHeadlines = document.querySelectorAll(".Anime-Name-Wapper-All-Fav");
      let All_Card_Content = document.querySelectorAll(".All_Fav");


      // This Function Update the Element by sending the Data to Foreach
      function UpdateTheElement_All_Fav(divElement, index) {
        const imageUrl_All_Fav = allCoverImages_All_Fav[index];
        const imgElement_All_Fav = divElement.querySelector("img[data-pic-All-Fav]");

        // let Description_Removed_Tag_Manga = allDescription_Manga.map(str => str.replace(/<br>|<i>/g, '')); // This will remove any <br> tag or <i> tag.

        // Card Name Headline
        const headline_All_Fav = AnimeHeadlines[index]; // THE MAIN NAME variable
        const Card_All_Fav = All_Card_Content[index]; // This Provide Variable to all content related

        // Card Main Name
        const Name_All_Fav = allNames_All_Fav[index];
        const h1Element_All_Fav = headline_All_Fav.querySelector("h2[data-name-All-Fav]");

        // Card Inside Headline Name (On Hover)
        const Card_Name_All_Fav = allNames_All_Fav[index];
        const p_Card_H1_All_Fav = Card_All_Fav.querySelector("p[data-Card-Headline-All-Fav]");

        // Card Season
        const Winter_All_Fav = allSeason_All_Fav[index];
        const span_Season_All_Fav = Card_All_Fav.querySelector(" span[data-Season-All-Fav]");

        // Card Year
        const Year_All_Fav = allYear_All_Fav[index]
        const span_Year_All_Fav = Card_All_Fav.querySelector("span[data-Year-All-Fav]");

        // Card Status
        const Status_All_Fav = allStatus_All_Fav[index]
        const span_Status_All_Fav = Card_All_Fav.querySelector("span[data-status-All-Fav]")

        // Card Description
        const description_All_Fav = allDescription_All_Fav[index]
        const p_description_All_Fav = Card_All_Fav.querySelector("p[data-des-All-Fav]")


        // Card Genres
        const genres_All_Fav = allGen_All_Fav[index]
        const p_genres_All_Fav = Card_All_Fav.querySelector("span[data-gen-All-Fav]")

        // Card Avg Score
        const Avg_All_Fav = allAvg_All_Fav[index]
        const span_Avg_All_Fav = Card_All_Fav.querySelector("span[data-avg-All-Fav]")


        setTimeout(() => {
          divElement.classList.add('fadeIn');
          imgElement_All_Fav.src = imageUrl_All_Fav;
          h1Element_All_Fav.textContent = Name_All_Fav;
          p_Card_H1_All_Fav.innerHTML = Card_Name_All_Fav;
          span_Season_All_Fav.textContent = Winter_All_Fav;
          span_Year_All_Fav.textContent = Year_All_Fav;
          span_Status_All_Fav.textContent = Status_All_Fav
          p_description_All_Fav.textContent = description_All_Fav
          p_genres_All_Fav.textContent = genres_All_Fav
          span_Avg_All_Fav.innerHTML = Avg_All_Fav

        }, 1000);
      }

      // This Data Content by Data gettting for Function above
      divElements.forEach((divElement, index) => {
        UpdateTheElement_All_Fav(divElement, index)
      });

      removeSkeleton() // To Remove the Skeleton Loading Animation
    })

    .catch((error) => {
      console.error('Error:', error);
      alert("API is overloaded, Please Wait ")
    });


  function removeSkeleton() {
    // Remove the 'Skeleton' class from existing elements
    const existingSkeletonElements = document.querySelectorAll(".IMG_All_Fav Skeleton, .Anime-Name-Wapper-All-Fav");
    setTimeout(() => {
      existingSkeletonElements.forEach((element) => {
        element.classList.remove("Skeleton");
      });
    }, 1000);

  }

}

//  Check if the scroll event listener is added or not
let isScrollListenerAdded_MoreFav = true;
// Get a reference to the target element you want to observe
const targetElement = document.getElementById('SEC-5-View');

// This checks if elements is visible or not.
function handleVisibility(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {

      // Adding the scroll event listener 
      if (!isScrollListenerAdded_MoreFav) {
        window.addEventListener('scroll', isAtBottom);
        isScrollListenerAdded_MoreFav = true;
      }

    }
    else {
      // if target element is not visible & Remove the scroll event listener
      window.removeEventListener('scroll', isAtBottom);
      isScrollListenerAdded_MoreFav = false;
    }

  })

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

  //It will run, when there is 2px gap between bottom
  const threshold = 2;

  // Check if the user has reached the bottom
  if (documentHeight - (scrollPosition + windowHeight) <= threshold) {
    // The user has reached the bottom of the window, do something here
    $(".View__More-Container").css({
      marginBottom: '5rem'
    })
    variables.page++;
    Popular(variables);
  
  }
}


function Adding_Holder_Fav() {
  for (let i = 0; i < 10; i++) {
    let container = ` 
    <div id="test" class="Holder card" data-aos="zoom-in">
    <div class="card__content All_Fav">
      <p class="card__title" data-Card-Headline-All-Fav="YourMainName"></p>
      <p class="card__description" data-des-All-Fav="YourDescriptionn" ></p>
      <p class="card__Status extra1 ALL"><b>Status:</b> <span data-status-All-Fav="HereStatus"></span> , <span
          data-Season-All-Fav="HereSeason"></span> <span data-Year-All-Fav="Year"></span></p>
      <p class="card__Gen extra2 ALL"> <b>Genre:</b> <span data-gen-All-Fav=" Yourgen "> </span> </p>
      <p class="card__Popularity extra3 ALL"><b>Popularity:</b> <span data-avg-All-Fav="Youravg"></span>% &#128516 </p>
    </div>
    <div id="test1" class="IMGholder IMG_All_Fav Skeleton">
      <img class="AllImg" src="" data-pic-All-Fav>
    </div>
    <div id="Anime-Name-Wapper" class="Skeleton Anime-Name-Wapper-All-Fav">
      <h2 class="Anime-Headline" data-name-All-Fav="YourDataNameHere"> </h2>
    </div>
  </div>`

    // Added the Api Data to HTML
    document.getElementById("Row-7").innerHTML += container;
  }
}



