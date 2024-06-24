import "./SearchBar.css"

function SearchBar(props){

    function handleInputChange(event){
        props.handleSearchChange(event.target.value)

    }

    return(
        <div className="SearchBar">
            <input type="text" value={props.searchQuery} placeholder= "Search Boards..." onChange={handleInputChange} />
        </div>
    )

}

export default SearchBar;
