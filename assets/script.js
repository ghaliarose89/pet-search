var animalType = document.getElementById('animal-type');
var imgBox = document.getElementById('imgBox');
var catFact = document.getElementById('cats-container');
var resultContainer = document.getElementById('search-container');
var zipCode = document.getElementById('zip-Code')
var historyBox = document.getElementById('history');
var dogFact = document.getElementById('dogs-container');
window.onload = loadSearchbtns();
//loadSearchbtns();


function getCatFact() {
    var res = fetch('https://catfact.ninja/fact')


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
function getDogFact() {
    fetch('https://dog-api.kinduff.com/api/facts', {


    }).then(function (response) {

        return response.json();
    })
        .then(function (response) {
            console.log(response.facts);
            var responseContainerEl = document.querySelector('#response-container2');
            responseContainerEl.innerHTML = '';
            var facts = document.createElement('div');
            facts.innerHTML = response.facts;
            responseContainerEl.appendChild(facts);
        });

}



function catImg() {
    var apiCatImg = fetch('https://aws.random.cat/meow')
        .then(function (response) {
            return response.json();

        })
        .then(function (data) {
            var imgCat = document.getElementById('imgCat');
            imgCat.src = data.file;
        });

};

function dogImg() {
    var apidogImg = fetch('https://dog.ceo/api/breeds/image/random')
        .then(function (response) {
            return response.json();

        })
        .then(function (data) {
            var imgDog = document.getElementById('imgDog');
            imgDog.src = data.message;
        });

};


function getUserSearch(saveZip, saveType) {
    resultContainer.innerHTML = ''
    let zip = zipCode.value;
    if (saveZip) {

    }

    // else {
    //     var alertBox = document.createElement('div');
    //         alertBox.className = 'alert';
    //         catFact.appendChild(alertBox);
    //         alertBox.innerHTML = '<img src="https://img.icons8.com/color-glass/30/000000/warning-shield.png"/><p><strong> Please enter a Zipcode and select a pet to see the results</strong></p>';
    //         return;

    // }
    var petType = animalType.value;
    var options = {
        "apikey": "ntjbOl80",
        "objectType": "animals",
        "objectAction": "publicSearch",
        "search": {
            "calcFoundRows": "Yes",
            "resultStart": 0,
            "resultLimit": 8,
            "fields": [
                "animalID",
                "animalOrgID",
                "animalName",
                "animalSpecies",
                "animalBreed",
                "animalThumbnailUrl",
                "animalLocation",
                //"locationPhone"
            ],
            "filters": [
                {
                    "fieldName": "animalStatus",
                    "operation": "equals",
                    "criteria": "Available"
                },

                {
                    "fieldName": "animalSpecies",
                    "operation": "equals",
                    "criteria": petType
                },
                {
                    "fieldName": "animalLocationDistance",
                    "operation": "radius",
                    "criteria": "50"
                },
                {
                    "fieldName": "animalLocation",
                    "operation": "equals",
                    "criteria": zip
                },
            ]
        }
    }


    var res = fetch('https://api.rescuegroups.org/http/v2.json', {
        method: 'post',
        dataType: 'jsonp',
        body: JSON.stringify(options)

    }).then(function (response) {
        return response.json();
    }).then(function (response) {
        let cats = response.data;
        console.log(cats);
        // make new empty array
        let catsArray = []
        for (const value in cats) {
            // push in the cat objects
            catsArray.push(cats[value])

        }
        var resultTitle = document.createElement('div');
        resultTitle.className = "result-title";
        resultContainer.appendChild(resultTitle);

        resultTitle.innerHTML = "<h2> Future Pet List </h2><hr>";

        console.log(catsArray);
        // loop through the cat array and add the field values to the page
        catsArray.forEach((cat) => {
            var result = document.createElement('div');
            resultContainer.removeClass = "img-box";
            result.classList = "result-cards";
            var catImage = document.createElement('img');
            catImg.classList = "img-result";

            catImage.setAttribute('src', cat.animalThumbnailUrl)
            result.innerHTML += '<p><strong> Cat Name:</strong> ' + cat.animalName + '</p>';
            result.innerHTML += '<p><strong> AnimalBreed:</strong> ' + cat.animalBreed + '</p>';
            result.innerHTML += '<p><strong> Zip Code:</strong> ' + cat.animalLocation + '</p>';
            result.innerHTML += '<p><strong>Cat image:</strong>'
            result.appendChild(catImage);
            resultContainer.appendChild(result);

        })


    });
}

function saveSearch() {
    var zip = zipCode.value.trim();
    var searchArr = JSON.parse(localStorage.getItem("zipcode")) || [];
    searchArr.push(zip);
    localStorage.setItem('zipcode', JSON.stringify(searchArr));
    console.log(searchArr);
    var histBtn = document.createElement('button');
    histBtn.classList = "btn hist-text";
    histBtn.setAttribute('data-zip', zip)
    histBtn.innerHTML = "<h3>Zip Code :" + zip + "<h3>";
    historyBox.appendChild(histBtn);
    histBtn.addEventListener("click", function (e) {
        var zipsearch = e.target.getAttribute("data-zip");
        getUserSearch(zipsearch);


    });



}
function loadSearchbtns() {
    var zip = zipCode.value.trim();
    var searchArr = JSON.parse(localStorage.getItem("zipcode")) || [];
    searchArr.push(zip);
    localStorage.getItem('zipcode', JSON.stringify(searchArr));
    console.log(searchArr);
    //TODO:loop through search arr to create multiple buttons
    var histBtn = document.createElement('button');
    histBtn.classList = "btn hist-text";
    histBtn.setAttribute('data-zip', zip)
    histBtn.innerHTML = "<h3>Zip Code :" + zip + "<h3>";
    historyBox.appendChild(histBtn);
    histBtn.addEventListener("click", function (e) {
        var zipsearch = e.getAttribute("data-zip");
        getUserSearch(zipsearch);


    });


}


var searchBtn = document.getElementById('search-now');
searchBtn.addEventListener('click', function () {
    clearInterval(catTimer);
    clearInterval(dogTimer);
    imgBox.innerHTML = "";
    catFact.innerHTML = "";
    dogFact.innerHTML = "";
    saveSearch();
    getUserSearch();

});

var catTimer = setInterval(catImg, 3000);
var dogTimer = setInterval(dogImg, 3000);


