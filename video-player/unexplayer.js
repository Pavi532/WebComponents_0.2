class UnexPlayer extends HTMLElement {

    //#region Getter Setter
    get data(){
        return this.data || [];
    }

    set data(value){
        this.data = value;
    }
    //#endregion
    
    //#region Constructor
    constructor(){
        super();
        this.renderElement();
        
    }
    //#endregion 

    connectedCallback(){
        
    }

    //#region Render Elements
    renderElement(){
        this.innerHTML = `
            <video controls>
                <source src="${this.data.src}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
    }
    //#endregion

}

window.customElements.define('unex-palyer', UnexPlayer);