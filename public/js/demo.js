(function(){
        var app = angular.module('app',['ngRoute','ngAnimate','textAngular','ngMaterial']);
        app.controller('MainController', function($scope){
            
        });

        app.config(function($routeProvider,$mdThemingProvider){
            $routeProvider
            .when('/',{
                templateUrl : "views/start.htm",
                controller: 'TileController'
            })
            .when('/reception', {
                templateUrl : "views/reception.htm",
                controller: 'TileController'
            })

        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('red',
            {
                'default': '800',
                'hue-1': '900',
                'hue-2': '900'
            })
            .accentPalette('grey');
        });

        app.controller('ModalController', ModalController);
        
        function ModalController(mdPanelRef) {
            this._mdPanelRef = mdPanelRef;
        }

        ModalController.prototype.closeDialog = function() {
            var panelRef = this._mdPanelRef;

            panelRef && panelRef.close().then(function() {
                angular.element(document.querySelector('.demo-dialog-open-button')).focus();
                panelRef.destroy();
            });
        };

        app.controller('TileController', function($scope, $location, $mdPanel){
            var _mdPanel = $mdPanel;

            $scope.clicked = function(){
                alert('test');
            }

            $scope.openModal = function() {
            var position =  _mdPanel.newPanelPosition()
                .absolute()
                .center();

            var config = {
                attachTo: angular.element(document.body),
                controller: 'ModalController',
                controllerAs: 'ctrl',
                disableParentScroll: this.disableParentScroll,
                templateUrl: 'views/modal.htm',
                hasBackdrop: true,
                panelClass: 'demo-dialog-example',
                position: position,
                trapFocus: true,
                zIndex: 150,
                clickOutsideToClose: true,
                escapeToClose: true,
                focusOnOpen: true
            };

            _mdPanel.open(config);
            };

            $scope.returnHome = function(){
                $location.path('/');
            }
            $('.live-tile').liveTile({
                playOnHover:true,
                startNow: false,
                initDelay: 0,
                repeatCount: 0,
                onHoverDelay: 400,
                delay: 2000
            });
            $scope.receptionClicked = function(){
                console.log($location.path);
                $location.path('/reception');
            }
        });
})();