var animalType= document.getElementById('animal-type');
var imgBox= document.getElementById('imgBox');
var catFact= document.getElementById('cats-container');
var resultContainer= document.getElementById('container');

function getCats() {
     //get value of zipcode field
     let zip = document.getElementById('77056');
     let zipCode = zip.value;
     console.log(zipCode);
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
                
             ],
            "filters": [
                {
                     "fieldName": "animalStatus",
                     "operation": "equals",
                     "criteria": "Available"
                 },
                 {
                     "fieldName": "animalLocationDistance",
                     "operation": "radius",
                    "criteria": "50"
                },
                 {
                     "fieldName": "animalLocation",
                     "operation": "equals",
                     "criteria": "77441" // use user zipcode input in search
                 },
                 
             ]
         }
     };
     fetch('https://api.rescuegroups.org/http/json', {
         method: 'post',
         dataType: "jsonp",
         body: JSON.stringify(options)
     }).then(function (response) {
         // make results readable
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
                var printCat = document.createElement('div');                 // make image element and set it to the url from the data
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
    
// var zipCodeEl = document.querySelector('Zip-Code');
// var zip=zipCodeEl.value;
// console.log(zip);
  
       
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
    
        
function catImg (){
    var apiCatImg= fetch ('https://aws.random.cat/meow')
    .then (function(response){
        return response.json();
       
    })
    .then(function(data) {
        var imgCat = document.getElementById('imgCat');
        imgCat.src= data.file;        
    });
   
};

function dogImg (){
    var apidogImg= fetch ('https://dog.ceo/api/breeds/image/random')
    .then (function(response){
        return response.json();
       
    })
    .then(function(data) {
        var imgDog = document.getElementById('imgDog');
        imgDog.src= data.message;        
    });
   
};


function getUserSearch(){
    var petType=animalType.value;
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
                    "criteria": "Cat"
                },
                // {
                //     "fieldName": "locationPhone",
                //     "operation": "equals",
                //     "criteria": "Available"
                //  },
            ]
        }}


var res = fetch('https://api.rescuegroups.org/http/v2.json', { 
method: 'post',
body: JSON.stringify(options)

}).then(function(response) {
   return response.json();
}).then(function(response) {
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
    var result=document.createElement('div');
    resultContainer.removeClass=("img-box");
    result.classList=("result-cards");
    resultContainer.appendChild(result);
   result.innerHTML='<p><strong> Cat Name:</strong> '+cat.animalName+'</p>';
   result.innerHTML+='<p><strong> AnimalBreed:</strong> '+cat.animalBreed+'</p>';
   result.innerHTML+='<p><strong> Zip Code:</strong> '+cat.animalLocation+'</p>';
   result.innerHTML+='<p><strong> Picute:</strong><img src='+cat.animalThumbnailUrl+'+/>+</p>';
   
 })

   
}); 


}

var searchBtn= document.getElementById('search-now');
searchBtn.addEventListener('click', function (){
    imgBox.innerHTML="";
    catFact.innerHTML="";
    getUserSearch();
    clearInterval(catTimer);
    clearInterval(dogTimer);
});

var catTimer = setInterval( catImg ,4000);
var dogTimer = setInterval( dogImg ,4000);


