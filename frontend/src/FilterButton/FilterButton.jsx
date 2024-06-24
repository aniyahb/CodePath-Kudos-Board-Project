import "./FilterButton.css"

function FilterButton(props){
    return(
        <button className= "button" onClick={() => props.handleFilterChange(props.category)}>
            {props.category.charAt(0).toUpperCase()+ props.category.slice(1)}
        </button>

    )
}

export default FilterButton;
