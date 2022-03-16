export default class Alert {
    #alertElem
    
    constructor(idAlert) {
        this.#alertElem = document.getElementById(idAlert);
        
    }
    showAlert() {
        this.#alertElem.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show mt-5" role="alert">
            <strong>Error!</strong> OOPS!!! d[o_0]b <br> The server <a href=http://localhost:3500/courses>http://localhost:3500/courses</a> is unavailable! Please, repeat request later on.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    }
    hideAlert () {
        this.#alertElem.innerHTML = '';
    }
        
}