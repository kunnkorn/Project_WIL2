function init() {
    gapi.load('auth2', () => {
        gapi.auth2.init({
            client_id: '565819629218-hrjqptqk34lk5sq2599tasa7gc2tho24.apps.googleusercontent.com'
        })
    })
}

$.ajax({
    type: 'GET',
    url: '/datamaterials',
    success: (response) => {
        $(document).ready(function () {
            var array_item;
            var array_number;
            var str = sessionStorage.cart;
            var itemincart = str.split(",");
            let spawnitem = "";
            let indexitem = 0;
            for (let i = 0; i < response.length; i++) {
                if (response[i].material_id == itemincart[indexitem]) {
                    spawnitem += "<div class='d-lg-flex my-4 justify-content-between align-items-center bg-white rounded cart-item shadow col-12 col-lg-10 mx-auto p-1'><div class='mr-1 float-left float-lg-none mt-5 mt-sm-4 pt-lg-0 pt-5'><input type='checkbox' name='icart' class='cart' value='" + response[i].material_id + "' style='height: 25px; width: 25px;'></div><div class='mx-2 my-5 my-sm-4 my-md-3 text-center text-lg-none'>รหัสวัสดุ : " + response[i].material_id + "</div><div class='mx-2 my-5 my-sm-4 my-md-3 text-center text-lg-none'>ชื่อรายการ : " + response[i].material_name + "</div><div class='mx-auto my-3 col-5 m-lg-none'><input type='number' class='form-control'id='" + response[i].material_id + "' placeholder='จำนวนเบิก'></div><div class='align-items-center text-center'><i class='fa fa-trash mb-1 text-danger'style='font-size: 25px;'></i></div></div>"
                    indexitem++;
                }
            }
            $("#listItem-area").html(spawnitem);
            $("#btn-requis").prop('disabled', true);
            // $("input[type='number']").prop('disabled', true);
            $(".cart").click(function () {
                let listcheck = $("input[name='icart']:checked");
                let txtitem = "";
                for (let i = 0; i < listcheck.length; i++) {
                    txtitem += listcheck[i].value + ",";
                }
                array_item = txtitem.split(",");
                array_number = txtitem.split(",");
                // if (array_item != "") {
                //     $("#" + $(this).attr('value')).prop('disabled', false);
                //     $("#" + $(this).attr('value')).val(0);
                // } else {
                //     $("#" + $(this).attr('value')).prop('disabled', true);
                // }
                if (array_item != "") {
                    $("#btn-requis").prop('disabled', false);
                } else {
                    $("#btn-requis").prop('disabled', true);
                }
            });
            $("#btn-requis").on("click", function () {
                let txtitem = "";
                let checknumber = 0;
                if ($("#anno").val() == "") {
                    $("#anno").text("หมายเหตุ : -");
                } else {
                    $("#anno").text("หมายเหตุ : " + $("#txtanno").val());
                }

                for (let i = 0; i < array_item.length; i++) {
                    if (array_item[i] != "") {
                        array_number[i] = $("#" + array_item[i]).val();
                        checknumber += $("#" + array_item[i]).val();
                    }
                }
                if (checknumber == "" || checknumber == 0) {
                    $("#btn-confirm").prop('disabled', true);
                } else {
                    $("#btn-confirm").prop('disabled', false);
                }
                console.log(array_number + " " + array_item);
                let indexitem = 0;
                for (let i = 0; i < response.length; i++) {
                    if (response[i].material_id == array_item[indexitem]) {
                        txtitem += "<div class='container-fluid'><div class='row'><p class='col-8'>รายการวัสดุ : " + response[i].material_id + "</p><text class='ml-auto mr-3' >" + array_number[indexitem] + "</text><p class='col-12'>ชื่อรายการ : " + response[i].material_name + " </p><hr size='2' class='ml-0 col-6'></div></div>";
                        indexitem++;
                    }
                }
                $("#result-area").html(txtitem);

            })

            $("input[type='number']").keyup(function () {

                if ($(this).val() < 0) {
                    $(this).val(0);
                }
            });
            // Page
            // To material Page
            $("#mymat").on("click", function () {
                window.location.replace('/materialuser')
            })

            // Logout
            $("#logout").on("click", function () {
                const auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(() => {
                    window.location.replace('/logout');
                })
            })

            // Notification
            $("#myrequi").on("click", function () {
                window.location.replace('/notificationuser')
            })

            // Count Notification
            $.ajax({
                type: "POST",
                url: "/countnoti",
                success: function (data) {
                    $("#countnoti").text(data[0].COUNTNOTI)
                }
            });


            $("#btn-confirm").on("click", function () {
                let txtObjective = $("#Objective").val();
                if (txtObjective == "เลือกวัตถุประสงค์") {
                    txtObjective = $("#txtob").val();
                }
                let anota = $("#txtanno").val();
                Swal.fire({
                    icon: 'warning',
                    title: 'คุณแน่ใจใช่ไหม',
                    text: 'คุณแน่ใจใช่ไหมที่จะเบิกสิ่งของที่คุณเลือกมาทั้งหมด',
                    showCancelButton: true,
                    confirmButtonColor: '57FF09',
                    cancelButtonColor: 'FFF065',
                    confirmButtonText: 'ใช่ฉันต้องการ',
                    cancelButtonText: 'ไม่ฉันต้องการแก้ไข',
                }).then((result) => {
                    if (result.isConfirmed) {
                        $.ajax({
                            type: 'POST',
                            url: '/createRequisition',
                            data: { objective: txtObjective, annotation: anota },
                            success: (response) => {

                            }, error: (xhr) => {
                                alert(xhr.responseText);
                            }
                        });

                        for (let i = 0; i < array_item.length; i++) {
                            if (array_item == "") {

                            } else {
                                $.ajax({
                                    type: 'POST',
                                    url: '/addmatrequi',
                                    data: { material_id: array_item[i], numbermaterial: array_number[i] },
                                    success: (response) => {

                                    }, error: (xhr) => {
                                        console.log(xhr.responseText);
                                    }
                                });
                            }


                        }
                        window.location.replace("/materialuser");
                    }
                })
            })

        })
    }
});


