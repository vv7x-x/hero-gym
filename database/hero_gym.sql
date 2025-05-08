CREATE TABLE members (
    member_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    barcode VARCHAR(50) UNIQUE NOT NULL,
    registration_date DATE NOT NULL,
    phone VARCHAR(20),
    membership_type VARCHAR(50),
    active BOOLEAN DEFAULT TRUE
);

CREATE TABLE attendance (
    attendance_id INT PRIMARY KEY AUTO_INCREMENT,
    member_id INT NOT NULL,
    check_in DATETIME NOT NULL,
    FOREIGN KEY (member_id) REFERENCES members(member_id)
);