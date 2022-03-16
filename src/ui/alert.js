export default class Alert {
    #alertElem
    
    constructor(idAlert) {
        this.#alertElem = document.getElementById(idAlert);
        
    }
    showAlert() {
        this.#alertElem.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show mt-5" role="alert">
            <strong>Error!</strong> OOPS!!! d[o_0]b <br> Unfortunately, the server <a href=http://localhost:3500/courses>http://localhost:3500/courses</a> could not be reached
            at this very moment. <br> Please, kind Sir/Madame, could you be so kind to repeat your most desired request at a later time? <br><br>
            Your's sincerely,<br>
            Beep Boop.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    }
    hideAlert () {
        this.#alertElem.innerHTML = '';
    }
        
}