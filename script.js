// Grade scale data
const gradeScale = [
    { min: 97, max: 100, letter: "A+", avg: 98.5, gpa: { standard: 4.0, collegePrep: 4.33, honors: 5.0, ap: 5.33 } },
    { min: 93, max: 96, letter: "A", avg: 94.5, gpa: { standard: 4.0, collegePrep: 4.33, honors: 5.0, ap: 5.33 } },
    { min: 90, max: 92, letter: "A-", avg: 91, gpa: { standard: 3.67, collegePrep: 3.97, honors: 4.59, ap: 4.89 } },
    { min: 87, max: 89, letter: "B+", avg: 88, gpa: { standard: 3.33, collegePrep: 3.6, honors: 4.16, ap: 4.44 } },
    { min: 83, max: 86, letter: "B", avg: 84.5, gpa: { standard: 3.0, collegePrep: 3.25, honors: 3.75, ap: 4.0 } },
    { min: 80, max: 82, letter: "B-", avg: 81, gpa: { standard: 2.67, collegePrep: 2.89, honors: 3.34, ap: 3.56 } },
    { min: 77, max: 79, letter: "C+", avg: 78, gpa: { standard: 2.33, collegePrep: 2.52, honors: 2.91, ap: 3.1 } },
    { min: 73, max: 76, letter: "C", avg: 74.5, gpa: { standard: 2.0, collegePrep: 2.17, honors: 2.5, ap: 2.67 } },
    { min: 70, max: 72, letter: "C-", avg: 71, gpa: { standard: 1.67, collegePrep: 1.81, honors: 2.09, ap: 2.23 } },
    { min: 67, max: 69, letter: "D+", avg: 68, gpa: { standard: 1.33, collegePrep: 1.44, honors: 1.66, ap: 1.77 } },
    { min: 65, max: 66, letter: "D", avg: 65.5, gpa: { standard: 1.0, collegePrep: 1.08, honors: 1.25, ap: 1.33 } },
    { min: 60, max: 64, letter: "D-", avg: 62, gpa: { standard: 1.0, collegePrep: 1.08, honors: 1.25, ap: 1.33 } },
    { min: 0, max: 59, letter: "F", avg: 29.5, gpa: { standard: 0.0, collegePrep: 0.0, honors: 0.0, ap: 0.0 } },
];

// Course levels
const courseLevels = [
    { value: "standard", text: "Standard" },
    { value: "collegePrep", text: "College Prep" },
    { value: "honors", text: "Honors" },
    { value: "ap", text: "AP" },
];

// Courses categorized by level
const coursesByLevel = {
    standard: [
        "Drawing & Painting",
        "Digital Media",
        "Sculpture & Ceramics",
        "Music",
        "Physical Education",
        "Public Speaking",
        "Astronomy",
        "Cultural Studies I",
        "Cultural Studies II",
        "National & International Current Affairs",
        "Public Speaking",
        "Broadcast Media Production",
        "Instrumental Music I / II",
        "Pencil and Ink Illustration / Drawing and Painting",
        "Principles of Engineering / Architectural CAD"
    ],
    collegePrep: [
        "Introduction to Literature",
        "World Literature",
        "American Literature",
        "British Literature",
        "CP Geometry",
        "CP Algebra I",
        "CP Algebra II",
        "PreCalculus, CP",
        "Calculus",
        "Statistics",
        "Biology",
        "Anatomy and Physiology",
        "Chemistry",
        "Organic Chemistry",
        "Forensic Science / Introduction to Organic Chemistry",
        "Environmental Science",
        "US History",
        "Sociology of the Future",
        "Modern World History",
        "Ancient World History",
        "Introduction to World Religions",
        "Computer Programming I / II",
        "Spanish I / Arabic I /  Turkish I / Chinese I /  French I",
        "CP Arabic II",
        "Turkish",
        "SAT Math",
        "SAT English",
        "Independent Online Courses with a Supervisor",
        "Essay Writing for Seniors",
        "Financial Literacy",
        "Cybersecurity",
        "Web Development I / II",
        "Dynamic Programming",
        "Principles of Business / Project Management",
        "Sociology / Anthropology",
        "Graphic Design",
    ],
    honors: [
        "Honors US History",
        "Honors World History",
        "Honors Chemistry",
        "Honors Physics",
        "Honors Algebra I",
        "Honors Algebra II",
        "Honors Precalculus",
        "Honors Calculus",
        "Honors American Literature",
        "Honors British Literature",
        "Honors World Literature",
        "Honors Spanish II",
        "Honors Spanish IV",
        "Honors Arabic III & IV",
        "Honors Probability & Statistics",
    ],
    ap: [
        "AP Computer Science Principles",
        "AP Computer Science A",
        "AP Human Geography",
        "AP Psychology",
        "AP US History",
        "AP European History",
        "AP World History",
        "AP Comparative Government and Politics",
        "AP US Government and Politics",
        "AP Biology",
        "AP Chemistry",
        "AP Physics 1",
        "AP Precalculus",
        "AP Calculus AB",
        "AP Calculus BC",
        "AP Statistics",
        "AP Language and Composition",
        "AP Macroeconomics",
        "AP Microeconomics",
    ],
};

