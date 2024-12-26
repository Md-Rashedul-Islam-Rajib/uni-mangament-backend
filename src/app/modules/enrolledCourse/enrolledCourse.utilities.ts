export const calculateGradeAndPoints = (totalMarks: number) => {
    let result = {
        grade: 'NA',
        gradePoints: 0,
    };

    // Use a switch block for other grade ranges
    switch (true) {
        case totalMarks >= 80:
            result = {
                grade: 'A+',
                gradePoints: 4.0,
            };
            break;

        case totalMarks >= 75 && totalMarks <= 79:
            result = {
                grade: 'A',
                gradePoints: 3.75,
            };
            break;

        case totalMarks >= 70 && totalMarks <= 74:
            result = {
                grade: 'A-',
                gradePoints: 3.5,
            };
            break;

        case totalMarks >= 65 && totalMarks <= 69:
            result = {
                grade: 'B+',
                gradePoints: 3.25,
            };
            break;

        case totalMarks >= 60 && totalMarks <= 64:
            result = {
                grade: 'B',
                gradePoints: 3.0,
            };
            break;

        case totalMarks >= 55 && totalMarks <= 59:
            result = {
                grade: 'B-',
                gradePoints: 2.75,
            };
            break;

        case totalMarks >= 50 && totalMarks <= 54:
            result = {
                grade: 'C+',
                gradePoints: 2.5,
            };
            break;

        case totalMarks >= 45 && totalMarks <= 49:
            result = {
                grade: 'C',
                gradePoints: 2.0,
            };
            break;

        case totalMarks >= 40 && totalMarks <= 44:
            result = {
                grade: 'D',
                gradePoints: 1.0,
            };
            break;

        case totalMarks >= 0 && totalMarks <= 39:
            result = {
                grade: 'F',
                gradePoints: 0.0,
            };
            break;

        default:
            // Handle invalid marks (negative or out-of-bound values)
            result = {
                grade: 'NA',
                gradePoints: 0,
            };
            break;
    }

    return result;
};
