class UnexTextbox extends HTMLElement{

    constructor(){
        super();
        this.createTemplate();
        setType(this);
        setShowHide(this);
        setPlaceHolder(this);
        setFocusListners(this);
        setShowHideListner(this);
        setCustomOnChangeEvent(this);
    }

    connectedCallback(){
    }

    createTemplate(){
        // if(this.hasAttribute('placeholder')){
            
        // }
        this.innerHTML = `
            <div class="u-textbox-wrapper">
                <input type="text" class="u-input">
            </div>
        `;
    }
}

function setPlaceHolder(elem){
    if(elem.hasAttribute('placeholder')){
        elem.querySelector('input').setAttribute('placeholder', elem.getAttribute('placeholder'));
    }
}

function setType(elem){
    if(elem.hasAttribute('password')){
        elem.querySelector('input').setAttribute('type', 'password');
    }
}

function setShowHide(elem){
    if(elem.hasAttribute('password') && elem.hasAttribute('showHideTrue')){
        elem.querySelector('.u-textbox-wrapper').innerHTML += showHideButtonTemplate;
    }
}

function setFocusListners(elem){
    elem.querySelector('input').addEventListener('focusin', () => {
        elem.querySelector('.u-textbox-wrapper').classList.add('u-focused');
    });
    elem.querySelector('input').addEventListener('focusout', () => {
        elem.querySelector('.u-textbox-wrapper').classList.remove('u-focused');
    });
}

function setShowHideListner(elem){
    if(elem.hasAttribute('password') && elem.hasAttribute('showHideTrue')){
        elem.querySelector('.u-btn-input').addEventListener('click', (e) => {
            if(elem.querySelector('input').getAttribute('type') === "text"){
                elem.querySelector('input').setAttribute('type', 'password');
                e.target.classList.add('u-show');
                e.target.classList.remove('u-hide');
                e.target.setAttribute('title', 'Show Password');
            } else {
                elem.querySelector('input').setAttribute('type', 'text');
                e.target.classList.add('u-hide');
                e.target.classList.remove('u-show');
                e.target.setAttribute('title', 'Hide Password');
            }
        });
        elem.querySelector('.u-btn-input').addEventListener('focusin', (e) => {
            e.target.classList.add('u-focused');
        });
        elem.querySelector('.u-btn-input').addEventListener('focusout', (e) => {
            e.target.classList.remove('u-focused');
        });
    }
}

function setCustomOnChangeEvent(elem){
    const input = elem.querySelector('input');
    // const cusChangeEvent = new CustomEvent('onChangeDetect', {
    //     bubbles: true,
    //     detail : { val: () =>  input.value }
    // });

    input.addEventListener('input', () => {
        //e.target.dispatchEvent(cusChangeEvent);
        //console.log(e.target.value)
        this.dispatchEvent(new CustomEvent('cuschange', {
            bubbles: true,
            detail: {text : () => input.value}
        }) );
    });

}

let showHideButtonTemplate = `
    <button class="u-btn-input u-show" title="Show">S</button>
`;

customElements.define('unex-textbox', UnexTextbox);


