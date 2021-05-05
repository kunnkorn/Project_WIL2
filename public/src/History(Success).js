function init() {
    gapi.load('auth2', () => {
        gapi.auth2.init({
            client_id: '565819629218-hrjqptqk34lk5sq2599tasa7gc2tho24.apps.googleusercontent.com'
        })
    })
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

    // ไปหน้าการเบิกของฉัน
    $("#myRequi").on("click", function () {
        window.location.replace("/notificationuser")
    })

    // Count Noti
    $.ajax({
        type: "POST",
        url: '/countnoti',
        success: (data) => {
            $("#countnoti").text(data[0].COUNTNOTI)
        }
    })

    // Show Detail of Requisition
    $.ajax({
        type: "POST",
        url: "/datareq",
        data: { requi_id: localStorage.requisi_id },
        success: function (data) {

            let d = new Date(data[0].date_requisition);
            let year = d.getFullYear();
            let month = d.getMonth() + 1;
            let date = d.getDate();

            $("#date_requisition").text(date + '-' + month + '-' + year);
            $("#requisition_id").text(data[0].requisition_id);
            $("#requisition_name").text(data[0].name);
            $("#time_requisition").text(data[0].time_requisition);

            $("#objective").text(data[0].objective)

            // Status Requisition
            if (data[0].status_requisition == 1) {
                $("#status_requisition").text('รออนุมัติ')
                $("#status_requisition").css({ 'color': 'black' })
                $("#detail").css({ 'background-color': '#FEFFAC' })
            }
            else if (data[0].status_requisition == 2) {
                $("#status_requisition").text('อนุมัติ')
                $("#status_requisition").css({ 'color': 'black' })
                $("#detail").css({ 'background-color': '#D1F1FF' })
            }
            else if (data[0].status_requisition == 4) {
                $("#status_requisition").text('เสร็จสมบูรณ์')
                $("#status_requisition").css({ 'color': 'black' })
                $("#detail").css({ 'background-color': '#bffcd0' })
            }
            else {
                $("#status_requisition").text('ไม่อนุมัติ')
                $("#status_requisition").css({ 'color': 'black' })
                $("#detail").css({ 'background-color': 'rgb(255, 224, 224)' })
                $("#other").text('สาเหตุ : ' + data[0].annotation_of_disproval)
            }


            // annotation
            if (data[0].annotation == null) {
                $("#annotation").text('-');
            }
            else {
                $("#annotation").text(data[0].annotation);
            }

            // Date Pickup
            if (data[0].date_pickup == null) {
                $("#date_pickup").text('-');
            }
            else {
                $("#date_pickup").text(data[0].date_pickup);
            }

            // Time Pickup
            if (data[0].time_pickup == null) {
                $("#time_pickup").text('-')
            }
            else {
                $("#time_pickup").text(data[0].time_pickup);
            }

        }
    });

    // Show data of Materail in Data Table
    var table = $("#materialTable").DataTable({
        responsive: true,
        deferRender: true,

        ajax: {
            type: 'POST',
            url: '/datamaterial',
            data: { requi_id: localStorage.requisi_id },
            dataSrc: function (data) {
                return data;
            }
        },
        columns: [
            { data: 'material_id', title: 'รหัสวัสดุ' },
            { data: 'material_name', title: 'รายการ' },
            { data: 'amount_of_requisition', title: 'จำนวนเบิก' },
            { data: 'unit', title: 'หน่วยนับ' },
            { data: 'amount_if_divide', title: 'จำนวนจ่าย' }
        ]
    })

    $(function () {
        // Sidebar toggle behavior
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar, #content').toggleClass('active');
        });
    });


    $("#btnback").click(function () {
        window.history.back();
    });
});