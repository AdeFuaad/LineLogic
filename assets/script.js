//List of Languages in Nav Bar
languageSelectorEL = $("#Language-Selector")

//Saved Videos Button
SavedVideosButtonEl = $("#SavedVideos")

//Repo Table Section
RepoTableEl = $("table")

//Video Section
videoContainer = $("#youtube_container")


//Call these functions when page loads
function init() {
    createTable()
    creatVideoCards()
}


//Saved Video Button
SavedVideosButtonEl.on("click", function () {
    RepoTableEl.addClass("hidden")
    videoContainer.removeClass("hidden")
    displaySAVEDVideos()
})

//Display Saved Videos
var displaySAVEDVideos = function () {

    SavedVideos = localStorage.getItem("SavedVideos")
    SavedVideos = JSON.parse(SavedVideos)
    
    //Update Video Cards info to "Save Slot"
    for (var i = 0; i < 10; i++) {
        videoContainer.children().eq(i).children().eq(0).children().eq(0).text("Save Slot")
        videoContainer.children().eq(i).children().eq(0).children().eq(1).text("Save Slot")
        videoContainer.children().eq(i).children().eq(0).children().eq(2).text("Save Slot")
        videoContainer.children().eq(i).children().eq(0).children().eq(3).addClass("hidden")
    }

    //Update Video Cards with information in local storage
    if (SavedVideos != null) {
        for (var i = 0; i < SavedVideos.Title.length; i++) {

        ytVideoTitle =  SavedVideos.Title[i]
        ytChannelOwner = SavedVideos.Owner[i]
        ytDescription = SavedVideos.Descr[i]
        ytVideoId = SavedVideos.Link[i]

        videoContainer.children().eq(i).children().eq(0).children().eq(0).text(ytVideoTitle)
        videoContainer.children().eq(i).children().eq(0).children().eq(0).attr("onclick",ytVideoId)

        videoContainer.children().eq(i).children().eq(0).children().eq(1).text(ytChannelOwner)
        videoContainer.children().eq(i).children().eq(0).children().eq(2).text(ytDescription)
        }
    }

}

//Select language clicked
languageSelectorEL.on("click", function (event) {
    element = $(event.target)

    //Remove Bold Format from all Nav Menu Options
    languageSelectorEL.children().eq(0).children().eq(0).removeClass("font-bold")
    languageSelectorEL.children().eq(1).children().eq(0).removeClass("font-bold")
    languageSelectorEL.children().eq(2).children().eq(0).removeClass("font-bold")
    languageSelectorEL.children().eq(3).children().eq(0).removeClass("font-bold")
    languageSelectorEL.children().eq(4).children().eq(0).removeClass("font-bold")
    languageSelectorEL.children().eq(5).children().eq(0).removeClass("font-bold")

    //Reveal Table and Video Card Sections
    RepoTableEl.removeClass("hidden")
    videoContainer.removeClass("hidden")

    if (element.is("a")) {
        //Retreive the language picked
        language = element.text()
        //Bold language selected
        element.addClass("font-bold")
        getTopRepos(language)
        getVideos(language)
    }
})

//Trigger save button to put video in local storage
videoContainer.on("click", function (event) {
    element = $(event.target)

    //Check if a saved button was clicked
    if (element.is("button")) {
        element.removeClass("bg-green-200")
        element.text("SAVED")
        element.addClass("bg-red-200")

        SavedVideos = localStorage.getItem("SavedVideos")

        //Retreive data from corresponding video card
        videoTitle = element.siblings().eq(0).text()
        videoLink = element.siblings().eq(0).attr("onclick")
        videoOwner = element.siblings().eq(1).text()
        videoDescr = element.siblings().eq(2).text()

        //Create JSON/Local storage if it does not exist
        if (SavedVideos == null) {
            var SavedVideos = {
                Title: [videoTitle],
                Link: [videoLink],
                Owner: [videoOwner],
                Descr: [videoDescr]
            };
            localStorage.setItem("SavedVideos", JSON.stringify(SavedVideos));
        //Append JSON if already exist if Video is already not saved
        } else {
            SavedVideos = JSON.parse(SavedVideos)

            for (i = 0; i < SavedVideos.Title.length; i++) {
                if (videoTitle == SavedVideos.Title[i]){
                    break
                } 
            }
            if (i >= SavedVideos.Title.length) {
            SavedVideos.Title.push(videoTitle)
            SavedVideos.Link.push(videoLink)
            SavedVideos.Owner.push(videoOwner)
            SavedVideos.Descr.push(videoDescr)
            }
            localStorage.setItem("SavedVideos", JSON.stringify(SavedVideos));
        }

    }
})

//Retreive data from data from GitHub
var getTopRepos = function (language) {
    var apiUrl = 'https://api.github.com/search/repositories?q=' + language + '+is:featured&sort=stars&order=desc';

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
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
            if (response.ok) {
                response.json()
                    .then(function (data) {
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
        var ytVideoId = video[i].id.videoId

        videoContainer.children().eq(i).children().eq(0).children().eq(0).text(ytVideoTitle)
        videoContainer.children().eq(i).children().eq(0).children().eq(0).attr("onclick", 'window.open(' + '"' + 'https://www.youtube.com/watch?v=' + ytVideoId + '"' + ')')

        videoContainer.children().eq(i).children().eq(0).children().eq(1).text(ytChannelOwner)
        videoContainer.children().eq(i).children().eq(0).children().eq(2).text(ytDescription)

        videoContainer.children().eq(i).children().eq(0).children().eq(3).removeClass("hidden")
        videoContainer.children().eq(i).children().eq(0).children().eq(3).addClass("bg-green-200")
        videoContainer.children().eq(i).children().eq(0).children().eq(3).text("save")
        videoContainer.children().eq(i).children().eq(0).children().eq(3).removeClass("bg-red-200")
    }

}

//Create Video Cards
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

