//List of Languages in Nav Bar
languageSelectorEL = $("#Language-Selector")

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