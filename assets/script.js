
// For the youtube API
let videosContainer = $("#youtube_container")
let languageSelectorEL = $("#Language-Selector")
let apiKey = 'AIzaSyCmaxei5ur9XOPvmJSRRMgblhyO3Cx4p94'
let maxResults = 10

let getVideos = function (apiKey, maxResults) {
  let apiUrl = ("https://www.googleapis.com/youtube/v3/search?key=" + apiKey + "&type=video&part=snippet&order=viewCount&maxResults=" + maxResults + "order=viewCount" + "&q=" + language,(data) => {
  console.log(data);
  })

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
          response.json()
        .then(function (data) {
            console.log(data)
            displayVideos(data)
          });
      }
  });
}

let displayVideos = function (data) {
  let video = data.items
  for (var i = 0; i < maxResults; i++) {
    // let videosContainer = $("#youtube_container")
    let videosCard = $("#youtube_video_card")
    let videoDetails = $("#videoDetails")

    let ytVideoTitle = video[i].snippet.title
    let ytChannelOwner = video[i].snippet.channelTitle
    let ytDescription = video[i].snippet.description
    let ytVideoImg = video[i].snippet.thumnails.default.url
    let ytVideoId = video[i].snippet.id.videoId

    // video thumbail
    let ytVideoImgEl = $("<img>")
    ytVideoImgEl.text(ytVideoImg)
    ytVideoImgEl.addClass("w-full")
    videosCard.append(ytVideoImgEl)

    // video title
    let ytVideoTitleEl = $ ("<h4>")
    ytVideoTitleEl.text(ytVideoTitle)
    ytVideoTitleEl.addclass("title font-bold block cursor-pointer hover:underline")
    ytVideoTitleEl.target("_new")
    videoDetails.append(ytVideoTitleEl)

    // channel owener name
    let ytChannelOwnerEl = $("<b>")
    ytChannelOwnerEl.text(ytChannelOwner)
    ytChannelOwnerEl.addClass("badge bg-indigo-500 text-blue-100 rounded px-1 text-xs font-bold cursor-pointer")
    ytVideoTitleEl.target("_new")
    videoDetails.append(ytChannelOwnerEl)

    // video description
    let ytDescriptionEl = $("<span>")
    ytDescriptionEl.text(ytDescription)
    ytDescriptionEl.addClass("description text-sm block py-2 border-gray-400 mb-2")
    videoDetails.append(ytDescriptionEl)

    let ytVideoUrlEl = $("<button>")
    ytVideoUrlEl.addClass("badge absolute top-0 right-0 bg-indigo-500 m-1 text-gray-200 p-1 px-2 text-xs font-bold rounded")
    ytVideoUrlEl.text("Watch Here")
    ytVideoUrlEl.attr("onclick", 'window.open(' + '"' + 'https://www.youtube.com/watch?v=' + ytVideoId + '"' + ')')
    videosCard.append(ytVideoUrlEl)
  }
}








// let buttonClickHandler = function (event) {
//   let language = event.target.getAttribute('data-language');

//   if (language) {
//     getVideos(language);

//     youtubeContainerEl.textContent = '';
//   }
// };


// $(document).ready(function(){
//   let apiKey = "AIzaSyCmaxei5ur9XOPvmJSRRMgblhyO3Cx4p94"

//   $("languageButtonsEl").click((e) => {
//       e.preventDefault()

//       let userClick = event.target.getAttribute('data-language');

//       videoOutput(apiKey,userClick,maxResults)
//   })
// })
 
// function videoOutput(apiKey,userClick,maxResults){
//   $.get("https://www.googleapis.com/youtube/v3/search?key=" + apiKey + "&type=video&part=snippet&maxResults=" + maxResults + "&q=" + search,(data) => {
//       console.log(data)

//       let video = ''

//       data.items.forEach(item => {
//           video = `
//           <iframe width="420" height="315" src="http://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
//           `

//           $("#videos").append(video)
//       });
//   })
 
// }


//List of Languages in Nav Bar
languageSelectorEL = $("#Language-Selector")

//Saved Videos Button
SavedVideosButtonEl = $("#SavedVideos")

//Repo Table Section
RepoTableEl = $("table")

//Saved Video Button
SavedVideosButtonEl.on("click", function(){
    RepoTableEl.addClass("hidden")
})

//Call these functions when page loads
function init(){
    createTable()
}

//Select language clicked
languageSelectorEL.on("click", function(event) {
    element = $(event.target)

    languageSelectorEL.children().eq(0).children().eq(0).removeClass("font-bold")
    languageSelectorEL.children().eq(1).children().eq(0).removeClass("font-bold")
    languageSelectorEL.children().eq(2).children().eq(0).removeClass("font-bold")

    RepoTableEl.removeClass("hidden")

    if (element.is("a")) {
        language = element.text()
        element.addClass("font-bold")
        getTopRepos(language)
        
    }
})

//Retreive data from data from GitHub
var getTopRepos = function (language) {
    var apiUrl = 'https://api.github.com/search/repositories?q=' + language + '+is:featured&sort=stars&order=desc';

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data)
                displayRepos(data);
            });
        }
    });
};

//Display GitHub Repos
var displayRepos = function (data) {
    for (var i = 0; i < 10; i++) {
        
        var RepoName = data.items[i].name
        var RepoOwner = data.items[i].owner.login
        var RepoStar = data.items[i].stargazers_count

        RepoTable.children().eq(i).children().eq(0).text(RepoName)
        RepoTable.children().eq(i).children().eq(1).text(RepoOwner)
        RepoTable.children().eq(i).children().eq(2).text(RepoStar)
        RepoTable.children().eq(i).children().eq(3).attr("onclick", 'window.open(' + '"' + 'https://github.com/' + RepoOwner + '/' + RepoName + '"' + ')')
       
    }
};

//Create Table for Repos
var createTable = function() {
    for (var i = 0; i < 10; i++) {
        RepoTable = $("tbody")

        var RepoListing = $("<tr>")
        RepoListing.addClass("border-b border-gray-200 hover:bg-gray-100")

        var RepoNameEl = $("<td>")
        RepoNameEl.addClass("py-3 px-6 text-left")
        RepoListing.append(RepoNameEl)

        var RepoOwnerEl = $("<td>")
        RepoOwnerEl.addClass("py-3 px-6 text-left")
        RepoListing.append(RepoOwnerEl)

        var RepoStarEl = $("<td>")
        RepoStarEl.addClass("py-3 px-6 text-center")
        RepoListing.append(RepoStarEl)

        var RepoURLEl = $("<td>")
        RepoURLEl.addClass("py-3 px-6 text-center")
        var RepoURLButtonEl = $("<button>")
        RepoURLButtonEl.addClass("bg-yellow-200 py-1 px-3 rounded-full text-xs")
        RepoURLButtonEl.text("Visit")
        RepoURLEl.append(RepoURLButtonEl)
        RepoListing.append(RepoURLEl)

        RepoTable.append(RepoListing)
    }
}

init()

