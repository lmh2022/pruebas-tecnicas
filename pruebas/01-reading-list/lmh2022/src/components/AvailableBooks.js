import React from 'react';
import {useState, useEffect} from 'react';
import data from '.././books.json';
import Selector from './Selector';
import RangeControl from './RangeControl';
import './AvailableBooks.css';



function AvailableBooks() {

  const [selected, setSelected] = useState((localStorage.getItem("genre")??""))
  let books= data.library
  const [filteredBooks, setFilteredBooks] = useState(books)
  const [pages, setPages] = useState((localStorage.getItem("pages")??2000))

  console.log(filteredBooks)





  useEffect(
    ()=>{
      setFilteredBooks(books.filter(f=>f.book.genre===(selected===""?f.book.genre:selected)&&f.book.pages<=pages))
      localStorage.setItem("genre", selected??"")
      localStorage.setItem("pages", pages??2000)
      onstorage = ()=> {setSelected(localStorage.getItem("genre")); setPages(localStorage.getItem("pages"))}
     },[selected, pages]
  )

 
 
  return (
    <>Hay {filteredBooks.length}  libros Disponibles <br/>

      <RangeControl setCurrentValue={setPages} currentValue={pages} attribute="pages" item="book" object={books}/>
      <Selector field="genre" record="book" object={books} setSelected={setSelected} selected={selected}/>

      <div className="availablebooks" >
        {filteredBooks.map(e=><div key={e.book.ISBN} className="book" style={{backgroundImage: "url("+e.book.cover+")"}} >
                      
          </div>)}
      </div>

    </>
  );
}

export default AvailableBooks;
