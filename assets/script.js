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
            //console.log(response.fact);
            var responseContainerEl = document.querySelector('#response-container');
            responseContainerEl.innerHTML = '';
            var fact = document.createElement('div');
            fact.innerHTML = response.fact;
            responseContainerEl.appendChild(fact);
        });

}
// function getDogFact() {
//     fetch('https://dog-api.kinduff.com/api/facts')


//         .then(function (response) {

//             return response.json();
//         })
//         .then(function (response) {
//             //console.log(response.facts);
//             var responseContainerEl = document.querySelector('#response-container2');
//             responseContainerEl.innerHTML = '';
//             var facts = document.createElement('div');
//             facts.innerHTML = response.facts;
//             responseContainerEl.appendChild(facts);
//         });

// }



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

    let zip = saveZip ? saveZip : zipCode.value
    let pet = petType ? petType : animalType.value
    // var petType = animalType.value;
    //Alert the user!
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
                // {
                //"fieldName": "locationPhone",
                //"operation": "equals",
                // "criteria":  phone
                // },
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
        //console.log(cats);
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

        // console.log(catsArray);
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
            // result.innerHTML += '<p><strong> Phone:</strong> ' + cat.locationPhone + '</p>';
            result.innerHTML += '<p><strong> Zip Code:</strong> ' + cat.animalLocation + '</p>';
            result.innerHTML += '<p><strong>Cat image:</strong>'
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
    else{
        console.log("no zip");
    }
    
}

function loadSearchbtns() {

    
     //console.log(event);
    // var petType = animalType.value;
    searchArr = JSON.parse(localStorage.getItem("zipcode")) || [];
    console.log(searchArr);
    for (var i = 0; i < searchArr.length; i++) {
        console.log(searchArr[i].zipcode);
        console.log(searchArr[i].petType);
        var histBtn = document.createElement("button");
        histBtn.classList = "btn-hist";
        histBtn.setAttribute("data-zip", searchArr[i].zipcode);
        histBtn.setAttribute("data-type", searchArr[i].petType);
       // histBtn.innerHTML = "<h3>Zip Code :" + searchArr[i].zipcode + "<h3>";
        histBtn.innerText =  searchArr[i].zipcode;
        historyBox.append(histBtn);
        histBtn.addEventListener("click", function (event) {
            console.log(event.target);
            clearInterval(catTimer);
            clearInterval(dogTimer);
            var zipsearch = event.target.getAttribute("data-zip");
            var pet = event.target.getAttribute("data-type");
            console.log(zipsearch);
            console.log(pet);
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


var searchBtn = document.getElementById('search-now');
searchBtn.addEventListener('click', function () {
    clearInterval(catTimer);
    clearInterval(dogTimer);
    imgBox.innerHTML = "";
    catFact.innerHTML = "";
    saveSearch();
    getUserSearch();

});

var catTimer = setInterval(catImg, 3000);
var dogTimer = setInterval(dogImg, 3000);