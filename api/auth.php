<?php
require_once '../database/db_connect.php';

header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);
$phone = $input['phone'] ?? '';
$password = $input['password'] ?? '';

if (empty($phone) || empty($password)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'رقم الهاتف وكلمة المرور مطلوبان']);
    exit;
}

try {
    $stmt = executeQuery($pdo, "SELECT * FROM members WHERE phone = ?", [$phone]);
    $member = $stmt->fetch();

    if (!$member) {
        echo json_encode(['success' => false, 'message' => 'العضو غير موجود']);
        exit;
    }

    if (!password_verify($password, $member['password'])) {
        echo json_encode(['success' => false, 'message' => 'كلمة المرور غير صحيحة']);
        exit;
    }

    // هنا يمكن إضافة رمز الجلسة أو أي معلومات أخرى تحتاجها
    echo json_encode(['success' => true, 'message' => 'تم تسجيل الدخول بنجاح', 'member' => $member]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'خطأ في السيرفر: ' . $e->getMessage()]);
}
?>