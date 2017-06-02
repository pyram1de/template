(
    function(){
        var ModalController = function($http, $scope, $timeout, catering, ussData, $mdDateLocale, $mdDialog, $ussFunctions) {
            var vm = this;
            vm.formData = ussData.reparseJSON(vm.selectedItem);
            vm.normal = true;
            vm.form = {};
            vm.edit = false;
            $scope.formData = vm.formData;
            vm.toggleEdit = function(){
                vm.edit = !vm.edit;
            }
            vm.undo = function(){
                vm.formData = ussData.reparseJSON(vm.selectedItem);
                $scope.formData = vm.formData;
                //vm.edit = !vm.edit;
            }
            catering.getMenus('private').then(function(result){
                vm.menus = result;
            })
            catering.getSelectedMenu(vm.formData).then(function(response){
                vm.selectedMenu = angular.copy(response);
                console.log($scope);
            });
            vm.closeDialog = function(){
                 $mdDialog.hide();
            }
            vm.formValidations = {};
            vm.update = function(isValid){
                if(!isValid){
                    return;
                }
                
                vm.formData.adminComments = vm.formData.adminComments || [];
                vm.formData.adminComments.unshift({
                    createdBy: 'David Hulmes',
                    comment: vm.adminComments
                });
                vm.formData.adminComments_count = vm.formData.adminComments.length;
                for(var i=0;i<vm.gridData.length;i++){
                    if(vm.gridData[i].reference === vm.formData.reference){
                        catering.patch(vm.formData).then(function(response){
                                vm.gridData.splice(i,1, vm.formData);
                                vm.toggleEdit();
                        });
                        break;
                    }
                }
            }
            vm.accept = function(){
                vm.formData.status = "Accepted";
                vm.formData.adminComments = vm.formData.adminComments || [];
                vm.formData.adminComments.unshift({
                        createdBy: 'David Hulmes',
                        comment: ''
                    });
                vm.formData.adminComments_count = vm.formData.adminComments.length;
                for(var i=0;i<vm.gridData.length;i++){
                    if(vm.gridData[i].reference === vm.formData.reference){
                        // splice
                        catering.patch(vm.formData).then(function(response){
                                vm.gridData.splice(i,1, vm.formData);
                                vm.toggleEdit();
                        });
                        break;
                    }
                }
                vm.closeDialog();
            }
        }
        angular.module('privateFMS').controller('ModalController', ModalController);
    }    
)();