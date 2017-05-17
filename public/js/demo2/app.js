
(function(){
        angular.module('demo2',['ngRoute','ngAnimate','textAngular','ngMaterial','ngMessages','ussWebApi','ussAngular'])
            .config(function($routeProvider,$mdThemingProvider,$mdDateLocaleProvider, $httpProvider){
            $routeProvider
            .when('/',{
                templateUrl : "views/demo2_start.htm",
            })
            .when('/reception', {
                templateUrl : "views/demo2_reception.htm",
            })
            .when('/hns', {
                templateUrl : 'views/hns.htm',
            });
            
            $mdDateLocaleProvider.firstDayOfWeek = 1;

            $mdDateLocaleProvider.formatDate  = function(date){
                var monthNames = [
                    "January", "February", "March",
                    "April", "May", "June", "July",
                    "August", "September", "October",
                    "November", "December"
                ];
                if(!date){
                    return "";
                }
                var day = date.getDate();
                var monthIndex = date.getMonth();
                var year = date.getFullYear();
                return day + ' ' + monthNames[monthIndex] + ' ' + year;
            }

        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('red',
            {
                'default': '800',
                'hue-1': '900',
                'hue-2': '900'
            })
            .accentPalette('grey');
        });
})();
