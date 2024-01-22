import { queryA, variables } from "../componentss/Api.js";
//  Fetching form Components (TYPE ANIME)

// All Time popular

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
  $("#footer").fadeOut()


})
// This Close the View More
$("#View-Back-Time").on('click', () => {
  $("#SEC-5-View-2").fadeOut()
  $("#SEC-5-View-btn-2").fadeOut()
  $("#SEC-2").fadeIn()
  $("#SEC-3").fadeIn()
  $("#SEC-5").fadeIn()
  $("#footer").fadeIn()
})

// Array of Manga Content
let allCoverImages_All_Time = [];
let allNames_All_Time = [];
let allSeason_All_Time = [];
let allYear_All_Time = [];
let allStatus_All_Time = [];
let allDescription_All_Time = [];
let allGen_All_Time = [];
let allAvg_All_Time = [];



// Start Fetching the Api Data
function Time(_variables) {
  const api = fetch(`https://graphql.anilist.co`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query: queryA,
      variables: variables,
      Media: {
        Type: 'Anime'
      }
    })
  })

  Adding_Holder_ALL_Time()

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

        allSeason_All_Time.push(season);
        allYear_All_Time.push(Year)
        allStatus_All_Time.push(status)
        allDescription_All_Time.push(des)
        allGen_All_Time.push(gen)
        allAvg_All_Time.push(avg)

 
      })
      // FlatMap Area (STARTING)
      let newCoverImages_All_Time = Data.flatMap(item => item.coverImage.extraLarge);
      allCoverImages_All_Time = allCoverImages_All_Time.concat(newCoverImages_All_Time);
      // console.log('Updated Image:', allCoverImages_Manga);

      let AnimeName = Data.flatMap(item => item.title.english);
      allNames_All_Time = allNames_All_Time.concat(AnimeName);
      // console.log('Updated Name:', allNames);

      // Defining Variable (START)
      let divElements = document.querySelectorAll(".IMG_All_Time");
      let AnimeHeadlines = document.querySelectorAll(".Anime-Name-Wapper-All-Time");
      let All_Card_Content = document.querySelectorAll(".All_Time");


      // This Function Update the Element by sending the Data to Foreach
      function UpdateTheElement_All_Time(divElement, index) {
        const imageUrl_All_Time = allCoverImages_All_Time[index];
        const imgElement_All_Time = divElement.querySelector("img[data-pic-All-Time]");

        // let Description_Removed_Tag_Manga = allDescription_Manga.map(str => str.replace(/<br>|<i>/g, '')); // This will remove any <br> tag or <i> tag.

        // Card Name Headline
        const headline_All_Time = AnimeHeadlines[index]; // THE MAIN NAME variable
        const Card_All_Time = All_Card_Content[index]; // This Provide Variable to all content related

        // Card Main Name
        const Name_All_Time = allNames_All_Time[index];
        const h1Element_All_Time = headline_All_Time.querySelector("h2[data-name-All-Time]");

        // Card Inside Headline Name (On Hover)
        const Card_Name_All_Time = allNames_All_Time[index];
        const p_Card_H1_All_Time = Card_All_Time.querySelector("p[data-Card-Headline-All-Time]");

        // Card Season
        const Winter_All_Time = allSeason_All_Time[index];
        const span_Season_All_Time = Card_All_Time.querySelector(" span[data-Season-All-Time]");

        // Card Year
        const Year_All_Time = allYear_All_Time[index]
        const span_Year_All_Time = Card_All_Time.querySelector("span[data-Year-All-Time]");

        // Card Status
        const Status_All_Time = allStatus_All_Time[index]
        const span_Status_All_Time = Card_All_Time.querySelector("span[data-status-All-Time]")

        // Card Description
        const description_All_Time = allDescription_All_Time[index]
        const p_description_All_Time = Card_All_Time.querySelector("p[data-des-All-Time]")


        // Card Genres
        const genres_All_Time = allGen_All_Time[index]
        const p_genres_All_Time = Card_All_Time.querySelector("span[data-gen-All-Time]")

        // Card Avg Score
        const Avg_All_Time = allAvg_All_Time[index]
        const span_Avg_All_Time = Card_All_Time.querySelector("span[data-avg-All-Time]")


        setTimeout(() => {
          divElement.classList.add('fadeIn');
          imgElement_All_Time.src = imageUrl_All_Time;
          h1Element_All_Time.textContent = Name_All_Time;
          p_Card_H1_All_Time.innerHTML = Card_Name_All_Time;
          span_Season_All_Time.textContent = Winter_All_Time;
          span_Year_All_Time.textContent = Year_All_Time;
          span_Status_All_Time.textContent = Status_All_Time
          p_description_All_Time.textContent = description_All_Time
          p_genres_All_Time.textContent = genres_All_Time
          span_Avg_All_Time.innerHTML = Avg_All_Time

        }, 1000);
      }

      // This Data Content by Data gettting for Function above
      divElements.forEach((divElement, index) => {
        UpdateTheElement_All_Time(divElement, index)
      });

      removeSkeleton() // To Remove the Skeleton Loading Animation

    })

    .catch((error) => {
      console.error('Error:', error);
      alert("API is overloaded, Please Wait ")
    });


  function removeSkeleton() {
    // Remove the 'Skeleton' class from existing elements
    const existingSkeletonElements = document.querySelectorAll(".IMG_All_Time, .Anime-Name-Wapper-All-Time");
    setTimeout(() => {
      existingSkeletonElements.forEach((element) => {
        element.classList.remove("Skeleton");
      });
    }, 1000);

  }
}

