// ===============================
// Pretty Notes V2 - Part 1
// ===============================

// Load saved data
let folders = JSON.parse(localStorage.getItem("folders")) || [];
let notes = JSON.parse(localStorage.getItem("notes")) || {};

let currentFolder = "";
let currentNote = -1;

// Elements
const foldersDiv = document.getElementById("folders");
const notesList = document.getElementById("notesList");

const newFolderBtn = document.getElementById("newFolder");

const titleInput = document.getElementById("title");
const editor = document.getElementById("editor");

// ----------------------------
// Save Data
// ----------------------------

function saveData(){

localStorage.setItem("folders",JSON.stringify(folders));

localStorage.setItem("notes",JSON.stringify(notes));

}

// ----------------------------
// Render Folder List
// ----------------------------

function renderFolders(){

foldersDiv.innerHTML="";

folders.forEach(folder=>{

const div=document.createElement("div");

div.className="folder";

div.innerHTML="📁 "+folder;

div.onclick=()=>{

currentFolder=folder;

renderNotes();

};

foldersDiv.appendChild(div);

});

}

// ----------------------------
// Create Folder
// ----------------------------

newFolderBtn.onclick=()=>{

const name=prompt("Folder name");

if(!name) return;

if(folders.includes(name)){

alert("Folder already exists.");

return;

}

folders.push(name);

notes[name]=[];

saveData();

renderFolders();

};

// ----------------------------
// Render Notes
// ----------------------------

function renderNotes(){

notesList.innerHTML="";

if(currentFolder=="") return;

notes[currentFolder].forEach((note,index)=>{

const div=document.createElement("div");

div.className="note";

div.innerHTML="📝 "+note.title;

div.onclick=()=>{

currentNote=index;

titleInput.value=note.title;

editor.value=note.content;

};

notesList.appendChild(div);

});

}

// ----------------------------
// Create New Note
// ----------------------------

document.getElementById("newNote").onclick=()=>{

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

};

// ----------------------------
// Auto Save
// ----------------------------

function autoSave(){

if(currentFolder=="") return;

if(currentNote==-1) return;

notes[currentFolder][currentNote].title=titleInput.value;

notes[currentFolder][currentNote].content=editor.value;

saveData();

renderNotes();

}

titleInput.addEventListener("input",autoSave);

editor.addEventListener("input",autoSave);

// ----------------------------

renderFolders();
// ===============================
// Pretty Notes V2 - Part 2
// Favorites + Search
// ===============================

const favoriteBtn = document.getElementById("favorite");
const searchInput = document.getElementById("search");

// -------- Favorites --------

favoriteBtn.onclick = () => {

    if(currentFolder=="") return;

    if(currentNote==-1) return;

    notes[currentFolder][currentNote].favorite =
    !notes[currentFolder][currentNote].favorite;

    saveData();

    renderNotes();

}

// -------- Update renderNotes --------

function renderNotes(){

notesList.innerHTML="";

if(currentFolder=="") return;

notes[currentFolder].forEach((note,index)=>{

const div=document.createElement("div");

div.className="note";

div.innerHTML=
(note.favorite ? "⭐ " : "📝 ")
+ note.title;

div.onclick=()=>{

currentNote=index;

titleInput.value=note.title;

editor.value=note.content;

};

notesList.appendChild(div);

});

}

// -------- Search --------

searchInput.addEventListener("input",()=>{

const value=searchinput.value.toLowercasr();
    document.queryselectorAll(".note").forEach(note=>{
note style.display=
note.innertext.toLowercase(). includes (value)
? "block"
: "none";
});
});
renderFolders();
// ===============================
// Pretty Notes V2 - Part 3
// Delete + PDF Export
// ===============================

// ---------- Delete Current Note ----------

function deleteCurrentNote(){

if(currentFolder=="") return;

if(currentNote==-1) return;

if(!confirm("Delete this note?")) return;

notes[currentFolder].splice(currentNote,1);

currentNote=-1;

titleInput.value="";

editor.value="";

saveData();

renderNotes();

}

// ---------- Delete Current Folder ----------

function deleteCurrentFolder(){

if(currentFolder=="") return;

if(!confirm("Delete this folder?")) return;

delete notes[currentFolder];

folders=folders.filter(f=>f!==currentFolder);

currentFolder="";

currentNote=-1;

saveData();

renderFolders();

notesList.innerHTML="";

titleInput.value="";

editor.value="";

}

// ---------- Keyboard Shortcuts ----------

