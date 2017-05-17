(
    function(){
        angular.module('ussWebApi',[])
            .factory('catering', function($q, $http, $timeout, ussData){
                    var delay = 10;
                    var convertDate = function(date,ussData){
                        return date==='0001-01-01T00:00:00' ? null : new Date(date);
                    };
                    var parseCateringRequestModel = function(model){
                        model.created = convertDate(model.created);
                        model.modified = convertDate(model.modified);
                        model.ordered = convertDate(model.modified);
                        model.required = convertDate(model.required);
                        return model;
                    }
                    var post = function(data){
                        var defer;
                        defer = $q.defer();
                        $http.post('http://sp13dev-5:63807/api/cateringRequests',data).then(function(result){
                        /*
                        * this timeout is for testing only....
                        */
                        $timeout(function(){
                            console.log(ussData.reparseJSON(result.data)); 
                            /* as shawyer would say theres got to be a better way. 
                            * TODO look into a way to get dates parsed correctly from JSON
                            */   
                            var response =  ussData.reparseJSON(result.data);
                            defer.resolve(response);
                        }, delay);
                        });
                        return defer.promise;
                    }

                    var getMenus = function(){
                        // most likely go off and post data. 
                        var defer;
                        defer = $q.defer();
                        $timeout(function(){
                            defer.resolve([{
                                id: 1,
                                name: 'Menu A',
                                shortDesc : 'Breakfast some hash browns, bacon butties, and nibbles'
                            },{
                                id: 2,
                                name: 'Menu B',
                                shortDesc : 'Juice and Coffee, Hot Food, skewers and Sandwiches'
                            },{
                                id: 3,
                                name: 'Menu C',
                                shortDesc : 'Juice And Coffee, selection of Sandwiches'
                            },{
                                id: 4,
                                name: 'Exec Menu',
                                shortDesc : 'Breakfast some hash browns, bacon butties'
                            }]);
                        }, delay);
                        return defer.promise;
                    }

                    return {
                        parseCateringRequestModel: parseCateringRequestModel,
                        post: post,
                        getMenus : getMenus
                    }
                })
            .factory('ussData',function($timeout){
                var delay = 10;
                var nulldate = new Date("0001-01-01T00:00:00");
                var dateParserExt = function(key, value){
                    // date that matches .... "2017-05-12T14:35:59.65"
                    var reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
                    // date that matches .... "2017-05-12T14:29:37"
                    var reISOms = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:Z|(\+|-)([\d|:]*))?$/;
                    var reMsAjax = /^\/Date\((d|-|.*)\)[\/|\\]$/;
                    if(typeof value ==='string') {
                        var a = reISO.exec(value) || reISOms.exec(value);
                        if (a)
                            return new Date(value);
                        a = reMsAjax.exec(value);
                        if (a) {
                            var b = a[1].split('/[-+,.]/');
                            return new Date(b[0] ? +b[0] : 0 - +b[1]);
                        }
                    }
                    if(value===nulldate){
                        return null;
                    }
                    return value;
                }
                var parseJSON = function(json){
                    return JSON.parse(json, dateParserExt);
                }

                var reparseJSON = function(object){
                    return JSON.parse(JSON.stringify(object), dateParserExt);
                }

                var getSites = function(){
                    return $timeout(function(){
                        return [
                            {
                                id: 1,
                                name: 'London'
                            },
                            {
                                id: 2,
                                name: 'Liverpool'
                            }];
                    },delay);
                }

                var getLondonRooms = function(){
                    return $timeout(function(){
                        var londonRooms = [
                        {name: 'Bloomberg'},
                        {name: 'Creative'},
                        {name: 'New York'},
                        {name: 'Sydney'},
                        {name: 'Paris'},
                        {name: 'Tokyo'},
                        {name: 'Innovation'},
                        {name: 'TheShard'}
                    ];
                    return londonRooms;
                    }, delay);
                }

                var getLiverpoolRooms = function(){
                    return $timeout(function(){
                        return  [
                            {name: 'Manchester'},
                            {name: 'Liverpool'},
                            {name: 'Birmingham'},
                            {name: 'City'},
                            {name: 'Nottingham'},
                            {name: 'Glasgow'},
                            {name: 'Belfast'},
                            {name: 'Edinburgh'},
                            {name: 'Logan'},
                            {name: 'Learning Hub'},
                            {name: 'Matthew Street'},
                            {name: 'UCL'},
                            {name: 'Abbey Road'}
                        ];
                    }, delay);
                }

                return {
                    getLondonRooms : getLondonRooms,
                    getLiverpoolRooms: getLiverpoolRooms,
                    parseJSON: parseJSON,
                    reparseJSON: reparseJSON,
                    getSites: getSites
                }
                });
    }
)();