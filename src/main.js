import courseData from './config/courseData.json'
import College from './services/college';
import { dataProvider } from './config/services-config';
import FormHandler from './ui/form_handler';
import TableHandler from './ui/table_handler';
import { getRandomCourse } from './utils/randomCourse';
import _ from 'lodash'
import NavigatorButtons from './ui/navigator_buttons';
import Spinner from './ui/spinner';
import Alert from './ui/alert';
const serverAlert = new Alert("server-alert");
const spinner = new Spinner("spinner");
const N_COURSES = 5;
const statisticsColumnDefinition = [
    { key: "minInterval", displayName: "From" },
    { key: "maxInterval", displayName: "To" },
    { key: "amount", displayName: "Amount" }
]



const dataProcessor = new College(dataProvider, courseData);
const tableHandler = new TableHandler([
    { key: 'id', displayName: 'ID' },
    { key: 'name', displayName: 'Course' },
    { key: 'lecturer', displayName: 'Lecturer' },
    { key: 'cost', displayName: "Cost (ILS)" },
    { key: 'hours', displayName: "Duration (h)" },
    { key: 'openDate', displayName: "Opening Date" }
], "courses-table", "sortCourses", "removeCourse");
const formHandler = new FormHandler("courses-form", "alert");
const generationHandler = new FormHandler("generation-form", "alert");
const navigator = new NavigatorButtons(["0", "1", "2", "3", "4"])
formHandler.addHandler(async course => {
    try {
        const res = await spinner.spinnerFn(dataProcessor.addCourse(course));
        if (typeof (res) !== 'string') {
            return '';
        }
        return res;
    } catch {
        hide();
        document.getElementById("spinner").removeAttribute("class");
        document.getElementById("spinner").innerHTML = '';
        serverAlert.showAlert();
    }
})
generationHandler.addHandler(async generation => {
    try {
        await spinner.spinnerFn(
            (async () => {
                for (let i = 0; i < generation.nCourses; i++) {
                    await dataProcessor.addCourse(getRandomCourse(courseData));
                }
            })()
        );
        return '';
    } catch (err) {
        hide();
        document.getElementById("spinner").removeAttribute("class");
        document.getElementById("spinner").innerHTML = '';
        serverAlert.showAlert();
    }
})
formHandler.fillOptions("course-name-options", courseData.courses);
formHandler.fillOptions("lecturer-options", courseData.lectors);
const tableHoursStatistics =
    new TableHandler(statisticsColumnDefinition, "courses-table");
const tableCostStatistics =
    new TableHandler(statisticsColumnDefinition, "courses-table");
function hide() {
    serverAlert.hideAlert();
    tableHandler.hideTable();
    formHandler.hide();
    generationHandler.hide();
    tableHoursStatistics.hideTable();
    tableCostStatistics.hideTable();

}
window.showGeneration = () => {
    hide();
    navigator.setActive(4);
    generationHandler.show();
}
window.showForm = () => {
    hide();
    navigator.setActive(0);
    formHandler.show();

}
window.showCourses = async () => {
    hide();
    navigator.setActive(1);
    try {
        tableHandler.showTable(await spinner.spinnerFn(dataProcessor.getAllCourses()));
    } catch {
        hide();
        document.getElementById("spinner").removeAttribute("class");
        document.getElementById("spinner").innerHTML = '';
        serverAlert.showAlert();
    }
}
window.showHoursStatistics = async () => {
    hide()
    navigator.setActive(2);
    try {
        tableHoursStatistics.showTable(await spinner.spinnerFn(dataProcessor.getHoursStatistics(courseData.hoursInterval)));
    } catch {
        hide();
        document.getElementById("spinner").removeAttribute("class");
        document.getElementById("spinner").innerHTML = '';
        serverAlert.showAlert();
    }

}
window.showCostStatistics = async () => {
    hide()
    navigator.setActive(3);
    try {
        tableCostStatistics.showTable(await spinner.spinnerFn(dataProcessor.getCostStatistics(courseData.costInterval)));
    } catch {
        hide();
        document.getElementById("spinner").removeAttribute("class");
        document.getElementById("spinner").innerHTML = '';
        serverAlert.showAlert();
    }


}
window.sortCourses = async (key) => {
    try {
        tableHandler.showTable(await spinner.spinnerFn(dataProcessor.sortCourses(key)));
    } catch {
        hide();
        document.getElementById("spinner").removeAttribute("class");
        document.getElementById("spinner").innerHTML = '';
        serverAlert.showAlert();
    }
}
window.removeCourse = async (id) => {
    try {
        if (window.confirm(`you are going to remove course id: ${id}`)) {
            await spinner.spinnerFn(dataProcessor.removeCourse(+id));
            tableHandler.showTable(await spinner.spinnerFn(dataProcessor.getAllCourses()));
        }
    } catch {
        hide();
        document.getElementById("spinner").removeAttribute("class");
        document.getElementById("spinner").innerHTML = '';
        serverAlert.showAlert();
    }

}
