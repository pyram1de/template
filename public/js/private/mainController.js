(function () {
    var app = angular.module('privateFMS');
    app.controller('MainController', function ($scope, $location, $mdPanel, $mdSidenav, ussData, $mdDialog, catering, $timeout, $stateParams) {
        $scope.changeLocation = function (location) {
            $location.path(location);
        }
        var _mdPanel = $mdPanel;
        $scope.returnHome = function () {
            $location.path('/');
        }
        $scope.back = function () {
            window.history.back();
        }
        $scope.gridActions = {}
        $scope.gridOptions = {
            data: [], //required parameter - array with data
            //optional parameter - start sort options
            sort: {
                predicate: 'id',
                direction: 'desc'
            },
            urlSync: true,
            getData: function(filter, callback){
                if($stateParams.reference&&$stateParams.page>1){
                    $stateParams.page=1
                    $location.search($stateParams);
                }
                catering.getCateringRequests($location.$$search).then(function (response) {
                    var data = response.d;                    
                    var totalItems = response.totalCount;
                    callback(data, totalItems);
                });
            }
        };

        catering.getCateringRequests($location.$$search).then(function (response) {
            if($stateParams.reference&&$stateParams.page>1){
                $stateParams.page=1
                $location.search($stateParams);
            }
            $scope.gridOptions.data = response.d;
            $scope.gridOptions.data.resultSize = response.totalCount;
        });
        
        $scope.toggleLeft = buildToggler('left');
        $scope.toggleRight = buildToggler('right');
        $scope.isOpenRight = function () {
            return $mdSidenav('right').isOpen();
        };
        function buildToggler(componentId) {
            return function () {
                $mdSidenav(componentId).toggle();
            };
        }
        $scope.closeRight = function () {
            $mdSidenav('right').close();
        }

        $scope.cssClass = function(item){
            if(!item){
                return"";
            }
            if(item.status==="New"){
                if(moment(item.required).isSameOrBefore(moment().add(1,'days'))){
                    return "breached-sla";
                }
                if(moment(item.required).isSameOrBefore(moment().add(3,'days'))){
                    return "reaching-sla";
                } else {
                    return "new-in";
                }
            }
        }

        $scope.openCateringModal = function (item) {
            $mdDialog.show({
                    controller: 'ModalController',
                    parent: angular.element(document.body),
                    templateUrl: 'views/private/modals/catering.htm',
                    clickOutsideToClose: false,
                    escapeToClose: false,
                    focusOnOpen: true,
                    controllerAs: 'ctrl',
                    bindToController: true,
                    fullscreen: true,
                    resolve: {
                        selectedItem : function(){
                            return catering.get(item.reference);
                        }
                    },
                    locals: {
                        gridData : $scope.gridOptions.grid.filtered
                        }
                    });
        }
        $scope.openTaxiModal = function () {
        };
        $scope.openRoomModal = function () {
        };
        $scope.openCatering = function () {
            $location.path('/reception/private/catering');
        };
        $scope.openDashboard = function () {
            $location.path('/reception/private/dashboard');
        };
        
    });
})();
