

// Will Update - M
language = "javascript"


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


var displayRepos = function (data) {
    for (var i = 0; i < 10; i++) {
        RepoTable = $("tbody")

        var RepoName = data.items[i].name
        var RepoOwner = data.items[i].owner.login
        var RepoStar = data.items[i].stargazers_count
        var RepoURL = data.items[i].url

        var RepoListing = $("<tr>")
        RepoListing.addClass("border-b border-gray-200 hover:bg-gray-100")

        var RepoNameEl = $("<td>")
        RepoNameEl.text(RepoName)
        RepoNameEl.addClass("py-3 px-6 text-left")
        RepoListing.append(RepoNameEl)

        var RepoOwnerEl = $("<td>")
        RepoOwnerEl.text(RepoOwner)
        RepoOwnerEl.addClass("py-3 px-6 text-left")
        RepoListing.append(RepoOwnerEl)

        var RepoStarEl = $("<td>")
        RepoStarEl.text(RepoStar)
        RepoStarEl.addClass("py-3 px-6 text-center")
        RepoListing.append(RepoStarEl)

        var RepoURLEl = $("<td>")
        RepoURLEl.addClass("py-3 px-6 text-center")
        var RepoURLButtonEl = $("<button>")
        RepoURLButtonEl.addClass("bg-yellow-200 py-1 px-3 rounded-full text-xs")
        RepoURLButtonEl.text("Visit")
        RepoURLButtonEl.attr("onclick", 'window.open(' + '"' + 'https://github.com/' + RepoOwner + '/' + RepoName + '"' + ')')
        RepoURLEl.append(RepoURLButtonEl)
        RepoListing.append(RepoURLEl)

        RepoTable.append(RepoListing)
    }
};

getTopRepos(language)