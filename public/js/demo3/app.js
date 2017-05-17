
(function () {
    var app = angular.module('demo3', ['ngRoute', 'ngAnimate', 'textAngular', 'ngMaterial', 'ngMessages', 'dataGrid', 'pagination','ussWebApi','ussAngular']);
    app.config(function ($routeProvider, $mdThemingProvider, $mdDateLocaleProvider, $mdAriaProvider) {
        $mdAriaProvider.disableWarnings();
        $routeProvider
            .when('/', {
                templateUrl: "views/demo3_start.htm",
            })
            .when('/reception', {
                templateUrl: "views/demo3_reception.htm",
            })
            .when('/hns', {
                templateUrl: 'views/hns.htm',
            })
            .when('/reception/private/catering', {
                templateUrl: 'views/demo3_catering.htm',
            })
            .when('/reception/private/dashboard', {
                templateUrl: 'views/demo3_dashboard.htm',
            });;

        $mdDateLocaleProvider.firstDayOfWeek = 1;

        $mdDateLocaleProvider.formatDate = function (date) {
            if (!date) {
                return '';
            }
            var monthNames = [
                "January", "February", "March",
                "April", "May", "June", "July",
                "August", "September", "October",
                "November", "December"
            ];

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
    }).factory('myAppFactory', function ($http) {
        return {
            getData: function () {
                return $http({
                    method: 'GET',
                    url: 'http://sp13dev-5:63807/api/cateringRequests/',
                });
            }
        }
    });
})();
