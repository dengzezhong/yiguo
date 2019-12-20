<?php
    header('content-type:text/html;charset=utf-8');
    //连接数据库

    //1，获取数据库基本信息；
    $mysql_conf=array(
        'host'=>'localhost:3306',
        'db_user'=>'root',
        'db_pass'=>'dzz1114',
        'db'=>'yiguo'
    );

    //2,打开数据库；
    // $mysqli=new mysqli($mysql_conf['host'],$mysql_conf['db_user'],$mysql_conf['db_pass'],$mysql_conf['db']);
    $mysqli = new mysqli('localhost:3306','root','dzz1114','yiguo');

    //3，判断是否打开成功；
    if($mysqli->connect_errno){
        die('未能打开数据库'.$mysqli->connect_errno);
    }

    //4,设置查询字符集；
    $mysqli->query("set names utf8");

    //5,选择数据库；
    $select_db=$mysqli->select_db($mysql_conf['db']);

    //6,判断是否选择成功；
    if(!$select_db){
        die('出错'.$mysqli->error);
    }

    //执行sql语句，查询数据；
    // $sql="select*from user_enroll";
    // $result=$mysqli->query($sql);
    // var_dump($result);
?>