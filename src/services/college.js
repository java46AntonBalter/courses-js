import _ from "lodash";

// Data processor
export default class College {
    #courseData
    #courses
    constructor(courses, courseData) {
        this.#courses = courses;
        this.#courseData = courseData;
    }
    addCourse(course) {
        //TODO validation of the course data
        //if course is valid, then course should be added : this.#courses.add(course)
        //if course is invalid, then the method returns full message describing what's wrong
        //if course is valid
        //converting from strings to the proper types
        course.hours = +course.hours;
        course.cost = +course.cost;
        course.openingDate = new Date(course.openingDate);
        const validationMessage = this.#getValidationMessage(course);
        if(!validationMessage) {
           return this.#courses.add(course);           
        } 
        return validationMessage;
    }
    #getValidationMessage(course) {
        const {minCost, maxCost, minHours, maxHours, minYear, maxYear, lectors, courses} = this.#courseData;
        const {cost, hours, openingDate, lecturer, name} = course
        
        let message = '';
        message += cost > maxCost || cost < minCost ?
         `wrong cost value - should be in range [${minCost}-${maxCost}] <br>`: '';
         message += hours > maxHours || hours < minHours ?
         `wrong hours value - should be in range [${minHours}-${maxHours}] <br>`: '';
         message += !lectors.includes(lecturer) ? `wrong lecturer name - should be one from ${lectors} <br>`: '';
         message += !courses.includes(name) ? `wrong course name - should be one from ${courses}`:'';
         const year = openingDate.getFullYear();
         message += year < minYear || year > maxYear ?
          `wrong opening date - year should be in range [${minYear} - ${maxYear}]` : ''
         return message;
    }
    getAllCourses() {
        return this.#courses.get()
    }
    sortCourses(key) {
        return _.sortBy(this.getAllCourses(),key)
    }
    getHoursStatistic(lengthInterval) {
        const statsLength = _.countBy(this.getAllCourses(), (course) => Math.floor(course.hours/lengthInterval)); 
        const statsLengthArr = [];
        statsLengthArr.push(Object.entries(statsLength).map(n => {
            const statsLengthObj = {};
            statsLengthObj.minInterval = n[0]*lengthInterval;
            statsLengthObj.maxInterval = n[0]*lengthInterval + (lengthInterval - 1);
            statsLengthObj.amount = n[1];
            return statsLengthObj;
        }))
        return statsLengthArr;    
    }
    getCostStatistic(costInterval) {
        const statsCost = _.countBy(this.getAllCourses(), (course) => Math.floor(course.cost/costInterval)); 
        const statsCostArr = [];
        statsCostArr.push(Object.entries(statsCost).map(n => {
            const statsCostObj = {};
            statsCostObj.minInterval = n[0]*costInterval;
            statsCostObj.maxInterval = n[0]*costInterval + (costInterval - 1);
            statsCostObj.amount = n[1];
            return statsCostObj;
        }))
        return statsCostArr;    
    }
}