$('#datatable-jquery').DataTable({
    dom: 'lfrtipB',
    buttons: [{
            extend: 'copyHtml5',
            text: '<i class="fa fa-files-o"></i>Copy',
            titleAttr: 'Copy'
        },
        {
            extend: 'excelHtml5',
            text: '<i class="fa fa-file-excel-o"></i>Excel',
            titleAttr: 'Excel'
        },
        {
            extend: 'csvHtml5',
            text: '<i class="fa fa-file-text-o"></i>CSV',
            titleAttr: 'CSV'
        },
        {
            extend: 'pdfHtml5',
            text: '<i class="fa fa-file-pdf-o"></i>PDF',
            titleAttr: 'PDF'
        },
        {
            extend: 'print',
            text: '<i class="fa fa-print"></i>PRINT',
            titleAttr: 'PRINT'
        }
    ],
    drawCallback: function() {
        $('[data-toggle="popover-hover"]').popover({
            html: true,
            trigger: 'hover',
            // placement: 'bottom',
            content: function() { return '<img src="' + $(this).data('img') + '" />'; }
        });
    }
});

$('.buttons-html5 , .buttons-print').removeClass('btn-secondary').addClass('btn-primary btn-sm');
$('.dt-buttons').removeClass('btn-group').addClass('mt-4');
$('.dataTables_length').addClass('d-inline');
$('.dataTables_filter').addClass('d-inline float-right');
$('.dataTables_info').addClass('d-inline');
$('.dataTables_paginate').addClass('d-inline float-right');

$('[data-toggle="popover-hover"]').popover({
    html: true,
    trigger: 'hover',
    // placement: 'bottom',
    content: function() { return '<img src="' + $(this).data('img') + '" />'; }
});

/*Summernote editor*/
$(function(){
    if ($(".summer-note").length) {
        $('.summer-note').summernote({
            height: 300,
            tabsize: 2
        });
    }
});

// swal script start
$(document).on('click','.logout-confirm', function(event) {
    event.preventDefault();
    const url = $(this).attr('href');
    $(".request-loader").addClass("show");
    swal({
        title: 'Are you sure?',
        text: "You want to log out!",
        icon: 'warning',
        buttons: {
          confirm: {
            text: 'Yes, log out!',
            className: 'btn btn-success'
          },
          cancel: {
            visible: true,
            className: 'btn btn-danger'
          }
        }
    }).then(function(value) {
        if (value) {
            $(".request-loader").removeClass("show");
            window.location.href = url;
        } else {
            swal.close();
            $(".request-loader").removeClass("show");
        }
    });
});

$(document).on('click','.delete-confirm', function(event) {
    event.preventDefault();
    $(".request-loader").addClass("show");
    swal({
        title: 'Are you sure?',
        text: "This record and it`s details will be deleted!",
        icon: 'warning',
        buttons: {
          confirm: {
            text: 'Yes, delete it!',
            className: 'btn btn-success'
          },
          cancel: {
            visible: true,
            className: 'btn btn-danger'
          }
        }
    }).then((Delete) => {
        if (Delete) {
          $(this).parent(".delete-form").trigger('submit');
        } else {
          swal.close();
          $(".request-loader").removeClass("show");
        }
    });
});

$(document).on('click','.approve-confirm', function(event) {
    event.preventDefault();
    $(".request-loader").addClass("show");
    swal({
        title: 'Are you sure?',
        text: "This data will be approved!",
        icon: 'warning',
        buttons: {
          confirm: {
            text: 'Yes, approve it!',
            className: 'btn btn-success'
          },
          cancel: {
            visible: true,
            className: 'btn btn-danger'
          }
        }
    }).then((Delete) => {
        if (Delete) {
          $(this).parent(".approve-form").trigger('submit');
        } else {
          swal.close();
          $(".request-loader").removeClass("show");
        }
    });
});

