var animalType = document.getElementById('animal-type');
var imgBox = document.getElementById('imgBox');
var catFact = document.getElementById('cats-container');
var resultContainer = document.getElementById('search-container');
var zipCode = document.getElementById('zip-Code')
var historyBox = document.getElementById('history');
var dogFact = document.getElementById('dogs-container');
window.onload = loadSearchbtns();


function getCatFact() {
    var res = fetch('https://catfact.ninja/fact')

//create promise to get response
        .then(function (response) {
//get response from API
            return response.json();
            //return the response to be readable
        })
        .then(function (response) {
           //setting a varable to equal the response container div
            var responseContainerEl = document.querySelector('#response-container');
           //setting the content to blank, to clear out the previous cat fact
            responseContainerEl.innerHTML = '';
// creating an element to set to the page
            var fact = document.createElement('div');
            //naming the div "catFact"
            fact.className = "catFact"
            //setting the content to the response
            fact.innerHTML = response.fact;
            //append div to the response container
            responseContainerEl.appendChild(fact);
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


function getUserSearch(saveZip, petType) {
    resultContainer.innerHTML = ''
//if else statments
    let zip = saveZip ? saveZip : zipCode.value
    let pet = petType ? petType : animalType.value
    //Alert the user for null input!
    if (!zip || !pet) {
        var alertBox = document.createElement('div');
        alertBox.classList = 'alert is-mobile';
        catFact.appendChild(alertBox);
        alertBox.innerHTML = '<img src="https://img.icons8.com/color-glass/30/000000/warning-shield.png"/><p><strong> Please enter a Zipcode and select a pet to see the results</strong></p>';
        return;

    }

    var options = {
        "apikey": "ntjbOl80",
        "objectType": "animals",
        "objectAction": "publicSearch",
        "search": {
            "calcFoundRows": "Yes",
            "resultStart": 0,
            "resultLimit": 10,
            "fields": [
                "animalID",
                "animalOrgID",
                "animalName",
                "animalSpecies",
                "animalBreed",
                "animalThumbnailUrl",
                "animalLocation",
                "locationPhone"
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
                    "criteria": pet
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
        //converts objects into a string
        body: JSON.stringify(options)

    }).then(function (response) {
        return response.json();
    }).then(function (response) {
        //turning the object of objects into an array of objects
     let cats = response.data;
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
        // loop through the cat array and add the field values to the page
        catsArray.forEach((cat) => {
            var result = document.createElement('div');
            resultContainer.removeClass = "img-box";
            result.classList = "result-cards";
            var catImage = document.createElement('img');
            catImg.classList = "img-result";
            //set the image attribute sorce to the cat animal thumbnail
            catImage.setAttribute('src', cat.animalThumbnailUrl)
            //adding all the options that want to be displayed
            result.innerHTML += '<p><strong> Cat Name:</strong> ' + cat.animalName + '</p>';
            result.innerHTML += '<p><strong> AnimalBreed:</strong> ' + cat.animalBreed + '</p>';
            result.innerHTML += '<p><strong> Zip Code:</strong> ' + cat.animalLocation + '</p>';
            result.innerHTML += '<p><strong>Cat image:</strong>'
           //put the element into the container
            result.appendChild(catImage);
            resultContainer.appendChild(result);

        })


    });
}

function saveSearch() {

    var zip = zipCode.value.trim();
    var petType = animalType.value;

    if (zip){
        var searchArr = JSON.parse(localStorage.getItem("zipcode")) || [];
        searchArr.push({ zipcode: zip, petType: petType });//
        localStorage.setItem('zipcode', JSON.stringify(searchArr));
        //console.log(searchArr);
        var histBtn = document.createElement('button');
        histBtn.className = "btn-hist";
        histBtn.setAttribute('data-zip', zip);
        histBtn.setAttribute('data-type', petType);
        histBtn.innerHTML = "<h3>Zip Code :" + zip + "<h3>";
        historyBox.appendChild(histBtn);
    

    }
    
}

function loadSearchbtns() {

    
    searchArr = JSON.parse(localStorage.getItem("zipcode")) || [];
    console.log(searchArr);
    for (var i = 0; i < searchArr.length; i++) {
        console.log(searchArr[i].zipcode);
        console.log(searchArr[i].petType);
        var histBtn = document.createElement("button");
        histBtn.classList = "btn-hist";
        histBtn.setAttribute("data-zip", searchArr[i].zipcode);
        histBtn.setAttribute("data-type", searchArr[i].petType);
        histBtn.innerText = "Zip Code :" + searchArr[i].zipcode;
        historyBox.append(histBtn);
        histBtn.addEventListener("click", function (event) {
            clearInterval(catTimer);
            clearInterval(dogTimer);
            var zipsearch = event.target.getAttribute("data-zip");
            var pet = event.target.getAttribute("data-type");
            if (zipsearch && pet) {
                // console.log(zipsearch);
                // console.log(pet);
                getUserSearch(zipsearch, pet);
                imgBox.innerHTML = "";
                catFact.innerHTML = "";

            }

        });
    }
};

//clearing interval for first page
var searchBtn = document.getElementById('search-now');
searchBtn.addEventListener('click', function () {
    clearInterval(catTimer);
    clearInterval(dogTimer);
    imgBox.innerHTML = "";
    catFact.innerHTML = "";
    saveSearch();
    getUserSearch();

});
//every three seconds fire off the cat /dog images
var catTimer = setInterval(catImg, 3000);
var dogTimer = setInterval(dogImg, 3000);