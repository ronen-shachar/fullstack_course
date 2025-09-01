from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initial students data
students = [
    {
        "id": "123456789",
        "name": "יוסי כהן",
        "address": "רחוב הרצל 15, תל אביב",
        "grades": [85, 92, 78, 90]
    },
    {
        "id": "987654321",
        "name": "מיכל לוי",
        "address": "שדרות רוטשילד 30, תל אביב",
        "grades": [95, 88, 92, 89]
    },
    {
        "id": "456789123",
        "name": "אילן גולן",
        "address": "רחוב ביאליק 8, רמת גן",
        "grades": [75, 82, 90, 85]
    }
]

@app.route('/')
def index():
    return app.redirect('/static/index.html')

# Get all students (name and ID only)
@app.route('/api/students', methods=['GET'])
def get_students():
    simplified_students = [{"id": student["id"], "name": student["name"]} for student in students]
    return jsonify(simplified_students)


# Get specific student details
@app.route('/api/students/<student_id>', methods=['GET'])
def get_student(student_id):
    student = next((s for s in students if s["id"] == student_id), None)
    if student:
        return jsonify(student)
    else:
        return jsonify({"error": "תלמיד לא נמצא"}), 404


# Add new student
@app.route('/api/students', methods=['POST'])
def add_student():
    new_student = request.json

    # Check if student with this ID already exists
    if any(s["id"] == new_student["id"] for s in students):
        return jsonify({"error": "תלמיד עם מספר זהות זה כבר קיים"}), 400

    # Add new student
    students.append(new_student)
    return jsonify(new_student), 201


# Update student details
@app.route('/api/students/<student_id>', methods=['PUT'])
def update_student(student_id):
    update_data = request.json
    student = next((s for s in students if s["id"] == student_id), None)

    if not student:
        return jsonify({"error": "תלמיד לא נמצא"}), 404

    # Update student fields
    if "name" in update_data:
        student["name"] = update_data["name"]
    if "address" in update_data:
        student["address"] = update_data["address"]

    return jsonify(student)


# Add grade to student
@app.route('/api/students/<student_id>/grades', methods=['POST'])
def add_grade(student_id):
    grade_data = request.json
    student = next((s for s in students if s["id"] == student_id), None)

    if not student:
        return jsonify({"error": "תלמיד לא נמצא"}), 404

    if "grade" not in grade_data:
        return jsonify({"error": "נתון הציון חסר"}), 400

    # Add new grade
    student["grades"].append(grade_data["grade"])
    return jsonify(student)


if __name__ == '__main__':
    app.run(debug=True)