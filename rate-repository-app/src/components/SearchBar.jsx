import { Searchbar } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce'

const SearchBar = ({repoRefetch}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchKeyword] = useDebounce(searchQuery, 500)

    useEffect(() => {
        repoRefetch({searchKeyword: searchKeyword})
    , [searchKeyword]}
    )

    return (
      <Searchbar
        placeholder="Search"
        onChangeText={(query) => setSearchQuery(query)}
        value={searchQuery}
      />
    );
  };

export default SearchBar