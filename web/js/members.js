document.addEventListener('DOMContentLoaded', function() {
    const membersTable = document.getElementById('membersTable');
    const addMemberForm = document.getElementById('addMemberForm');
    const addMemberBtn = document.getElementById('addMemberBtn');
    const addMemberModal = document.getElementById('addMemberModal');
    const closeModal = document.querySelector('.close');

    // Load members on page load
    loadMembers();

    // Add member event
    addMemberForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const memberName = document.getElementById('memberName').value;
        const memberPhone = document.getElementById('memberPhone').value;
        const membershipType = document.getElementById('membershipType').value;

        addMember(memberName, memberPhone, membershipType);
    });

    // Show modal for adding member
    addMemberBtn.addEventListener('click', function() {
        addMemberModal.style.display = 'block';
    });

    // Close modal
    closeModal.addEventListener('click', function() {
        addMemberModal.style.display = 'none';
    });

    // Load members from API
    function loadMembers() {
        fetch('/api/members')
            .then(response => response.json())
            .then(data => {
                membersTable.querySelector('tbody').innerHTML = '';
                data.forEach(member => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${member.code}</td>
                        <td>${member.name}</td>
                        <td>${member.membership_type}</td>
                        <td>${new Date(member.registration_date).toLocaleDateString()}</td>
                        <td>${member.active ? 'مفعل' : 'غير مفعل'}</td>
                        <td>
                            <button onclick="editMember(${member.member_id})">تعديل</button>
                            <button onclick="deleteMember(${member.member_id})">حذف</button>
                        </td>
                    `;
                    membersTable.querySelector('tbody').appendChild(row);
                });
            })
            .catch(error => console.error('Error loading members:', error));
    }

    // Add new member
    function addMember(name, phone, membershipType) {
        fetch('/api/members', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, phone, membershipType }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('تم إضافة العضو بنجاح');
                loadMembers();
                addMemberModal.style.display = 'none';
                addMemberForm.reset();
            } else {
                alert(data.message || 'حدث خطأ أثناء إضافة العضو');
            }
        })
        .catch(error => console.error('Error adding member:', error));
    }

    // Edit member function (to be implemented)
    window.editMember = function(memberId) {
        // Logic to edit member
    };

    // Delete member function (to be implemented)
    window.deleteMember = function(memberId) {
        // Logic to delete member
    };
});