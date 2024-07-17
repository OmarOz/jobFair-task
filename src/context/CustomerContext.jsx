import { createContext, useEffect, useState } from "react";

export let CustomerContext = createContext();

export default function customerContextProvider(props){
    const[customers,setCustomers] = useState(null);
    const[customersData,setCustomersData] = useState(null);
    const[transactions,settTransactions] = useState(null);

    let custdata=[];
async function getData(){
    let response=await axios.get(`http://localhost:3000/customers`)
    console.log(response.data);
    setCustomers(response.data);
}
async function getTrasactionsData(){
    let response=await axios.get(`http://localhost:3000/transactions`)
    console.log(response.data);
    settTransactions(response.data);
}

function setData(){

customers.map(customer=>{
custdata.push({id: customer.id,name:customer.name, transaction: [], date: []});
})
for(let i=0;i<custdata.length;i++){
    let transData=[];
    let dateData=[];
    for(let j=0;j<transactions.length;j++){
        if(custdata[i].id==transactions[j].customer_id){
            transData.push(transactions[j].amount);
            dateData.push(transactions[j].date);
        }
        custdata[i].transaction=transData;
        custdata[i].date=dateData;
    }
}
    setCustomersData(custdata);
console.log(custdata);
}
getData();
getTrasactionsData();

if(customers!=null && transactions!=null){
    setData();
}
   

    return(
    <CustomerContext.Provider value={{setData,customers}}>
        {props.children}
    </CustomerContext.Provider>
    )
}