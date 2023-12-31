import React,{useState,useEffect}from 'react';
import axios from 'axios'
import Container from './components/Container';
import './App.css';

function App() {
  const [Data,setData]=useState([]);
  const [pageIndex,setPageIndex]=useState(1);

  const GenerateStartDate= ()=>{
    let date= new Date();
    date.setDate(date.getDate() - 30);
    let month = (date.getMonth()+1).toString();
    let day = date.getDate().toString();
    if(day.length<2)
    day="0"+day;
    if(month.length<2)
    month="0"+month;
    const stringDate=date.getFullYear()+"-"+month+"-"+day;
    return stringDate;
  }

  const Paginate = ()=>{
    setPageIndex(pageIndex+1)
  }

  const fetchData= async ()=>{
    const startdate=GenerateStartDate();
    const API_REQUEST=(` https://api.github.com/search/repositories?q=created:>${startdate}&sort=stars&order=desc`);
    const {data}= await axios.get(API_REQUEST);
    setData([...Data,...data.items]);
  }

  useEffect(() => {
    fetchData();
  },);
  
  return (
    <Container onPageChange={Paginate} repositories={Data} className="App"/>
  );
}

export default App;
