class taskEntry extends HTMLElement {
  /** Constructor for the taskEntry HTMLElement, containing the name, session count, and removeButton
   * @constructor
   */
	constructor() {
	  // Always call super first in constructor
      const template = document.createElement('template');
      template.innerHTML= `  
      <style>
        .object {
          display: flex;
          align-items: center;
         
        }
        .object:hover {
          background-color: #f2f2f2;
        }
        .Name {
          padding: 20px;
          max-width: 200px;
        }
        .Session {
          padding: 20px;
        }
        #removeTask {
          background-color: #e97;
          border: none;
          border-radius: 5px;
          color: white;
          width: 12%;
          height: 9%;
          text-align: center;
          margin-left: 80px;
        }
      </style>
      <span>
      <li class="object">
        <p class="Name" id="name">Task Name</p>
        <p class="Session" id="session"> 0 </p>
        <button onclick="" id="removeTask">Remove Task</button>
      </li>
      </span>
      `;
        super();
        this.root = this.attachShadow({ mode: 'open' });
        this.root.appendChild(template.content.cloneNode(true));
	}
  /**
  * Sync the properties to object
  * @param {description}  Description - Object that contains the name, session, count
  */
    async syncName(description) {
        let taskName = this.root.getElementById("name");
        taskName.textContent = description.name;
        let sessionCount = this.root.getElementById("session");
        sessionCount.textContent = description.sessions;
        let button = this.root.getElementById("removeTask");
        button.addEventListener('click', function () {
            removeButton(this, taskName.textContent);
        });
    }

}

/**
 * Function called when removeButton is clicked. Removes the list entry the removeButton is attached to
 * @param {HTMLElement} button - The HTML button object this function is being attached to
 * @param {string} name - The name of the list entry that is being removed 
 */

function removeButton(button, name) {
    removeTask(name);
    console.log("Remove");
}

customElements.define('task-item', taskEntry);