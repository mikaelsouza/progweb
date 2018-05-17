<?php

$user = "mikael";
$password = "mikael";

try {
    $conn = new PDO("mysql:host=localhost; dbname=formulario_contrato", $user,
                    $password);
    $conn->exec("set names utf8");

    $stmt = $conn->prepare("INSERT INTO data (name, email, website, message) VALUES
                            (:name, :email, :website, :message)");

    $stmt->bindValue(":name", $_GET['name']);
    $stmt->bindValue(":email", $_GET['email']);
    $stmt->bindValue(":website", $_GET['website']);
    $stmt->bindValue(":message", $_GET['message']);

    $stmt->execute();

    echo "Dados inseridos com sucesso!<br>";
    foreach($_GET as $key => $value) {
        echo $key . ": " . $value . "<br>";
    }

} catch(PDOException $e){
    echo $e->getMessage();
}