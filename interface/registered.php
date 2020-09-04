<?php

//引入conn文件
include('./conn.php');

//接受前端数据
$phone = $_REQUEST['users_phone'];
$password =$_REQUEST['users_password'];
 
echo $password;
//验证用户名是否存在
$sql = "select * from userx where phone='$phone'";
// echo $sql;
//执行查询语句
$result = $mysqli->query($sql);

//判断数据库中是否存在该数据，如果存在该数据，大于0

if ($result->num_rows > 0) {
    // echo '<script> alert("用户名已存在"); </script>';
    echo '<script>alert("用户已存在");</script>';
    echo '<script>location.href="../src/html/zhuce.html"</script>';

    //关闭数据库
    $mysqli->close();
    die();
}

//数据写入数据库
$insert = "insert into userx(phone,password) values ('$phone','$password')";
echo $insret;
//执行插入语句
$res = $mysqli->query($insert);
// echo $res;
//关闭数据库
$mysqli->close();
if ($res) {
    echo '<script>alert("注册成功 将跳转登录...");</script>';
    echo '<script>location.href="../src/html/index.html"</script>';
}