const addBox = document.querySelector(".add-box"), 
popupBox = document.querySelector(".popup-box"),
popupTitle = document.querySelector(".headerp p"), 
closeIcon = document.querySelector(".headerp i"),
TitleTag = document.querySelector("input"),
DescTag = document.querySelector("textarea"),
toggle = document.querySelector("nav button"),
newbody = document.querySelector(".all"),
addBtn = document.querySelector(".popup button");

const months =["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, updateId;

function showNotes() {
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note , index) => {
        let litag =`<li class="note">
                        <div class="details">
                            <p>${note.Title}</p> <span>${note.Description}</span> 
                        </div>
                        <div class="bottom-content"> <span>${note.Date}</span>
                            <div class="settings"><i onclick="showMenu(this)" class="fa fa-ellipsis-v" aria-hidden="true"></i>
                                <ul class="menu">
                                    <li onclick="editNote(${index}, '${note.Title}', '${note.Description}')"><i class="fa-solid fa-pen"></i>Edit</li>
                                    <li onclick="deleteNote(${index})"><i class="fa-solid fa-trash"></i>Delete</li>
                                </ul>    
                            </div>
                        </div>
                    </li>`;
        addBox.insertAdjacentHTML("afterend",litag)
    });   
}
showNotes();


function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e =>{
        if(e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    })
}
addBox.addEventListener( "click", () => {
    TitleTag.focus();
    popupBox.classList.add("show");
});

function deleteNote(noteId) {
    let confirmDel = confirm("Are you sure you want to delete this note?");
    if(!confirmDel) return;
    notes.splice(noteId, 1);
    localStorage.setItem("notes",JSON.stringify(notes));
    showNotes();
}

closeIcon.addEventListener("click" , () => {
    isUpdate = false;
    TitleTag.value = "";
    DescTag.value = "";
    popupBox.classList.remove("show");
    addBtn.innerText = "Add Note";
    popupTitle.innerText = "Add a new Note";
});

addBtn.addEventListener("click" , e => {
    e.preventDefault();
    let noteTitle = TitleTag.value,
    noteDesc = DescTag.value;

    if(noteTitle || noteDesc){
        let dateObj = new Date(),
        month = months[dateObj.getMonth()],
        date = dateObj.getDate()
        year = dateObj.getFullYear();

        let noteinfo = {
            Title: noteTitle , Description: noteDesc , 
            Date:`${month} ${date}, ${year}`
        }
        if(!isUpdate){
            notes.push(noteinfo);
        }
        else{
            isUpdate = false;
            notes[updateId] = noteinfo;
        }
        localStorage.setItem("notes",JSON.stringify(notes));
        closeIcon.click();
        showNotes();

    }
});

function editNote(noteId, title, desc){
    isUpdate = true;
    updateId = noteId;
    addBox.click();
    TitleTag.value = title;
    DescTag.value = desc;
    addBtn.innerText = "Update Note";
    popupTitle.innerText = "Update a Note";
    console.log(noteId, title, desc);
}


toggle.addEventListener("click", () =>{
    
    if (toggle.innerHTML = `<i class="fa-solid fa-sun" id="toggleDark"></i>`){
        toggle.innerHTML = `<i style = "color:#000;" class="fa-solid fa-moon"></i>
                            <style>
                                body{
                                    background-color: #fff;
                                    color:#000;
                                }
                                nav ul i{
                                    color: #000;
                                }
                                nav ul a{
                                    color: #000;
                                }
                                #searchbar{
                                    color: #000;
                                }
                                .wrapper li{
                                    background: #fff;
                                }
                                .settings li{
                                    background-color: #fff;
                                }
                                .popup .content{
                                    background-color: #fff;
                                }
                                .content form :where(input , textarea){
                                    color: #000;
                                    background-color: #fff;
                                }
                                .content form button{
                                    color: #000;
                                }
                                .popup-box{
                                    background-color:rgba(0, 4, 7, 0.39)
                                }
                            `;
        newbody.classList.add("toggle");
        
    }
    else {
        
        newbody.classList.remove("toggle");
    }
});

