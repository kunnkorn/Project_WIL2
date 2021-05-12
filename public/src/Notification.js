function init() {
    gapi.load('auth2', () => {
        gapi.auth2.init({
            client_id: '565819629218-hrjqptqk34lk5sq2599tasa7gc2tho24.apps.googleusercontent.com'
        })
    })
}

function signout() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => { 
        sessionStorage.clear();
        window.location.replace('/logout');
    });
}

$(document).ready(function () {

    // Logout
    $("#logout").on("click", function () {
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(() => {
            window.location.replace('/logout');
        })
    })

    // To Material Page
    $("#mymat").on("click", function () {
        window.location.replace('/materialuser')
    })

    $(function () {
        // Sidebar toggle behavior
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar, #content').toggleClass('active');
        });
    });

    // Count All Notification
    $.ajax({
        method: 'POST',
        url: '/countnoti',
        success: (data) => {
            $("#countnoti").text(data[0].COUNTNOTI)
        },
    })

    $.ajax({
        method: 'POST',
        url: '/countnoti',
        success: (data) => {
            $("#allnoti").text(data[0].COUNTNOTI)
        },
    })

    // Count Wait Confirm
    $.ajax({
        method: 'POST',
        url: '/countwaitconfirm',
        success: (data) => {
            $("#waitnoti").text(data[0].COUNTNOTI)
        },
    })

    // Count Approve
    $.ajax({
        method: 'POST',
        url: '/countconfirm',
        success: (data) => {
            $("#appnoti").text(data[0].COUNTNOTI)
        },
    })

    // Count Disapproval
    $.ajax({
        method: 'POST',
        url: '/countdisapproval',
        success: (data) => {
            $("#disnoti").text(data[0].COUNTNOTI)
        },
    })

    // Count Complete
    $.ajax({
        method: 'POST',
        url: '/countcomplete',
        success: (data) => {
            $("#comnoti").text(data[0].COUNTNOTI)
        },
    })


    $('#btnall').toggleClass('active');


    $('#btnall').click(function () {
        if ($('#btnall').hasClass('active')) {

        } else {
            $('#btnall').toggleClass('active');
            $('#btnwait').removeClass('active');
            $('#btncomfirm').removeClass('active');
            $('#btnUnapp').removeClass('active');
            $('#btncomplete').removeClass('active');
        }
        $.ajax({
            type: 'POST',
            url: '/allrequisitionuser',
            success: (data) => {
                let listreq = "";
                for (let i = 0; i < data.length; i++) {

                    let d = new Date(data[i].date_requisition);
                    let year = d.getFullYear();
                    let month = d.getMonth() + 1;
                    let date = d.getDate();
                    if (data[i].status_requisition == 1) {
                        data[i].status_requisition = "รออนุมัติ";
                        listreq += "<div class='col-11 my-3 mx-auto bg-white shadow' style='border-radius: 15px;'><div class='col-12 head'><p class='mt-4' >เลขที่ใบเบิก : " + data[i].requisition_id + " </p></div><hr size='2' class='ml-0' style='background-color: rgb(187, 187, 187);'><div class='col-12 body d-flex justify-content-between'><div class='text-area col-8'><div class='col-12 d-lg-flex justify-content-between'><p>วันที่ " + date + '-' + month + '-' + year + " </p><p>เวลา " + data[i].time_requisition + " น.</p><p> " + data[i].name + " </p></div><div class='col-12'></div></div><div class='comment-area text-right'><textarea rows='3' class='col-12' disabled></textarea></div></div><hr size='2' class='ml-0' style='background-color: rgb(184, 184, 184)'><div class='col-12 footer'><div class='col-12 d-flex justify-content-end'><h3>สถานะ : </h3><h3 class='text text-warning ml-2' >" + data[i].status_requisition + "</h3></div> <div class='col-12 d-flex justify-content-end'><a href='#' class='btn btn-outline-info mb-3 btn-detail' id = '" + data[i].requisition_id + "'>ดูรายละเอียด</a></div></div></div>";
                    }
                    else if (data[i].status_requisition == 2) {
                        data[i].status_requisition = "อนุมัติ";
                        listreq += "<div class='col-11 my-3 mx-auto bg-white shadow' style='border-radius: 15px;'><div class='col-12 head'><p class='mt-4' >เลขที่ใบเบิก : " + data[i].requisition_id + " </p></div><hr size='2' class='ml-0' style='background-color: rgb(187, 187, 187);'><div class='col-12 body d-flex justify-content-between'><div class='text-area col-8'><div class='col-12 d-lg-flex justify-content-between'><p>วันที่ " + date + '-' + month + '-' + year + " </p><p>เวลา " + data[i].time_requisition + " น.</p><p> " + data[i].name + " </p></div><div class='col-12'></div></div><div class='comment-area text-right'><textarea rows='3' class='col-12' disabled></textarea></div></div><hr size='2' class='ml-0' style='background-color: rgb(184, 184, 184)'><div class='col-12 footer'><div class='col-12 d-flex justify-content-end'><h3>สถานะ : </h3><h3 class='text text-primary ml-2' >" + data[i].status_requisition + "</h3></div> <div class='col-12 d-flex justify-content-end'><a href='#' class='btn btn-outline-info mb-3 btn-detail' id = '" + data[i].requisition_id + "'>ดูรายละเอียด</a></div></div></div>";
                    }
                    else if (data[i].status_requisition == 3) {
                        data[i].status_requisition = "ไม่อนุมัติ";
                        listreq += "<div class='col-11 my-3 mx-auto bg-white shadow' style='border-radius: 15px;'><div class='col-12 head'><p class='mt-4' >เลขที่ใบเบิก : " + data[i].requisition_id + " </p></div><hr size='2' class='ml-0' style='background-color: rgb(187, 187, 187);'><div class='col-12 body d-flex justify-content-between'><div class='text-area col-8'><div class='col-12 d-lg-flex justify-content-between'><p>วันที่ " + date + '-' + month + '-' + year + " </p><p>เวลา " + data[i].time_requisition + " น.</p><p> " + data[i].name + " </p></div><div class='col-12'></div></div><div class='comment-area text-right'><textarea rows='3' class='col-12' disabled></textarea></div></div><hr size='2' class='ml-0' style='background-color: rgb(184, 184, 184)'><div class='col-12 footer'><div class='col-12 d-flex justify-content-end'><h3>สถานะ : </h3><h3 class='text text-danger ml-2' >" + data[i].status_requisition + "</h3></div> <div class='col-12 d-flex justify-content-end'><a href='#' class='btn btn-outline-info mb-3 btn-detail' id = '" + data[i].requisition_id + "'>ดูรายละเอียด</a></div></div></div>";
                    }
                    else if (data[i].status_requisition == 4) {
                        data[i].status_requisition = "เสร็จสมบูรณ์";
                        listreq += "<div class='col-11 my-3 mx-auto bg-white shadow' style='border-radius: 15px;'><div class='col-12 head'><p class='mt-4' >เลขที่ใบเบิก : " + data[i].requisition_id + " </p></div><hr size='2' class='ml-0' style='background-color: rgb(187, 187, 187);'><div class='col-12 body d-flex justify-content-between'><div class='text-area col-8'><div class='col-12 d-lg-flex justify-content-between'><p>วันที่ " + date + '-' + month + '-' + year + " </p><p>เวลา " + data[i].time_requisition + " น.</p><p> " + data[i].name + " </p></div><div class='col-12'></div></div><div class='comment-area text-right'><textarea rows='3' class='col-12' disabled></textarea></div></div><hr size='2' class='ml-0' style='background-color: rgb(184, 184, 184)'><div class='col-12 footer'><div class='col-12 d-flex justify-content-end'><h3>สถานะ : </h3><h3 class='text text-success ml-2' >" + data[i].status_requisition + "</h3></div> <div class='col-12 d-flex justify-content-end'><a href='#' class='btn btn-outline-info mb-3 btn-detail' id = '" + data[i].requisition_id + "'>ดูรายละเอียด</a></div></div></div>";
                    }
                }
                $("#requsition-area").html(listreq);

                $(".btn-detail").on("click", function () {

                    console.log(data[0].status_requisition)
                    const requi_id = $(this).attr("id")
                    localStorage.requisi_id = requi_id
                    console.log(localStorage.requisi_id)

                    if (data[0].status_requisition == 3) {
                        window.location.replace('/historyunsucuser')
                    }
                    else {
                        window.location.replace('/historysucuser')
                    }
                })
            }

        })


    });

    $('#btnwait').click(function () {
        if ($('#btnwait').hasClass('active')) {

        } else {
            $('#btnwait').toggleClass('active');
            $('#btnall').removeClass('active');
            $('#btncomfirm').removeClass('active');
            $('#btnUnapp').removeClass('active');
            $('#btncomplete').removeClass('active');
        }

        $.ajax({
            type: 'POST',
            url: '/waitapproverequisition',
            success: (data) => {
                let listreq = "";
                for (let i = 0; i < data.length; i++) {
                    if (data[i].status_requisition == 1) {
                        data[i].status_requisition = "รออนุมัติ";
                    }
                    let d = new Date(data[i].date_requisition);
                    let year = d.getFullYear();
                    let month = d.getMonth() + 1;
                    let date = d.getDate();


                    listreq += "<div class='col-11 my-3 mx-auto bg-white shadow' style='border-radius: 15px;'><div class='col-12 head'><p class='mt-4' >เลขที่ใบเบิก : " + data[i].requisition_id + " </p></div><hr size='2' class='ml-0' style='background-color: rgb(187, 187, 187);'><div class='col-12 body d-flex justify-content-between'><div class='text-area col-8'><div class='col-12 d-lg-flex justify-content-between'><p>วันที่ " + date + '-' + month + '-' + year + " </p><p>เวลา " + data[i].time_requisition + " น.</p><p> " + data[i].name + " </p></div><div class='col-12'></div></div><div class='comment-area text-right'><textarea rows='3' class='col-12' disabled></textarea></div></div><hr size='2' class='ml-0' style='background-color: rgb(184, 184, 184)'><div class='col-12 footer'><div class='col-12 d-flex justify-content-end'><h3>สถานะ : </h3><h3 class='text text-warning ml-2' >" + data[i].status_requisition + "</h3></div> <div class='col-12 d-flex justify-content-end'><a href='#' class='btn btn-outline-info mb-3 btn-detail' id = '" + data[i].requisition_id + "'>ดูรายละเอียด</a></div></div></div>";
                }
                $("#requsition-area").html(listreq);

                $(".btn-detail").on("click", function () {

                    console.log(data[0].status_requisition)
                    const requi_id = $(this).attr("id")
                    localStorage.requisi_id = requi_id
                    console.log(localStorage.requisi_id)

                    if (data[0].status_requisition == 3) {
                        window.location.replace('/historyunsucuser')
                    }
                    else {
                        window.location.replace('/historysucuser')
                    }
                })
            }

        })

    });

    $('#btncomfirm').click(function () {
        if ($('#btncomfirm').hasClass('active')) {

        } else {
            $('#btncomfirm').toggleClass('active');
            $('#btnwait').removeClass('active');
            $('#btnall').removeClass('active');
            $('#btnUnapp').removeClass('active');
            $('#btncomplete').removeClass('active');
        }
        $.ajax({
            type: 'POST',
            url: '/aprroverequisition',
            success: (data) => {
                let listreq = "";
                for (let i = 0; i < data.length; i++) {
                    if (data[i].status_requisition == 2) {
                        data[i].status_requisition = "อนุมัติ";
                    }
                    let d = new Date(data[i].date_requisition);
                    let year = d.getFullYear();
                    let month = d.getMonth() + 1;
                    let date = d.getDate();


                    listreq += "<div class='col-11 my-3 mx-auto bg-white shadow' style='border-radius: 15px;'><div class='col-12 head'><p class='mt-4' >เลขที่ใบเบิก : " + data[i].requisition_id + " </p></div><hr size='2' class='ml-0' style='background-color: rgb(187, 187, 187);'><div class='col-12 body d-flex justify-content-between'><div class='text-area col-8'><div class='col-12 d-lg-flex justify-content-between'><p>วันที่ " + date + '-' + month + '-' + year + " </p><p>เวลา " + data[i].time_requisition + " น.</p><p> " + data[i].name + " </p></div><div class='col-12'></div></div><div class='comment-area text-right'><textarea rows='3' class='col-12' disabled></textarea></div></div><hr size='2' class='ml-0' style='background-color: rgb(184, 184, 184)'><div class='col-12 footer'><div class='col-12 d-flex justify-content-end'><h3>สถานะ : </h3><h3 class='text text-primary ml-2' >" + data[i].status_requisition + "</h3></div> <div class='col-12 d-flex justify-content-end'><a href='#' class='btn btn-outline-info mb-3 btn-detail' id = '" + data[i].requisition_id + "'>ดูรายละเอียด</a></div></div></div>";
                }
                $("#requsition-area").html(listreq);

                $(".btn-detail").on("click", function () {

                    console.log(data[0].status_requisition)
                    const requi_id = $(this).attr("id")
                    localStorage.requisi_id = requi_id
                    console.log(localStorage.requisi_id)

                    if (data[0].status_requisition == 3) {
                        window.location.replace('/historyunsucuser')
                    }
                    else {
                        window.location.replace('/historysucuser')
                    }
                })
            }

        })
    });

    $('#btnUnapp').click(function () {
        $("#disnoti").text(0);
        $("#disba").hide();
        if ($('#btnUnapp').hasClass('active')) {

        } else {
            $('#btnUnapp').toggleClass('active');
            $('#btnwait').removeClass('active');
            $('#btnall').removeClass('active');
            $('#btncomfirm').removeClass('active');
            $('#btncomplete').removeClass('active');
        }

        $.ajax({
            type: 'POST',
            url: '/disapprovalrequisition',
            success: (data) => {
                let listreq = "";
                for (let i = 0; i < data.length; i++) {
                    if (data[i].status_requisition == 3) {
                        data[i].status_requisition = "ไม่อนุมัติ";
                    }
                    let d = new Date(data[i].date_requisition);
                    let year = d.getFullYear();
                    let month = d.getMonth() + 1;
                    let date = d.getDate();


                    listreq += "<div class='col-11 my-3 mx-auto bg-white shadow' style='border-radius: 15px;'><div class='col-12 head'><p class='mt-4' >เลขที่ใบเบิก : " + data[i].requisition_id + " </p></div><hr size='2' class='ml-0' style='background-color: rgb(187, 187, 187);'><div class='col-12 body d-flex justify-content-between'><div class='text-area col-8'><div class='col-12 d-lg-flex justify-content-between'><p>วันที่ " + date + '-' + month + '-' + year + " </p><p>เวลา " + data[i].time_requisition + " น.</p><p> " + data[i].name + " </p></div><div class='col-12'></div></div><div class='comment-area text-right'><textarea rows='3' class='col-12' disabled></textarea></div></div><hr size='2' class='ml-0' style='background-color: rgb(184, 184, 184)'><div class='col-12 footer'><div class='col-12 d-flex justify-content-end'><h3>สถานะ : </h3><h3 class='text text-danger ml-2' >" + data[i].status_requisition + "</h3></div> <div class='col-12 d-flex justify-content-end'><a href='#' class='btn btn-outline-info mb-3 btn-detail' id = '" + data[i].requisition_id + "'>ดูรายละเอียด</a></div></div></div>";
                }
                $("#requsition-area").html(listreq);

                $(".btn-detail").on("click", function () {

                    console.log(data[0].status_requisition)
                    const requi_id = $(this).attr("id")
                    localStorage.requisi_id = requi_id
                    console.log(localStorage.requisi_id)

                    if (data[0].status_requisition == 3) {
                        window.location.replace('/historyunsucuser')
                    }
                    else {
                        window.location.replace('/historysucuser')
                    }
                })
            }

        })
    });

    $('#btncomplete').click(function () {
        $("#comnoti").text(0);
        $("#comba").hide();
        if ($('#btncomplete').hasClass('active')) {

        } else {
            $('#btncomplete').toggleClass('active');
            $('#btnUnapp').removeClass('active');
            $('#btnwait').removeClass('active');
            $('#btnall').removeClass('active');
            $('#btncomfirm').removeClass('active');
        }
        $.ajax({
            type: 'POST',
            url: '/completerequisition',
            success: (data) => {
                let listreq = "";
                for (let i = 0; i < data.length; i++) {
                    if (data[i].status_requisition == 4) {
                        data[i].status_requisition = "เสร็จสมบูรณ์";
                    }
                    let d = new Date(data[i].date_requisition);
                    let year = d.getFullYear();
                    let month = d.getMonth() + 1;
                    let date = d.getDate();


                    listreq += "<div class='col-11 my-3 mx-auto bg-white shadow' style='border-radius: 15px;'><div class='col-12 head'><p class='mt-4' >เลขที่ใบเบิก : " + data[i].requisition_id + " </p></div><hr size='2' class='ml-0' style='background-color: rgb(187, 187, 187);'><div class='col-12 body d-flex justify-content-between'><div class='text-area col-8'><div class='col-12 d-lg-flex justify-content-between'><p>วันที่ " + date + '-' + month + '-' + year + " </p><p>เวลา " + data[i].time_requisition + " น.</p><p> " + data[i].name + " </p></div><div class='col-12'></div></div><div class='comment-area text-right'><textarea rows='3' class='col-12' disabled></textarea></div></div><hr size='2' class='ml-0' style='background-color: rgb(184, 184, 184)'><div class='col-12 footer'><div class='col-12 d-flex justify-content-end'><h3>สถานะ : </h3><h3 class='text text-success ml-2' >" + data[i].status_requisition + "</h3></div> <div class='col-12 d-flex justify-content-end'><a href='#' class='btn btn-outline-info mb-3 btn-detail' id = '" + data[i].requisition_id + "'>ดูรายละเอียด</a></div></div></div>";
                }
                $("#requsition-area").html(listreq);

                $(".btn-detail").on("click", function () {

                    console.log(data[0].status_requisition)
                    const requi_id = $(this).attr("id")
                    localStorage.requisi_id = requi_id
                    console.log(localStorage.requisi_id)

                    if (data[0].status_requisition == 3) {
                        window.location.replace('/historyunsucuser')
                    }
                    else {
                        window.location.replace('/historysucuser')
                    }
                })
            }

        })
    });

    // Show All Requisition
    $.ajax({
        type: 'POST',
        url: '/allrequisitionuser',
        success: (data) => {
            let listreq = "";
            for (let i = 0; i < data.length; i++) {

                let d = new Date(data[i].date_requisition);
                let year = d.getFullYear();
                let month = d.getMonth() + 1;
                let date = d.getDate();
                if (data[i].status_requisition == 1) {
                    data[i].status_requisition = "รออนุมัติ";
                    listreq += "<div class='col-11 my-3 mx-auto bg-white shadow' style='border-radius: 15px;'><div class='col-12 head'><p class='mt-4' >เลขที่ใบเบิก : " + data[i].requisition_id + " </p></div><hr size='2' class='ml-0' style='background-color: rgb(187, 187, 187);'><div class='col-12 body d-flex justify-content-between'><div class='text-area col-8'><div class='col-12 d-lg-flex justify-content-between'><p>วันที่ " + date + '-' + month + '-' + year + " </p><p>เวลา " + data[i].time_requisition + " น.</p><p> " + data[i].name + " </p></div><div class='col-12'></div></div><div class='comment-area text-right'><textarea rows='3' class='col-12' disabled></textarea></div></div><hr size='2' class='ml-0' style='background-color: rgb(184, 184, 184)'><div class='col-12 footer'><div class='col-12 d-flex justify-content-end'><h3>สถานะ : </h3><h3 class='text text-warning ml-2' >" + data[i].status_requisition + "</h3></div> <div class='col-12 d-flex justify-content-end'><a href='#' class='btn btn-outline-info mb-3 btn-detail' id = '" + data[i].requisition_id + "'>ดูรายละเอียด</a></div></div></div>";
                }
                else if (data[i].status_requisition == 2) {
                    data[i].status_requisition = "อนุมัติ";
                    listreq += "<div class='col-11 my-3 mx-auto bg-white shadow' style='border-radius: 15px;'><div class='col-12 head'><p class='mt-4' >เลขที่ใบเบิก : " + data[i].requisition_id + " </p></div><hr size='2' class='ml-0' style='background-color: rgb(187, 187, 187);'><div class='col-12 body d-flex justify-content-between'><div class='text-area col-8'><div class='col-12 d-lg-flex justify-content-between'><p>วันที่ " + date + '-' + month + '-' + year + " </p><p>เวลา " + data[i].time_requisition + " น.</p><p> " + data[i].name + " </p></div><div class='col-12'></div></div><div class='comment-area text-right'><textarea rows='3' class='col-12' disabled></textarea></div></div><hr size='2' class='ml-0' style='background-color: rgb(184, 184, 184)'><div class='col-12 footer'><div class='col-12 d-flex justify-content-end'><h3>สถานะ : </h3><h3 class='text text-primary ml-2' >" + data[i].status_requisition + "</h3></div> <div class='col-12 d-flex justify-content-end'><a href='#' class='btn btn-outline-info mb-3 btn-detail' id = '" + data[i].requisition_id + "'>ดูรายละเอียด</a></div></div></div>";
                }
                else if (data[i].status_requisition == 3) {
                    if (data[i].read_requisition == 1) {
                        $("#disba").hide();
                    }
                    data[i].status_requisition = "ไม่อนุมัติ";
                    listreq += "<div class='col-11 my-3 mx-auto bg-white shadow' style='border-radius: 15px;'><div class='col-12 head'><p class='mt-4' >เลขที่ใบเบิก : " + data[i].requisition_id + " </p></div><hr size='2' class='ml-0' style='background-color: rgb(187, 187, 187);'><div class='col-12 body d-flex justify-content-between'><div class='text-area col-8'><div class='col-12 d-lg-flex justify-content-between'><p>วันที่ " + date + '-' + month + '-' + year + " </p><p>เวลา " + data[i].time_requisition + " น.</p><p> " + data[i].name + " </p></div><div class='col-12'></div></div><div class='comment-area text-right'><textarea rows='3' class='col-12' disabled></textarea></div></div><hr size='2' class='ml-0' style='background-color: rgb(184, 184, 184)'><div class='col-12 footer'><div class='col-12 d-flex justify-content-end'><h3>สถานะ : </h3><h3 class='text text-danger ml-2' >" + data[i].status_requisition + "</h3></div> <div class='col-12 d-flex justify-content-end'><a href='#' class='btn btn-outline-info mb-3 btn-detail' id = '" + data[i].requisition_id + "'>ดูรายละเอียด</a></div></div></div>";
                }
                else if (data[i].status_requisition == 4) {
                    if (data[i].read_requisition == 1) {
                        $("#comba").hide();
                    }
                    data[i].status_requisition = "เสร็จสมบูรณ์";
                    listreq += "<div class='col-11 my-3 mx-auto bg-white shadow'  style='border-radius: 15px;'><div class='col-12 head'><p class='mt-4' >เลขที่ใบเบิก : " + data[i].requisition_id + " </p></div><hr size='2' class='ml-0' style='background-color: rgb(187, 187, 187);'><div class='col-12 body d-flex justify-content-between'><div class='text-area col-8'><div class='col-12 d-lg-flex justify-content-between'><p>วันที่ " + date + '-' + month + '-' + year + " </p><p>เวลา " + data[i].time_requisition + " น.</p><p> " + data[i].name + " </p></div><div class='col-12'></div></div><div class='comment-area text-right'><textarea rows='3' class='col-12' disabled></textarea></div></div><hr size='2' class='ml-0' style='background-color: rgb(184, 184, 184)'><div class='col-12 footer'><div class='col-12 d-flex justify-content-end'><h3>สถานะ : </h3><h3 class='text text-success ml-2' >" + data[i].status_requisition + "</h3></div> <div class='col-12 d-flex justify-content-end'><a href='#' class='btn btn-outline-info mb-3 btn-detail' id = '" + data[i].requisition_id + "'>ดูรายละเอียด</a></div></div></div>";
                }
            }
            $("#requsition-area").html(listreq);

            $(".btn-detail").on("click", function () {

                console.log(data[0].status_requisition)
                const requi_id = $(this).attr("id")
                localStorage.requisi_id = requi_id
                console.log(localStorage.requisi_id)

                if (data[0].status_requisition == 3) {
                    window.location.replace('/historyunsucuser')
                }
                else {
                    window.location.replace('/historysucuser')
                }
            })
        }

    })



    // let listreq = "";
    // for (let i = 0; i < 10; i++) {
    //     listreq += "<div class='col-11 my-3 rounded-sm mx-auto bg-white shadow-sm'><div class='col-12 head'><p class='mt-4'>เลขที่ใบเบิก : 64050010</p></div><hr size='2' class='ml-0' style='background-color: rgb(187, 187, 187);'><div class='col-12 body d-flex justify-content-between'><div class='text-area col-8'><div class='col-12 d-lg-flex justify-content-between'><p>วันที่ 4/15/2021</p><p>เวลา 11.55 น.</p><p>นาย ปัณณ์ คงสมบูรณ์</p></div><div class='col-12'><p>x 20 ชิ้น</p></div></div><div class='comment-area text-right'><textarea rows='5' class='col-12' disabled></textarea></div></div><hr size='2' class='ml-0' style='background-color: rgb(184, 184, 184)'><div class='col-12 footer'><div class='col-12 d-flex justify-content-end'><h3>สถานะ : </h3><h3 class='text-warning ml-2'>รออนุมัติ</h1></div> <div class='col-12 d-flex justify-content-end'><a href='../view/History(success).html' class='btn btn-outline-info mb-3'>ดูรายละเอียด</a></div></div></div>";
    // }

    // $("#requsition-area").html(listreq);


});