// Flatten courses into an array and map each course to its level
const allCourses = [];
const courseLevelMap = {};

for (const [level, courses] of Object.entries(coursesByLevel)) {
    courses.forEach(course => {
        allCourses.push(course);
        courseLevelMap[course.toLowerCase()] = level; // Use lowercase for case-insensitive matching
    });
}

function addCourseRow() {
    const tbody = document.getElementById('courses-tbody');
    const row = document.createElement('tr');

    // Course Name
    const courseNameCell = document.createElement('td');
    const courseNameContainer = document.createElement('div');
    courseNameContainer.className = 'custom-dropdown';

    const courseNameInput = document.createElement('input');
    courseNameInput.type = 'text';
    courseNameInput.name = 'courseName';
    courseNameInput.placeholder = 'Start typing to search...';

    const dropdownList = document.createElement('div');
    dropdownList.className = 'dropdown-list';
    dropdownList.style.display = 'none';

    courseNameContainer.appendChild(courseNameInput);
    courseNameContainer.appendChild(dropdownList);
    courseNameCell.appendChild(courseNameContainer);
    row.appendChild(courseNameCell);

    // Course Level (Display Only)
    const courseLevelCell = document.createElement('td');
    const courseLevelDisplay = document.createElement('span');
    courseLevelDisplay.className = 'course-level';
    courseLevelCell.appendChild(courseLevelDisplay);
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

    // Letter Grade (Display Only)
    const letterGradeCell = document.createElement('td');
    const letterGradeDisplay = document.createElement('span');
    letterGradeDisplay.className = 'letter-grade';
    letterGradeCell.appendChild(letterGradeDisplay);
    row.appendChild(letterGradeCell);

    // Update letter grade display when numerical grade is input
    gradeInput.addEventListener('input', function () {
        const numericalGrade = parseFloat(gradeInput.value);
        if (!isNaN(numericalGrade)) {
            const letter = getLetterGrade(numericalGrade);
            letterGradeDisplay.textContent = letter;
        } else {
            letterGradeDisplay.textContent = '';
        }
    });

    // Custom dropdown functionality
    courseNameInput.addEventListener('input', function () {
        const inputValue = courseNameInput.value.trim().toLowerCase();
        // Clear previous dropdown options
        dropdownList.innerHTML = '';

        if (inputValue.length > 0) {
            // Filter courses that match the input
            const filteredCourses = allCourses.filter(course =>
                course.toLowerCase().includes(inputValue)
            );

            if (filteredCourses.length > 0) {
                filteredCourses.forEach(course => {
                    const option = document.createElement('div');
                    option.textContent = course;
                    option.addEventListener('click', function () {
                        courseNameInput.value = course;
                        dropdownList.style.display = 'none';

                        // Automatically set course level
                        const courseName = course.toLowerCase();
                        const level = courseLevelMap[courseName];
                        if (level) {
                            const levelText = courseLevels.find(l => l.value === level).text;
                            courseLevelDisplay.textContent = levelText;
                        } else {
                            courseLevelDisplay.textContent = 'Standard';
                        }
                    });
                    dropdownList.appendChild(option);
                });
                dropdownList.style.display = 'block';
            } else {
                dropdownList.style.display = 'none';
            }
        } else {
            dropdownList.style.display = 'none';
            courseLevelDisplay.textContent = '';
        }
    });

    // Hide dropdown when clicking outside
    document.addEventListener('click', function (event) {
        if (!courseNameContainer.contains(event.target)) {
            dropdownList.style.display = 'none';
        }
    });

    // Remove Button
    const removeCell = document.createElement('td');
    const removeButton = document.createElement('button');
    removeButton.innerHTML = '<i class="fas fa-trash"></i>';
    removeButton.type = 'button';
    removeButton.classList.add('remove-btn');
    removeButton.onclick = function () {
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
        const courseLevelDisplay = row.querySelector('.course-level').textContent.toLowerCase().replace(/\s+/g, '');
        const courseLevel = courseLevels.find(level => level.text.toLowerCase().replace(/\s+/g, '') === courseLevelDisplay)?.value;

        const gradeInput = row.querySelector('input[name="grade"]');
        const numericalGrade = parseFloat(gradeInput.value);

        let letterGrade = '';

        if (!isNaN(numericalGrade)) {
            letterGrade = getLetterGrade(numericalGrade);
        } else {
            alert('Please enter a numerical grade for all courses.');
            return;
        }

        // If course level is not recognized, default to 'standard'
        const level = courseLevel || 'standard';

        const weightedGpaPoints = getGpaPointsFromLetter(letterGrade, level);
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

function getGpaPointsFromLetter(letterGrade, courseLevel) {
    for (let i = 0; i < gradeScale.length; i++) {
        if (gradeScale[i].letter === letterGrade) {
            return gradeScale[i].gpa[courseLevel];
        }
    }
    return 0.0;
}

document.getElementById('add-course-btn').addEventListener('click', addCourseRow);
document.getElementById('calculate-btn').addEventListener('click', calculateGPA);

// Add five default course rows
for (let i = 0; i < 5; i++) {
    addCourseRow();
}