$(document).on('click','.change-status-active', function(event) {
    event.preventDefault();
    $(".request-loader").addClass("show");
    swal({
        title: 'Are you sure?',
        text: "The status will be changed to active!",
        icon: 'warning',
        buttons: {
          confirm: {
            text: 'Yes, change it!',
            className: 'btn btn-success'
          },
          cancel: {
            visible: true,
            className: 'btn btn-danger'
          }
        }
    }).then((Status) => {
        if (Status) {
          $(this).parent(".status-form").trigger('submit');
        } else {
          swal.close();
          $(".request-loader").removeClass("show");
        }
    });
});

$(document).on('click','.change-status-inactive', function(event) {
    event.preventDefault();
    $(".request-loader").addClass("show");
    swal({
        title: 'Are you sure?',
        text: "The status will be changed to inactive!",
        icon: 'warning',
        buttons: {
          confirm: {
            text: 'Yes, change it!',
            className: 'btn btn-success'
          },
          cancel: {
            visible: true,
            className: 'btn btn-danger'
          }
        }
    }).then((Status) => {
        if (Status) {
          $(this).parent(".status-form").trigger('submit');
        } else {
          swal.close();
          $(".request-loader").removeClass("show");
        }
    });
});

$(document).on('click','.permission-confirm', function(event) {
    event.preventDefault();
    $(".request-loader").addClass("show");
    swal({
        title: 'Are you sure?',
        text: "You want to view permission for this role!",
        icon: 'warning',
        buttons: {
          confirm: {
            text: 'Yes!',
            className: 'btn btn-success'
          },
          cancel: {
            visible: true,
            className: 'btn btn-danger'
          }
        }
    }).then((Status) => {
        if (Status) {
          $(this).parent(".permission-form").trigger('submit');
        } else {
          swal.close();
          $(".request-loader").removeClass("show");
        }
    });
});
// swal script end

/* ***************************************************************
  ==========disabling default behave of form submits start==========
  *****************************************************************/

$("#ajaxForm").attr('onsubmit', 'return false');
$("#ajaxChangePassForm").attr('onsubmit', 'return false');

/* *************************************************************
==========disabling default behave of form submits end==========
***************************************************************/

/* ***************************************************
  ==========Form Submit with AJAX Request Start==========
  ******************************************************/

$(document).on('click',"#submitBtn", function(e) {
    $(e.target).attr('disabled', true);
    $(".request-loader").addClass("show");

    let ajaxForm = document.getElementById('ajaxForm');
    let fd = new FormData(ajaxForm);
    let url = $("#ajaxForm").attr('action');
    let method = $("#ajaxForm").attr('method');

    $.ajax({
        url: url,
        method: method,
        data: fd,
        contentType: false,
        processData: false,
        success: function(data) {
            $(e.target).attr('disabled', false);
            $(".request-loader").removeClass("show");

            $(".em").each(function() {
                $(this).html('');
            })

            if (data == "success") {
                location.reload();
            }

            // if error occurs
            else if (typeof data.error != 'undefined') {
                for (let x in data) {
                    if (x == 'error') {
                        continue;
                    }
                    document.getElementById('err' + x).innerHTML = data[x][0];
                }
            }
        },
        error: function(error) {
            $(".em").each(function() {
                $(this).html('');
            })
            for (let x in error.responseJSON.errors) {
                document.getElementById('err' + x).innerHTML = error.responseJSON.errors[x][0];
            }
            $(".request-loader").removeClass("show");
            $(e.target).attr('disabled', false);
        }
    });
});

/* ***************************************************
==========Form Submit with AJAX Request End==========
******************************************************/

/* ***************************************************
  ==========Form Update with AJAX Request Start==========
  ******************************************************/

