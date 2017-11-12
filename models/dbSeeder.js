
var City = require('../models/city');
var State = require('../models/state');
var Class = require('../models/class');
var Course = require('../models/course');

var async = require('async');
var mongoose = require('mongoose');

console.log('This script seeds startup data into the db.');

//Get arguments passed on command line
var argsPassed = process.argv.slice(2);
if (!argsPassed[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

const mongoDB =  argsPassed[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;


var cities = [];
var states = [];


var createStates =  function(name,cb){
    
        let state = {name : name};
    
        let saveState = new State(state);
    
        saveState.save(function (err,result) {
            if(err) return cb(err);
            states.push(result);
            cb(null,result);
        });
}

var createCities =  function(stateId,name,cb){
    
        let city = {state_id:stateId,name : name};
    
        let saveCity = new City(city);
    
        saveCity.save(function (err,city) {
            if(err) return cb(err);
            cities.push(city);
            cb(null,city);
        });
}
function seedCities(cb) {
    async.parallel([

        function (callback) {
            createCities(states[0],'Alimosho',callback);
        },
        function (callback) {
            createCities(states[0],'Ajeromi-Ifelodun',callback);
        },
        function (callback) {
            createCities(states[0],'Kosofe',callback);
        },
        function (callback) {
            createCities(states[0],'Mushin',callback);
        },
        function (callback) {
            createCities(states[0],'Oshodi-Isolo',callback);
        },
        function (callback) {
            createCities(states[0],'Ojo',callback);
        },
        function (callback) {
            createCities(states[0],'Ikorodu',callback);
        },
        function (callback) {
            createCities(states[0],'Ifako-Ijaiye',callback);
        },
        function (callback) {
            createCities(states[0],'Surulere',callback);
        },
        function (callback) {
            createCities(states[0],'Agege',callback);
        },
        function (callback) {
            createCities(states[0],'Amuwo-Odofin',callback);
        },
        function (callback) {
            createCities(states[0],'Shomolu',callback);
        },
        function (callback) {
            createCities(states[0],'Ikeja',callback);
        },
        function (callback) {
            createCities(states[0],'Badagry',callback);
        },
        function (callback) {
            createCities(states[0],'Lagos Mainland',callback);
        },
        function (callback) {
            createCities(states[0],'Eti-Osa',callback);
        },
        function (callback) {
            createCities(states[0],'Apapa',callback);
        },
        function (callback) {
            createCities(states[0],'Ibeju-Lekki',callback);
        },
        function (callback) {
            createCities(states[0],'Lagos Island',callback);
        },
        function (callback) {
            createCities(states[0],'Epe',callback);
        }


    ], cb);
}   

function seedStates(cb) {
    async.parallel([

        function (callback) {
            createStates('Lagos',callback);
        },
        function (callback) {
            createStates('Cross River',callback);
        },
        function (callback) {
            createStates('Borno',callback);
        },
        function (callback) {
            createStates('Benue',callback);
        },
        function (callback) {
            createStates('Abuja',callback);
        },
        function (callback) {
            createStates('Ekiti',callback);
        },
        function (callback) {
            createStates('Ebonyi',callback);
        },
        function (callback) {
            createStates('Delta',callback);
        },
        function (callback) {
            createStates('Bayelsa',callback);
        },
        function (callback) {
            createStates('Akwa Ibom',callback);
        },
        function (callback) {
            createStates('Bauchi',callback);
        },
        function (callback) {
            createStates('Enugu',callback);
        },
        function (callback) {
            createStates('Adamawa',callback);
        },
        function (callback) {
            createStates('Anambra',callback);
        },
        function (callback) {
            createStates('Abia',callback);
        },
        function (callback) {
            createStates('Edo',callback);
        },
        function (callback) {
            createStates('Gombe',callback);
        },
        function (callback) {
            createStates('Jigawa',callback);
        },
        function (callback) {
            createStates('Imo',callback);
        },
        function (callback) {
            createStates('Kaduna',callback);
        },
        function (callback) {
            createStates('Kanu',callback);
        },
        function (callback) {
            createStates('Kastina',callback);
        },
        function (callback) {
            createStates('Kebbi',callback);
        },
        function (callback) {
            createStates('Kogi',callback);
        },
        function (callback) {
            createStates('Kwara',callback);
        },
        function (callback) {
            createStates('Nasarawa',callback);
        },
        function (callback) {
            createStates('Niger',callback);
        },
        function (callback) {
            createStates('Ogun',callback);
        },
        function (callback) {
            createStates('Ondo',callback);
        },
        function (callback) {
            createStates('Osun',callback);
        },
        function (callback) {
            createStates('Oyo',callback);
        },
        function (callback) {
            createStates('Rivers',callback);
        },
        function (callback) {
            createStates('Plateau',callback);
        },
        function (callback) {
            createStates('Sokoto',callback);
        },
        function (callback) {
            createStates('Taraba',callback);
        },
        function (callback) {
            createStates('Zamfara',callback);
        },
        function (callback) {
            createStates('Yobe',callback);
        },


    ], cb);
}


//this runs each seeds in order of the listing
async.series([
    seedStates,
    seedCities
],// optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Cities: '+cities);

    }
    //All done, disconnect from database
    mongoose.disconnect();
});