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
    localStorage.counter = 0;
    localStorage.mat = []
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
            { data: 'material_id', title: 'รหัสวัสดุ' },
            { data: 'material_name', title: 'รายการ' },
            { data: 'material_number', title: 'คงเหลือ' },
            { data: 'unit', title: 'หน่วยนับ' },
            { title: "ขอเบิก", orderable: false, defaultContent: '<a href = "#" ><span class="iconify btn-add" data-icon="fluent:task-list-add-20-regular" style="font-size: 40px; color: F49300;"></span></a>' }
        ]
    });

    $("#materialMenu tbody").on("click", ".btn-add", function () {

        // Count Basket
        localStorage.counter++;
        $("#countAdd").text(localStorage.counter);

        // Get Meterials ID
        const currentRow = $(this).parents("tr");
        const data = table.row(currentRow).data();
        const mat_id = data.material_id
        
        localStorage.setItem('matID' , JSON.stringify(mat_id))

        

        
       

        

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

            category = ""
            for (let i = 0; i < data.length; i++) {
                category += "<option value = '" + data[i].category_id + "'>" + data[i].category_name + "</option>";
            }
            $("#selectCategory").html(category)
        }
    });

    // Select Category
    $("#selectCategory").change(function () {
        checkId = $("#selectCategory").val();
        console.log(checkId);

        table.clear();
        table = $("#materialMenu").dataTable().fnDestroy();
        $("#materialMenu").empty();
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
                { data: 'material_id', title: 'รหัสวัสดุ' },
                { data: 'material_name', title: 'รายการ' },
                { data: 'material_number', title: 'คงเหลือ' },
                { data: 'unit', title: 'หน่วยนับ' },
                { title: "ขอเบิก", orderable: false, defaultContent: '<a href = "#" ><span class="iconify btn-add" data-icon="fluent:task-list-add-20-regular" style="font-size: 40px; color: F49300;"></span></a>' }
            ]

        })
                
        $("#materialMenu tbody").on("click", ".btn-add", function () {

            // Count Basket
            localStorage.counter++;
            console.log(localStorage.counter)
            $("#countAdd").text(localStorage.counter);

            // Get Meterials ID
            const currentRow = $(this).parents("tr");
            const data = table.row(currentRow).data();
            const mat_id = data.material_id
            localStorage.cart.push(mat_id);

            console.log(localStorage.cart)
            

        })
    })
});