
(function(){
        angular.module('publicFMS',['ngRoute','ngAnimate','textAngular','ngMaterial',
        'ngMessages','ussWebApi','ussAngular', 'ussDirectives',
        'momentjs'])
            .config(function($routeProvider,$mdThemingProvider,$mdDateLocaleProvider, $httpProvider,$mdAriaProvider){
            $mdAriaProvider.disableWarnings();
            $routeProvider
            .when('/',{
                templateUrl : "views/public/home.htm",
            })
            .when('/reception', {
                templateUrl : "views/public/reception.htm",
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
