
        return response.json();
    }).then(function (response) {
        // set cats to the data field returned
        let cats = response.data
        // make new empty array
        let catsArray = []
        for (const value in cats) {
            // push in the cat objects
            catsArray.push(cats[value])
        }
        console.log(catsArray);
        // loop through the cat array and add the field values to the page
        catsArray.forEach((cat) => {
            var responseContainerEl = document.getElementById('cats-container');
            var printCat = document.createElement('div');
            // make image element and set it to the url from the data
            var catImage = document.createElement('img');
            catImage.setAttribute('src', cat.animalThumbnailUrl)
            // add all the values you want here
            printCat.innerHTML += '<strong>Name: </strong>' + cat.animalName
            printCat.innerHTML += '<strong>Breeed: </strong>' + cat.animalBreed
            // append the image
            printCat.appendChild(catImage)
            // print to page
            responseContainerEl.appendChild(printCat);
        })
    });
}

    
   
    function getCatFact() {
        var res = fetch('https://catfact.ninja/fact', {

        })
            .then(function (response) {
    
            return response.json();
        })
            .then(function (response) {
                console.log(response.fact);
                var responseContainerEl = document.querySelector('#response-container');
                responseContainerEl.innerHTML = '';
                var fact = document.createElement('div');
                fact.innerHTML = response.fact;
                responseContainerEl.appendChild(fact);
            });
    }


    var res = fetch('https://api.thecatapi.com/v1/images/search', {
   
    }).then(function (response) {
        debugger;
        return response.json();
    }).then(function (data) {
        console.log(data);
        debugger;
    });

