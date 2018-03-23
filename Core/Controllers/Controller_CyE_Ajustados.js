/**
 * Created by Josue on 25/11/2017.
 */
angular.module("acreditacion")

    .controller("CYE_Ajustados",function ($scope,Http_Request) {

        /*Start --------------------------------- Listas-----------------------------------------*/
        $scope.lista_cye = [];
        $scope.lista_cye_ajustados = [
            {
                ID : "CYE1",
                CYE : "C1",
                ID_CYA : "CYA1",
                CriterioAjustado : "CA1",
                Observaciones : "Observacion",
                Valoracion : "Valoracion 1",
                Responsable : "Responsable 1",
                Correo : "Correo 1",
                FLOC : new Date(),
                FLA : new Date(),
                IncorporadoIAE : "SI",
                NivelIAE : "Bien"
            }
        ];
        $scope.lista_responsables = [
            {ID: "1",Responsable : "Responsable 1",Correo: "Correo 1"},
            {ID: "2",Responsable : "Responsable 2",Correo : "Correo 2"},
            {ID: "3",Responsable : "Responsable 3", Correo: "Correo 3"},
            {ID: "4",Responsable : "Responsable 4", Correo: "Correo 4"},
            {ID: "5",Responsable : "Responsable 5", Correo: "Correo 5"},
            {ID: "6",Responsable : "Responsable 6", Correo: "Correo 6"},
            {ID: "7",Responsable : "Responsable 7", Correo: "Correo 7"},
            {ID: "8",Responsable : "Responsable 8", Correo: "Correo 8"},
            {ID: "9",Responsable : "Responsable 9", Correo: "Correo 9"}];
        $scope.lista_responsables_seleccionados = [];
        $scope.lista_valoraciones = [];
        $scope.lista_nivel_IAE = [];

        /*---------------------------------------END Listas---------------------------------------------------------*/

        /*Start -------------------------------- Variables--------------------------------------------------*/
        let http_request = {
            method : "",
            endPoint : ""
        };
        /*-----------INSERT-------------*/
        $scope.new_item ={
            ID_CYE : "",
            Criterio : "",
            CriterioAjustado : "",
            Observaciones : "",
            ID_Valoracion : "",
            Valoracion : "",
            ID_Responsable : "",
            Responsable : "",
            FLOC : "",
            FLA : "",
            ID_NivelIAE : "",
            NivelIAE : "",
            IncorporadoIAE : ""
        };
        /*----------END INSERT----------------*/

        /*-----------EDIT---------------*/
        $scope.cye_selected_edit = {
          ID: "",
          ID_CYE : "",
          Criterio : "",
          CriterioAjustado : "",
          Observaciones : "",
          ID_Valoracion : "",
          Valoracion : "",
          ID_Responsable : "",
          Responsable : "",
          ID_NivelIAE : "",
          NivelIAE : "",
          FLOC : "",
          FLA : "",
          IncorporadoIAE : ""
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
            http_request.endPoint = "insertCYEA";
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
                             Valoracion : new_item.Valoracion, Responsable : new_item.Responsable, Correo: new_item.Correo, FLOC: new_item.FLOC,
                             FLA : new_item.FLA, IncorporadoIAE : new_item.IncorporadoIAE},
                            function (response) {
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
        }
        /*---------------------------END INSERT----------------------------------*/

        /*Start---------EDIT-- Description: edits the information of an existing register---*/
        //Opens the modal and loads the selected information
        $scope.openEditModal = function(item){ console.log(item);
            $scope.cye_selected_edit.ID = item.ID;
            $scope.cye_selected_edit.Criterio = item.CYE;
            $scope.cye_selected_edit.CriterioAjustado = item.CriterioAjustado;
            $scope.cye_selected_edit.Observaciones = item.Observaciones;
            $scope.cye_selected_edit.Valoracion = item.Valoracion;
            $scope.cye_selected_edit.Responsable = item.Responsable;
            $scope.cye_selected_edit.Correo = item.Correo;
            $scope.cye_selected_edit.FLOC = item.FLOC;
            $scope.cye_selected_edit.FLA = item.FLA;
            $scope.cye_selected_edit.NivelIAE = item.NivelIAE;
            $scope.cye_selected_edit.IncorporadoIAE = item.IncorporadoIAE;
            $("#modalEditCYEA").modal("show");
            console.log("Nuevo : "+ JSON.stringify($scope.cye_selected_edit));
        };
        $scope.editData = function (new_item) {
            http_request.method = "POST";
            http_request.endPoint = "editCYEA";
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
        }
        /*---------------------------END EDIT------------------------------------*/

        /*Start--------DELETE-- Description: remove an existing register from the data base-----*/
        $scope.deleteData = function (ID_CYA) {
            http_request.method = "POST";
            http_request.endPoint = "deleteCYEA";
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
                        if(response.data.success){
                            delete_auxiliar(ID_Componente);
                            swal("Alerta",response.data.message,"success");
                        }
                        else swal("Alerta",response.data.message,"error");
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
            setTimeout(function () {
                $scope.$apply(function () {

                    //Obtains the intel from DB about CYE_Ajustados
                    http_request.endPoint = "selectCYEA";
                    Http_Request.Http_Request(http_request,{},function (response){
                        if(response.data.success)$scope.lista_cye_ajustados = response.data.data;
                        else $.notify("Error!",response.data.message,"error");
                    });

                    //Gets the data from DB about CYE
                    http_request.endPoint = "selectCYE";
                    Http_Request.Http_Request(http_request,{},function (response) {
                        if(response.data.success)$scope.lista_cye = response.data.data;
                        else $.notify("Error!",response.data.message,"error");
                    });

                    //Gets data from DB related with nivel IAE
                    http_request.endPoint = "selectNivelIAE";
                    Http_Request.Http_Request(http_request,{},function (response) {console.log("NivelIAE: "+JSON.stringify(response.data.data));
                        if(response.data.success)$scope.lista_nivel_IAE = response.data.data;
                        else $.notify("Error!",response.data.message,"error");
                    });

                    //Obtains the information of valoraciones from DB
                    http_request.endPoint = "selectValoracion";
                    Http_Request.Http_Request(http_request,{},function (response) {console.log("VALORACIONES: "+JSON.stringify(response.data.data));
                        if(response.data.success)$scope.lista_valoraciones = response.data.data;
                        else $.notify("Error!",response.data.message,"error");
                    });

                });
            }, 250);
        }

        //Update ID's on change select item
        $scope.updateIDCriterio = function (Criterio) {
            for(item in $scope.lista_cye){
                if($scope.lista_cye[item].CYE == Criterio){
                    $scope.new_item.ID_CYE = $scope.lista_cye[item].ID_CYE;
                    $scope.cye_selected_edit.ID_CYE = $scope.lista_cye[item].ID_CYE;
                    return;
                }
            }
        };
        $scope.updateIDvaloracion = function (Valoracion) {
          for(item in $scope.lista_valoraciones){
              if($scope.lista_valoraciones[item].Valoracion == Valoracion){
                $scope.new_item.ID_Valoracion == $scope.lista_valoraciones[item].ID;
                $scope.cye_selected_edit.ID = $scope.lista_valoraciones[item].ID;
                return;
              }
          }
        };
        $scope.updateIDNivelIAE = function (NivelIAE) {
            for(item in $scope.lista_nivel_IAE){
                if($scope.lista_nivel_IAE[item].Nivel == NivelIAE){
                    $scope.new_item.ID_NivelIAE = $scope.lista_nivel_IAE[item].ID;
                    $scope.cye_selected_edit.ID_NivelIAE = $scope.lista_nivel_IAE[item].ID;
                    return;
                }
            }
        };

        //selected responsable
        $scope.addResponsable = function (new_responsable) {console.log(new_responsable);
            for(var item = 0; item < $scope.lista_responsables.length;item++){
                if($scope.lista_responsables[item].Responsable == new_responsable && !existResponsable(new_responsable)){
                    $scope.lista_responsables_seleccionados.push($scope.lista_responsables[item]);
                    console.log($scope.lista_responsables_seleccionados);
                    return;
                }
            }
        };
        //Verify if the responsable is not already selected
        function existResponsable(Responsable) {
            for(item in $scope.lista_responsables_seleccionados){
                if($scope.lista_responsables_seleccionados[item].Responsable == Responsable)return true;
            }
            return false;
        }
        //Removed responsable
        $scope.removeResponsable = function (responsable) {
            for(item in $scope.lista_responsables_seleccionados){
                if($scope.lista_responsables_seleccionados[item].Responsable == responsable)
                {
                    $scope.lista_responsables_seleccionados.splice(item,1);
                    return;
                }
            }
        };
        /*---------------------------END Aux Methods-----------------------------*/

        /*----------------------------END Methods -------------------------------*/

    })
;
