import axios from 'axios'
import React from 'react'

const getSessions = async () => {
  const url = 'https://retailer.rnd.riskgratis.com/api/pos/session'
  const token = await axios.get(
    'https://retailer.rnd.riskgratis.com/api/auth/token?login=admin&password=P@55Word&db=retailer.rnd.riskgratis.com'
  )
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token.data.result.access_token}`,
  }

  const response = await axios.get(url, { headers })
  return response.data.result
}

export default getSessions
