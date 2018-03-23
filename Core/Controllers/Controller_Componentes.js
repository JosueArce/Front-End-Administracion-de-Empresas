/**
 * Created by Josue on 27/11/2017.
 */
angular.module("acreditacion")
    /*Controller oncharge of managing the components side, allows to apply the CRUD, works along Http_Request factory*/
    .controller("Componentes",function ($scope,Http_Request) {
       /*Start ------------------------ Lists --------------------------------*/
       $scope.lista_componentes = [];
       $scope.lista_dimensiones = [];
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
           ID : "", // ID Dimension
           Dimension : "",
           Componente : ""
       };
       /*---EDIT------*/
       //Contains the information of the selected item that is about to be edited
       $scope.component_selected_edit = {
           ID_Componente : "",//ID of the component,
           Componente : "",
           ID_Dimension : "",
           Dimension : ""
       };

       /*----------------------------END Variables ----------------------------*/

       /*Start -------------------------Methods---------------------------------*/
       /*Start ---On Load --Description: Get the data from the server when the page loads---------*/
       $scope.onLoad = function () {
           getData();
       };
       /*---------------------------END On Load---------------------------------*/

       /*Start------INSERT-- Description: send a new item to the endPoint insertComponente-----*/
       $scope.insertData = function (new_item) {
            http_request.method = "POST";
            http_request.endPoint = "insertComponente";
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
                        Http_Request.Http_Request(http_request,
                            {ID_Dimension : new_item.ID_Dimension,Componente : new_item.Componente},function (response) {
                            if(response.data.success) {
                                getData();
                                swal("Alerta",response.data.message,"success");
                            }
                            else swal("Alerta",response.data.message,"error");
                        });
                    }
                );
            }
       };
       //Check if inputs of the add modal are not empty
       function insert_validation(item) {
           if(item.Dimension != "" && item.Componente) return true;
           else $.notify("Complete todos los campos primero!","info");
       }
       /*---------------------------END INSERT----------------------------------*/

       /*Start---------EDIT-- Description: edits the information of an existing register---*/
       //Opens the modal and loads the selected information
       $scope.openEditModal = function(item){
           $scope.component_selected_edit.ID_Dimension = item.ID_Dimension;
           $scope.component_selected_edit.Componente = item.Componente;
           $scope.component_selected_edit.Dimension = item.Dimension;
           $scope.component_selected_edit.ID_Componente = item.ID_Componente;
           $("#modalEditComponent").modal("show");
       };
       $scope.editData = function (new_item) {
           http_request.method = "POST";
           http_request.endPoint = "editComponente";
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
                       closeOnConfirm: true,
                       closeOnCancel: true
                   },
                   function() {
                       Http_Request.Http_Request(http_request,
                           {ID : new_item.ID_Componente, Componente : new_item.Componente, ID_Dimension : new_item.ID_Dimension},
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
        function edit_validation(item){
           if(item.Dimension != "" && item.Componente != "") return true;
           else $.notify("Complete todos los campos primero!","info");
        }
       /*---------------------------END EDIT------------------------------------*/

       /*Start--------DELETE-- Description: remove an existing register from the data base-----*/
       $scope.deleteData = function (ID_Componente) {
           http_request.method = "POST";
           http_request.endPoint = "deleteComponente";
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
                   Http_Request.Http_Request(http_request,{ID:ID_Componente},function (response) {
                        if(response.data.success){
                            delete_auxiliar(ID_Componente);
                            swal("Alerta",response.data.message,"success");
                        }
                        else swal("Alerta",response.data.message,"error");
                   });

               }
           );
       };
        /*Allows to remove the deleted item from the current list(lista_componentes)*/
        function delete_auxiliar(ID_Componente) {
            for(item in $scope.lista_componentes){
                if($scope.lista_componentes[item].ID_Componente == ID_Componente){
                    $scope.lista_componentes.splice(item,1);
                }
            }
        }
       /*---------------------------END DELETE----------------------------------*/

       /*Start--------------------------Aux Methods-----------------------------*/
       //Obtains the information from the endPoint selectDimensiones and selectComponentes
        function getData() {
           http_request.method = "GET";
           http_request.endPoint = "selectDimensiones";
            setTimeout(function () {
                $scope.$apply(function () {
                    Http_Request.Http_Request(http_request,{},function (response){ console.log(response);
                        if(response.data.success)$scope.lista_dimensiones = response.data.data;
                        else $.notify("Error!",response.data.message,"error");
                    });
                    http_request.endPoint = "selectComponentes";
                    Http_Request.Http_Request(http_request,{},function (response) {
                        if(response.data.success)$scope.lista_componentes = response.data.data;
                        else $.notify("Error!",response.data.message,"error");
                    });
                });
            }, 250);
       }
       //Update the ID Dimension every time the select dimension changes on the ADD REGISTER MODAL and EDIT REGISTER MODAL
       $scope.update_ID_Dimension = function (Dimension) {
           for(item in $scope.lista_dimensiones){
               if($scope.lista_dimensiones[item].Dimension == Dimension){
                   $scope.new_item.ID_Dimension = $scope.lista_dimensiones[item].ID;
               }
           }
       };
       /*---------------------------END Aux Methods-----------------------------*/

       /*----------------------------END Methods -------------------------------*/
    })
;