//  Check if the scroll event listener is added or not
let isScrollListenerAdded_AllTime = false;

// Target the element you want to observe
const targetElement = document.getElementById('SEC-5-View-2');

// This checks if elements is visible or not.
function handleVisibility(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {

      // Adding the scroll event listener 
      if (!isScrollListenerAdded_AllTime) {
        window.addEventListener('scroll', isAtBottom);
        isScrollListenerAdded_AllTime = true;
      }

    }
    else {
      // if target element is not visible & Remove the scroll event listener
      window.removeEventListener('scroll', isAtBottom);
      isScrollListenerAdded_AllTime = false;
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
    $(".View__More-Container").css({
      marginBottom: '5rem'
    })
    variables.page++;
    Time(variables);
  }
}


function Adding_Holder_ALL_Time() {
  for (let i = 0; i < 10; i++) {
    let container = ` 
    <div id="test" class="Holder card" data-aos="zoom-in">
  <div class="card__content All_Time">
    <p class="card__title" data-Card-Headline-All-Time="YourMainName"></p>
    <p class="card__description" data-des-All-Time="YourDescriptionn" ></p>
    <p class="card__Status extra1 ALL"><b>Status:</b> <span data-status-All-Time="HereStatus"></span> , <span
        data-Season-All-Time="HereSeason"></span> <span data-Year-All-Time="Year"></span></p>
    <p class="card__Gen extra2 ALL"> <b>Genre:</b> <span data-gen-All-Time=" Yourgen "> </span> </p>
    <p class="card__Popularity extra3 ALL"><b>Popularity:</b> <span data-avg-All-Time="Youravg"></span>% &#128516 </p>
  </div>
  <div id="test1" class="IMGholder IMG_All_Time Skeleton">
    <img class="AllImg" src="" data-pic-All-Time>
  </div>
  <div id="Anime-Name-Wapper" class="Skeleton Anime-Name-Wapper-All-Time">
    <h2 class="Anime-Headline" data-name-All-Time="YourDataNameHere"> </h2>
  </div>
</div>`

    // Added the Api Data to HTML
    document.getElementById("Row-8").innerHTML += container;
  }
}



