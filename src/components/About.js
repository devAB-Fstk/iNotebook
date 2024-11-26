import React, {useContext, useEffect} from 'react'
import noteContext from '../context/note/NoteContext'

export default function About() {
  const a = useContext(noteContext);
 

  return (
    <div>
     This is about
    </div>
  )
}
