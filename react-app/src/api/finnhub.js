


export const fetchCompanyProfile = async (ticker, apiKey) => {
  let response = await fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${apiKey}`, { json: true })

  if (response.ok) {
    let profileData = await response.json()
    return (profileData)
  }
}

export const searchCompanyTickers = async (searchTerm, apiKey) => {
  let response = await fetch(`https://finnhub.io/api/v1/search?q=${searchTerm}&token=${apiKey}`, { json: true })

  if (response.ok) {
    let searchResults = await response.json()
    return (searchResults)
  }
}