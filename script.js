// ==========================
// Pretty Notes
// Part 1
// ==========================

// Load saved data
let folders = JSON.parse(localStorage.getItem("folders")) || [];
let notes = JSON.parse(localStorage.getItem("notes")) || {};

let currentFolder = "";
let currentNote = -1;

// Elements
const foldersDiv = document.getElementById("folders");
const notesList = document.getElementById("notesList");
const newFolderBtn = document.getElementById("newFolder");
const searchInput = document.getElementById("search");

const titleInput = document.getElementById("title");
const editor = document.getElementById("editor");
const favoriteBtn = document.getElementById("favorite");

// Save everything
function saveData(){
    localStorage.setItem("folders", JSON.stringify(folders));
    localStorage.setItem("notes", JSON.stringify(notes));
}

// -------------------
// Create Folder
// -------------------

newFolderBtn.onclick = () => {

    const name = prompt("Folder name:");

    if(!name) return;

    if(folders.includes(name)){
        alert("Folder already exists.");
        return;
    }

    folders.push(name);

    notes[name] = [];

    saveData();

    renderFolders();

}

// -------------------
// Render Folder List
// -------------------

function renderFolders(){

    foldersDiv.innerHTML = "";

    folders.forEach(folder=>{

        const div=document.createElement("div");

        div.className="folder";

        div.innerHTML="📁 "+folder;

        div.onclick=()=>{

            currentFolder=folder;

            renderNotes();

        }

        foldersDiv.appendChild(div);

    });

}

// -------------------
// Render Notes
// -------------------

function renderNotes(){

    notesList.innerHTML="";

    if(currentFolder=="") return;

    notes[currentFolder].forEach((note,index)=>{

        const div=document.createElement("div");

        div.className="note";

        div.innerHTML=(note.favorite?"⭐ ":"📝 ")+note.title;

        div.onclick=()=>{

            currentNote=index;

            titleInput.value=note.title;

            editor.value=note.content;

            favoriteBtn.textContent=note.favorite?"⭐":"☆";

        }

        notesList.appendChild(div);

    });

}

// -------------------
// New Note
// -------------------

editor.ondblclick=()=>{

    if(currentFolder==""){

        alert("Create a folder first.");

        return;

    }

    notes[currentFolder].push({

        title:"Untitled",

        content:"",

        favorite:false

    });

    currentNote=notes[currentFolder].length-1;

    titleInput.value="";

    editor.value="";

    saveData();

    renderNotes();

}

// -------------------
// Auto Save
// -------------------

function autoSave(){

    if(currentFolder=="") return;

    if(currentNote==-1) return;

    notes[currentFolder][currentNote].title=titleInput.value;

    notes[currentFolder][currentNote].content=editor.value;

    saveData();

    renderNotes();

}

titleInput.oninput=autoSave;

editor.oninput=autoSave;

// -------------------
// Favorite
// -------------------

favoriteBtn.onclick=()=>{

    if(currentFolder=="") return;

    if(currentNote==-1) return;

    notes[currentFolder][currentNote].favorite=!notes[currentFolder][currentNote].favorite;

    favoriteBtn.textContent=notes[currentFolder][currentNote].favorite?"⭐":"☆";

    saveData();

    renderNotes();

}

// -------------------
// Search
// -------------------

searchInput.oninput=()=>{

    const value=searchInput.value.toLowerCase();

    document.querySelectorAll(".note").forEach(note=>{

        note.style.display=note.innerText.toLowerCase().includes(value)
          // =========================
// PART 2
// =========================

const newNoteBtn = document.getElementById("newNote");
const deleteNoteBtn = document.getElementById("deleteNote");
const deleteFolderBtn = document.getElementById("deleteFolder");

// New Note Button
newNoteBtn.onclick = () => {

    if(currentFolder==""){
        alert("Create a folder first.");
        return;
    }

    notes[currentFolder].push({
        title:"Untitled",
        content:"",
        favorite:false
    });

    currentNote = notes[currentFolder].length-1;

    titleInput.value="";
    editor.value="";

    saveData();
    renderNotes();

};

// Delete Note

deleteNoteBtn.onclick = () => {

    if(currentFolder=="" || currentNote==-1) return;

    if(!confirm("Delete this note?")) return;

    notes[currentFolder].splice(currentNote,1);

    currentNote=-1;

    titleInput.value="";
    editor.value="";

    saveData();
    renderNotes();

};

// Delete Folder

deleteFolderBtn.onclick = () => {

    if(currentFolder=="") return;

    if(!confirm("Delete this folder?")) return;

    delete notes[currentFolder];

    folders = folders.filter(f=>f!==currentFolder);

    currentFolder="";
    currentNote=-1;

    foldersDiv.innerHTML="";
    notesList.innerHTML="";

    titleInput.value="";
    editor.value="";

    saveData();
    renderFolders();

};
      
        ? "block"
        : "none";

    });

}

// -------------------

renderFolders();
// =========================
// PART 3 - PDF Export
// =========================

const exportBtn = document.getElementById("exportPDF");

exportBtn.onclick = () => {

    if(currentFolder=="" || currentNote==-1){
        alert("Open a note first.");
        return;
    }

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF();

    pdf.setFont("helvetica","bold");
    pdf.setFontSize(20);

    pdf.text(titleInput.value,20,20);

    pdf.setFont("helvetica","normal");
    pdf.setFontSize(12);

    const lines = pdf.splitTextToSize(editor.value,170);

    pdf.text(lines,20,35);

    pdf.save(titleInput.value || "PrettyNote.pdf");

}
