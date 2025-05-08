document.addEventListener('DOMContentLoaded', function() {
    const manualForm = document.getElementById('manualForm');
    const memberCodeInput = document.getElementById('memberCode');
    const attendanceTableBody = document.querySelector('#attendanceTable tbody');

    manualForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const memberCode = memberCodeInput.value.trim();
        if (memberCode) {
            registerAttendance(memberCode);
        } else {
            alert('يرجى إدخال كود العضو');
        }
    });

    function registerAttendance(memberCode) {
        fetch('/api/attendance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: memberCode }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(`تم تسجيل حضور ${data.memberName} بنجاح`);
                updateAttendanceTable();
            } else {
                alert(data.message || 'حدث خطأ أثناء تسجيل الحضور');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('حدث خطأ في الاتصال بالسيرفر');
        });
    }

    function updateAttendanceTable() {
        fetch('/api/recent-attendance')
        .then(response => response.json())
        .then(data => {
            attendanceTableBody.innerHTML = '';
            data.forEach(record => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${record.name}</td>
                    <td>${record.code}</td>
                    <td>${new Date(record.check_in).toLocaleString()}</td>
                `;
                attendanceTableBody.appendChild(row);
            });
        });
    }
});