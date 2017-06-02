(
    function(){
        var ModalController = function($scope, catering, ussData, $mdDialog, $ussFunctions) {
            var vm = this;
            vm.showHints = true;
            vm.formData = vm.formData || {};
            vm.save = function(){
                vm.running = true;
                vm.formData.required
                catering.post(vm.formData).then(function(data){
                    vm.running = false;
                    vm.selectedIndex = 4; // move page on to submission
                    vm.submitData = data;
                    //console.log(vm.submitData);
                    vm.submited=true;
                });
            }
            catering.getMenus('public').then(function(result){
                vm.menus = result;
                vm.formData.selectedMenu = vm.menus[0];
            });
            
            $ussFunctions.getCurrentUser().then(function(result){
                vm.formData.createdBy = result.name;
                vm.formData.site = result.site;
            });
            vm.moveBack = function(){
                vm.selectedIndex = vm.selectedIndex - 1;
            }
            vm.next = function(valid){
                if(valid){
                    console.log($scope);
                    vm.selectedIndex += 1;
                    return true;
                }
                return false;
            };
            vm.userInput = {};
            vm.closeDialog = function(){
                 $mdDialog.hide();
            }
        }
        angular.module('publicFMS').controller('ModalController', ModalController);
    }    
)
();