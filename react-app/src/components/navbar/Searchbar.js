import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AsyncSelect from 'react-select/async'
import { StyledDiv } from '../styledComponents/misc';

const AsyncSearch = () => {
  const history = useHistory()
  const apiKey = useSelector(state => state.session.apiKeys.finnhub)
  const [searchTerm, setSearchTerm] = useState(null)
  const [selectedValue, setSelectedValue] = useState(null)

  const handleInputChange = value => {
    setSearchTerm(value)
  };

  const handleChange = value => {
    let symbol = value['displaySymbol']
    history.push(`/stocks/${symbol}`)
  };

  const loadOptions = () => {
    return fetch(`https://finnhub.io/api/v1/search?q=${searchTerm}&token=${apiKey}`)
      .then(res => res.json())
      .then(data => console.log(data))
  }

  return (
    <StyledDiv h='100%' w='200px'>
      <AsyncSelect
        cacheOptions
        value={selectedValue}
        getOptionLabel={e => `${e.symbol}: ${e.description}`}
        getOptionValue={e => e.symbol}
        loadOptions={loadOptions}
        onInputChange={handleInputChange}
        onChange={handleChange}
      />
    </StyledDiv>
  );
}

export default AsyncSearch;