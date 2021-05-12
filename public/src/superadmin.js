function init() {
    gapi.load('auth2', () => {
        gapi.auth2.init({
            client_id: '565819629218-hrjqptqk34lk5sq2599tasa7gc2tho24.apps.googleusercontent.com'
        });
    });
}

function signout() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
        window.location.replace('/logout');
    });
}

function rotateCard(btn) {
    var $card = $(btn).closest('.card-container');
    // console.log($card);
    if ($card.hasClass('hover')) {
        $card.removeClass('hover');
    } else {
        $card.addClass('hover');
    }
}


$(document).ready(function () {


    $.ajax({
        type: "GET",
        url: "/getuser",
        success: (response) => {
            const array_user = response;

            let spawncard = "";
            for (let i = 0; i < array_user.length; i++) {

                if (array_user[i].image == null) {
                    array_user[i].image = 'https://api.iconify.design/ion:person-circle.svg';
                }

                if (array_user[i].user_role != 1) {

                    if (array_user[i].status_user == 1) {
                        spawncard += "<div class='col-xl-3 col-lg-5 col-md-6 col-sm-7 filter-card' style='height: 450px;' data-string='"+ (array_user[i].name + array_user[i].rank + array_user[i].email) +"'><div class='card-container manual-flip'><div class='card' style='border: none;'><div class='front text-center'><img class='card-img-top rounded-circle shadow mt-3' src='" + array_user[i].image + "'style='width: 40%;'><div class='card-body'><h5>" + array_user[i].name + "</h5><h5>ตำแหน่ง : " + array_user[i].rank + "</h5><h5 class='mb-3'>เมลล์ : " + array_user[i].email + "</h5><button class='btn btn-primary col-5 mb-3 shadow' onclick='rotateCard(this)'>จัดการ</button></div></div><div class='back text-center'><div class='content'><div class='main'><h5 class='text-center mx-3 mt-5 pt-2'>" + array_user[i].name + "</h5><div class='col-12 text-center my-5'><button class='btn btn-secondary px-sm-4 active' id='" + (array_user[i].user_id + "," + array_user[i].name) + "'>เปิดสิทธิ์</button></div><div class='col-12 text-center my-5'><button class='btn btn-warning px-sm-4 inactiveuser' id='" + (array_user[i].user_id + "," + array_user[i].name) + "'>ระงับสิทธิ์</button></div><div class='col-12 text-center mb-5'><button class='btn btn-danger px-sm-5 deuser' id='" + (array_user[i].user_id + "," + array_user[i].name) + "'>ลบ</button></div><button class='btn btn-simple' rel='tooltip' title='Flip Card'onclick='rotateCard(this)' id='hidebtn'><span class='iconify'data-inline='false' data-icon='ri:arrow-go-back-line'></span></button></div></div></div></div></div></div>";
                    } else {
                        spawncard += "<div class='col-xl-3 col-lg-5 col-md-6 col-sm-7 filter-card' style='height: 450px;' data-string='"+ (array_user[i].name + array_user[i].rank + array_user[i].email) +"'><div class='card-container manual-flip'><div class='card' style='border: none;'><div class='front text-center'><img class='card-img-top rounded-circle shadow mt-3' src='" + array_user[i].image + "'style='width: 40%;'><div class='card-body'><h5>" + array_user[i].name + "</h5><h5>ตำแหน่ง : " + array_user[i].rank + "</h5><h5 class='mb-3'>เมลล์ : " + array_user[i].email + "</h5><button class='btn btn-primary col-5 mb-3 shadow' onclick='rotateCard(this)'>จัดการ</button></div></div><div class='back text-center'><div class='content'><div class='main'><h5 class='text-center mx-3 mt-5 pt-2'>" + array_user[i].name + "</h5><div class='col-12 text-center my-5'><button class='btn btn-success px-sm-4 activeuser' id='" + (array_user[i].user_id + "," + array_user[i].name) + "'>เปิดสิทธิ์</button></div><div class='col-12 text-center my-5'><button class='btn btn-secondary px-sm-4 active' id='" + (array_user[i].user_id + "," + array_user[i].name) + "'>ระงับสิทธิ์</button></div><div class='col-12 text-center mb-5'><button class='btn btn-danger px-sm-5 deuser' id='" + (array_user[i].user_id + "," + array_user[i].name) + "'>ลบ</button></div><button class='btn btn-simple' rel='tooltip' title='Flip Card'onclick='rotateCard(this)' id='hidebtn'><span class='iconify'data-inline='false' data-icon='ri:arrow-go-back-line'></span></button></div></div></div></div></div></div>";
                    }

                } else {
                    spawncard += "<div class='col-xl-3 col-lg-5 col-md-6 col-sm-7 filter-card' style='height: 450px;' data-string='"+ (array_user[i].name + array_user[i].rank + array_user[i].email) +"'><div class='card-container manual-flip'><div class='card' style='border: none;'><div class='front text-center'><img class='card-img-top rounded-circle shadow mt-3' src='" + array_user[i].image + "'style='width: 40%;'><div class='card-body'><h5>" + array_user[i].name + "</h5><h5>ตำแหน่ง : " + array_user[i].rank + "</h5><h5 class='mb-3'>เมลล์ : " + array_user[i].email + "</h5><button class='btn btn-secondary col-5 mb-3 shadow active'>จัดการ</button></div></div><div class='back text-center'><div class='content'><div class='main'><h5 class='text-center mx-3 mt-5 pt-2'>" + array_user[i].name + "</h5><div class='col-12 text-center my-5'><button class='btn btn-success px-sm-4'>เปิดสิทธิ์</button></div><div class='col-12 text-center my-5'><button class='btn btn-warning px-sm-4'>ระงับสิทธิ์</button></div><div class='col-12 text-center mb-5'><button class='btn btn-danger px-sm-5'>ลบ</button></div><button class='btn btn-simple' rel='tooltip' title='Flip Card'onclick='rotateCard(this)' id='hidebtn'><span class='iconify'data-inline='false' data-icon='ri:arrow-go-back-line'></span></button></div></div></div></div></div></div>";
                }
            }

            $("#card-area").html(spawncard);
            $('.activeuser').click(function () {
                const iduser = $(this).attr('id');
                // console.log("active");

                let resultuser = iduser.split(",");
                let user_id = resultuser[0];
                Swal.fire({
                    title: 'คุณแน่ใจใช่หรือไม่ ?',
                    text: "ที่ต้องการเปิดสิทธิ์การใช้งานของคุณ " + resultuser[1],
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'ตกลง',
                    cancelButtonText: 'ยกเลิก',
                }).then((result) => {
                    if (result.isConfirmed) {
                        $.ajax({
                            type: 'POST',
                            url: '/enauser',
                            data: { user_id },
                            success: (response) => {
                                Swal.fire(
                                    'เปิดสิทธิ์สำเร็จ',
                                    'คุณได้ทำการเปิดสิทธิ์สมาชิกคนนี้เรียบร้อยแล้ว',
                                    'success'
                                ).then((result) => {
                                    if (result.isConfirmed) {
                                        location.reload();
                                    }
                                })

                            },
                            error: (xhr) => {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: xhr.responseText,
                                })
                            }
                        })

                    }
                })
            });

            $('.inactiveuser').click(function () {
                const iduser = $(this).attr('id');
                let resultuser = iduser.split(",");
                let user_id = resultuser[0];
                // console.log(nameuser);
                Swal.fire({
                    title: 'คุณแน่ใจใช่หรือไม่ ?',
                    text: "ที่ต้องการระงับสิทธิ์การใช้งานของคุณ " + resultuser[1],
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'ตกลง',
                    cancelButtonText: 'ยกเลิก',
                }).then((result) => {
                    if (result.isConfirmed) {
                        $.ajax({
                            type: 'POST',
                            url: '/disuser',
                            data: { user_id },
                            success: (response) => {
                                Swal.fire(
                                    'ระงับสิทธิ์สำเร็จ',
                                    'คุณได้ทำการระงับสิทธิ์สมาชิกคนนี้เรียบร้อยแล้ว',
                                    'success'
                                ).then((result) => {
                                    if (result.isConfirmed) {
                                        location.reload();
                                    }
                                })

                            },
                            error: (xhr) => {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: xhr.responseText,
                                })
                            }
                        })

                    }
                })

            });
            $('.deuser').click(function () {
                const iduser = $(this).attr('id');
                // console.log("delete");
                let resultuser = iduser.split(",");
                let user_id = resultuser[0];
                Swal.fire({
                    title: 'คุณแน่ใจใช่หรือไม่ ?',
                    text: "ที่ต้องการลบคุณ " + resultuser[1] + " ออกจากระบบ",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'ตกลง',
                    cancelButtonText: 'ยกเลิก',
                }).then((result) => {
                    if (result.isConfirmed) {
                        $.ajax({
                            type: 'POST',
                            url: '/deleteuser',
                            data: { user_id },
                            success: (response) => {
                                Swal.fire(
                                    'ลบสมาชิกสำเร็จ!',
                                    'คุณได้ทำการลบสมาชิกเรียบร้อยแล้ว',
                                    'success'
                                ).then((result) => {
                                    if (result.isConfirmed) {
                                        location.reload();
                                    }
                                })


                            },
                            error: (xhr) => {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: xhr.responseText,
                                })
                            }
                        })

                    }
                })
            });
        },
        error: (xhr) => {
            alert(xhr.responseText);
        }
    })

    $("#btncanUser").click(function () {
        $("#iduser").val("");
        $("#rank").val("");
        $("#name").val("");
        $("#lastname").val("");
        $("#email").val("");
        $("#modelAdduser").modal("hide");
    })

    $("#myInput").on("keyup", function () {
        var input = $(this).val().toUpperCase();

        $(".filter-card").each(function () {
            if ($(this).data("string").toUpperCase().indexOf(input) < 0) {
                $(this).hide();
            } else {
                $(this).show();
            }
        })
    });

    $("#formAdduser").submit(function (e) {
        e.preventDefault();
        // const dataForm = new FormData(this);
        let iduser = $("#iduser").val();
        let rank = $("#rank").val();
        let name = $("#name").val() + " " + $("#lastname").val();
        let email = $("#email").val();
        let role = $("#role").val();

        Swal.fire({
            title: 'คุณแน่ใจใช่หรือไม่ ?',
            text: "ที่ต้องการเพิ่มคุณ " + name + " ลงในระบบ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ตกลง',
            cancelButtonText: 'ยกเลิก',
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    method: 'POST',
                    url: '/adduser',
                    data: { iduser, rank, name, email, role },
                    success: (response) => {
                        Swal.fire(
                            'เพิ่มสำเร็จ!',
                            'คุณได้ทำการเพิ่มสมาชิกคนใหม่เรียบร้อนแล้ว',
                            'success'

                        ).then((result) => {
                            if (result.isConfirmed) {
                                location.reload();
                            }
                        })

                    }, error: (xhr) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: xhr.responseText,
                        })
                    }
                })

            }
        })

    });


});


