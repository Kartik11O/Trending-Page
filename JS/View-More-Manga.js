import { queryM, variables } from "../componentss/Api.js";
//  Fetching form Components (TYPE ANIME)


$("#Color_P").on('click', () => {
  $("#SEC-3-View-btn").fadeIn()
  $("#SEC-3-View").css({
    display: 'flex'
  })

  $("#SEC-3-View-btn").css({
    display: 'flex'
  })

  $("#SEC-2").fadeOut()
  $("#SEC-3").fadeOut()
  $("#SEC-5").fadeOut()
  $("#btn-Wapper").fadeOut()
  $("#footer").fadeOut()
})


$("#View-Back-Manga").on('click', () => {
  $("#SEC-3-View").fadeOut()
  $("#SEC-3-View-btn").fadeOut()
  $("#SEC-2").fadeIn()
  $("#SEC-3").fadeIn()
  $("#SEC-5").fadeIn()
  $("#btn-Wapper").fadeIn()
  $("#footer").fadeIn()
})

// Array of Manga Content
let allCoverImages_Manga = [];
let allNames_Manga = [];
let allSeason_Manga = [];
let allYear_Manga = [];
let allStatus_Manga = [];
let allDescription_Manga = [];
let allGen_Manga = [];
let allAvg_Manga = [];

function Manga(variables) {
  const api = fetch(`https://graphql.anilist.co`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query: queryM,
      variables: variables,
      Media: {
        Type: 'Anime'
      }
    })
  })

  Adding_Holder_Manga()

  api.then((req) => req.json())
    .then((res) => {
      let Data = res.data.Page.media

      // Here Maped the Data
      Data.map(items => {
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


        allSeason_Manga.push(season);
        allYear_Manga.push(Year)
        allStatus_Manga.push(status)
        allDescription_Manga.push(des)
        allGen_Manga.push(gen)
        allAvg_Manga.push(avg)

      })

      // FlatMap Area (STARTING)
      let newCoverImages_Manga = Data.flatMap(item => item.coverImage.extraLarge);
      allCoverImages_Manga = allCoverImages_Manga.concat(newCoverImages_Manga);
      // console.log('Updated Image:', allCoverImages_Manga);

      let AnimeName = Data.flatMap(item => item.title.english);
      allNames_Manga = allNames_Manga.concat(AnimeName);
      // console.log('Updated Name:', allNames);



      // Defining Variable (START)
      let divElements = document.querySelectorAll(".IMG_Manga");
      let AnimeHeadlines = document.querySelectorAll(".Anime-Name-Wapper-Manga");
      let All_Card_Content = document.querySelectorAll(".Manga");






      // This Function Update the Element by sending the Data to Foreach
      function UpdateTheElement_Manga(divElement, index) {
        const imageUrl_Manga = allCoverImages_Manga[index];
        const imgElement_Manga = divElement.querySelector("img[data-pic-Manga]");

        // let Description_Removed_Tag_Manga = allDescription_Manga.map(str => str.replace(/<br>|<i>/g, '')); // This will remove any <br> tag or <i> tag.

        // Card Name Headline
        const headline_Manga = AnimeHeadlines[index]; // THE MAIN NAME variable
        const Card_Manga = All_Card_Content[index]; // This Provide Variable to all content related

        // Card Main Name
        const Name_Manga = allNames_Manga[index];
        const h1Element_Manga = headline_Manga.querySelector("h2[data-name-Manga]");

        // Card Inside Headline Name (On Hover)
        const Card_Name_Manga = allNames_Manga[index];
        const p_Card_H1_Manga = Card_Manga.querySelector("p[data-Card-Headline-Manga]");

        // Card Season
        const Winter_Manga = allSeason_Manga[index];
        const span_Season_Manga = Card_Manga.querySelector(" span[data-Season-Manga]");

        // Card Year
        const Year_Manga = allYear_Manga[index]
        const span_Year_Manga = Card_Manga.querySelector("span[data-Year-Manga]");

        // Card Status
        const Status_Manga = allStatus_Manga[index]
        const span_Status_Manga = Card_Manga.querySelector("span[data-status-Manga]")

        // Card Description
        const description_Manga = allDescription_Manga[index]
        const p_description_Manga = Card_Manga.querySelector("p[data-des-Manga]")


        // Card Genres
        const genres_Manga = allGen_Manga[index]
        const p_genres_Manga = Card_Manga.querySelector("span[data-gen-Manga]")

        // Card Avg Score
        const Avg_Manga = allAvg_Manga[index]
        const span_Avg_Manga = Card_Manga.querySelector("span[data-avg-Manga]")


        setTimeout(() => {
          divElement.classList.add('fadeIn');
          imgElement_Manga.src = imageUrl_Manga;
          h1Element_Manga.textContent = Name_Manga;
          p_Card_H1_Manga.innerHTML = Card_Name_Manga;
          span_Season_Manga.textContent = Winter_Manga;
          span_Year_Manga.textContent = Year_Manga;
          span_Status_Manga.textContent = Status_Manga
          p_description_Manga.textContent = description_Manga
          p_genres_Manga.textContent = genres_Manga
          span_Avg_Manga.innerHTML = Avg_Manga

        }, 1000);
      }

      // This Data Content by Data gettting for Function above
      divElements.forEach((divElement, index) => {
        UpdateTheElement_Manga(divElement, index)
      });

      removeSkeleton() // To Remove the Skeleton Loading Animation

    })

    .catch((error) => {
      console.error('Error:', error);
      alert("API is overloaded, Please Wait ")
    });
  
  function removeSkeleton() {
    // Remove the 'Skeleton' class from existing elements
    const existingSkeletonElements = document.querySelectorAll(".IMG_Manga, .Anime-Name-Wapper-Manga");
    setTimeout(() => {
      existingSkeletonElements.forEach((element) => {
        element.classList.remove("Skeleton");
      });
    }, 1000);

  }

}

