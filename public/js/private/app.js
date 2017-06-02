
(function () {    
    var app = angular.module('privateFMS', 
    ['ui.router', 'ngAnimate', 'textAngular', 'ngMaterial', 
    'ngMessages', 'dataGrid', 'pagination','ussWebApi','ussAngular','ussDirectives'
    ,'momentjs']);
    app.filter('sugarDate', function(){
        return function(input, other){
            if(other&&!input){
                return;
            }
            return Sugar.Date(input).relative();
        }
    })
    app.config(function ($mdThemingProvider, $mdDateLocaleProvider, $mdAriaProvider, $stateProvider) {
        $mdAriaProvider.disableWarnings();
        $stateProvider
            .state('root',{
                url: '',
                templateUrl: 'views/private/home.htm'
            })
            .state('reception',{
                url: '/reception',
                templateUrl : 'views/private/reception.htm'
            })
            .state('catering',{
                url: '/reception/private/catering',
                templateUrl: 'views/private/catering_grid.htm'
            })
            .state('dashboard',{
                url: '/reception/private/dashboard',
                templateUrl: 'views/private/dashboard.htm'
            });
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
    });
})();
