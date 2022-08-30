const addBtn = document.querySelector("#addBtn")
const main = document.querySelector("#main")
addBtn.addEventListener("click", function(){
    addNote()
})

var today = new Date();

var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() ;

const saveNotes = () => {
    const notes = document.querySelectorAll(".note textarea");
    console.log(notes);
    const data = [];
    notes.forEach((note) => {data.push(note.value)})
    if (data.length === 0){
        localStorage.removeItem("notes")
    } else {
    localStorage.setItem("notes",JSON.stringify(data))
    }
}
// body.innerHTML = `<p class = "date">Date added ${date} <br>At time ${time}</p>`
const addNote = (text = "") => {
    const note = document.createElement("div")
    note.classList.add("note")
    note.innerHTML = `
    <div class="tool">
        <div class="save"><img src="save.png" alt="SAVE" width="20px" height="20px"></div>
        <div class="delete"><img src="delete.png" alt="DELETE" width="20px" height="20px"></div>
    </div>
    <textarea name="Your Notes">${text}</textarea>
    `;
    note.querySelector(".delete").addEventListener("click", function(){
        note.remove()
        // saveNotes()
    })
    note.querySelector(".save").addEventListener("click", function(){
        saveNotes()
    })
    note.querySelector("textarea").addEventListener("focusout",function(){saveNotes()})
    main.appendChild(note);
    saveNotes()
}

(
    function(){
        const lsNotes = JSON.parse(localStorage.getItem("notes"));
        if (lsNotes === null){
            addNote()
        } else {
        lsNotes.forEach((lsNotes) => {addNote(lsNotes)})
        }
    }
)()