// $(document).ready(function () {

// var str = sessionStorage.cart;
// var itemincart = str.split(",");

// // Page
// // To material Page
// $("#mymat").on("click", function () {
//     window.location.replace('/materialuser')
// })

// // Logout
// $("#logout").on("click", function () {
//     const auth2 = gapi.auth2.getAuthInstance();
//     auth2.signOut().then(() => {
//         window.location.replace('/logout');
//     })
// })

// // Notification
// $("#myrequi").on("click", function () {
//     window.location.replace('/notificationuser')
// })

// // Count Notification
// $.ajax({
//     type: "POST",
//     url: "/countnoti",
//     success: function (data) {
//         $("#countnoti").text(data[0].COUNTNOTI)
//     }
// });


// $("#btn-confirm").on("click", function () {

//     Swal.fire({
//         icon: 'warning',
//         title: 'คุณแน่ใจใช่ไหม',
//         text: 'คุณแน่ใจใช่ไหมที่จะเบิกสิ่งของที่คุณเลือกมาทั้งหมด',
//         showCancelButton: true,
//         confirmButtonColor: '57FF09',
//         cancelButtonColor: 'FFF065',
//         confirmButtonText: 'ใช่ฉันต้องการ',
//         cancelButtonText: 'ไม่ฉันต้องการแก้ไข',
//     }).then((result) => {
//         if (result.isConfirmed) {
//             window.location.replace("../view/Index.html");
//         }
//     })
// })

// $.ajax({
//     type: 'GET',
//     url: '/datamaterials',
//     success: (response) => {
//         let spawnitem = "";
//         let indexitem = 0;
//         for (let i = 0; i < response.length; i++) {
//             if (response[i].material_id == itemincart[indexitem]) {
//                 spawnitem += "<div class='d-lg-flex my-4 justify-content-between align-items-center bg-white rounded cart shadow col-12 col-lg-10 mx-auto p-1'><div class='mr-1 float-left float-lg-none mt-5 mt-sm-4 pt-lg-0 pt-5'><input type='checkbox' name='icart' value='" + response[i].material_id + "' style='height: 25px; width: 25px;'></div><div class='mx-2 my-5 my-sm-4 my-md-3 text-center text-lg-none'>รหัสวัสดุ : " + response[i].material_id + "</div><div class='mx-2 my-5 my-sm-4 my-md-3 text-center text-lg-none'>ชื่อรายการ : " + response[i].material_name + "</div><div class='mx-auto my-3 col-5 m-lg-none'><input type='number' class='form-control'id='" + response[i].material_id + "' placeholder='จำนวนเบิก'></div><div class='align-items-center text-center'><i class='fa fa-trash mb-1 text-danger'style='font-size: 25px;'></i></div></div>"
//                 indexitem++;
//             }
//         }
//         $("#listItem-area").html(spawnitem);
//         $(".cart").click(function () {
//             let listcheck = $("input[name='icart']:checked");
//             let txtitem = "";
//             for (let i = 0; i < listcheck.length; i++) {
//                 txtitem += listcheck[i].value + ",";
//             }
//             let array_item = txtitem.split(",");



//         });

//     }, error: (xhr) => {
//         alert(xhr.responseText);
//     }
// })
// $("#btn-requis").on("click", function () {




// })


// });


$(function () {
    // Sidebar toggle behavior
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar, #content').toggleClass('active');
    });
});