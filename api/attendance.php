<?php
require_once '../database/db_connect.php';

header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);
$memberCode = $input['code'] ?? '';

if (empty($memberCode)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'كود العضو مطلوب']);
    exit;
}

try {
    // البحث عن العضو
    $stmt = executeQuery($pdo, 
        "SELECT member_id, name, active FROM members WHERE code = ? OR barcode = ?", 
        [$memberCode, $memberCode]
    );
    $member = $stmt->fetch();

    if (!$member) {
        echo json_encode(['success' => false, 'message' => 'العضو غير موجود']);
        exit;
    }

    if (!$member['active']) {
        echo json_encode(['success' => false, 'message' => 'عضويتك غير مفعلة']);
        exit;
    }

    // تسجيل الحضور
    executeQuery($pdo,
        "INSERT INTO attendance (member_id, check_in) VALUES (?, NOW())",
        [$member['member_id']]
    );

    echo json_encode([
        'success' => true,
        'memberName' => $member['name'],
        'message' => 'تم تسجيل الحضور بنجاح'
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'خطأ في السيرفر: ' . $e->getMessage()]);
}
?>