const fs = require("fs");
// const db = require('./db/db.json');
const path = require("path");

const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get("/notes", (req, res) => {

    res.sendFile('notes.html', { root: path.join(__dirname, 'public')});
});

app.get("/api/notes", (req, res) => {

    res.send("API NOTES");

});

app.post("/api/notes", (req, res) => {

    console.log(req.body);

    res.send("POST NOTES");

})

app.get("*", (req, res) => {

    res.sendFile('index.html', { root: path.join(__dirname, 'public')});
})

app.listen(PORT, () => {
    console.log(`App listening on PORT http://localhost:${PORT}`);
});


const newNote = {
    "title":"A new Note",
    "text":"Testing text"
};

// Get the current Notes by reading them from 'db.json'
fs.readFile( path.join( __dirname, "db/db.json"), "utf8", (err,data) => {

    // Append a new note to the collection of notes 
    console.log (data)
    const notes = JSON.parse(data);
    

    //Save the newly extended collection back to db.json
    const notesJSON = JSON.stringify(notes);

});



