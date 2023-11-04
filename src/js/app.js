// ---varibles--
let cal = new Calendar() // calendar
// Select ul in the nav header
let navHeader = document.querySelector('.div-left-header ul')
// Select the folders section
let folderSection = document.querySelector('#folderSection')
// Select the all section
let allSection = document.querySelector('#allSection')
// Select the alarms section
let alarmsSecion = document.querySelector('#alarmsSecion')
// Select element main
let main = document.querySelector('main section')

let dateButton = document.querySelector(".time>div>button"); //date btn in landing page
const dateButtonimg = document.querySelector(".time>div>button>img"); //svg in date btn in landing page
const date = document.querySelector(".date") // date section
const save = document.querySelector(".footerNewToDo>div:last-of-type");
const cancel = document.querySelector(".footerNewToDo>div:first-of-type");
const adding = document.querySelector("#svgAddNote")
const newToDo = document.querySelector("#allSection .newToDo")
const calendarModalSvg = document.querySelector(".calendar:not(.calendarModal)")
const calendarModal = document.querySelector(".calendarModal")

// Modal to create a new folder
let containerAddNewFolder = document.querySelector("#containerAddNewFolder")
// button to delete the modal to create a new folder
let closeModalAddNewFolder = document.querySelector("#closeModalAddNewFolder")
// icon Add New Folder
let iconAddNewFolder = document.querySelector("#iconAddNewFolder")
// icon add new not in folder
let svgAddNoteInFolder = document.querySelector("#svgAddNoteInFolder")

const prev = document.querySelector(".prev") // prev icon in calendar
const next = document.querySelector(".next") // next icon in calendar
// select btn save in modal new folder
let saveNewFolder = document.querySelector("#saveNewFolder")
// The user is active in this section
let activeNow = document.querySelector("#activeNow")
// modal (create new note in folder)
let activeNowToDo = document.querySelector('#activeNow >.newToDo')
// div close modal (create new note in folder)
let closeModalAddNewNoteInFolder = document.querySelector('#activeNow .footerNewToDo #lcose')
let folder = document.querySelector('.folder')
const iconAddNewNoteInAlarm = document.querySelector('#iconAddNewNoteInAlarm')
const days = document.querySelector(".days") // days in calender


// --event--
// if the click ul in nav header
navHeader.addEventListener('click', TabSwitchInMain)
dateButton.addEventListener("touchend", setDate) // when touched on btn in date section in landing page
save.addEventListener("touchend", saveNote)
cancel.addEventListener("click", cancelNote)
adding.addEventListener("touchend", addTemplate) //show template for adding
// when touched on btn in date section in landing page
dateButton.addEventListener("touchend", setDate)
// By clicking on the Add New Folder icon, display the folder creation modal
iconAddNewFolder.addEventListener('click', ShowModalAddNewFolder)
// Hide the modal by clicking the delete icon on the modal
closeModalAddNewFolder.addEventListener('click', closeModalNewFolder)
document.addEventListener("DOMContentLoaded", loadPage)
calendarModalSvg.addEventListener("touchend", showCalender)
prev.addEventListener("touchend", prevMonth)
next.addEventListener("touchend", nextMonth)
// create new folder and show in dom
saveNewFolder.addEventListener('click', createNewFolder)
// load all notes
document.addEventListener('DOMContentLoaded', new SetNewFolderInLS().loadNotesInPage())
// show notes in folder 
// create new btn in header
//  Switch to the notes screen in the folder
containerAllFolders.addEventListener('click', showNoteInFolder)
// show modal create new not in folder
svgAddNoteInFolder.addEventListener("click", addNewNoteInFolder)
// close modal new note in folder
closeModalAddNewNoteInFolder.addEventListener('click', closeModalNewNoteInFolder)
days.addEventListener("click", fullDate) // for show date in template


// -- function---
function loadPage() {
    let notePage = new Note()
    notePage.laodNotesInPage()
}

// create new folder and show in dom
function createNewFolder() {
    // Calling the create new folder method in the new folder class
    new NewFolder().createNewFolder()
}

function TabSwitchInMain(e) {
    // Get the value of the clicked element
    // Send the received value to the changeSectionInMain function 
    changeSectionInMain(e.target.value)
}

// Switch main sections by clicking on the header navigation
function changeSectionInMain(info) {

    switch (info) {
        case 1:
            info.classList = "activeLi"
            // Delete all main sections
            removeSection()
            // The display section is all flexed
            allSection.style.display = 'flex'
            // Change the add icon in the footer
            ChangeTheNewAddIcon(1)
            // Removing the New Folder modal opened when switching pages
            closeModalNewNote()
            break;
        case 2:
            // Delete all main sections
            removeSection()
            // The display section is folders flexed
            folderSection.style.display = 'flex'
            // Change the add icon in the footer
            ChangeTheNewAddIcon(2)
            // Removing the New Note modal opened when switching pages
            closeModalNewFolder()
            break;
        case 3:
            // Delete all main sections
            removeSection()
            break;
        case 4:
            // Delete all main sections
            removeSection()
            // The display section is active now flexed
            activeNow.style.display = 'inline-block'
            // Change the add icon in the footer
            ChangeTheNewAddIcon(4)
            // close modal add new note in folder
            closeModalNewNoteInFolder()
            break;
    }
}

// Delete all main sections
function removeSection() {
    for (let i = 0; i < 4; i++) {
        // get all section in main
        let x = document.querySelectorAll('main section')[i]
        x.style.display = 'none'
    }
}

// show template for add notre
function addTemplate() {
    newToDo.style.display = 'flex'

}

// show template add new note in folder
function addNewNoteInFolder() {
    activeNowToDo.style.display = 'flex'
}

