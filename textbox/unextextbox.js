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
        var wraaper = createWrapper(this);
        createInput(wraaper);
        this.appendChild(wraaper);
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
        elem.querySelector('.u-textbox-wrapper').appendChild(createBtn('u-show', 'Show Password', 'S'));
    }
    else if(!elem.hasAttribute('password') && elem.hasAttribute('showHideTrue')){
        console.error('showHideTrue property requires password property to be set.');
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
    input.addEventListener('input', (e) => {
        e.target.dispatchEvent(new CustomEvent('textIn', {
            bubbles: true,
            detail: {val : input.value}
        }) );
    });
}

function createWrapper(elem){
    const wrapper = document.createElement('div');
    wrapper.classList.add('u-textbox-wrapper');
    elem.appendChild(wrapper);
    return wrapper;
}

function createInput(elem){
    const input = document.createElement('input');
    input.classList.add('u-input');
    input.setAttribute('type', 'text');
    elem.appendChild(input);
}

function createBtn(cls, title, text){
    const btn = document.createElement('button');
    btn.classList.add('u-btn-input' , cls);
    btn.innerText = text;
    btn.setAttribute('title', title);
    return btn
}


window.customElements.define('unex-textbox', UnexTextbox);


