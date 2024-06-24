import { useState, useEffect } from 'react'
import './App.css'
import Header from './Header/Header'
import CardList from './CardList/CardList'
import Footer from './Footer/Footer'
import CreateForm from './CreateForm/CreateForm'
import HomePage from './HomePage/HomePage'
import { BrowserRouter as Router,Routes, Route, Navigate } from "react-router-dom";



function App() {
  const categories = ["all", "recent", "celebration" , "thank you", "inspiration"];
  const [displayForm, setDisplayForm] = useState(false)
  const [boards, setBoards] = useState([]);
  const [boardId, setBoardId] = useState()
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [filteredBoards, setFilteredBoards] = useState([])


  useEffect(() =>{
    receiveBoardList();
  }, [])

  async function receiveBoardList(){
      try{
          const response = await fetch("http://localhost:3000/boards", {
              method: 'GET',
              headers:{
                  'Content-Type': 'application/json'
              },
          });
          const data = await response.json();
          setBoards(data)
      }catch(err){
          console.log(err)
      }
  }

  async function deleteBoard(boardId){
    try{
        const response = await fetch(`http://localhost:3000/boards/${boardId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if(response.ok){
            console.log('response is fine')
            receiveBoardList();
        }
    } catch(err){

    }
  }

  async function handleSearchBoards(query){
    try{
        const response = await fetch( `http://localhost:3000/boards/search/${query}`)
        const data = await response.json()

        setBoards(data)
    } catch(err){

    }
  }

  function handleSearchChange(query){

    setSearchQuery(query);
    if(query.length>0){
        handleSearchBoards(query)

    } else{
        receiveBoardList()
    }
  }

  function handleFilterBoardsCategory(){
    if(filter === "all"){
        setFilteredBoards(boards)

    } else if (filter==='recent'){
        const sortedBoards = boards.sort((a,b) => b.id - a.id);
        const lastThreeBoards = sortedBoards.slice(0,3)
        setFilteredBoards(lastThreeBoards)

    }else if(filter === 'my boards'){
        setFilteredBoards(boards.filter(board => board.userId === userId))

    }else{
        const filtered = boards.filter(board => board.category === filter)
        setFilteredBoards(filtered)
    }
  }

  useEffect(() =>{
    handleFilterBoardsCategory();
  }, [filter,boards])


  function handleDisplayCreateForm(){
    setDisplayForm(!displayForm)

  }

  function handleSetBoardId(id){
    setBoardId(id)
  }

  function handleFilterChange(category){
    setFilter(category)
  }


  return (
    <Router>
      <div className='App'>
        <Header/>

        <main>
          <Routes>
            <Route path='/' element={<Navigate to="/homepage"/>}/>
            <Route path="/homepage" element={

              <>
               <HomePage
                  boards={filteredBoards}
                  searchQuery={searchQuery}
                  handleSearchChange={handleSearchChange}
                  handleCreateNewBoardForm={handleDisplayCreateForm}
                  filter={filter}
                  handleFilterChange={handleFilterChange}
                  deleteBoard={deleteBoard}
                  categories={categories}
                  handleSetBoardId={handleSetBoardId} />
               {displayForm && <CreateForm formName={"board"} displayForm={handleDisplayCreateForm} refreshBoards={receiveBoardList} />}
              </>}/>


            <Route path='/boards/:id/cards' element = {
                  <>
                    <CardList displayForm={handleDisplayCreateForm} />

                  </>
            }/>
          </Routes>


        </main>
        <Footer />


      </div>

    </Router>


  )
}

export default App