function ajaxEditForm(button_id) {
    $("#" + button_id).attr('disabled', false);
    $(".request-loader").addClass("show");

    let btnarr = button_id.split('_');
    let idNo = btnarr[1];
    let ajaxEditForm = document.getElementById('ajaxEditForm_' + idNo);
    let fd = new FormData(ajaxEditForm);
    let url = $("#ajaxEditForm_" + idNo).attr('action');
    let method = $("#ajaxEditForm_" + idNo).attr('method');

    $.ajax({
        url: url,
        method: method,
        data: fd,
        contentType: false,
        processData: false,
        success: function(data) {
            $("#" + button_id).attr('disabled', false);
            $(".request-loader").removeClass("show");

            $(".em").each(function() {
                $(this).html('');
            })

            if (data == "success") {
                location.reload();
            }

            // if error occurs
            else if (typeof data.error != 'undefined') {
                for (let x in data) {
                    if (x == 'error') {
                        continue;
                    }
                    document.getElementById('eerr' + x + '_' + idNo).innerHTML = data[x][0];
                }
            }
        },
        error: function(error) {
            $(".em").each(function() {
                $(this).html('');
            })
            for (let x in error.responseJSON.errors) {
                document.getElementById('eerr' + x + '_' + idNo).innerHTML = error.responseJSON.errors[x][0];
            }
            $(".request-loader").removeClass("show");
            $("#" + button_id).attr('disabled', false);
        }
    });
}

/****************************************************
==========Form Update with AJAX Request End==========
****************************************************/

/******************************************************************
  ==========ChangePassForm Update with AJAX Request Start==========
******************************************************************/

$(document).on('click',"#changePassBtn", function(e) {
    $(e.target).attr('disabled', true);
    $(".request-loader").addClass("show");

    let ajaxForm = document.getElementById('ajaxChangePassForm');
    let fd = new FormData(ajaxForm);
    let url = $("#ajaxChangePassForm").attr('action');
    let method = $("#ajaxChangePassForm").attr('method');

    $.ajax({
        url: url,
        method: method,
        data: fd,
        contentType: false,
        processData: false,
        success: function(data) {
            $(e.target).attr('disabled', false);
            $(".request-loader").removeClass("show");

            $(".emp").each(function() {
                $(this).html('');
            })

            if (data == "success") {
                location.reload();
            }

            // if error occurs
            else if (typeof data.error != 'undefined') {
                for (let x in data) {
                    if (x == 'error') {
                        continue;
                    }
                    document.getElementById('err' + x).innerHTML = data[x][0];
                }
            }
        },
        error: function(error) {
            $(".emp").each(function() {
                $(this).html('');
            })
            for (let x in error.responseJSON.errors) {
                document.getElementById('err' + x).innerHTML = error.responseJSON.errors[x][0];
            }
            $(".request-loader").removeClass("show");
            $(e.target).attr('disabled', false);
        }
    });
});

/**************************************************************
==========ChangePassForm Update with AJAX Request End==========
**************************************************************/

/* ***************************************************************
  ==========Form Prepopulate After Clicking Button Start==========
  ***************************************************************/

    $(document).on("click",".editbtn", function () {
        let datas = $(this).data();
        delete datas["toggle"];

        for (let x in datas) {
            // if ($("#in" + x).hasClass("summernote")) {
            //     $("#in" + x).summernote("code", datas[x]);
            // } else if ($("#in" + x).hasClass("image")) {
            //     $("#in" + x).attr("src", datas[x]);
            // } else if ($("#in" + x).data("role") == "tagsinput") {
            //     if (datas[x].length > 0) {
            //         let arr = datas[x].split(" ");
            //         for (let i = 0; i < arr.length; i++) {
            //             $("#in" + x).tagsinput("add", arr[i]);
            //         }
            //     } else {
            //         $("#in" + x).tagsinput("removeAll");
            //     }
            // } else if ($("input[name='" + x + "']").attr("type") == "radio") {
            //     $("input[name='" + x + "']").each(function (i) {
            //         if ($(this).val() == datas[x]) {
            //             $(this).prop("checked", true);
            //         }
            //     });
            // } else {
                $("#in" + x).val(datas[x]);
            // }
        }
    });

/* *************************************************************
==========Form Prepopulate After Clicking Button End============
***************************************************************/


/*  Input box for numbers only start  */

// function isNumber(evt) {
//     var iKeyCode = (evt.which) ? evt.which : evt.keyCode
//     if (iKeyCode != 46 && iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57)) {
//         alert("Please enter only numeric value.");
//         return false;
//     } else {
//         return true;
//     }
// }

/*  Input box for numbers only end  */