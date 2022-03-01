export default class TableHandler {
    #tableELem
    #columnsDefinition
    constructor(columnsDefinition, idTable) {
        //example of columnsDefinition: 
        // const columns = [{'key': 'name', 'displayName': 'Course Name'},{'key': 'lecturer', 'displayName': 'Lecturer Name'}........ ]
        this.#columnsDefinition = columnsDefinition;
        this.#tableELem = document.getElementById(idTable);
        if(!this.#tableELem) {
            throw "Table element is not defined"
        }
        

    }
    showTable(objects) {
        this.#tableELem.innerHTML = `${this.#getHeader()}${this.#getBody(objects)}`;
    }
    hideTable() {
        this.#tableELem.innerHTML = '';
    }
    #getHeader() {
        return `<thead><tr>${this.#getColumns()}</tr></thead>`
    }
    #getColumns() {
        return this.#columnsDefinition.map(c => `<th>${c.displayName}</th>`).join('');
    }
    #getBody(objects) {
        return objects.map(o => `<tr>${this.#getRecord(o)}</tr>`).join('');
    }
    #getRecord(object) {
        return this.#columnsDefinition.map(c => `<td>${object[c.key]}</td>`).join('');
    }
}