const fs = require("fs");
// const db = require('./db/db.json');
const path = require("path");

const express = require("express");
const { v4: uuidv4 } = require('uuid');

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

    res.send(JSON.stringify(loadDBData()));

});

app.post("/api/notes", (req, res) => {

    var dbData = loadDBData();

    req.body.id = uuidv4();
    dbData.push(req.body);

    saveDBData(dbData);

    console.log(dbData);

    res.send(JSON.stringify(dbData));

})

app.delete("/api/notes/:id", (req, res) => {
    var id = req.params.id;

    var dbData = loadDBData();

    var deleteIdx = null;

    for (var i = 0; i < dbData.length; i++) {
        if (dbData[i].id == id) {
            deleteIdx = i;
        }
    }

    if (deleteIdx != null) {
        dbData.splice(deleteIdx, 1); // delete this note
        saveDBData(dbData);
    }   

    res.send(JSON.stringify(dbData));
});

app.get("*", (req, res) => {

    res.sendFile('index.html', { root: path.join(__dirname, 'public')});
})

app.listen(PORT, () => {
    console.log(`App listening on PORT http://localhost:${PORT}`);
});

const loadDBData = () => {

    const data = fs.readFileSync(path.join( __dirname, "db/db.json"),
            {encoding:'utf8', flag:'r'});

    return JSON.parse(data);
}

const saveDBData = (notes) => {
    const notesJSON = JSON.stringify(notes);

    // Get the current Notes by reading them from 'db.json'
    fs.writeFile(path.join( __dirname, "db/db.json"), notesJSON, (err) => {

        if (err)
            console.log(err);
        else {
            console.log("DB updated successfully\n");
        }
    });
}

