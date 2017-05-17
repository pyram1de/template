(
    function(){
        angular.module('ussAngular',[])
            .factory('$ussFunctions', function($q, $timeout){
                    /*
                     * this will contain sharepoint calls
                    */
                    var pad = function(n, width, z){
                        z = z || '0';
                        n = n + '';
                        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
                    }
                    var timeRegex = /^(2[0-3]|1[0-9]|0[0-9]|[^0-9][0-9]):([0-5][0-9]|[0-9])$/;

                    var formatTime = function(date){
                        if(!date){
                            return "";
                        }
                        return pad(date.getHours(),2) + ':' + pad(date.getMinutes(),2);
                    }

                    var getCurrentUser = function(){
                        var defer;
                        defer = $q.defer();
                        $timeout(function(){
                            defer.resolve({
                                name: 'David Hulmes',
                                site: 'Liverpool'
                            });
                        }, 3000);
                        return defer.promise;
                    }

                    return {
                        pad: pad,
                        formatTime: formatTime,
                        getCurrentUser: getCurrentUser,
                        timeRegex: timeRegex
                    }
                })
    })();