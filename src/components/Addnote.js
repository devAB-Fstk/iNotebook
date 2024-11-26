import React, { useContext ,useState} from "react";
import noteContext from "../context/note/NoteContext";

const Addnote = (props) => {
  
  const context = useContext(noteContext);
  const { addNote } = context;

//Use State
const [note, setNote] = useState({title: "", description: "", tag: ""})

//Use Event
  const handleClick = (e) => {
    e.preventDefault();
  addNote(note.title, note.description, note.tag);
  setNote({title: "", description: "", tag: ""});
  props.showAlert("Added successfully", 'success')
  };

  //Use Event
  const onChange = (e) => {
 setNote({...note, [e.target.name]: e.target.value})
  };

  return (
    <div>
      <div className="container my-3">
        <h2>Add your notes</h2>
        <div className="container my-3">
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                aria-describedby="emailHelp"
                value={note.title}
                placeholder="Enter Title"
                onChange={onChange}
                minLength={5} required
              />
            </div>
            <div className="form-group  my-2">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={note.description}
                placeholder="Add Your Description"
                onChange={onChange}
                minLength={5} required
              />
            </div>

            <div className="form-group  my-2">
              <label htmlFor="tag">Tag</label>
              <input
                type="text"
                className="form-control"
                id="tag"
                name="tag"
                value={note.tag}
                placeholder="Add Your Tag"
                onChange={onChange}
                minLength={5} required
              />
            </div>
            
            <button disabled={note.title.length<5 || note.description.length<5}
              type="submit my-3"
              className="btn btn-dark"
              onClick={handleClick}
            >
              Addnote
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addnote;
