(
    function(){
        var ModalController = function($http, $scope, $timeout, catering, ussData, $mdDateLocale, $mdDialog, $ussFunctions, $animate) {
            var vm = this;
            vm.formData = ussData.reparseJSON(vm.selectedItem);
            vm.normal = true;
            vm.formatTime = $ussFunctions.formatTime;
            vm.formatDate = $mdDateLocale.formatDate;
            vm.form = {};
            vm.form.minDate = new Date();
            vm.edit = false;
            ussData.getLiverpoolRooms().then(function(result){
                vm.liverpoolRooms = result;
            });
            $animate.enabled();

            ussData.getLondonRooms().then(function(result){
                vm.londonRooms = result;
            });
            ussData.getSites().then(function(result){
                vm.offices = result;
            });

            vm.toggleEdit = function(){
                vm.edit = !vm.edit;
            }
            /*
            vm.editDialog = function(item){
                vm.normal = false;
                vm.edit = true;/*
                $('#readOnly').addClass('uss-fade-out');
                $('#edit').addClass('uss-fade-in');
                $timeout(function(){
                    vm.normal = false;
                    vm.edit = true;
                    $('#readOnly').removeClass('uss-fade-out');
                    $('#edit').removeClass('uss-fade-in');
                },500);
            }
            vm.readOnly = function(item){
                vm.normal = true;
                vm.edit = false;
                    /*
                $('#edit').addClass('uss-fade-out')
                $('#readOnly').addClass('uss-fade-in')
                $timeout(function(){
                    vm.normal = true;
                    vm.edit = false;
                    $('#edit').removeClass('uss-fade-out');
                    $('#readOnly').removeClass('uss-fade-in');
                },500);
                
            }*/
            catering.getMenus().then(function(result){
                vm.menues = result;
            })
            vm.closeDialog = function(){
                 $mdDialog.hide();
            }
            
            vm.timeRequired = vm.formatTime(vm.formData.required);
            
            vm.update = function(isValid){
                if(!isValid){
                    return;
                }
                var hours = Number(vm.timeRequired.split(':')[0],10);
                var minutes = Number(vm.timeRequired.split(':')[1],10);
                vm.formData.required.setHours(hours,minutes);
                vm.formData.adminComments = vm.formData.adminComments || [];
                vm.formData.adminComments.push({
                    user: 'David Hulmes',
                    comment: vm.adminComments
                });
                for(var i=0;i<vm.gridData.length;i++){
                    if(vm.gridData[i].reference === vm.formData.reference){
                        // splice 
                        vm.gridData.splice(i,1, vm.formData);
                        break;
                    }
                }
                vm.readOnly();
            }

            vm.accept = function(){
                vm.formData.status = "Accepted";
                for(var i=0;i<vm.gridData.length;i++){
                    if(vm.gridData[i].reference === vm.formData.reference){
                        // splice 
                        vm.gridData.splice(i,1, vm.formData);
                        break;
                    }
                }
                vm.closeDialog();
            }
        }
        angular.module('demo3').controller('ModalController', ModalController);
    }    
)();