// Change the add icon in the footer
function ChangeTheNewAddIcon(key) {
    // Hide all footer icons
    adding.style.display = 'none'
    iconAddNewFolder.style.display = 'none'
    svgAddNoteInFolder.style.display = 'none'

    // Display the icon relative to the page in the footer
    switch (key) {
        case 1:
            adding.style.display = 'inline-block'
            break;
        case 2:
            iconAddNewFolder.style.display = 'inline-block'
            break;
        case 4:
            svgAddNoteInFolder.style.display = 'inline-block'
            break;
    }
}

// By clicking on the Add New Folder icon, display the folder creation modal
function ShowModalAddNewFolder() {
    containerAddNewFolder.style.display = 'flex'
}
// Hide the modal by clicking the delete icon on the modal
function closeModalNewFolder() {
    containerAddNewFolder.style.display = 'none'
    // Remove the input value of the title of the new folder modal
    document.querySelector('#containerAddNewFolder input').value = ''
}
// Removing the New Note modal opened when switching pages
function closeModalNewNote() {
    newToDo.style.display = 'none'
}

// close from modal create new note in folder
// Emptying the value of template inputs
function closeModalNewNoteInFolder() {
    activeNowToDo.style.display = 'none'
    activeNowToDo.querySelector('input').value = ''
    activeNowToDo.querySelector('textarea').value = ''
}

// status of date div 
let isDivVisible = false;
// date div for choosing date
function setDate() {
    if (!isDivVisible) {
        // when touch btn => svg in button will move right
        svgPosition(38)
        // change background color of btn
        dateButton.style = "background: rgba(59, 238, 44, 0.56);"
        // show date div
        date.style.display = "flex"
        // change status of date div
        isDivVisible = true;
    } else {
        // when touch btn => svg in button will move left
        svgPosition(-38)
        // change background color of btn
        dateButton.style = "background: rgba(255, 255, 255, 0.56);"
        // show date div
        date.style.display = "none"
        // change status of date div
        isDivVisible = false
    }
}
// paramt1 : Spacing SVG with button from right or left (typeof number)
// + resulte : change position of svg in btn
function svgPosition(num) {
    // Find the current value of left
    let svgPosition = parseInt(getComputedStyle(dateButtonimg).left);
    // change svg position to right or left
    let newLeft = svgPosition + num;
    dateButtonimg.style.left = newLeft + 'px';
}

// save note to DOM
function saveNote() {
    const title = document.querySelector(".newToDo>div:nth-of-type(2)>input").value;
    const des = document.querySelector(".newToDo>div:nth-of-type(3)>textarea").value;
    let noteId = (Math.random() * 1000000).toFixed()

    if (validate(title, des)) {
        // create obj from Note class
        let saving = new Note(title, des, noteId);
        // use obj for add note to DOM + LS
        saving.addNewNote()
        // change display of modal
        newToDo.style.display = 'none';
        document.querySelector(".newToDo>div:nth-of-type(2)>input").value = "";
        document.querySelector(".newToDo>div:nth-of-type(3)>textarea").value = "";
    } else {
        alert("RIP...")
    }
}
// if user cancel the save note 
function cancelNote() {
    newToDo.style.display = 'none';
    document.querySelector(".newToDo>div:nth-of-type(2)>input").value = "";
    document.querySelector(".newToDo>div:nth-of-type(3)>textarea").value = "";
}
// validation for add note
function validate(tit, des) {
    let status = false;
    if (tit == "" && des == "") {
        status = false;
    } else {
        status = true;
    }
    return status
}
// for show next month in calendar
function nextMonth() {
    cal.nextMonth()
    cal.monthTitle()
    cal.monthDays()
}
// for show previuse month in calendar
function prevMonth() {
    cal.prevMonth()
    cal.monthTitle()
    cal.monthDays()
}
// shoeing calendar
function showCalender() {
    calendarModal.style.display = "flex";
    cal.monthTitle()
    cal.monthDays()
}

function fullDate(e) {
    let month = document.querySelector(".calendarHeader>div h3").textContent
    let year = document.querySelector(".calendarHeader>div>p").textContent
    year.toString()

    let day = e.target.textContent
    console.log(year, month, day);
    let days = new Date(`${year}, ${month}, ${day}`)
    days.getMonth()
    console.log(days.getMonth());
    console.log(days.getFullYear());
    console.log(days.getDay());

}
// ...........................

// show notes in folder
function showNoteInFolder(e) {
    // If you click on the folder
    if (e.target.classList.contains('folder')) {
        //set the title folder
        addBtnNewHeader(e.target.querySelector('h3').textContent)
        // show page notes in folder
        changeSectionInMain(4)
        // If you click on the title folder
    } else if (e.target.classList.contains('h3')) {
        //set the title folder
        addBtnNewHeader(e.target.textContent)
        // show page notes in folder
        changeSectionInMain(4)
    }
}

// Description in removeBtnHeader function
let info = 0

function addBtnNewHeader(valueTitleFolder) {
    info++
    removeBtnHeader(info)
    // create new btn 
    let newLi = `<li id="liActiveNow" value="4">${valueTitleFolder}</li>`
    // show new btn in header for title folder( new / show )
    navHeader.insertAdjacentHTML('beforeend', newLi)
}

// remove btn title folder in header
function removeBtnHeader(info) {
    // In the first click, info is 0, and in the second click, info becomes more than 0
    // When it leaves a folder and goes to another folder, so that the first one is deleted and the new folder title is displayed.
    // We leave the info at 0 in the first step
    if (info > 1) {
        document.querySelector('#liActiveNow').remove()
    }
}