//  Check if the scroll event listener is added or not
let isScrollListenerAdded_Manga = true;

// Get a reference to the target element you want to observe
const targetElement = document.getElementById('SEC-3-View');

// This checks if elements is visible or not.
function handleVisibility(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {

      // Adding the scroll event listener 
      if (!isScrollListenerAdded_Manga) {
        window.addEventListener('scroll', isAtBottom);
        isScrollListenerAdded_Manga = true;
      }

    }
    else {
      // if target element is not visible & Remove the scroll event listener
      window.removeEventListener('scroll', isAtBottom);
      isScrollListenerAdded_Manga = false;
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

  // It will run, when there is 2px gap between bottom
  const threshold = 2;

  // Check if the user has reached the bottom
  if (documentHeight - (scrollPosition + windowHeight) <= threshold) {
    // The user has reached the bottom of the window, do something here
    variables.page++;
    Manga(variables);
  }
}

function Adding_Holder_Manga() {
  for (let i = 0; i < 10; i++) {
    let container = ` 
    <div id="test" class="Holder card" data-aos="zoom-in">
    <div class="card__content Manga">
      <p class="card__title" data-Card-Headline-Manga="YourMainName"></p>
      <p class="card__description" data-des-Manga="YourDescriptionn" ></p>
      <p class="card__Status extra1 ALL"><b>Status:</b> <span data-status-Manga="HereStatus"></span> , <span
          data-Season-Manga="HereSeason"></span> <span data-Year-Manga="Year"></span></p>
      <p class="card__Gen extra2 ALL"> <b>Genre:</b> <span data-gen-Manga=" Yourgen "> </span> </p>
      <p class="card__Popularity extra3 ALL"><b>Popularity:</b> <span data-avg-Manga="Youravg"></span>% &#128516 </p>
    </div>
    <div id="test1" class="IMGholder IMG_Manga Skeleton">
      <img class="AllImg" src="" data-pic-Manga>
    </div>
    <div id="Anime-Name-Wapper" class="Skeleton Anime-Name-Wapper-Manga">
      <h2 class="Anime-Headline" data-name-Manga="YourDataNameHere"> </h2>
    </div>
  </div>`

    // Added the Api Data to HTML
    document.getElementById("Row-4").innerHTML += container;
  }
}


