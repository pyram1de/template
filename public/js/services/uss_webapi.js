(
    function(){
        angular.module('ussWebApi',[])
            .factory('catering', function($q, $http, $timeout, ussData){
                    var delay = 10;
                    var get = function(id){
                            var defer;
                            defer = $q.defer();
                            $http.get('http://sp13dev-5:63807/api/cateringRequests/' + id).then(function(result){
                                $timeout(function(){
                                    var response =  ussData.reparseJSON(result.data);
                                    defer.resolve(response);
                                }, false);
                            });
                            return defer.promise;
                    }

                    var getCateringRequests = function(filters){
                            var defer;
                            var queryString = '';
                            var prefix = '?';                            
                            filters = filters || {};
                            if(filters.page){
                                queryString = queryString + prefix + 'page='+(Number(filters.page, 10)-1); // must -1 on a page as pages start from 0
                                prefix = '&';
                            }
                            if(filters.itemsPerPage) {
                                queryString = queryString + prefix + 'itemsPerPage='+filters.itemsPerPage;
                                prefix = '&';
                            }
                            if(filters.reference){
                                queryString = queryString + prefix + 'reference='+filters.reference;
                                prefix = '&';
                            }
                            if(filters.sort){
                                queryString = queryString + prefix + 'sort='+filters.sort;
                                prefix = '&';
                            }
                            defer = $q.defer();
                            $http.get('http://sp13dev-5:63807/api/cateringRequests'+queryString).then(function(result){
                                $timeout(function(){
                                    var response =  ussData.reparseJSON(result.data);
                                    defer.resolve(response);
                                }, false);
                            });
                            return defer.promise;
                    }

                    var post = function(data){
                        var defer;
                        defer = $q.defer();
                        $http.post('http://sp13dev-5:63807/api/cateringRequests',data).then(function(result){
                        $timeout(function(){
                            var response =  ussData.reparseJSON(result.data);
                            defer.resolve(response);
                        }, delay);
                        });
                        return defer.promise;
                    }

                    var patch = function(data){
                        var defer;
                        defer = $q.defer();
                        $http.patch('http://sp13dev-5:63807/api/cateringRequests',data).then(function(result){
                        $timeout(function(){
                            var response =  ussData.reparseJSON(result.data);
                            defer.resolve(response);
                        }, delay);
                        });
                        return defer.promise;
                    }
                    var menus;
                    var getMenus = function(context){
                        //context is either public or private
                        var defer;
                        defer = $q.defer();
                        if(menus){
                            defer.resolve(angular.copy(menus));
                        } else {
                            $http.get('http://sp13dev-5:63807/api/menu').then(function(result){
                                var data = result.data.d;
                                menus = data;
                                defer.resolve(angular.copy(menus));
                            });
                        }
                        return defer.promise;
                    }

                    var getSelectedMenu = function(cateringRequest){
                        var defer;
                        defer = $q.defer();
                        if(!cateringRequest.menuId){
                            defer.resolve(null);
                        } else {
                            getMenus().then(function(result){
                                for(var i = 0; i<result.length;i++){
                                    if(result[i].menuId===cateringRequest.menuId){
                                        defer.resolve(result[i]);
                                        return;
                                    }
                                }
                            });
                        }
                        return defer.promise;
                    }

                    return {
                        post: post,
                        patch : patch,
                        getMenus : getMenus,
                        get: get,
                        getCateringRequests : getCateringRequests,
                        getSelectedMenu: getSelectedMenu
                    }
                })
            .factory('ussData',function($timeout){
                var delay = 10;
                var nulldate = moment.utc("0001-01-01T00:00:00");
                var dateParserExt = function(key, value){
                    // date that matches .... "2017-05-12T14:35:59.65"
                    var reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
                    // date that matches .... "2017-05-12T14:29:37"
                    var reISOms = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:Z|(\+|-)([\d|:]*))?$/;
                    var reMsAjax = /^\/Date\((d|-|.*)\)[\/|\\]$/;
                    if(typeof value ==='string') {
                        var a = reISO.exec(value) || reISOms.exec(value);
                        if (a) {
                            var m = moment.utc(value);
                            
                            if(m.isValid()&&(!m.isSame(nulldate))){
                                return m.toDate();
                            } else {
                                return undefined;
                            }
                        }
                        a = reMsAjax.exec(value);
                        if (a) {
                            var b = a[1].split('/[-+,.]/');
                            var m = moment.utc(b[0] ? +b[0] : 0 - +b[1]).toDate();
                            if(m.isValid()){
                                return m.toDate();
                            } else {
                                return null;
                            }
                        }
                    }
                    if(value===nulldate){
                        return undefined;
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