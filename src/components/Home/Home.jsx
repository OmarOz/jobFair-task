import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Home() {
    const [customers, setCustomers] = useState(null);
    const [customerName, setCustomerName] = useState("");
    const [amount, setAmount] = useState("");
    const [transactions, settTransactions] = useState(null);
    const [allData, setAllData] = useState(null);

    let custdata = [];
    async function getData() {
        let response = await axios.get(`https://omaroz.github.io/jobFair-json/customers.json`)
        console.log(response.data);
        setCustomers(response.data.customers);
    }
    async function getTrasactionsData() {
        let response = await axios.get(`https://omaroz.github.io/jobFair-json/transactions.json`)
        console.log(response.data);
        settTransactions(response.data.transactions);
    }

    async function filterCustomer(e) {
       
        e.preventDefault();
        let response = await axios.get(`https://omaroz.github.io/jobFair-json/customers.json`)
        console.log(response.data);
        let data=response.data.customers;
        data=data.filter((cdata)=>cdata.name===customerName)
        console.log(data);
        setCustomers(data);

        // console.log(customerName)
    }
    async function filtertransaction(e) {
        e.preventDefault();
        let response = await axios.get(`https://omaroz.github.io/jobFair-json/transactions.json`)
        console.log(response.data);
        let data=response.data.transactions;
        data=data.filter((cdata)=>cdata.amount==amount)
        console.log(data);
        settTransactions(data);

        // console.log(customerName)
    }

    function setData() {

        customers.map(customer => {
            custdata.push({ id: customer.id, name: customer.name, transaction: [], date: [] });
        })
        for (let i = 0; i < custdata.length; i++) {
            let transData = [];
            let dateData = [];
            for (let j = 0; j < transactions.length; j++) {
                if (custdata[i].id == transactions[j].customer_id) {
                    transData.push(transactions[j].amount);
                    dateData.push(transactions[j].date);
                }
                custdata[i].transaction = transData;
                custdata[i].date = dateData;
            }

        }
        custdata = custdata.filter((cust) => cust.transaction.length > 0);
        console.log(custdata);
    }

    if (customers != null && transactions != null) {
        setData();
    }

    function reset() {
        getData();
        getTrasactionsData();
        setCustomerName("");
        setAmount("");
        console.log("reset");
    }
    useEffect(() => {
        getData();
        getTrasactionsData();
    }
        , [])

    return <>
        <div className="container flex sm:flex-col lg:flex-row justify-center items-center gap-32">


            <div className="relative overflow-x-auto rounded-lg drop-shadow-2xl">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Customer name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Trsnactions
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                details
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {custdata?.map(customer => <>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {customer.name}
                                </th>
                                <td className="px-6 py-4">
                                    {customer.transaction.map((trans => <>
                                        <div className='py-1'>{trans} EGP</div>
                                    </>))}
                                </td>
                                <td className="px-6 py-4">
                                    {customer.date.map((date => <>
                                        <div className='py-1'>{date}</div>
                                    </>))}
                                </td>
                                <td className="px-6 py-4">
                                    <Link to={`/details/${customer.id}`} >
                                        more details...
                                    </Link>
                                </td>

                            </tr>
                        </>)}

                    </tbody>
                </table>
            </div>

            <div className="filter flex flex-col justify-center items-center gap-14 p-9">
                <button type="button" onClick={() => reset()} class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">reset filter</button>
                <div className="customer-name flex flex-col justify-center items-center p-9 rounded-lg bg-gray-800 drop-shadow-2xl">
                    <form class="max-w-sm mx-auto" onSubmit={filterCustomer}>
                        <div class="mb-5">

                            <input type="text" id="customer" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Customer Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                        </div>
                        <button type="submit" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Submit</button>
                    </form>
                </div>
                <div className="transaction-amount flex flex-col justify-center items-center gap-14 p-9 rounded-lg bg-gray-800 drop-shadow-2xl">
                    <form class="max-w-sm mx-auto" onSubmit={filtertransaction}>
                        <div class="mb-5">

                            <input type="number" id="transaction" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="transaction amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                        </div>
                        <button type="submit" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Submit</button>
                    </form>
                </div>
            </div>

        </div>



    </>
}
