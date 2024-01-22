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
  $("#SEC-6").fadeOut()
  $("#footer").fadeOut()

})
// This Close the View More
$(".View-Back").on('click', () => {
  $("#SEC-4-View-More").fadeOut()
  $("#SEC-4").fadeOut()
  $("#SEC-2").fadeIn()
  $("#SEC-3").fadeIn()
  $("#SEC-5").fadeIn()
  $("#footer").fadeIn()
})
var query = `
query ($page: Int, $perPage: Int, $search: String) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
      currentPage
      lastPage
      hasNextPage
      perPage

      }
      media(search: $search, type: ANIME , sort: TRENDING_DESC) {
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

var variables = {
  id: 15125,
  page: 1,
  perPage: 10
}

let allCoverImages = [];
let allNames = [];
let allSeason = [];
let allYear = [];
let allStatus = [];
let allDescription = [];
let allGen = [];
let allAvg = [];

let itemCount = 0; // Initialize the count of items (To Remove the Animation)


// Start Fetching the Api Data
function View(variables) {
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

  Adding_Holder();// Calling the Sekeleton Container Funcation


  api.then((req) => req.json())
    .then((res) => {
      let Data = res.data.Page.media

      Data.map(items => {

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


        // Here Adding the All thiing in there Arrays
        allSeason.push(season);
        allYear.push(Year)
        allStatus.push(status)
        allDescription.push(des)
        allGen.push(gen)
        allAvg.push(avg)
        // console.log(allSeason)

      })





      // FlatMap Area (STARTING)
      const newCoverImages = Data.flatMap(item => item.coverImage.extraLarge);
      allCoverImages = allCoverImages.concat(newCoverImages);
      // console.log('Updated Image:', allCoverImages);

      const AnimeName = Data.flatMap(item => item.title.english);
      allNames = allNames.concat(AnimeName);
      // console.log('Updated Name:', allNames);



      // Defining Variable (START)
      const divElements = document.querySelectorAll(".IMG_2");
      const AnimeHeadlines = document.querySelectorAll(".Anime-Name-Wapper");
      const All_Card_Content = document.querySelectorAll(".card__content");


      function replaceStringIfKeywordMatched(allStatus, keyword, replacement) {
        for (let i = 0; i < allStatus.length; i++) {
          if (allStatus[i].includes(keyword)) {
            allStatus[i] = allStatus[i].replace(keyword, replacement);
          }
        }
      }

      // Example usage:
      let keywordToMatch = "NOT_YET_RELEASED";
      let replacementString = "Not Released";

      replaceStringIfKeywordMatched(allStatus, keywordToMatch, replacementString);

      // This Function Update the Element by sending the Data to Foreach
      function UpdateTheElement(divElement, index) {
        const imageUrl = allCoverImages[index];
        const imgElement = divElement.querySelector("img[data-pic]");

        let Description_Removed_Tag = allDescription.map(str => str.replace(/<br>|<i>/g, '')); // This will remove any <br> tag or <i> tag.

        // Card Name Headline
        const headline = AnimeHeadlines[index]; // THE MAIN NAME variable
        const Card = All_Card_Content[index]; // This Provide Variable to all content related

        // Card Main Name
        const Name = allNames[index];
        const h1Element = headline.querySelector("h2[data-name]");

        // Card Inside Headline Name (On Hover)
        const Card_Name = allNames[index];
        const p_Card_H1 = Card.querySelector("p[data-Card-Headline]");

        // Card Season
        const Winter = allSeason[index];
        const span_Season = Card.querySelector(" span[data-Season]");

        // Card Year
        const Year = allYear[index]
        const span_Year = Card.querySelector("span[data-Year]");

        // Card Status
        const Status = allStatus[index]
        const span_Status = Card.querySelector("span[data-status]")

        // Card Description
        const description = Description_Removed_Tag[index]
        const p_description = Card.querySelector("p[data-des]")

        // Card Genres
        const genres = allGen[index]
        const p_genres = Card.querySelector("span[data-gen]")

        // Card Avg Score
        const Avg = allAvg[index]
        const span_Avg = Card.querySelector("span[data-avg]")


        setTimeout(() => {
          divElement.classList.add('fadeIn');
          imgElement.src = imageUrl;
          h1Element.textContent = Name;
          p_Card_H1.innerHTML = Card_Name;
          span_Season.textContent = Winter;
          span_Year.textContent = Year;
          span_Status.textContent = Status
          p_description.textContent = description
          p_genres.textContent = genres
          span_Avg.innerHTML = Avg
        }, 1000);

      }

      // This Data Content by Data gettting for Function above
      divElements.forEach((divElement, index) => {
        UpdateTheElement(divElement, index)
      });

      removeSkeleton() // To Remove the Skeleton Loading Animation

    })

    .catch((error) => {
      console.error('Error:', error);
      alert("API is overloaded, Please Wait ")
    });
  

  function removeSkeleton() {
    // Remove the 'Skeleton' class from existing elements
    const existingSkeletonElements = document.querySelectorAll(".IMG_2, .Anime-Name-Wapper");
    setTimeout(() => {
      existingSkeletonElements.forEach((element) => {
        element.classList.remove("Skeleton");
      });
    }, 2000);

  }
}

//  Check if the scroll event listener is added or not
let isScrollListenerAdded_ViewMore = true;
// Get a reference to the target element you want to observe
const targetElement = document.getElementById('SEC-4');

// This checks if elements is visible or not.
function handleVisibility(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {

      // Adding the scroll event listener 
      if (!isScrollListenerAdded_ViewMore) {
        window.addEventListener('scroll', isAtBottom);
        isScrollListenerAdded_ViewMore = true;
      }

    }
    else {
      // if target element is not visible & Remove the scroll event listener
      window.removeEventListener('scroll', isAtBottom);
      isScrollListenerAdded_ViewMore = false;
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
    View(variables);
  }

}


function Adding_Holder() {
  for (let i = 0; i < 10; i++) {
    let container = ` 
      <div id="test" class="Holder card" data-aos="zoom-in">
        <div class="card__content">
          <p class="card__title" data-Card-Headline="YourMainName"></p>
          <p class="card__description" data-des = "YourDescription"></p>
          <p class="card__Status extra1 ALL"><b>Status:</b> <span data-status = "HereStatus"></span> , <span data-Season = "HereSeason"></span>  <span data-Year = "Year"></span></p>
          <p class="card__Gen extra2 ALL" > <b>Genre:</b> <span data-gen = " Yourgen "> </span> </p>
          <p class="card__Popularity extra3 ALL"><b>Popularity:</b> <span data-avg ="Youravg"></span>% &#128516 </p>
        </div>
        <div id="test1" class="IMGholder IMG_2 Skeleton" >
          <img class="AllImg" src=""  data-pic> 
        </div>
        <div id="Anime-Name-Wapper" class="Skeleton Anime-Name-Wapper">
        <h2 class="Anime-Headline" data-name="YourDataNameHere">  </h2>
        </div>
      </div>`;

    // Added the Api Data to HTML
    document.getElementById("Row-3").innerHTML += container;
  }
}





