function init() {
    gapi.load('auth2', () => {
        gapi.auth2.init({
            client_id: '565819629218-hrjqptqk34lk5sq2599tasa7gc2tho24.apps.googleusercontent.com'
        })
    })
}



$(document).ready(function () {
    sessionStorage.cart = "";
    // Logout
    $("#logout").on("click", function () {
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(() => {
            window.location.replace('/logout');
        })
    })

    // To cart Page
    $("#cart").on("click", function () {
        window.location.replace("/cartpage")
    })

    // ไปหน้าการเบิกของฉัน
    $("#myRequi").on("click", function () {
        window.location.replace("/notificationuser")
    })

    // Material Page
    $("#mymat").on("click", function () {
        window.location.replace("/materialuser")
    })

    // Material Data 
    var rowID;
    var table;
    let number = 1;
    var itemcart = 0;
    table = $("#materialMenu").DataTable({
        responsive: true,
        deferRender: true,
        ajax: {
            url: '/datamaterials',
            dataSrc: function (data) {
                return data;
            }
        },
        columns: [
            { title: 'ลำดับ', defaultContent: "" },
            { data: 'material_id', title: 'รหัสวัสดุ' },
            { data: 'material_name', title: 'รายการ' },
            { data: 'material_number', title: 'คงเหลือ' },
            { data: 'unit', title: 'หน่วยนับ' },
            { title: "ขอเบิก", orderable: false, defaultContent: '<a href = "#" ><span class="iconify btn-add" data-icon="fluent:task-list-add-20-regular" style="font-size: 40px; color: F49300;"></span></a>' }
        ],
        "columnDefs": [{
            "targets": 0,
            "createdCell": function (td, cellData, rowData, row, col) {
                $(td).text(number);
                number++;
            }
        }]
    });

    $("#materialMenu tbody").on("click", ".btn-add", function () {

        // Count Basket
        itemcart++;
        $("#countAdd").text(itemcart);
        // Get Meterials ID
        const currentRow = $(this).parents("tr");
        const data = table.row(currentRow).data();
        const mat_id = data.material_id
        sessionStorage.cart += mat_id + ",";
    })


    // Side bar
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

    // Category  
    $.ajax({
        type: "GET",
        url: "/category",
        success: function (data) {

            category = "";
            for (let i = 0; i < data.length; i++) {
                category += "<option value = '" + data[i].category_id + "'>" + data[i].category_name + "</option>";
            }
            let categoryall = "<option value = '" + 8 + "'>ทั้งหมด</option>";
            category += categoryall;
            $("#selectCategory").html(category);
        }, error: (xhr) => {
            alert(xhr.responseText);
        }
    });

    // Select Category
    $("#selectCategory").change(function () {
        checkId = $("#selectCategory").val();
        table.clear();
        table = $("#materialMenu").dataTable().fnDestroy();
        $("#materialMenu").empty();
        let number = 1;
        table = $("#materialMenu").DataTable({
            responsive: true,
            deferRender: true,
            ajax: {
                method: 'POST',
                url: '/dataCategory',
                data: { cate_id: checkId },
                dataSrc: function (data) {
                    return data
                }
            },

            columns: [
                { title: 'ลำดับ', defaultContent: "" },
                { data: 'material_id', title: 'รหัสวัสดุ' },
                { data: 'material_name', title: 'รายการ' },
                { data: 'material_number', title: 'คงเหลือ' },
                { data: 'unit', title: 'หน่วยนับ' },
                { title: "ขอเบิก", orderable: false, defaultContent: '<a href = "#" ><span class="iconify btn-add" data-icon="fluent:task-list-add-20-regular" style="font-size: 40px; color: F49300;"></span></a>' }
            ],
            "columnDefs": [{
                "targets": 0,
                "createdCell": function (td, cellData, rowData, row, col) {
                    $(td).text(number);
                    number++;
                }
            }]

        })

        $("#materialMenu tbody").on("click", ".btn-add", function () {

            // Count Basket
            itemcart++;
            $("#countAdd").text(itemcart);
            // Get Meterials ID
            const currentRow = $(this).parents("tr");
            const data = table.row(currentRow).data();
            const mat_id = data.material_id
            sessionStorage.cart += mat_id + ",";

        })
    })
});