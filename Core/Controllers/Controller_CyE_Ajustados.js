/**
 * Created by Josue on 25/11/2017.
 */
angular.module("acreditacion")

    .controller("CYE_Ajustados",function ($scope,Http_Request) {

        /*Start --------------------------------- Listas-----------------------------------------*/
        $scope.lista_cye = [{ID : "C1",Criterio : "Criterio 1"},{ID : "C2",Criterio : "Criterio 2"},{ID : "C3",Criterio :"Criterio 3"}];
        $scope.lista_cye_ajustados = [
            {
                ID : "C_A 1",
                Criterio : "Criterio 1",
                CriterioAjustado: "C Y A 1",
                Observacion : "Observacion 1",
                Valoracion : "Deficiente",
                Responsable : "Responsable 1",
                Correo: "Correo 1",
                FLOC : new Date()
            },
            {
                ID : "C_A 2",
                Criterio : "Criterio 2",
                CriterioAjustado: "C Y A 2",
                Observacion : "Observacion 2",
                Valoracion : "Excelente",
                Responsable : "Responsable 2",
                Correo: "Correo 2",
                FLOC : new Date()
            },
            {
                ID : "C_A 3",
                Criterio : "Criterio 3",
                CriterioAjustado: "C Y A 3",
                Observacion : "Observacion 3",
                Valoracion : "Regular",
                Responsable : "Responsable 3",
                Correo: "Correo 3",
                FLOC : new Date()
            }
        ];
        $scope.lista_responsables = [
            {Responsable : "Responsable 1",Correo: "Correo 1"},
            {Responsable : "Responsable 2",Correo : "Correo 2"},
            {Responsable : "Responsable 3", Correo: "Correo 3"}];
        $scope.lista_valoraciones = [{Valoracion : "Deficiente"},{Valoracion : "Regular"},{Valoracion : "Bien"},{Valoracion : "Excelente"}];
        /*---------------------------------------END Listas---------------------------------------------------------*/

        /*Start -------------------------------- Variables--------------------------------------------------*/
        let http_request = {
            method : "",
            endPoint : ""
        };
        /*-----------INSERT-------------*/
        $scope.new_item ={
            Criterio : "",
            CriterioAjustado : "",
            Observacion : "",
            Valoracion : "",
            Responsable : "",
            Correo : "",
            FLOC : ""
        };
        /*----------END INSERT----------------*/

        /*-----------EDIT---------------*/
        $scope.cye_selected_edit = {
          ID: "",
          Criterio : "",
          CriterioAjustado : "",
          Observaciones : "",
          Valoracion : "",
          Responsable : "",
          Correo: "",
          FLOC : ""
        };
        /*----------END EDIT----------------*/
        /*--------------------------END Variables---------------------------------------------*/

        /*Start -------------------------Methods---------------------------------*/
        /*Start ---On Load --Description: Get the data from the server when the page loads---------*/
        $scope.onLoad = function () {
            getData();
        };
        /*---------------------------END On Load---------------------------------*/

        /*Start------INSERT-- Description: send a new item to the endPoint insertComponente-----*/
        $scope.insertData = function (new_item) {
            http_request.method = "POST";
            http_request.endPoint = "";
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
                            {Criterio : new_item.Criterio, CriterioAjustado : new_item.CriterioAjustado, Observacion : new_item.Observacion,
                             Valoracion : new_item.Valoracion, Responsable : new_item.Responsable, Correo: new_item.Correo, FLOC: new_item.FLOC},
                            function (response) {
                                if(response.data) {
                                    getData();
                                    swal("Alerta","Registro insertado con éxito!","success");
                                }
                                else swal("Alerta","Error al insertar el registro!","error");
                            });
                    }
                );
            }
        };
        //Check if inputs of the add modal are not empty
        function insert_validation(item) {
        }
        /*---------------------------END INSERT----------------------------------*/

        /*Start---------EDIT-- Description: edits the information of an existing register---*/
        //Opens the modal and loads the selected information
        $scope.openEditModal = function(item){
            $scope.cye_selected_edit.ID = item.ID;
            $scope.cye_selected_edit.Criterio = item.Criterio;
            $scope.cye_selected_edit.CriterioAjustado = item.CriterioAjustado;
            $scope.cye_selected_edit.Observaciones = item.Observacion;
            $scope.cye_selected_edit.Valoracion = item.Valoracion;
            $scope.cye_selected_edit.Responsable = item.Responsable;
            $scope.cye_selected_edit.Correo = item.Correo;
            $scope.cye_selected_edit.FLOC = item.FLOC;
            $("#modalEditCYEA").modal("show");
        };
        $scope.editData = function (new_item) {
            http_request.method = "POST";
            http_request.endPoint = "";
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
                            {ID : new_item.ID,Criterio : new_item.Criterio, CriterioAjustado : new_item.CriterioAjustado,
                                Observacion : new_item.Observaciones,Valoracion : new_item.Valoracion, Responsable : new_item.Responsable,
                                Correo : new_item.Correo, FLOC : new_item.FLOC},
                            function (response) {
                                if(response.data) {
                                    getData(); //Refresh the information
                                    swal("Alerta","Registro editado con éxito!","success");
                                }
                                else swal("Alerta","Error al editar el registro!","error");
                            });
                    }
                );
            }
        };
        //Check if inputs of the edit modal are not empty
        function edit_validation(item) {
        }
        /*---------------------------END EDIT------------------------------------*/

        /*Start--------DELETE-- Description: remove an existing register from the data base-----*/
        $scope.deleteData = function (ID_CYA) {
            http_request.method = "POST";
            http_request.endPoint = "";
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
                    Http_Request.Http_Request(http_request,{ID:ID_CYA},function (response) {
                        if(response.data){
                            delete_auxiliar(ID_Componente);
                            swal("Alerta","Registro eliminado con éxito!","success");
                        }
                        else swal("Alerta","Error al eliminar el registro!","error");
                    });

                }
            );
        };
        /*Allows to remove the deleted item from the current list(Lista_cye_ajustados)*/
        function delete_auxiliar(ID_CYA) {
            for(item in $scope.lista_cye_ajustados){
                if($scope.lista_cye_ajustados[item].ID == ID_CYA){
                    $scope.lista_cye_ajustados.splice(item,1);
                }
            }
        }
        /*---------------------------END DELETE----------------------------------*/

        /*Start--------------------------Aux Methods-----------------------------*/
        //Obtains the information from the endPoint selectDimensiones and selectComponentes
        function getData() {
            http_request.method = "GET";
            http_request.endPoint = "";
            setTimeout(function () {
                $scope.$apply(function () {
                    Http_Request.Http_Request(http_request,{},function (response){
                        if(response.data != null)$scope.lista_dimensiones = response.data;
                        else $.notify("Error al obtener las dimensiones!","error");
                    });
                });
            }, 250);
        }
        /*---------------------------END Aux Methods-----------------------------*/

        /*----------------------------END Methods -------------------------------*/

    })
;
