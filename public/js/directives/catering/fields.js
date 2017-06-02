(
    function () {
        var location = 'js/directives/catering/templates/';
        angular.module('ussDirectives')
            .directive('ussAttendees', function (directiveTemplateLocation) {
                return {
                    restrict: 'E',
                    scope :{
                        ussModel: "=",
                        theForm: "="
                    },
                    link : function(scope, element, attr){
                        scope.numberMatch = /\d/;
                    },
                    templateUrl: directiveTemplateLocation + 'attendees.htm'
                }
            })
            .directive('ussMenuSelection',
            function (directiveTemplateLocation, catering) {
                return {
                    restrict: 'E',
                    templateUrl: directiveTemplateLocation + 'menuSelection.htm',
                    scope: {
                        ussModel : "=",
                        theForm: "=",
                        menus: "=",
                        selectedMenu: "="
                    },
                    link: function(scope){
                        var setScope = function(){
                            for(var i = 0; i<scope.menus.length; ++i){
                                if(scope.menus[i].menuId===scope.ussModel.menuId){
                                    scope.selectedMenuIndex = i;
                                    return;
                                }
                            }
                        };
                        setScope();

                        scope.menuSelectionChanged = function(){                            
                            scope.selectedMenu = angular.copy(scope.menus[scope.selectedMenuIndex]);
                            scope.ussModel.menuId = scope.selectedMenu.menuId;
                            scope.ussModel.menuItemSelections = [];
                        }
                    }
                }
            })
            .directive('ussDateTimeRequired',
            function ($ussFunctions, momentjs) {
                return {
                    restrict: 'E',
                    scope :{
                        ussModel : "=",
                        theForm: "="
                    },
                    link : function(scope, element, attr){
                        if(scope.ussModel.required){
                            scope.required = scope.ussModel.required;
                            scope.timeRequired = $ussFunctions.formatTime(scope.ussModel.required);
                        }
                        scope.minDate = new Date();
                        scope.timeRegex = $ussFunctions.timeRegex;
                        scope.update = function(){
                            try {
                                var hours = Number(scope.timeRequired.split(':')[0],10);
                                var minutes = Number(scope.timeRequired.split(':')[1],10);
                                if(momentjs(scope.required).isValid){
                                    scope.required.setHours(hours,minutes);
                                    scope.required = new Date(scope.required.setHours(hours,minutes));
                                    scope.ussModel.required = scope.required;
                                }   
                            } catch (ex) {
                                console.warn('possible unhandled exception in fields.js - ' + ex);
                            }
                        }
                    },
                    templateUrl: location + 'dateTimeRequired.htm'
                }
            })
            .directive('ussAdditionalComments',
            function (directiveTemplateLocation) {
                return {
                    restrict: 'E',
                    scope :{
                        ussModel : "="
                    },
                    templateUrl: directiveTemplateLocation + 'additionalComments.htm'
                }
            })
            .directive('ussDietaryRequirements',
            function (directiveTemplateLocation) {
                return {
                    restrict: 'E',
                    scope :{
                        ussModel : "="
                    },
                    templateUrl: directiveTemplateLocation + 'dietaryRequirements.htm'
                }
            })
            .directive('ussSiteSelect',
            function (ussData, directiveTemplateLocation) {
                return {
                    restrict: 'E',
                    scope: {
                        ussModel: "=",
                        theForm: "="
                    },
                    link: function(scope, element, attrs){
                        scope.siteChanged = function(){
                            if(scope.ussModel.site==1){
                                if(scope.rooms){
                                    delete scope.rooms
                                }
                            } else {
                                ussData.getLiverpoolRooms().then(function(result){
                                    scope.rooms = result;
                                });
                            }
                        }
                        ussData.getSites().then(function(result){
                            scope.sites = result;
                        });
                    },
                    templateUrl: directiveTemplateLocation + 'siteSelect.htm'
                }
            })
            .directive('ussRequestedBy',
            function (directiveTemplateLocation) {
                return {
                    restrict: 'E',
                    scope: {
                        ussModel: "=",
                        theForm: "="
                    },
                    templateUrl: directiveTemplateLocation + 'requestedBy.htm'
                }
            })
            .directive('ussSummaryView',
            function($mdDateLocale,$ussFunctions,directiveTemplateLocation){
                return {
                    restrict: 'E',
                    templateUrl: directiveTemplateLocation + 'summaryView.htm',
                    scope: {
                        ussModel: "=",
                        menus: "="
                    },
                    link: function(scope, element, attrs){
                        scope.formatDate = $mdDateLocale.formatDate;
                        scope.formatTime = $ussFunctions.formatTime;
                        scope.menuItemFilter = function(value, index, array){
                            if(!scope.ussModel.menuItemSelections) {
                                return false;
                            }
                            for(var i =0;i<scope.ussModel.menuItemSelections.length;i++){
                                if(scope.ussModel.menuItemSelections[i].menuItemId==value.menuItemId){
                                    value.quantity = scope.ussModel.menuItemSelections[i].quantity;
                                    return true;
                                }
                            }
                            return false;
                        }
                        scope.menuFilter = function(value, index, array){
                            if(value.menuId===scope.ussModel.menuId){
                                return true;
                            }
                            return false;
                        }
                    }
                }
            })
            .directive('ussMenuChoice',
            function(directiveTemplateLocation){
                return {
                    restrict: 'E',
                    templateUrl: directiveTemplateLocation + 'menuChoice.htm',
                    scope : {
                        ussModel :"=",
                        theForm: "=",
                        attendees: "@",
                        selectedMenu: "="
                    },
                    controller: function($scope) {
                        $scope.menuFilter = function(value, index, array){
                            if(value.menuId===$scope.ussModel.menuId){
                                return true;
                            }
                            return false;
                        }
                        var requiredSS = false;
                        var cachedSet = {};

                        $scope.switchFilter = function(value, index, array){
                            if(!$scope.ussModel.menuItemSelections){
                                return true;
                            }
                            value.quantity = undefined;
                            for(var i =  0; i <$scope.ussModel.menuItemSelections.length;i++){
                                if($scope.ussModel.menuItemSelections[i].menuItemId===value.menuItemId){
                                    value.selected = true;
                                    value.quantity = $scope.ussModel.menuItemSelections[i].quantity
                                }
                            }
                            return true;
                        }

                        $scope.onSwitched = function(item){
                            if(item.selected){
                                item.quantity = Number($scope.attendees,10);
                                $scope.ussModel.menuItemSelections.push(angular.copy(item));
                            } else {
                                delete item.quantity;
                                for(var i =  0; i <$scope.ussModel.menuItemSelections.length;i++){
                                    if($scope.ussModel.menuItemSelections[i].menuItemId===item.menuItemId){
                                        //value.selected = true;
                                        //value.quantity = $scope.ussModel.menuItemSelections[i].quantity
                                        //$scope.ussModel.menuItemSelections[i]
                                        $scope.ussModel.menuItemSelections.splice(i,1);
                                    }
                                }
                            }
                        }
                        $scope.onAmended = function(item){
                            for(var i =  0; i <$scope.ussModel.menuItemSelections.length;i++){
                                    if($scope.ussModel.menuItemSelections[i].menuItemId===item.menuItemId){
                                        //value.selected = true;
                                        //value.quantity = $scope.ussModel.menuItemSelections[i].quantity
                                        //$scope.ussModel.menuItemSelections[i]
                                        $scope.ussModel.menuItemSelections[i].quantity = item.quantity;
                                    }
                            }
                        }
                        $scope.isRequired = function(){
                            for(var i = 0;i<$scope.selectedMenu.menuItemCategories.length;i++){
                                for(var x = 0; x < $scope.selectedMenu.menuItemCategories[i].menuItems.length;x++){
                                    if($scope.selectedMenu.menuItemCategories[i].menuItems[x].selected){
                                        return false;
                                    }
                                }
                            }
                            return true;
                        }
                    }
                }
            })

    })();