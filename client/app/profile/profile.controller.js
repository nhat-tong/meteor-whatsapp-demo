/**
 * Created by htong on 06/03/2016.
 */
(function(){
    'use strict';

    angular
        .module('Whatsapp')
        .controller('ProfileCtrl', ProfileController);

    //@ngInject
    function ProfileController($scope, $state, $reactive, $log, $ionicPopup, $ionicLoading) {
        var vm = this;
        $reactive(vm).attach($scope);

        let user = Meteor.user();
        let nickName = (user && user.profile ? user.profile.name : '');

        vm.name = nickName;
        vm.updateName = updateName;
        vm.updatePicture = updatePicture;

        activate();

        function activate() {
            $log.info(Meteor.user());
        }

        function updateName() {
            if(_.isEmpty(vm.name)) return;

            whatsapp.methods.updateName.call({
                name: vm.name
            }, (err,res) => {
                if(err) {
                    return handleError(err);
                } else {
                    $state.go('tab.chats');
                }
            })
        }

        function updatePicture() {
            MeteorCameraUI.getPicture({ width: 60, height: 80}, (err,data) => {
                // 1. If user cancel update
                if(err && err.error === 'cancel') {
                    return;
                }
                // 2. If error occurs
                if(err) {
                    return handleError(err);
                }

                $ionicLoading.show({
                    template: 'Updating picture...'
                });
                // 3. call to update user picture
                whatsapp.methods.updatePicture.call({
                    picture: data
                }, (err) => {
                    $ionicLoading.hide();
                    if(err) {
                        return handleError(err);
                    }

                    toastr.success('Your profile has been updated');
                });
            });
        }

        function handleError (err) {
            $log.error('profile save error ', err);

            $ionicPopup.alert({
                title: err.reason || 'Save failed',
                template: 'Please try again',
                okType: 'button-positive button-clear'
            });
        }
    }
})();