
// For the youtube API
let videosContainer = $("#youtube_container")

//List of Languages in Nav Bar
languageSelectorEL = $("#Language-Selector")

//Saved Videos Button
SavedVideosButtonEl = $("#SavedVideos")

//Repo Table Section
RepoTableEl = $("table")

//Video Section
videoContainer = $("#youtube_container")


//Saved Video Button
SavedVideosButtonEl.on("click", function () {
    RepoTableEl.addClass("hidden")
    videoContainer.addClass("hidden")
})

//Call these functions when page loads
function init() {
    createTable()
    creatVideoCards()
}

//Select language clicked
languageSelectorEL.on("click", function (event) {
    element = $(event.target)

    languageSelectorEL.children().eq(0).children().eq(0).removeClass("font-bold")
    languageSelectorEL.children().eq(1).children().eq(0).removeClass("font-bold")
    languageSelectorEL.children().eq(2).children().eq(0).removeClass("font-bold")

    RepoTableEl.removeClass("hidden")
    videoContainer.removeClass("hidden")

    if (element.is("a")) {
        language = element.text()
        element.addClass("font-bold")
        getTopRepos(language)
        getVideos(language)
    }
})

//Retreive data from data from GitHub
var getTopRepos = function (language) {
    var apiUrl = 'https://api.github.com/search/repositories?q=' + language + '+is:featured&sort=stars&order=desc';

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                //console.log(data)
                displayRepos(data);
            });
        }
    });
};

//Retreive data from data from Youtube
var getVideos = function (language) {
    let apiKey = 'AIzaSyBZqIu_o5Mjz45YHuUESqlCtVR3KL3UfG8'
    let maxResults = 20

    let apiUrl = "https://www.googleapis.com/youtube/v3/search?key=" + apiKey + "&type=video&part=snippet&order=viewCount&maxResults=" + maxResults + "&q=" + "Learn " + language

    fetch(apiUrl)
        .then(function (response) {
            console.log(response)
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        //console.log(data)
                        displayVideos(data)
                    });
            }
        });
}

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
var createTable = function () {
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


//Display youtube videos
var displayVideos = function (data) {
    console.log("DATa IS HERE", data);

    for (var i = 0; i < 10; i++) {
        var video = data.items
        var ytVideoTitle = video[i].snippet.title
        var ytChannelOwner = video[i].snippet.channelTitle
        var ytDescription = video[i].snippet.description
        //var ytVideoImg = video[i].snippet.thumbnails.default.url
        var ytVideoId = video[i].id.videoId

        //thumbnail.attr("src",ytVideoImg)
        //thumbnail.attr("alt","")

        videoContainer.children().eq(i).children().eq(0).children().eq(0).text(ytVideoTitle)
        videoContainer.children().eq(i).children().eq(0).children().eq(0).attr("onclick", 'window.open(' + '"' + 'https://www.youtube.com/watch?v=' + ytVideoId + '"' + ')')

        videoContainer.children().eq(i).children().eq(0).children().eq(1).text(ytChannelOwner)
        videoContainer.children().eq(i).children().eq(0).children().eq(2).text(ytDescription)

    }

}

var creatVideoCards = function () {

    for (var i = 0; i < 10; i++) {

        var videoCard = $("<div>")
        videoCard.addClass("each mb-10 m-2 shadow-lg border-gray-800 bg-gray-100 relative")

        var thumbnail = $("img")
        thumbnail.addClass("w-full")
        videoCard.append(thumbnail)

        var videoDescription = $("<div>")
        videoDescription.addClass("desc p-4 text-gray-800")

        var title = $("<a>")
        title.addClass("title font-bold block cursor-pointer hover:underline")
        videoDescription.append(title)

        var owner = $("<a>")
        owner.addClass("badge bg-indigo-500 text-blue-100 rounded px-1 text-xs font-bold cursor-pointer")
        videoDescription.append(owner)

        var description = $("<span>")
        description.addClass("description text-sm block py-2 border-gray-400 mb-2")
        videoDescription.append(description)

        var saveButton = $("<button>")
        saveButton.addClass("btn btn-outline bg-green-200 py-1 px-3 rounded-full text-xs")
        saveButton.text("save")
        videoDescription.append(saveButton)

        videoCard.append(videoDescription)
        videoContainer.append(videoCard)
    }

}


init()

