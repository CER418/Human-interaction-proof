/**
 * @license Anothe HIP (human interaction proof)
 *
 * Copyright (c) Martin Fidjeland & Henrik Andre Samuelsen
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const template = document.createElement('template')
template.innerHTML = `
<style>
    .hip {
        display: inline-block;
        background: #F5F5F4;
        color: #44403C;
        border: 1.5px solid #E7E5E4;
        border-radius: 5px;
        padding: 0 1em 1.2em 1em;
        font-family: -apple-system;
        font-size: .8750em;
        max-width: 240px;
        font-weight: 500;
        
        transition: .2s ease-in-out all;
    }
    
    form {
        display: flex;
        flex-direction: column;
        gap: .5em;
    }
    
    form div {
        display: flex;
        flex-direction: column;
        gap: .25em;
    }
    
    form label {
        color: #44403C;
        font-weight: 600;
        font-size: .7500em;
        letter-spacing: 0.05em;
    }
    
    input {
        background: #FAFAF9;
        outline: none;
        border: none;
        border: 1.5px solid #A8A29E;
        padding: .5em;
        border-radius: 5px;
        color: #44403C;
        letter-spacing: 0.02em;
    }
    
    button {
        display: block;
        background: #78716C;
        color: #FFFFFF;
        font-weight: 500;
        padding: .6em;
        border: 1.5px solid #78716C;
        border-radius: 5px;
        transition: .15s ease-in-out all;
        letter-spacing: 0.02em;
    }
    
    button:hover {
        background: #57534E;
        border: 1.5px solid #57534E;
    }
    
    button:active, button:focus {
        border: 1.5px solid #57534E;
        outline:0 !important;
        box-shadow: none;
    }
    
</style>
<div class="hip">
    <p class="question"></p>
<form id="form">
    <div>
        <label for="text">ANSWER</label>
        <input type="text" id="text" required maxlength="18">
    </div>
    <button type="submit">Send</button>
</form>
</div>`

class HIP extends HTMLElement {
    constructor() {
        super()

        this.attachShadow({mode: 'open'})
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this.shadowRoot.querySelector('input').innerHTML = this.getAttribute('name')

        const question = new Map()
        question.set('The capital of Norway is?', 'Oslo')
        question.set('The current year is?', new Date().getFullYear().toString())
        question.set('The founder of the car company Tesla is?', 'elon musk')
        question.set('3+2 is?', '5')
        question.set('The largest ocean in the world is?', 'pacific ocean')

        function randomFromMap(list) {
            return list[Math.floor((Math.random() * list.length))];
        }

        const randomKey = randomFromMap(Array.from(question.keys()))

        this.shadowRoot.querySelector('p').innerHTML = randomKey

        console.log(randomKey)
        console.log(question.get(randomKey))

        if (document.querySelector('input') === question.get(randomKey)) {

        } else {

        }

        document.addEventListener("DOMContentLoaded", () => {
            document.getElementById('form').addEventListener('submit', (event) => {
                event.preventDefault()
                fetch(event.target.action, {
                    method: 'POST', body: new URLSearchParams(new FormData(event.target)) // event.target is the form
                }).then((resp) => {
                    console.log(resp)
                    return resp.text(); // or resp.text() or whatever the server sends
                }).then((body) => {
                    console.log(body)
                }).catch((error) => {
                })
            })
        })
    }
}

window.customElements.define('hip-element', HIP)