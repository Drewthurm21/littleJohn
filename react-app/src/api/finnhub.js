


export const fetchCompanyProfile = async (ticker, apiKey) => {
  console.log('inside fetchCompanyOverview', ticker, apiKey)
  let response = await fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${apiKey}`, { json: true })
  console.log('response', response)

  if (response.ok) {
    let profileData = await response.json()
    console.log('res okay - profileData', profileData)
    return (profileData)
  }
}