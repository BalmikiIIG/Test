$('#datatable-jquery').DataTable({
    dom: 'lfrtipB',
    buttons: [{
            extend: 'copyHtml5',
            text: '<i class="fa fa-file"></i>Copy',
            titleAttr: 'Copy'
        },
        {
            extend: 'excelHtml5',
            text: '<i class="fa fa-file-excel"></i>Excel',
            titleAttr: 'Excel'
        },
        {
            extend: 'csvHtml5',
            text: '<i class="fa fa-file-text"></i>CSV',
            titleAttr: 'CSV'
        },
        {
            extend: 'pdfHtml5',
            text: '<i class="fa fa-file-pdf"></i>PDF',
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

// swal script end

/* *************************************************************
==========disabling default behave of form submits start==========
***************************************************************/
$(document.getElementById('ajaxForm'),document.getElementsByClassName('ajaxForm')).attr('onsubmit', 'return false');
/* *************************************************************
==========disabling default behave of form submits end==========
***************************************************************/

/* ***************************************************
  ==========Form Submit with AJAX Request Start==========
  ******************************************************/
$(document).on('click',".submitBtn,#submitBtn", function (e) {
    $(e.target).attr('disabled', true);

    $(".request-loader").addClass("show");

    let ajaxForm = $(e.target).parent().closest('form');
    let fd = new FormData(ajaxForm[0]);
    let url = ajaxForm.attr('action');
    let method = ajaxForm.attr('method');

    console.log(method);

    $.ajax({
        url: url,
        method: method,
        data: fd,
        contentType: false,
        processData: false,
        success: function (data) {
            $(e.target).attr('disabled', false);
            $(".request-loader").removeClass("show");

            $(".em").each(function () {
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
                    ajaxForm.find("[name='" + x + "']").next('.em').html(data[x][0]);
                    ajaxForm.find("[name='" + x + "']").parent().closest('.form-group').find('.em').html(data[x][0]);
                }
            }
        },
        error: function (error) {
            $(".em").each(function () {
                $(this).html('');
            })
            for (let x in error.responseJSON.errors) {
                ajaxForm.find("[name='" + x + "']").next('.em').html(error.responseJSON.errors[x][0]);
                ajaxForm.find("[name='" + x + "']").parent().closest('.form-group').find('.em').html(error.responseJSON.errors[x][0]);
            }
            $(".request-loader").removeClass("show");
            $(e.target).attr('disabled', false);
        }
    });
});

/* ***************************************************
  ==========Form Submit with AJAX Request End==========
  ******************************************************/

/* ***************************************************************
  ==========Form Prepopulate After Clicking Button Start==========
  ***************************************************************/

    $(document).on("click",".editbtn", function () {
        let datas = $(this).data();
        delete datas["toggle"];
        for (let x in datas) {
                $("#in" + x).val(datas[x]);
        }
    });

/* *************************************************************
==========Form Prepopulate After Clicking Button End============
***************************************************************/