import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export default function Details() {

  const [transactions, setTransactions] = useState(null);

  let { id } = useParams()
  console.log(id);

  async function getTrasactionsData() {
    let response = await axios.get(`https://omaroz.github.io/jobFair-json/transactions.json`)
    console.log(response.data);
    let data=response.data.transactions;
    data=data.filter((cdata)=>cdata.customer_id==id)
    console.log(data);
    setTransactions(data);
    await console.log(transactions);
    
  }




  useEffect( () => {
    getTrasactionsData();
  
  }
    , [])
  return <>
      <LineChart width={600} height={300} data={transactions} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
    <Line type="monotone" dataKey="amount" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip />
  </LineChart>
  </>



}
