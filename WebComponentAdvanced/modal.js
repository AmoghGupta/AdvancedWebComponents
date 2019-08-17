class Modal extends HTMLElement{

    constructor(){
        super();

        this.attachShadow({
            //MODE whether you can access the shadown dom tree from outside or not
            mode: 'open'
        });

        this.shadowRoot.innerHTML = `

            <style>
                #backDrop{
                    position: fixed;
                    top: 0;
                    left: 0 ;
                    width: 100%;
                    height:100vh;
                    background: rgba(0,0,0,0.75);
                    
                }
                #modal{
                    z-index: 100;
                    position: fixed;
                    top: 15vh;
                    left: 25%;
                    width: 50%;
                    background: white;
                    
                    border-radius: 3px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.26)
                                    
                }
                h1{
                    padding: 10px;
                }
                #main{
                    position: relative;
                   
                    margin: 5px;
                    padding: 2px;
                    border: 1px solid lightgrey; 
                }
                #actions{
                    text-align: right;
                    margin-right: 1rem;
                }
                #actions button{
                    padding:8px;
                    border-radius: 10px;
                    width: 70px;
                    margin-bottom: 1rem;
                }
                #main{
                    padding: 1rem;
                }

            </style>
            <div id="backDrop"></div>
            
            <div id="modal">
                <header>
                    <slot name="title"></slot>
                </header>
                <section id="main">
                    <slot name="main"></slot>
                </section>
                <section id="actions">
                    <button id="cancel-button">Cancel</button>
                    <button>Okay</button>
                </section>
            </div>
        
        
        `;
        
        //getting access to slots
        const slots = this.shadowRoot.querySelectorAll('slot');
        slots[1].addEventListener('slotchange', event => {
            console.dir(slots[1]);
        });
        
    }

    connectedCallback(){
        var cancelButton = this.shadowRoot.getElementById('cancel-button');
        cancelButton.addEventListener("click",this._hideModal.bind(this));

        // listening to custom 'cancel' event
        // cancelButton.addEventListener('cancel',()=>{
        //     console.log("cancel inside component");
        //     this.shadowRoot.host.classList.add('hide')
        // })
    }

    _hideModal(event){
        // this.shadowRoot.host.classList.add('hide');

        //creating and dispatching an custom 'cancel' event
        const cancelEvent = new Event('cancel', {
            bubbles: true,
            composed: true //indicates that this event can leave the shadow dom
        });
        event.target.dispatchEvent(cancelEvent);
    }

    attributeChangedCallback(name, oldValue, newValue){
        if(name == "opened"){
            this.shadowRoot.host.classList.remove('hide');
        }
    }

    static get observedAttributes(){
        return ['opened'];
    }

    // disconnectedCallback(){
          
    // }


   
}

customElements.define('uc-modal',Modal);