document.addEventListener("keydown",(e)=>{

if(e.ctrlKey && e.key=="s"){

e.preventDefault();

saveData();

alert("✅ Notes Saved");

}

});

// ---------- Export as Text ----------

function exportNote(){

if(currentFolder=="") return;

if(currentNote==-1) return;

const text=
titleInput.value+
"\n\n"+
editor.value;

const blob=new Blob([text],{type:"text/plain"});

const link=document.createElement("a");

link.href=URL.createObjectURL(blob);

link.download=(titleInput.value||"note")+".txt";

link.click();

}
// ===============================
// Pretty Notes V2 - Part 4
// Delete Buttons + PDF Export
// ===============================

// Create Toolbar Buttons

const toolbar = document.querySelector(".toolbar");

// Delete Note Button
const deleteBtn = document.createElement("button");
deleteBtn.innerHTML = "🗑️";
deleteBtn.title = "Delete Note";
toolbar.appendChild(deleteBtn);

// Export PDF Button
const pdfBtn = document.createElement("button");
pdfBtn.innerHTML = "📄";
pdfBtn.title = "Export";
toolbar.appendChild(pdfBtn);

// --------------------
// Delete Note
// --------------------

deleteBtn.onclick = () => {

    if(currentFolder==""){

        alert("Open a folder first.");

        return;

    }

    if(currentNote==-1){

        alert("Open a note first.");

        return;

    }

    if(confirm("Delete this note?")){

        notes[currentFolder].splice(currentNote,1);

        currentNote=-1;

        titleInput.value="";

        editor.value="";

        saveData();

        renderNotes();

    }

};

// --------------------
// Export
// --------------------

pdfBtn.onclick = () => {

    if(currentFolder==""){

        alert("Open a note first.");

        return;

    }

    if(currentNote==-1){

        alert("Open a note first.");

        return;

    }

    const content =
titleInput.value +
"\n\n-----------------\n\n" +
editor.value;

    const blob = new Blob([content],{type:"text/plain"});

    const a = document.createElement("a");

    a.href = URL.createObjectURL(blob);

    a.download = titleInput.value + ".txt";

    a.click();

};

// --------------------
// Welcome Message
// --------------------

if(folders.length===0){

console.log("🌸 Welcome to Pretty Notes!");

}
// ===============================
// Pretty Notes V2 - Part 5
// Dark Mode + Better UI
// ===============================

// Create Dark Mode Button
const darkBtn = document.createElement("button");
darkBtn.innerHTML = "🌙";
darkBtn.title = "Dark Mode";
toolbar.appendChild(darkBtn);

// Load Theme
let darkMode = localStorage.getItem("darkMode") === "true";

if(darkMode){
    document.body.classList.add("dark");
}

// Toggle Theme
darkBtn.onclick = () => {

    darkMode = !darkMode;

    document.body.classList.toggle("dark");

    localStorage.setItem("darkMode", darkMode);

};

// Welcome Note
if(folders.length === 0){

    folders.push("My Notes");

    notes["My Notes"] = [];

    currentFolder = "My Notes";

    notes["My Notes"].push({

        title:"🌸 Welcome",

        content:
`Welcome to Pretty Notes!

• Create unlimited notes
// ===============================
// Pretty Notes V2 - Part 6
// Date + Better Sorting
// ===============================

// Add date to new notes

const oldNewNote = document.getElementById("newNote").onclick;

document.getElementById("newNote").onclick = () => {

    if(currentFolder==""){
        alert("Create a folder first.");
        return;
    }

    notes[currentFolder].unshift({

        title:"Untitled",

        content:"",

        favorite:false,

        date:new Date().toLocaleString()

    });

    currentNote=0;

    titleInput.value="";

    editor.value="";

    saveData();

    renderNotes();

};

// New renderNotes()

renderNotes = function(){

notesList.innerHTML="";

if(currentFolder=="") return;

notes[currentFolder]

.sort((a,b)=>{

if(a.favorite!==b.favorite){

return b.favorite-a.favorite;

}

return new Date(b.date)-new Date(a.date);

})

.forEach((note,index)=>{

const div=document.createElement("div");

div.className="note";

div.innerHTML=`
<b>${note.favorite?"⭐ ":"📝 "}${note.title}</b>
<br>
<small>${note.date||""}</small>
`;

div.onclick=()=>{

currentNote=index;

titleInput.value=note.title;

editor.value=note.content;

};

notesList.appendChild(div);

});

};

renderFolders();
