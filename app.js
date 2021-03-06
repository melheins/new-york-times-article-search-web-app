$(document).ready(function () {


    var apiKey = "ac111be824784291ab6b870a1686d63d";

    var searchTerm;

    var numRecords = 10;

    var startYr;

    var endYr;


    $(".btn[type='submit']").click(function () {

        // Stop screen from refreshing
        event.preventDefault();
        // Debug: See if on click ran
        console.log("On click");

        //Set search values
        searchTerm = document.getElementById("search-term").value;
        //numRecords =  document.getElementById("num-records").value;
        startYr = document.getElementById("begin-year").value;
        endYr = document.getElementById("end-year").value;

        console.log(searchTerm);
        // console.log(numRecords);
        console.log(startYr);
        console.log(endYr);


        var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        queryURL += '?' + $.param({
            'api-key': apiKey
        });

        if (searchTerm !== '') {
            queryURL += '&' + $.param({
                'q': searchTerm
            });
        }

        if (startYr > 0) {
            queryURL += '&' + $.param({
                'begin_date': startYr + "0101"
            });
        }
        if (endYr > 0) {
            queryURL += '&' + $.param({
                'end_date': endYr + "1231"
            });
        }

        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function (retrivedData) {

            console.log(retrivedData);

            console.log(retrivedData.response.docs[0].headline.main);

            console.log(retrivedData.response.docs[0].byline.original);

            console.log(retrivedData.response.docs[0].pub_date);

            console.log(retrivedData.response.docs[0].web_url);


            for (var i = 0; i < numRecords; i++) {
                var newDiv = $("<div>");
                var headline = $("<h1>");
                var byLine = $("<h5>");
                var datePub = $("<h4>");
                var articleUrl = $("<a>");

                headline.text(retrivedData.response.docs[i].headline.main);
                byLine.text(retrivedData.response.docs[i].byline.original);
                datePub.text(retrivedData.response.docs[i].pub_date);
                articleUrl.attr('href', retrivedData.response.docs[i].web_url);

                newDiv.append(headline);
                newDiv.append(byLine);
                newDiv.append(datePub);
                newDiv.append(articleUrl);

                $('#results').append(newDiv);
            }
        })

    });


    $(".btn[type='del']").click(function () {


    });


});