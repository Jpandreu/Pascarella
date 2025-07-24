<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json"); //Librería para que valide formato json

include_once 'config/conexion.php'; //importar el archivo conexion.php

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'OPTIONS') {
    http_response_code(200);
    exit();
}

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $id = $_GET['id'];
            $stmt = $pdo->prepare("SELECT * FROM contacto pascarella WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode($stmt->fetch());
        } else {
            $stmt = $pdo->query("SELECT * FROM contacto pascarella");
            echo json_encode($stmt->fetchAll());
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);

        if ($data === null) {
            http_response_code(400);
            echo json_encode(['message' => 'Error: Invalid JSON received.']);
            exit;
        }
        if (empty($data['nombre']) || empty($data['correo'])) {
             http_response_code(400);
             echo json_encode(['message' => 'Error: Nombre y Correo son campos requeridos.']);
             exit;
        }

        $sql = "INSERT INTO `contacto pascarella` (nombre, `Correo electrónico`, Missatge) VALUES (?, ?, ?)";
        
        try {
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                $data['nombre'],
                $data['correo'],
                $data['mensaje']
            ]);
            $data['id'] = $pdo->lastInsertId();
            http_response_code(201); // Status for Created
            echo json_encode($data);
        } catch (PDOException $e) {
            http_response_code(500); // Internal Server Error
            echo json_encode(['message' => 'Database Error: ' . $e->getMessage()]);
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);

        if ($data === null || empty($data['id'])) {
            http_response_code(400);
            echo json_encode(['message' => 'Error: Invalid JSON or missing client ID.']);
            exit;
        }

        $sql = "UPDATE `contacto pascarella` SET nombre = ?, `Correo electrónico` = ?, Missatge = ? WHERE id = ?";
        
        try {
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                $data['nombre'],
                $data['correo'],
                $data['mensaje'],
                $data['id']
            ]);
            http_response_code(200);
            echo json_encode(['message' => 'Contacto actualizado']);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['message' => 'Database Error: ' . $e->getMessage()]);
        }
        break;

    case 'DELETE':
        if (empty($_GET['id'])) {
            http_response_code(400);
            echo json_encode(['message' => 'Error: Missing client ID.']);
            exit;
        }
        $id = $_GET['id'];
        $stmt = $pdo->prepare("DELETE FROM contacto pascarella WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['message' => 'Contacto eliminado']);
        break;

    default:
        http_response_code(405);
        echo json_encode(['message' => 'Method not allowed']);
        break;
}
?>