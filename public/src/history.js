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
        sessionStorage.clear();
        window.location.replace('/logout');
    });
}


$(document).ready(function () {
    var rowID;
    var table;
    $("#badge_req").text(sessionStorage.noti);

    table = $("#requisitionTable").DataTable({
        responsive: true,
        ajax: {
            method: 'GET',
            url: '/allDatahisadmin',
            dataSrc: function (data) {
                let m = new Date(data[0].date_requisition);
                let currentM = m.getMonth();
                $("#selectM").val(currentM);
                for (let i = 0; i < data.length; i++) {
                    let d = new Date(data[i].date_requisition);
                    let year = d.getFullYear();
                    let month = d.getMonth();
                    let date = d.getDate();
                    data[i].date_requisition = date + "-" + month + "-" + year;
                    if (data[i].status_requisition == 3) {
                        data[i].status_requisition = "ไม่อนุมัติ";
                    } else if (data[i].status_requisition == 4) {
                        data[i].status_requisition = "เสร็จสมบูรณ์";
                    }
                }

                return data;

            }
        },
        columns: [
            { data: "requisition_id", title: "เลขที่ใบเบิก" },
            { data: "date_requisition", title: "วันที่" },
            { data: "name", title: "ชื่อคนเบิก" },
            { data: "status_requisition", title: "สถานะ" },
            { title: "รายระเอียด", defaultContent: "<a style='cursor: pointer;' class='btndetail'>รายละเอียดเพิ่มเติม</a>" },
        ],
        "columnDefs": [{
            "targets": 3,
            "createdCell": function (td, cellData, rowData, row, col) {
                if (cellData == "ไม่อนุมัติ") {
                    $(td).css('color', '#FF0000');
                } else {
                    $(td).css('color', '#00750C');
                }
            }
        }],
    });
    $("#requisitionTable").on("click", ".btndetail", function () {
        const currentRow = $(this).parents("tr");
        let datarow = table.row(currentRow).data();
        rowID = table.row(currentRow).index();
        sessionStorage.number = datarow.requisition_id;
        window.location.href = '/detailhisadmin';
    })


    // Sidebar toggle behavior
    $(function () {
        // Sidebar toggle behavior
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar, #content').toggleClass('active');
        });
    });


    $("#selectM").change(function () {
        let selM = $(this).val();
        $.ajax({
            type: 'POST',
            url: '/selectmonth',
            data: { month: selM },
            success: (response) => {
                table.clear();
                table = $("#requisitionTable").dataTable().fnDestroy();
                $("#requisitionTable").empty();
                for (let i = 0; i < response.length; i++) {
                    let d = new Date(response[i].date_requisition);
                    let year = d.getFullYear();
                    let month = d.getMonth();
                    let date = d.getDate();
                    response[i].date_requisition = date + "-" + month + "-" + year;
                    if (response[i].status_requisition == 3) {
                        response[i].status_requisition = "ไม่อนุมัติ";
                    } else if (response[i].status_requisition == 4) {
                        response[i].status_requisition = "เสร็จสมบูรณ์";
                    }
                }
                table = $("#requisitionTable").DataTable({
                    responsive: true,
                    data: response,
                    columns: [
                        { data: "requisition_id", title: "เลขที่ใบเบิก" },
                        { data: "date_requisition", title: "วันที่" },
                        { data: "name", title: "ชื่อคนเบิก" },
                        { data: "status_requisition", title: "สถานะ" },
                        { title: "รายระเอียด", defaultContent: "<a style='cursor: pointer;' class='btndetail'>รายละเอียดเพิ่มเติม</a>" },
                    ],
                    "columnDefs": [{
                        "targets": 3,
                        "createdCell": function (td, cellData, rowData, row, col) {
                            if (cellData == "ไม่อนุมัติ") {
                                $(td).css('color', '#FF0000');
                            } else {
                                $(td).css('color', '#00750C');
                            }
                        }
                    }],
                });
                $("#requisitionTable").on("click", ".btndetail", function () {
                    const currentRow = $(this).parents("tr");
                    let datarow = table.row(currentRow).data();
                    rowID = table.row(currentRow).index();
                    sessionStorage.number = datarow.requisition_id;
                    window.location.href = '/detailhisadmin';
                })
            }, error: (xhr) => {
                alert(xhr.responseText);
            }
        })

    });
})