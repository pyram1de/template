(
    function(){
        var mainController = function($scope, $location, $mdPanel, $mdDialog, catering){
            $scope.changeLocation = function(location){
                $location.path(location);
            }
            var _mdPanel = $mdPanel;
            $scope.returnHome = function(){
                $location.path('/');
            }
            
            $scope.openTaxiModal = function() {
            };
                
            $scope.openRoomModal = function() {
            };
            
            $scope.openCateringModal = function() {
                $mdDialog.show({
                    controller: 'ModalController',
                    parent: angular.element(document.body),
                    templateUrl: 'views/public/modals/catering.htm',
                    clickOutsideToClose: false,
                    escapeToClose: false,
                    focusOnOpen: true,
                    controllerAs: 'ctrl',
                    fullscreen: true
                    });
                };
        }

        angular.module('publicFMS').controller('MainController', mainController);
})();