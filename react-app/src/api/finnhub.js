


export const fetchCompanyProfile = async (ticker, apiKey) => {
  let response = await fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${apiKey}`, { json: true })

  if (response.ok) {
    let profileData = await response.json()
    return (profileData)
  }
}