import $ from './library/jquery.js';



$(function() {
    let name = {
        "users_name": /^[A-z]\w{5,15}$/
    };
    let password = {
        "users_password": /^.{6,16}$/
    };
    let email = {
        "users_email": /^\w{6,16}@[A-z0-9_-]{2,}\.[A-z]{2,7}\.?[A-z]*$/
    };
    let phone = {
        "users_phone": /^1[3-9]\d{9}$/
    };


    $('#name>input').each(function(index, elm) {
        $(elm).on('input', function() {
            if (name[$(elm).attr('id')].test($(elm).val())) {
                $('span[class="' + $(elm).attr('id') + '"]').html('通过验证');
                $(this).attr('data-pass', true);
            } else {
                $('span[class="' + $(elm).attr('id') + '"]').html('未通过验证');
                $(this).attr('data-pass', false);
            }
            check();
        });
    });
    $('#password>input').each(function(index, elm) {
        $(elm).on('input', function() {
            if (password[$(elm).attr('id')].test($(elm).val())) {
                $('span[class="' + $(elm).attr('id') + '"]').html('通过验证');
                $(this).attr('data-pass', true);
            } else {
                $('span[class="' + $(elm).attr('id') + '"]').html('未通过验证');
                $(this).attr('data-pass', false);
            }
            check();
        });
    });
    $('#email>input').each(function(index, elm) {
        $(elm).on('input', function() {
            if (email[$(elm).attr('id')].test($(elm).val())) {
                $('span[class="' + $(elm).attr('id') + '"]').html('通过验证');
                $(this).attr('data-pass', true);
            } else {
                $('span[class="' + $(elm).attr('id') + '"]').html('未通过验证');
                $(this).attr('data-pass', false);
            }
            check();
        });
    });
    $('#phone>input').each(function(index, elm) {
        $(elm).on('input', function() {
            if (phone[$(elm).attr('id')].test($(elm).val())) {
                $('span[class="' + $(elm).attr('id') + '"]').html('通过验证');
                $(this).attr('data-pass', true);
            } else {
                $('span[class="' + $(elm).attr('id') + '"]').html('未通过验证');
                $(this).attr('data-pass', false);
            }
            check();
        });
    });



    $('#checkpass').on('input', function() {
        if ($(this).val() === $('#users_password').val()) {
            $('.checkpass').html('通过验证');
            $(this).attr('data-pass', true);
        } else {
            $('.checkpass').html('两次输入的密码不同,请确认');
            $(this).attr('data-pass', false);
        }
        check();
    });

    function check() {
        if ($('[data-pass=true]').length == 4) {
            $('#btn').removeAttr('disabled');
        } else {
            $('#btn').attr('disabled', 'disabled');
        }
    }

});