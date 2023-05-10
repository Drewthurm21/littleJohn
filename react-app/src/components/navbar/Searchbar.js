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
    //create proper options array from fetch results
    let optionsArr = options.bestMatches.map(option => {
      return { symbol: option['1. symbol'], name: option['2. name'] }
    })  //filter out results from foriegn exchanges
      .filter(option => !option.symbol.includes('.'))
    console.log('this is optionsArr', optionsArr)
    return optionsArr
  }

  return (

    <AsyncSelect
      cacheOptions
      blurInputOnSelect
      placeholder='Search Stocks...'
      value={searchTerm}
      getOptionLabel={e => `${e.symbol}: ${e.name}`}
      getOptionValue={e => e.symbol}
      loadOptions={loadOptions}
      onInputChange={handleInputChange}
      onChange={handleChange}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          width: '30vw',
          border: '1px solid var(--gray-400)',
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