import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = props => {
  const host = "http://localhost:5000"
    // const s1 = {
    //     "name" : "Siddharth",
    //     "class" : "4H"
    // }
    // const [state, setstate] = useState(s1)
    // const update = () => {
    //     setTimeout(() => {
    //         setstate({
    //             "name": "Sachin",
    //             "class": "A1"
    //         })
    //     },1000)
    // }

    const notesInitial = [
        // {
        //   "_id": "61462879841ab59503498992",
        //   "user": "613f3682540baf1aa6b132ea",
        //   "title": "MyTitle",
        //   "description": "this is first note",
        //   "tag": "personal",
        //   "date": "2021-09-18T17:57:13.430Z",
        //   "__v": 0
        // },
        // {
        //   "_id": "6146289a841ab59503498995",
        //   "user": "613f3682540baf1aa6b132ea",
        //   "title": "MyTitle2",
        //   "description": "this is second note",
        //   "tag": "personal",
        //   "date": "2021-09-18T17:57:46.438Z",
        //   "__v": 0
        // }
      ]
      const [notes, setNotes] = useState(notesInitial)



      const getNotes = async() => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzZjM2ODI1NDBiYWYxYWE2YjEzMmVhIn0sImlhdCI6MTYzMTU0MjU3MX0.YOCcftEF6a0aXieIaPJg6kmEtuL1WQ6Dq5N6ursz3Sw"
          }
        });
        const json = await response.json()
        // console.log(json);
        setNotes(json)
      }

      //ADD A NOTE
      const addNote = async(title, description, tag) => {
          console.log("Adding a new note");

          const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzZjM2ODI1NDBiYWYxYWE2YjEzMmVhIn0sImlhdCI6MTYzMTU0MjU3MX0.YOCcftEF6a0aXieIaPJg6kmEtuL1WQ6Dq5N6ursz3Sw"
            },
            body: JSON.stringify({title, description, tag})
          })
         

          
          const note = await response.json()
          setNotes(notes.concat(note))
      }

      //DELETE A NOTE
      const deleteNote = async(id) =>{
        // console.log("Deleting the note with id" + id);
        // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzZjM2ODI1NDBiYWYxYWE2YjEzMmVhIn0sImlhdCI6MTY1OTE5MTQ0NX0.de1IxxHVqET2wakqUePVOA4i98bdLl4bBRRfB128QRE"
      }
    });
        const json = await response.json()
        console.log(json);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
      }

      const editNote = async(id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzZjM2ODI1NDBiYWYxYWE2YjEzMmVhIn0sImlhdCI6MTY1OTE5MTQ0NX0.de1IxxHVqET2wakqUePVOA4i98bdLl4bBRRfB128QRE"
            },
            body: JSON.stringify({title, description, tag})
          
        })
        const json = await response.json();
        console.log(json);

        let newNotes = JSON.parse(JSON.stringify(notes))
        //login to edit in client
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if(element._id === id) {
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
          }
          
        }
        setNotes(newNotes)
      }

    return(
        // <noteContext.Provider value={{state, update}}>
        <noteContext.Provider value={{notes, addNote,deleteNote,editNote, getNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}


export default NoteState;