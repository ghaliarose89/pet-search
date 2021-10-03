
// function getCats() {
//     // get value of zipcode field
//     let zip = document.getElementById('zipCode')
//     let zipCode = zip.value
//     var options = {
//         "apikey": "ntjbOl80",
//         "objectType": "animals",
//         "objectAction": "publicSearch",
//         "search": {
//             "calcFoundRows": "Yes",
//             "resultStart": 0,
//             "resultLimit": 50,
//             "fields": [
//                 "animalID",
//                 "animalOrgID",
//                 "animalName",
//                 "animalSpecies",
//                 "animalBreed",
//                 "animalThumbnailUrl",
//                 "animalLocation"
//             ],
//             "filters": [
//                 {
//                     "fieldName": "animalStatus",
//                     "operation": "equals",
//                     "criteria": "Available"
//                 },
//                 {
//                     "fieldName": "animalLocationDistance",
//                     "operation": "radius",
//                     "criteria": "50"
//                 },
//                 {
//                     "fieldName": "animalLocation",
//                     "operation": "equals",
//                     "criteria": zipCode // use user zipcode input in search
//                 },
//             ]
//         }
//     };
//     fetch('https://api.rescuegroups.org/http/json', {
//         method: 'post',
//         dataType: "jsonp",
//         body: JSON.stringify(options)
//     }).then(function (response) {
//         // make results readable
//         return response.json();
//     }).then(function (response) {
//         // set cats to the data field returned
//         let cats = response.data
//         // make new empty array
//         let catsArray = []
//         for (const value in cats) {
//             // push in the cat objects
//             catsArray.push(cats[value])


//       function getCats() {
//         // get value of zipcode field
//         let zip = document.getElementById('zipCode')
//         let zipCode = zip.value
//         var options = {
//             "apikey": "ntjbOl80",
//             "objectType": "animals",
//             "objectAction": "publicSearch",
//             "search": {
//                 "calcFoundRows": "Yes",
//                 "resultStart": 0,
//                 "resultLimit": 50,
//                 "fields": [
//                     "animalID",
//                     "animalOrgID",
//                     "animalName",
//                     "animalSpecies",
//                     "animalBreed",
//                     "animalThumbnailUrl",
//                     "animalLocation"
//                 ],
//                 "filters": [
//                     {
//                         "fieldName": "animalStatus",
//                         "operation": "equals",
//                         "criteria": "Available"
//                     },
//                     {
//                         "fieldName":"animalLocation",
//                         "operation": "equals",
//                         "criteria": "77441"

//                     },

//                     {
//                         "fieldName": "animalLocationDistance",
//                         "operation": "radius",
//                         "criteria": "50"
//                     },
//                     {
//                         "fieldName": "animalLocation",
//                         "operation": "equals",
//                         "criteria": zipCode // use user zipcode input in search
//                     },
//                 ]
//             }
//         };
//         fetch('https://api.rescuegroups.org/http/json', {
//             method: 'post',
//             dataType: "jsonp",
//             body: JSON.stringify(options)
//         }).then(function (response) {
//             // make results readable
//             return response.json();
//         }).then(function (response) {
//             // set cats to the data field returned
//             let cats = response.data
//             // make new empty array
//             let catsArray = []
//             for (const value in cats) {
//                 // push in the cat objects
//                 catsArray.push(cats[value])
//             }
//             console.log(catsArray);
//             // loop through the cat array and add the field values to the page
//             catsArray.forEach((cat) => {
//                 var responseContainerEl = document.getElementById('cats-container');
//                 var printCat = document.createElement('div');
//                 // make image element and set it to the url from the data
//                 var catImage = document.createElement('img');
//                 catImage.setAttribute('src', cat.animalThumbnailUrl)
//                 // add all the values you want here
//                 printCat.innerHTML += '<strong>Name: </strong>' + cat.animalName
//                 printCat.innerHTML += '<strong>Breeed: </strong>' + cat.animalBreed
//                 // append the image
//                 printCat.appendChild(catImage)
//                 // print to page
//                 responseContainerEl.appendChild(printCat);
//             })
//         });
//     }
    
        
       
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
    
    
//         var res = fetch('https://api.thecatapi.com/v1/images/search', {
       
//         }).then(function (response) {
//             debugger;
//             return response.json();
//         }).then(function (data) {
//             console.log(data);
//             debugger;
            
//         });
        

        var options = {
            "apikey": "ntjbOl80",
            "objectType": "animals",
            "objectAction": "publicSearch",
            "search": {
                "calcFoundRows": "Yes",
                "resultStart": 0,
                "resultLimit": 50,
                "fields": [
                    "animalID",
                    "animalOrgID",
                    "animalName",
                    "animalSpecies",
                    "animalBreed",
                    "animalThumbnailUrl",
                    "animalLocation"
                ],
                "filters": [
                    {
                        "fieldName": "animalStatus",
                        "operation": "equals",
                        "criteria": "Available"
                    },
                    {
                        "fieldName": "animalLocation",
                        "operation": "equals",
                        "criteria": "77441"
                    },
                ]
            }}


var res = fetch('https://api.rescuegroups.org/http/v2.json', { 
    method: 'post',
    body: JSON.stringify(options)
    
    }).then(function(response) {
       
        return response.json();
    }).then(function(data) {
        console.log(data);
       
    }); 
    

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

setInterval( catImg , 1000);