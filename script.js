const gradeScale = [
    { min: 97, max: 100, letter: "A+", avg: 98.5, gpa: { standard: 4, collegePrep: 4.33, honors: 5, ap: 5.33 } },
    { min: 93, max: 96, letter: "A", avg: 94.5, gpa: { standard: 4, collegePrep: 4.33, honors: 5, ap: 5.33 } },
    { min: 90, max: 92, letter: "A-", avg: 91, gpa: { standard: 3.67, collegePrep: 3.97, honors: 4.59, ap: 4.89 } },
    { min: 87, max: 89, letter: "B+", avg: 88, gpa: { standard: 3.33, collegePrep: 3.6, honors: 4.16, ap: 4.44 } },
    { min: 83, max: 86, letter: "B", avg: 84.5, gpa: { standard: 3, collegePrep: 3.25, honors: 3.75, ap: 4 } },
    { min: 80, max: 82, letter: "B-", avg: 81, gpa: { standard: 2.67, collegePrep: 2.89, honors: 3.34, ap: 3.56 } },
    { min: 77, max: 79, letter: "C+", avg: 78, gpa: { standard: 2.33, collegePrep: 2.52, honors: 2.91, ap: 3.1 } },
    { min: 73, max: 76, letter: "C", avg: 74.5, gpa: { standard: 2, collegePrep: 2.17, honors: 2.5, ap: 2.67 } },
    { min: 70, max: 72, letter: "C-", avg: 71, gpa: { standard: 1.67, collegePrep: 1.81, honors: 2.09, ap: 2.23 } },
    { min: 67, max: 69, letter: "D+", avg: 68, gpa: { standard: 1.33, collegePrep: 1.44, honors: 1.66, ap: 1.77 } },
    { min: 65, max: 66, letter: "D", avg: 65.5, gpa: { standard: 1, collegePrep: 1.08, honors: 1.25, ap: 1.33 } },
    { min: 60, max: 64, letter: "D-", avg: 62, gpa: { standard: 1, collegePrep: 1.08, honors: 1.25, ap: 1.33 } },
    { min: 0, max: 59, letter: "F", avg: 29.5, gpa: { standard: 0, collegePrep: 0, honors: 0, ap: 0 } },
];

const letterGrades = [
    "A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"
];

const courseLevels = [
    { value: "standard", text: "Standard" },
    { value: "collegePrep", text: "College Prep" },
    { value: "honors", text: "Honors" },
    { value: "ap", text: "AP" },
];

function addCourseRow(courseExample = '') {
    const tbody = document.getElementById('courses-tbody');
    const row = document.createElement('tr');

    // Course Name
    const courseNameCell = document.createElement('td');
    const courseNameInput = document.createElement('input');
    courseNameInput.type = 'text';
    courseNameInput.name = 'courseName';
    courseNameInput.placeholder = courseExample || 'e.g., Algebra II';
    courseNameCell.appendChild(courseNameInput);
    row.appendChild(courseNameCell);

    // Course Level
    const courseLevelCell = document.createElement('td');
    const courseLevelSelect = document.createElement('select');
    courseLevelSelect.name = 'courseLevel';

    courseLevels.forEach(level => {
        const option = document.createElement('option');
        option.value = level.value;
        option.text = level.text;
        courseLevelSelect.appendChild(option);
    });

    courseLevelCell.appendChild(courseLevelSelect);
    row.appendChild(courseLevelCell);

    // Numerical Grade
    const gradeCell = document.createElement('td');
    const gradeInput = document.createElement('input');
    gradeInput.type = 'number';
    gradeInput.name = 'grade';
    gradeInput.min = 0;
    gradeInput.max = 100;
    gradeInput.step = 0.01;
    gradeInput.placeholder = 'e.g., 95';
    gradeCell.appendChild(gradeInput);
    row.appendChild(gradeCell);

    // Letter Grade
    const letterGradeCell = document.createElement('td');
    const letterGradeSelect = document.createElement('select');
    letterGradeSelect.name = 'letterGrade';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = '-- Select --';
    letterGradeSelect.appendChild(defaultOption);

    letterGrades.forEach(letter => {
        const option = document.createElement('option');
        option.value = letter;
        option.text = letter;
        letterGradeSelect.appendChild(option);
    });

    letterGradeCell.appendChild(letterGradeSelect);
    row.appendChild(letterGradeCell);

    // Synchronize Numerical and Letter Grades
    gradeInput.addEventListener('input', function() {
        const numericalGrade = parseFloat(gradeInput.value);
        if (!isNaN(numericalGrade)) {
            const letter = getLetterGrade(numericalGrade);
            letterGradeSelect.value = letter;
        } else {
            letterGradeSelect.value = '';
        }
    });

    letterGradeSelect.addEventListener('change', function() {
        if (letterGradeSelect.value !== '') {
            gradeInput.value = '';
        }
    });

    // Remove Button
    const removeCell = document.createElement('td');
    const removeButton = document.createElement('button');
    removeButton.innerHTML = '<i class="fas fa-trash"></i>';
    removeButton.type = 'button';
    removeButton.classList.add('remove-btn');
    removeButton.onclick = function() {
        tbody.removeChild(row);
    };
    removeCell.appendChild(removeButton);
    row.appendChild(removeCell);

    tbody.appendChild(row);
}

