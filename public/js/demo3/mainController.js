(function () {
    var app = angular.module('demo3');
    app.controller('MainController', function ($scope, $location, $mdPanel, myAppFactory, $mdSidenav, ussData, $mdDialog) {
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
        $scope.gridOptions = {
            data: [], //required parameter - array with data
            //optional parameter - start sort options
            sort: {
                predicate: 'companyName',
                direction: 'asc'
            }
        };
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
            console.log('passing in item: ');
            console.log(item);
            $mdDialog.show({
                    controller: 'ModalController',
                    parent: angular.element(document.body),
                    templateUrl: 'views/modals/catering_admin.htm',
                    clickOutsideToClose: false,
                    escapeToClose: false,
                    focusOnOpen: true,
                    controllerAs: 'ctrl',
                    bindToController: true,
                    fullscreen: true,
                    locals: {
                        selectedItem: item,
                        gridData : $scope.gridOptions.data
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
        myAppFactory.getData().then(function (responseData) {
            $scope.gridOptions.data = ussData.reparseJSON(responseData.data);
        });
    });
})();
