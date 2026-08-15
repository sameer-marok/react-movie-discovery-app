// Search component for searching movies
// searchTerm: The current search term entered by the user
// setSearchTerm: Function to update the search term state in the parent component
const Search = ({searchTerm, setSearchTerm}) => {
    return ( 
        <div className="search">
            <div>
                <img src="./search.svg" alt="search"/>

                <input
                    type="text"
                    placeholder="Search through thousands of movies"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
            </div>
        </div>
     );
}
 
export default Search;