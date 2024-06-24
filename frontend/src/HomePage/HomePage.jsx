import FilterButton from '../FilterButton/FilterButton'
import CreateButton from '../CreateButton/CreateButton'
import BoardList from '../BoardList/BoardList'
import SearchBar from '../SearchBar/SearchBar'

function HomePage(props){
    return(
        <>

            <SearchBar searchQuery={props.searchQuery} handleSearchChange={props.handleSearchChange} />
            <div className='buttons'>
                {
                    props.categories.map(category => (
                        <FilterButton key={category} category={category} currentFilter={props.filter} handleFilterChange={props.handleFilterChange}/>

                    ))
                }

            </div>

            <CreateButton name="Create new board" displayForm={props.handleCreateNewBoardForm}/>
            <BoardList handleSetBoardId={props.handleSetBoardId} deleteBoard={props.deleteBoard} boards={props.boards}/>

        </>
    )

}

export default HomePage
