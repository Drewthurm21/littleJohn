import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AsyncSelect from 'react-select/async'
import { StyledDiv } from '../styledComponents/misc';

const AsyncSearch = () => {
  const history = useHistory()
  const apiKey = useSelector(state => state.session.apiKeys.alpha_vantage)
  const [searchTerm, setSearchTerm] = useState(null)
  const [selectedValue, setSelectedValue] = useState(null)

  let timeoutId = null;
  const handleInputChange = (value) => {
    setSearchTerm(value)
  };

  const handleChange = (value) => {
    history.push(`/stocks/${value.symbol}`)
  };


  const loadOptions = async () => {
    let res = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchTerm}&apikey=${apiKey}`)
    let options = await res.json()
    let optionsArr = options.bestMatches.map(option => {
      return { symbol: option['1. symbol'], name: option['2. name'] }
    })
    console.log('this is optionsArr', optionsArr)
    return optionsArr
  }

  return (

    <AsyncSelect
      cacheOptions
      placeholder='Search Stocks...'
      value={selectedValue}
      getOptionLabel={e => `${e.symbol}: ${e.name}`}
      getOptionValue={e => e.symbol}
      loadOptions={loadOptions}
      onInputChange={handleInputChange}
      onChange={handleChange}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          width: '30vw',
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          color: 'black',
          backgroundColor: state.isFocused ? 'var(--gray-200)' : 'white',
        }),
      }}
    />

  );
}

export default AsyncSearch;