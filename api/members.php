<?php
require_once '../database/db_connect.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $name = $input['name'] ?? '';
    $phone = $input['phone'] ?? '';
    $membershipType = $input['membershipType'] ?? '';

    if (empty($name) || empty($membershipType)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'اسم العضو ونوع العضوية مطلوبان']);
        exit;
    }

    try {
        $code = "HERO-" . time();
        $barcode = "BC-" . time();

        executeQuery($pdo, 
            "INSERT INTO members (name, code, barcode, registration_date, phone, membership_type) VALUES (?, ?, ?, CURDATE(), ?, ?)",
            [$name, $code, $barcode, $phone, $membershipType]
        );

        echo json_encode(['success' => true, 'code' => $code, 'barcode' => $barcode]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'خطأ في إضافة العضو: ' . $e->getMessage()]);
    }
} elseif ($method === 'GET') {
    try {
        $stmt = executeQuery($pdo, "SELECT * FROM members ORDER BY registration_date DESC");
        $members = $stmt->fetchAll();

        echo json_encode($members);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'خطأ في جلب الأعضاء: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'طريقة الطلب غير مدعومة']);
}
?>