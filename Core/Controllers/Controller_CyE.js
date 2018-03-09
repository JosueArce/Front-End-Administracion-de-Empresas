/**
 * Created by Josue on 10/11/2017.
 */

angular.module('acreditacion')
    /**Charge of the CRUD for Criterios y Estándares, allows to manage the information*/
    .controller("CriteriosYEstandares",function ($scope,Http_Request) {
        /*Start ------------------------ Lists --------------------------------*/
        $scope.lista_criterios_y_estandares = [];
        $scope.lista_componentes = [];
        /*----------------------------END Lists--------------------------------*/

        /*Start -------------------------Variables -----------------------------*/
        /*HTTP REQUEST -- Description: used to place which method and endpoint will be use*/
        let http_request = {
            method : "",
            endPoint : ""
        };
        /*---INSERT----*/
        //Contains information about the new component
        $scope.new_item = {
            Criterio : "",
            ID_Componente : "",
            Componente : "",
            ID_Carrera : "1"
        };
        /*---EDIT------*/
        //Contains the information of the selected item that is about to be edited
        $scope.cye_selected_edit = {
            ID : "",//ID CRITERIO,
            Criterio : "",
            ID_Componente : "",
            Componente : "",
            ID_Carrera: ""
        };

        /*----------------------------END Variables ----------------------------*/

        /*Start -------------------------Methods---------------------------------*/
        /*Start ---On Load --Description: Get the data from the server when the page loads---------*/
        $scope.onLoad = function () {
            getData();
        };
        /*---------------------------END On Load---------------------------------*/

        /*Start------INSERT-- Description: send a new item to the endPoint insertCYE-----*/
        $scope.insertData = function (new_item) {
            http_request.method = "POST";
            http_request.endPoint = "insertCYE";
            if(insert_validation(new_item)){
                swal({
                        title: "Alerta",
                        text: "Seguro que desea insertar el registro? ",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonClass: "btn-primary",
                        confirmButtonText: "Sí!",
                        cancelButtonText: "No, Cancelar!",
                        cancelButtonClass:"btn-danger",
                        closeOnConfirm: false,
                        closeOnCancel: true
                    },
                    function() {
                        Http_Request.Http_Request(http_request,new_item,function (response) {
                            if(response.data.success) {
                                getData();
                                swal("Alerta! ",response.data.message,"success");
                            }
                            else swal("Alerta!",response.data.message,"error");
                        });
                    }
                );
            }
        };
        //Check if inputs of the add modal are not empty
        function insert_validation(item) {
            if(item.Criterio != "" && item.Componente != "") return true;
            else $.notify("Complete todos los campos primero!","info");
        }
        /*---------------------------END INSERT----------------------------------*/

        /*Start---------EDIT-- Description: edits the information of an existing register---*/
        $scope.openEditModal = function(item){
            $scope.cye_selected_edit.ID = item.ID_CYE;
            $scope.cye_selected_edit.Criterio = item.Criterio;
            $scope.cye_selected_edit.ID_Componente = item.ID_Componente;
            $scope.cye_selected_edit.ID_Carrera = '1';//item.ID_Carrera
            $scope.cye_selected_edit.Componente = item.Componente;
            $("#modalEditCYE").modal("show");
        };
        //Execute the http request when everything is ready to commit the edit
        $scope.editData = function (new_item) {
            http_request.method = "POST";
            http_request.endPoint = "editCYE";
            if(edit_validation(new_item)){
                swal({
                        title: "Alerta",
                        text: "Seguro que desea editar el registro? ",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonClass: "btn-primary",
                        confirmButtonText: "Sí!",
                        cancelButtonText: "No, Cancelar!",
                        cancelButtonClass:"btn-danger",
                        closeOnConfirm: false,
                        closeOnCancel: true
                    },
                    function() {
                        Http_Request.Http_Request(http_request,
                            {ID: new_item.ID,ID_Componente : new_item.ID_Componente,
                                ID_Carrera : new_item.ID_Carrera,Criterio : new_item.Criterio},
                            function (response) {
                            if(response.data.success) {
                                getData(); //Refresh the information
                                swal("Alerta",response.data.message,"success");
                            }
                            else swal("Alerta",response.data.message,"error");
                        });
                    }
                );
            }
        };
        //Check if inputs of the edit modal are not empty
        function edit_validation(item) {
            if(item.ID_Componente != "" && item.Componente != "" && item.ID_Dimension != "") return true;
            else $.notify("Complete todos los campos primero!","info");
        }
        /*---------------------------END EDIT------------------------------------*/

        /*Start--------DELETE-- Description: remove an existing register from the data base-----*/
        $scope.deleteData = function (ID_CYE) {
            http_request.method = "POST";
            http_request.endPoint = "deleteCYE";
            swal({
                    title: "Alerta",
                    text: "Seguro que desea eliminar? ",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: "btn-primary",
                    confirmButtonText: "Sí!",
                    cancelButtonText: "No, Cancelar!",
                    cancelButtonClass:"btn-danger",
                    closeOnConfirm: false,
                    closeOnCancel: true
                },
                function() {
                    Http_Request.Http_Request(http_request,{ID : ID_CYE},function (response) {
                        if(response.data.success){
                            delete_auxiliar(ID_CYE);
                            swal("Alerta",response.data.message,"success");
                        }
                        else swal("Alerta",response.data.message,"error");
                    });

                }
            );
        };
        /*Allows to remove the deleted item from the current list(lista_criterios_y_estzndares)*/
        function delete_auxiliar(ID_CYE) {
            for(item in $scope.lista_criterios_y_estandares){
                if($scope.lista_criterios_y_estandares[item].ID_CYE == ID_CYE){
                    $scope.lista_criterios_y_estandares.splice(item,1);
                    return;
                }
            }
        }
        /*---------------------------END DELETE----------------------------------*/

        /*Start--------------------------Aux Methods-----------------------------*/
        //Gets all the information from the endPoint selectCYE and selectComponentes
        function getData() {
            http_request.method = "GET";
            http_request.endPoint = "selectCYE";
            Http_Request.Http_Request(http_request,{},function (response) {
                if(response.data.success)$scope.lista_criterios_y_estandares = response.data.data;
                else $.notify("Error!",response.data.message,"info")
            });
            http_request.endPoint = "selectComponentes";
            Http_Request.Http_Request(http_request,{},function (response) {
                if(response.data.success) $scope.lista_componentes = response.data.data;
                else $.notify("Error!",response.data.message,"info");
            });
        }
        //Will Update the componente's ID when select option changes in the Edit Modal
        $scope.update_ID_Componente = function (Componente) {
            for(item in $scope.lista_componentes){
                if($scope.lista_componentes[item].Componente == Componente)
                {
                    $scope.new_item.ID_Componente = $scope.lista_componentes[item].ID_Componente;
                    $scope.cye_selected_edit.ID_Componente = $scope.lista_componentes[item].ID_Componente;
                    return;
                }
            }
        };
        /*---------------------------END Aux Methods-----------------------------*/

        /*----------------------------END Methods -------------------------------*/
    })
;
