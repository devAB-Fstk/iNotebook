import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/note/NoteContext"
import Noteitem from "./Noteitem"
import Addnote from "./Addnote"
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {
  const context = useContext(noteContext);
  const navigate = useNavigate();
  const { notes, getNotes, editNote } = context;

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes()
    }else{
      navigate("/login")
    }
    
  }, [])

  //Use Ref
  const ref = useRef(null);
  const refClose = useRef(null);
  //Use State
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

  const updateNote = (currentNote) => {
    ref.current.click();
    console.log('clicked');
    console.log(ref.current);
    setNote({id: currentNote._id, etitle : currentNote.title, edescription : currentNote.description, etag : currentNote.tag});
    
  }
  //Use Event
  const handleClick = (e) => {
    console.log("Updating the note...", note); 
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click()
    // addNote(note.title, note.description, note.tag);
    props.showAlert("Updated successfully", 'success')
  };

  //Use Event
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  };

  return (
    <>
      <Addnote showAlert={props.showAlert}/>

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">

              {/* Form is Here */}
              <form>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    placeholder="Enter Title"
                    value={note.etitle}
                    onChange={onChange}
                    minLength={5} required
                  />
                </div>
                <div className="form-group  my-2">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    placeholder="Add Your Description"
                    value={note.edescription}
                    onChange={onChange}
                    minLength={5} required
                  />
                </div>

                <div className="form-group  my-2">
                  <label htmlFor="tag">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    placeholder="Add Your Tag"
                    value={note.etag}
                    onChange={onChange}
                  /> 
                </div>

                {/* <button
              type="submit my-3"
              className="btn btn-primary"
              onClick={handleClick}
            >
              Addnote
            </button> */}
              </form>

            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="row my-3">
          <h2>Your Notes</h2>
          <div className='container'>
          {notes.length===0 && 'No notes to display'}
          </div>
          {notes.map((note) => {
            return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
          })}
        </div>
      </div>
    </>
  )
}

export default Notes;
