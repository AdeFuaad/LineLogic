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

