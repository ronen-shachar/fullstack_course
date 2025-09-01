// API Configuration
const API_URL = 'http://127.0.0.1:5000/api';

// DOM Elements
const studentsContainer = document.getElementById('students-container');
const studentDetailsSection = document.getElementById('student-details');
const closeDetailsBtn = document.getElementById('close-details');
const detailName = document.getElementById('detail-name');
const detailId = document.getElementById('detail-id');
const detailAddress = document.getElementById('detail-address');
const gradesList = document.getElementById('grades-list');
const gradeAverageValue = document.getElementById('grade-average-value');
const searchInput = document.getElementById('search-input');

// Modal Elements
const addStudentBtn = document.getElementById('add-student-btn');
const addStudentModal = document.getElementById('add-student-modal');
const addStudentForm = document.getElementById('add-student-form');
const addGradeBtn = document.getElementById('add-grade-btn');
const addGradeModal = document.getElementById('add-grade-modal');
const addGradeForm = document.getElementById('add-grade-form');
const editAddressBtn = document.getElementById('edit-address-btn');
const editAddressModal = document.getElementById('edit-address-modal');
const editAddressForm = document.getElementById('edit-address-form');
const updatedAddressInput = document.getElementById('updated-address');

// Close buttons
const modalCloseButtons = document.querySelectorAll('.modal-close, .modal-cancel');

// Current student
let currentStudentId = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    fetchStudents();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    // Close details panel
    closeDetailsBtn.addEventListener('click', () => {
        studentDetailsSection.classList.add('hidden');
    });

    // Modal open buttons
    addStudentBtn.addEventListener('click', () => openModal(addStudentModal));
    addGradeBtn.addEventListener('click', () => openModal(addGradeModal));
    editAddressBtn.addEventListener('click', () => {
        updatedAddressInput.value = detailAddress.textContent;
        openModal(editAddressModal);
    });

    // Modal close buttons
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', event => {
            const modal = event.target.closest('.modal-overlay');
            closeModal(modal);
        });
    });

    // Form submissions
    addStudentForm.addEventListener('submit', handleAddStudent);
    addGradeForm.addEventListener('submit', handleAddGrade);
    editAddressForm.addEventListener('submit', handleUpdateAddress);

    // Search functionality
    searchInput.addEventListener('input', handleSearch);
}

// API Functions
async function fetchStudents() {
    try {
        const response = await fetch(`${API_URL}/students`);
        const students = await response.json();
        renderStudentsList(students);
    } catch (error) {
        showError('שגיאה בטעינת רשימת התלמידים');
        console.error('Error fetching students:', error);
    }
}

async function fetchStudentDetails(studentId) {
    try {
        const response = await fetch(`${API_URL}/students/${studentId}`);
        const student = await response.json();
        
        if (response.ok) {
            renderStudentDetails(student);
            currentStudentId = studentId;
        } else {
            showError(student.error || 'שגיאה בטעינת פרטי התלמיד');
        }
    } catch (error) {
        showError('שגיאה בטעינת פרטי התלמיד');
        console.error('Error fetching student details:', error);
    }
}

async function addStudent(studentData) {
    try {
        const response = await fetch(`${API_URL}/students`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            return { success: true, data: result };
        } else {
            return { success: false, error: result.error || 'שגיאה בהוספת תלמיד חדש' };
        }
    } catch (error) {
        console.error('Error adding student:', error);
        return { success: false, error: 'שגיאת תקשורת עם השרת' };
    }
}

