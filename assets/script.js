console.log("hello");
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
            "animalThumbnailUrl"
        ],
        "filters": [
            {
                "fieldName": "animalStatus",
                "operation": "equals",
                "criteria": "Available"
            }
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