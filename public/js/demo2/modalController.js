(
    function(){
        var ModalController = function($http, $scope, $timeout, catering, ussData, $mdDateLocale, $mdDialog, $ussFunctions) {
            var vm = this;
            vm.numberMatch = /\d/;
            vm.timeRegex = $ussFunctions.timeRegex;
            vm.save = function(){
                vm.running = true;
                catering.post(vm.formData).then(function(data){
                    vm.running = false;
                    vm.selectedIndex = 3; // move page on to submission
                    vm.submitData = data;
                    vm.submited=true;
                });
            }
            catering.getMenus().then(function(result){
                vm.menues = result;
            })
            vm.showHints = true;
            ussData.getLiverpoolRooms().then(function(result){
                vm.liverpoolRooms = result;
            });
            ussData.getLondonRooms().then(function(result){
                vm.londonRooms = result;
            });
            ussData.getSites().then(function(result){
                vm.offices = result;
            });
            $ussFunctions.getCurrentUser().then(function(result){
                vm.formData = vm.formData || {};
                vm.formData.createdBy = result.name;
                vm.formData.site = result.site;
            });
            vm.moveBack = function(){
                vm.selectedIndex = vm.selectedIndex - 1;
            }
            vm.submit = function(valid){
                if(valid){
                    vm.selectedIndex = 1;
                    vm.passed=true;
                }
                return true;
            };
            vm.review = function(){
                var hours = Number(vm.timeRequired.split(':')[0],10);
                var minutes = Number(vm.timeRequired.split(':')[1],10);
                vm.formData.required.setHours(hours,minutes);
            }
            vm.userInput = {};
            vm.form = {
                minDate : new Date(),
                dateRequired: ""
            };
            vm.formatDate = $mdDateLocale.formatDate;
            vm.formatTime = $ussFunctions.formatTime;
            vm.closeDialog = function(){
                 $mdDialog.hide();
            }
        }
        angular.module('demo2').controller('ModalController', ModalController);
    }    
)
();