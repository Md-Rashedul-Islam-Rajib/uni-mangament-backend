import { TMonths, TSemesterCode, TSemesterName, TSemesterNameCodeMapper } from './semester.types';

export const months: TMonths[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export const semesterName: TSemesterName[] = ['Autumn', 'Summer', 'Fall'];
export const semesterCode: TSemesterCode[] = ['01', '02', '03'];
export const semesterNameCodeMapper: TSemesterNameCodeMapper = {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
};