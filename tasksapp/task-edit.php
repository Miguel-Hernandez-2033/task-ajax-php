<?php

    include('database.php');

    if(isset($_POST['id']) && isset($_POST['name']) && isset($_POST['description'])){
        $id = $_POST['id'];
        $name = $_POST['name'];
        $description = $_POST['description'];
        $query = "UPDATE task SET name = '$name', description = '$description' WHERE id = '$id'";

        $result = mysqli_query($connection, $query);

        if(!$result){
            die('Query Failed'. mysqli_error($query));
        }
        echo "Task edited successfully";
    }