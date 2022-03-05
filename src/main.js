import courseData from './config/courseData.json'
import College from './services/college';
import Courses from './services/courses';
import FormHandler from './ui/form_handler';
import TableHandler from './ui/table_handler';
import { getRandomCourse } from './utils/randomCourse';
import _ from 'lodash';
const N_COURSES = 100;
function createCourses() {
    const courses = [];
    for (let i = 0; i < N_COURSES; i++) {
        courses.push(getRandomCourse(courseData));
    }
    return courses;
}



const courses = createCourses();

const dataProvider = new Courses(courseData.minId, courseData.maxId,courses);
const dataProcessor = new College(dataProvider, courseData);
const tableHandler = new TableHandler([
    {key: 'id', displayName: 'ID'},
    {key: 'name', displayName: 'Course Name'},
    {key: 'lecturer', displayName: 'Lecturer Name'},
    {key: 'cost', displayName: 'Cost (ILS)'},
    {key: 'hours', displayName: 'Course Duration (h)'}
], "courses-table", "sortCourses");
const lengthStatisticsTableHandler = new TableHandler([
    {key: 'minInterval', displayName: 'Minimal Length'},
    {key: 'maxInterval', displayName: 'Maximal Length'},
    {key: 'amount', displayName: 'Amount'}
], "hoursStatisticsTable");
const costStatisticsTableHandler = new TableHandler([
    {key: 'minInterval', displayName: 'Minimal Cost'},
    {key: 'maxInterval', displayName: 'Maximal Cost'},
    {key: 'amount', displayName: 'Amount'}
], "costStatisticsTable");
const formHandler = new FormHandler("courses-form", "alert");
formHandler.addHandler(course => {
    const res = dataProcessor.addCourse(course);
    if (typeof(res)!=='string') {
    return '';
    }
    return res;
   
})
formHandler.fillOptions("course-name-options", courseData.courses);
formHandler.fillOptions("lecturer-options", courseData.lectors);
window.showForm = () => {
    formHandler.show();
    tableHandler.hideTable();
    lengthStatisticsTableHandler.hideTable();
    costStatisticsTableHandler.hideTable();
}
window.showCourses = () => {
    tableHandler.showTable(dataProcessor.getAllCourses());
    formHandler.hide();
    lengthStatisticsTableHandler.hideTable();
    costStatisticsTableHandler.hideTable();
}
window.showLengthStatistics = () => {
    lengthStatisticsTableHandler.showTable(dataProcessor.getHoursStatistic(courseData.lengthInterval));
    costStatisticsTableHandler.hideTable();
    tableHandler.hideTable();
    formHandler.hide();
}
window.showCostStatistics = () => {
    costStatisticsTableHandler.showTable(dataProcessor.getCostStatistic(courseData.costInterval));
    lengthStatisticsTableHandler.hideTable();
    tableHandler.hideTable();
    formHandler.hide();
}
window.sortCourses = (key) => {
    tableHandler.showTable(dataProcessor.sortCourses(key));
}