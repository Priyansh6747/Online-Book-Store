<?php
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    $connect = new mysqli("localhost","root","","OnlineBookStore");

    if($connect->connect_error)
        die("Connection error ". $connect->connect_error);

    $data = file_get_contents("php://input");
    $data_decoded = json_decode($data,true);
    if($data_decoded)
    {
        $name = $data_decoded["Name"];
        $username = $data_decoded['Username'];
        $email = $data_decoded['Email'];
        $password = $data_decoded['Password'];

        $query = $connect->prepare("INSERT INTO customer (name, username, email, password) VALUES (?, ?, ?, ?)");
        $query->bind_param("ssss", $name, $username, $email, $password);

        if ($query->execute()) 
            echo json_encode(["message" => "User created successfully"]);
        else 
            echo json_encode(["error" => "Failed to insert data"]);
    } 
    else 
        echo json_encode(["error" => "Invalid input"]);

    $connect->close();
?>