function calculateGPA() {
    const tbody = document.getElementById('courses-tbody');
    const rows = tbody.getElementsByTagName('tr');
    let totalWeightedPoints = 0;
    let totalUnweightedPoints = 0;
    let totalCourses = 0;

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const courseLevel = row.querySelector('select[name="courseLevel"]').value;
        const gradeInput = row.querySelector('input[name="grade"]');
        const letterGradeSelect = row.querySelector('select[name="letterGrade"]');

        let numericalGrade = parseFloat(gradeInput.value);
        let letterGrade = letterGradeSelect.value;

        if (isNaN(numericalGrade) && letterGrade === '') {
            alert('Please enter either a numerical grade or select a letter grade for all courses.');
            return;
        }

        if (!isNaN(numericalGrade)) {
            letterGrade = getLetterGrade(numericalGrade);
        } else if (letterGrade !== '') {
            numericalGrade = getAverageNumericalGrade(letterGrade);
        }

        const weightedGpaPoints = getGpaPointsFromLetter(letterGrade, courseLevel);
        const unweightedGpaPoints = getGpaPointsFromLetter(letterGrade, 'standard');

        totalWeightedPoints += weightedGpaPoints;
        totalUnweightedPoints += unweightedGpaPoints;
        totalCourses += 1;
    }

    if (totalCourses === 0) {
        alert('Please add at least one course.');
        return;
    }

    const weightedGpa = totalWeightedPoints / totalCourses;
    const unweightedGpa = totalUnweightedPoints / totalCourses;

    document.getElementById('gpa-result').innerHTML = `
        <p>Your <strong>Weighted GPA</strong> is: ${weightedGpa.toFixed(2)}</p>
        <p>Your <strong>Unweighted GPA</strong> is: ${unweightedGpa.toFixed(2)}</p>
    `;
}

function getLetterGrade(numericalGrade) {
    for (let i = 0; i < gradeScale.length; i++) {
        const gradeRange = gradeScale[i];
        if (numericalGrade >= gradeRange.min && numericalGrade <= gradeRange.max) {
            return gradeRange.letter;
        }
    }
    return 'F';
}

function getAverageNumericalGrade(letterGrade) {
    for (let i = 0; i < gradeScale.length; i++) {
        if (gradeScale[i].letter === letterGrade) {
            return gradeScale[i].avg;
        }
    }
    return 0;
}

function getGpaPointsFromLetter(letterGrade, courseLevel) {
    for (let i = 0; i < gradeScale.length; i++) {
        if (gradeScale[i].letter === letterGrade) {
            return gradeScale[i].gpa[courseLevel];
        }
    }
    return 0;
}

document.getElementById('add-course-btn').addEventListener('click', addCourseRow);
document.getElementById('calculate-btn').addEventListener('click', calculateGPA);

const initialCourses = [
    'Algebra II',
    'Biology',
    'English Literature',
    'World History',
    'Spanish I'
];

initialCourses.forEach(course => addCourseRow(course));