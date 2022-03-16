import _ from "lodash";

// Data processor
export default class College {
    #courseData
    #courses
    constructor(courses, courseData) {
        this.#courses = courses;
        this.#courseData = courseData;
    }
    async addCourse(course) {
        //TODO validation of the course data
        //if course is valid, then course should be added : this.#courses.add(course)
        //if course is invalid, then the method returns full message describing what's wrong
        //if course is valid
        //converting from strings to the proper types
        course.hours = +course.hours;
        course.cost = +course.cost;
        course.openDate = new Date(course.openDate);
        const validationMessage = this.#getValidationMessage(course);
        if(!validationMessage) {
           return await this.#courses.add(course);
        } 
        return validationMessage;
    }
    #getValidationMessage(course) {
        const {minCost, maxCost, minHours, maxHours, minYear, maxYear, lectors, courses} = this.#courseData;
        const {cost, hours, openDate, lecturer, name} = course
        
        let message = '';
        message += cost > maxCost || cost < minCost ?
         `wrong cost value - should be in range [${minCost}-${maxCost}] <br>`: '';
         message += hours > maxHours || hours < minHours ?
         `wrong hours value - should be in range [${minHours}-${maxHours}] <br>`: '';
         message += !lectors.includes(lecturer) ? `wrong lecturer name - should be one from ${lectors} <br>`: '';
         message += !courses.includes(name) ? `wrong course name - should be one from ${courses}`:'';
         const year = openDate.getFullYear();
         message += year < minYear || year > maxYear ?
          `wrong opening date - year should be in range [${minYear} - ${maxYear}]` : ''
         return message;
    }
    async getAllCourses() {
        return await this.#courses.get()
    }
    async sortCourses(key) {
        return _.sortBy(await this.getAllCourses(), key)
    }
    async #getStatistics(interval, field) {
        const courses = await this.getAllCourses();
        const objStat =  _.countBy(courses, e => {   
            return Math.floor(e[field]/interval);
         });
         return Object.keys(objStat).map(s => {
             return {minInterval: s * interval,
                 maxInterval: s * interval + interval -1,
                amount: objStat[s]}
         })
    }
    async getHoursStatistics(lengthInterval){
        return await this.#getStatistics(lengthInterval, 'hours');
    }
    async getCostStatistics(lengthInterval) {
        return await this.#getStatistics(lengthInterval, 'cost')
    }
    async removeCourse(id) {
        if (!await this.#courses.exists(id)) {
            throw `course with id ${id} not found`
        }
        return this.#courses.remove(id);
    }

   
}