async function updateStudentAddress(studentId, newAddress) {
    try {
        const response = await fetch(`${API_URL}/students/${studentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ address: newAddress })
        });
        
        const result = await response.json();
        
        if (response.ok) {
            return { success: true, data: result };
        } else {
            return { success: false, error: result.error || 'שגיאה בעדכון הכתובת' };
        }
    } catch (error) {
        console.error('Error updating address:', error);
        return { success: false, error: 'שגיאת תקשורת עם השרת' };
    }
}

async function addGradeToStudent(studentId, grade) {
    try {
        const response = await fetch(`${API_URL}/students/${studentId}/grades`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ grade })
        });
        
        const result = await response.json();
        
        if (response.ok) {
            return { success: true, data: result };
        } else {
            return { success: false, error: result.error || 'שגיאה בהוספת ציון' };
        }
    } catch (error) {
        console.error('Error adding grade:', error);
        return { success: false, error: 'שגיאת תקשורת עם השרת' };
    }
}

// Event Handlers
function handleStudentClick(studentId) {
    fetchStudentDetails(studentId);
    studentDetailsSection.classList.remove('hidden');
}

function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const studentItems = studentsContainer.querySelectorAll('.student-item');
    
    studentItems.forEach(item => {
        const name = item.querySelector('.student-name').textContent.toLowerCase();
        const id = item.querySelector('.student-id').textContent;
        
        if (name.includes(searchTerm) || id.includes(searchTerm)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

async function handleAddStudent(event) {
    event.preventDefault();
    
    const newStudent = {
        name: document.getElementById('new-name').value,
        id: document.getElementById('new-id').value,
        address: document.getElementById('new-address').value,
        grades: []
    };
    
    const result = await addStudent(newStudent);
    
    if (result.success) {
        closeModal(addStudentModal);
        addStudentForm.reset();
        showSuccess('התלמיד נוסף בהצלחה');
        fetchStudents();
    } else {
        showError(result.error);
    }
}

async function handleAddGrade(event) {
    event.preventDefault();
    
    const grade = parseInt(document.getElementById('new-grade').value);
    
    if (!currentStudentId) {
        showError('לא נבחר תלמיד');
        return;
    }
    
    const result = await addGradeToStudent(currentStudentId, grade);
    
    if (result.success) {
        closeModal(addGradeModal);
        addGradeForm.reset();
        showSuccess('הציון נוסף בהצלחה');
        renderStudentDetails(result.data);
    } else {
        showError(result.error);
    }
}

async function handleUpdateAddress(event) {
    event.preventDefault();
    
    const newAddress = updatedAddressInput.value;
    
    if (!currentStudentId) {
        showError('לא נבחר תלמיד');
        return;
    }
    
    const result = await updateStudentAddress(currentStudentId, newAddress);
    
    if (result.success) {
        closeModal(editAddressModal);
        showSuccess('הכתובת עודכנה בהצלחה');
        renderStudentDetails(result.data);
    } else {
        showError(result.error);
    }
}

// UI Rendering Functions
function renderStudentsList(students) {
    studentsContainer.innerHTML = '';
    
    if (students.length === 0) {
        studentsContainer.innerHTML = '<p class="empty-state">לא נמצאו תלמידים</p>';
        return;
    }
    
    students.forEach(student => {
        const studentElement = document.createElement('li');
        studentElement.className = 'student-item';
        studentElement.innerHTML = `
            <div>
                <span class="student-name">${student.name}</span>
            </div>
            <span class="student-id">${student.id}</span>
        `;
        
        studentElement.addEventListener('click', () => handleStudentClick(student.id));
        studentsContainer.appendChild(studentElement);
    });
}

function renderStudentDetails(student) {
    detailName.textContent = student.name;
    detailId.textContent = student.id;
    detailAddress.textContent = student.address;
    
    // Render grades
    gradesList.innerHTML = '';
    
    if (student.grades.length === 0) {
        gradesList.innerHTML = '<p class="empty-state">אין ציונים</p>';
        gradeAverageValue.textContent = '0';
    } else {
        // Calculate average
        const average = calculateAverage(student.grades);
        gradeAverageValue.textContent = average.toFixed(1);
        
        // Render grade pills
        student.grades.forEach(grade => {
            const gradeElement = document.createElement('div');
            gradeElement.className = 'grade-pill';
            gradeElement.textContent = grade;
            
            // Add color based on grade value
            if (grade >= 90) {
                gradeElement.style.backgroundColor = '#e6f7ff';
                gradeElement.style.color = '#0066cc';
            } else if (grade >= 70) {
                gradeElement.style.backgroundColor = '#f6ffed';
                gradeElement.style.color = '#52c41a';
            } else if (grade >= 60) {
                gradeElement.style.backgroundColor = '#fffbe6';
                gradeElement.style.color = '#faad14';
            } else {
                gradeElement.style.backgroundColor = '#fff1f0';
                gradeElement.style.color = '#f5222d';
            }
            
            gradesList.appendChild(gradeElement);
        });
    }
}

// Helper Functions
function calculateAverage(grades) {
    if (grades.length === 0) return 0;
    const sum = grades.reduce((total, grade) => total + grade, 0);
    return sum / grades.length;
}

function openModal(modal) {
    modal.classList.remove('hidden');
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.add('hidden');
    // Restore body scrolling
    document.body.style.overflow = '';
}

// Notifications
function showSuccess(message) {
    showNotification(message, 'success');
}

function showError(message) {
    showNotification(message, 'error');
}

function showNotification(message, type) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add icon based on type
    const icon = document.createElement('i');
    icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    notification.prepend(icon);
    
    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'notification-close';
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    notification.appendChild(closeBtn);
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        zIndex: '2000',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        animation: 'slideIn 0.3s forwards'
    });
    
    if (type === 'success') {
        notification.style.backgroundColor = '#f6ffed';
        notification.style.color = '#52c41a';
        notification.style.border = '1px solid #b7eb8f';
    } else {
        notification.style.backgroundColor = '#fff1f0';
        notification.style.color = '#f5222d';
        notification.style.border = '1px solid #ffa39e';
    }
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
    
    // Add slideOut animation
    style.textContent += `
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
}