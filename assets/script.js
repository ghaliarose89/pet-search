
var options = {
    "apikey": "ntjbOl80",
    "objectType": "animals",
    "objectAction": "publicSearch",
    "search" : {
        "calcFoundRows": "Yes",
        "resultStart": 0,
        "resultLimit": 20,
        "resultSort": "animalID",
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
                "fieldName": "animalLocationDistance",
                "operation": "radius",
                "criteria": "50"
            }, 
            {
                "fieldName": "animalLocation",
                "operation": "equals",
                "criteria": "77056"
            },
        ]
    }
};
var res = fetch('https://api.rescuegroups.org/http/v2.json', { 
    method: 'post',
    body: JSON.stringify(options)
    
    }).then(function(response) {
        debugger;
        return response.json();
    }).then(function(data) {
        console.log(data);
        debugger;
    });

    
   
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

