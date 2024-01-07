function show1({ target }) {
  let query = `
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
  let variables = {
    search: target,
    id: 15125,
    page: 1,
    perPage: 50
  }


  // /search/anime?search=naruto
  const SS = fetch(`https://graphql.anilist.co/search/anime?q=${target.value}`, {
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


  // $(".Skeleton-Search").css({
  //   opacity : '9'
  // })

  Adding_Holder_2()

  console.log(target.value)
  SS.then((reqq) => reqq.json())

    .then((gett) => {
      let details = gett.data.Page.media
      console.log(details)
      setTimeout(() => {
        $(".Show_Containers-Skeleton-remover").css({
          display: 'none'
        })
      
      }, 1000);
     
      details.map((items4) => {
        let imagee = items4.coverImage.extraLarge
        let nameE = items4.title.english
        let namee = items4.title.romaji
        let des = items4.description
        let avg = items4.averageScore
        let status = items4.status
        let ep = items4.episodes
        let day = items4.startDate.day
        let month = items4.startDate.month
        let year = items4.startDate.year
        let eday = items4.endDate.day
        let emonth = items4.endDate.month
        let eyear = items4.endDate.year
        let gen = items4.genres
  
        $('.Show_About').each(function () {
          $(this).html($(this).html().split('<br>')[0]);
        });
     
        let container = `
        <div class="Show_Container" >
        <div id="Show_Img" class="" style=" background-image: url(${imagee});"></div>
        <div id="Show_details">
          <h2 class="Show_Names">${nameE || namee}</h2>
          <p class="Show_About">${des}</p>
          <p class="Show_info"><b>Average Score:</b> ${avg} &#128516</p>
          <p class="Show_info"><b>Status:</b> ${status}</p>
          <p class="Show_info"><b>Episodes:</b> ${ep || "NOT YET RELEASED"}</p>
          <p class="Show_info"><b>Start Date:</b> ${day}-${month}-${year}</p>
          <p class="Show_info"><b>End Date:</b> ${eday}-${emonth}-${eyear}</p>
          <span class="Gen" id="test"> ${gen[0]}</span> 
          <span class="Gen" id="test"> ${gen[1]}</span> 
          <span class="Gen" id="test"> ${gen[2]}</span>
          <span class="Gen" id="test"> ${gen[3]}</span>
          <span class="Gen" id="test"> ${gen[4]}</span>
        </div>
      </div>
    `

        setTimeout(() => {
          
          document.getElementById("Content-Wapperr").innerHTML += container
        }, 1000);

      })


      let col = ['#F277AF', '#2ECFDB', '#FEE561']
      let math = Math.floor(Math.random() * 3)
      console.log(math)
      if (math == 1) {
        $(".Gen").css({
          "background-color": "#F277AF"
        })
      }
      else if (math == 2) {
        $(".Gen").css({
          "background-color": "#2ECFDB"
        })
      }
      else if (math == 0) {
        $(".Gen").css({
          "background-color": "#FEE561"
        })
      }



    })

}


let userInput = document.getElementById("Search_bar")
let userInput2 = document.getElementById("SearchJS")
// let target = userInput.value



userInput.addEventListener('keypress', event => {
  if (event.key === 'Enter') {
    const target = userInput.value;
    $("#SEC-6").fadeIn()
    $("#SEC-1").css({
      display: 'none'
    })

    $("#SEC-2").css({
      display: 'none'
    })

    $("#SEC-3").css({
      display: 'none'
    })
    $("#SEC-4").css({
      display: 'none'
    })
    $("#SEC-5").css({
      display: 'none'
    })


    $(".Show_Container").remove() // This will Remove the element inside

    if (target) {
      show1({ target });
    }
  }
});

userInput2.addEventListener('keypress', event => {
  if (event.key === 'Enter') {
    const target = userInput2.value;

    $(".Show_Container").remove() // This will Remove the element inside

    if (target) {
      show1({ target });
    }
  }


});
function Adding_Holder_2() {
  for (let i = 0; i < 10; i++) {
    let container = ` 
    <div class="Show_Containers-Skeleton-remover"  >
    <div id="Show_Img" class="Skeleton-Search" style=" background-image: url({imagee});"></div>
    <div id="Show_details">
      <h2 class="Show_Names Skeleton-Search" style="color: transparent; border:'none;'">{nameE || namee}</h2>
      <p class="Show_About Skeleton-Search" style="color: transparent;">{des}</p>
      <p class="Show_info Skeleton-Search" style="color: transparent;"><b>Average Score:</b> </p>
      <p class="Show_info Skeleton-Search" style="color: transparent;"><b>Status:</b> </p>
      <p class="Show_info Skeleton-Search" style="color: transparent;"><b>Episodes:</b> </p>
      <p class="Show_info Skeleton-Search" style="color: transparent;"><b>Start Date:</b> </p>
      <p class="Show_info Skeleton-Search" style="color: transparent;"><b>End Date:</b> </p>
      <span class="Gen Skeleton-Search" style="border: none; box-shadow: none; background-color:'none;' color: transparent;" id="test"></span> 
      <span class="Gen Skeleton-Search" style="border: none; box-shadow: none; background-color:'none;' color: transparent;" id="test"></span> 
      <span class="Gen Skeleton-Search" style="border: none; box-shadow: none; background-color:'none;' color: transparent;" id="test"></span>
      <span class="Gen Skeleton-Search" style="border: none; box-shadow: none; background-color:'none;' color: transparent;" id="test"></span>
      <span class="Gen Skeleton-Search" style="border: none; box-shadow: none; background-color:'none;' color: transparent;" id="test"></span>
    </div>
  </div>
 `;

    // Added the Api Data to HTML
    document.getElementById("Content-Wapperr").innerHTML += container;
  }
}



$("#value").on('click', () => {
  $("#SEC-6").fadeOut()

  $("#SEC-1").css({
    display: 'flex'
  })

  $("#SEC-2").css({
    display: 'flex'
  })

  $("#SEC-3").css({
    display: 'flex'
  })
  $("#SEC-5").css({
    display: 'flex'
  })


})























