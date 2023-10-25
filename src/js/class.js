// variables
const mainUl = document.querySelector("#allSection>.notes>ul")
// select btn save in modal new folder
let saveNewFolder = document.querySelector("#saveNewFolder")
// select section all folders
let containerAllFolders = document.querySelector("#containerAllFolders")

// Events

// create new folder and show in dom
saveNewFolder.addEventListener('click', createNewFolder)

// classes
//      class noteLS for save + remove notes in LS
class NoteLs {
    // constructor

    // methods
    // save note function to LS
    // paramet1 : object of note want save in LS
    saveNoteInLS(Notes) {
        //  save notes in LS
        let LSNotes = Notes
        LSNotes = JSON.stringify(LSNotes)
        localStorage.setItem('Notes', LSNotes)
    }
    // function for load all notes from LS
    // return : obj of note from LS
    laodOfLS() {
        //  load LS note 
        let LSNotes = JSON.parse(localStorage.getItem('Notes'))
        // if have not any obj in LS => create
        if (LSNotes == null) {
            localStorage.setItem('Notes', '[]')
            LSNotes = JSON.parse(localStorage.getItem('Notes'))
        }
        return LSNotes
    }
    // add note in local storage
    // paramt : title of note
    // paramt : data id of note
    // paramt : note description
    // output : add note to DOm + LS
    addNoteInLS(noteTitle, noteID, noteDes) {
        // 1 load LS note 
        let LSNotes = this.laodOfLS()

        // 2 add new notes
        LSNotes.push({
            ID: noteID,
            noteText: noteTitle,
            description: noteDes
        })
        // 3 save notes in LS
        this.saveNoteInLS(LSNotes)
    }
    // remove note from DOM + LS
    // paramt1 : id of note that user click on
    // output : remove note from Dom + LS
    removeFromLS(removeNote) {
        //  remove from LS
        //     first load our notes
        let LSNotes = this.laodOfLS()
        //     remove text from LS
        LSNotes.forEach(
            function (eachNote, noteIndex) {
                if (removeNote == eachNote.ID) {
                    LSNotes.splice(noteIndex, 1)
                }
            })

        //      send that remove list to LS(update)
        this.saveNoteInLS(LSNotes)
    }
}

// class Note for add + remove notes from DOM and  use NOteLS class for add + remove notes from LS
class Note {

    // constructor

    constructor(title, description, noteID) {
        this.title = title;
        this.description = description;
        this.noteID = noteID;
        this.noteLs = new NoteLs()
    }
    // methods


    // note Template
    // paramt1 : note title
    // paramt2 : note data ID
    // paramt3 : note description
    // return : template of note
    noteTemplate(notwTitle, noteID, noteText) {
        return `
        <li data-id='${noteID}' class="noteLi">
            <div class="noteHeader">
                <div><img src="../../images/icons/Vector.svg" alt=""></div>
                <h3>${notwTitle}</h3>
                <div><img src="../../images/icons/icons8-setting (1).svg" alt=""></div>
            </div>
            <div class="noteMain">
                <p>${noteText}</p>
            </div>
        </li>
    `
    }
    // load note from LS => still we have notes when user refresh the page
    laodNotesInPage() {
        // call note from LS
        let laodTime = this.noteLs.laodOfLS()
        // adding them to DOM
        laodTime.forEach(
            function (eachNote) {
                new Note().addNoteToNoteList(eachNote.noteText, eachNote.ID, eachNote.description)
            }
        )
    }

    // add new note in notelist
    // paramt : note title
    // paramt2 : note data ID
    // paramt3 : note description
    addNoteToNoteList(noteTitle, noteID, noteText) {
        mainUl
            .insertAdjacentHTML('afterbegin', this.noteTemplate(noteTitle, noteID, noteText))
    }
    // add note to DOM + LS
    addNewNote() {
        // for add note to DOM
        this.addNoteToNoteList(this.title, this.noteId, this.description)
        // save note in LS
        this.noteLs.addNoteInLS(this.title, this.noteId, this.description)
    }


    // remove note from DOM & LS
    remove(event) {
        event.preventDefault()
        // remove from DOM
        if (event.target.classList.contains('removeBtn')) {
            event.target.parentElement.remove()
        }
        // remove from LS
        let noteRId = event.target.parentElement.getAttribute('data-id')
        this.noteLs.removeFromLS(noteRId)
    }
}

// create new folder and show in dom
function createNewFolder() {
    // Calling the create new folder method in the new folder class
    new NewFolder().createNewFolder()
}

// add new folder in dom
class NewFolder {
    // The controller method of the methods
    createNewFolder() {
        // If there was no problem with validation
        if (this.cheackValidationNewFolder().info) {
            // Creating a folder and displaying it in Dom
            // Set 1 (new folder name)
            // Set 2 (Random ID)
            this.addNewFolderInDom(this.cheackValidationNewFolder().NameNewFolder.value, this.idRandom())
            // By clicking on the save button, the input value of the new folder model will be null
            this.cheackValidationNewFolder().NameNewFolder.value = null
            // By clicking on the save button, the new folder medal will be hidden
            containerAddNewFolder.style.display = 'none'
        } else {
            // Error calling function
            // set Input error text
            this.error('the name min 1 character and max 10 character')
        }
    }
    // New folder modal validation check
    cheackValidationNewFolder() {
        let info = false
        let NameNewFolder = document.querySelector('#NameNewFolder')
        if (NameNewFolder.value == '') {
            info = false
        } else if (NameNewFolder.value.length > 10) {
            info = false
        } else {
            info = true
        }
        return {
            NameNewFolder: NameNewFolder,
            info: info
        }
    }

    // Create a random ID for each folder
    idRandom() {
        return (Math.random() * 10000000).toFixed()
    }

    // Create and display folders in Dom
    addNewFolderInDom(info, IdRandom) {
        let NewFolderTemplate = `
        <div data-id="${IdRandom}">
            <div>
                <span>${info}</span>
            </div>
            <div>
                <span>0,File</span>
                <img src="images/icons/folder.svg" alt="">
                <img src="images/icons/setting.svg" alt="">
            </div>
        </div>
        `

        containerAllFolders.insertAdjacentHTML('afterbegin', NewFolderTemplate)
    }

    // Display the New Folder modal input error
    error(info) {
        let newError = `<p class="errorModalNewFolder">${info}</p>`
        this.cheackValidationNewFolder().NameNewFolder.insertAdjacentHTML('afterend', newError)
        setTimeout(() => {
            document.querySelector('.errorModalNewFolder').remove()
        }, 3000);

    }
}