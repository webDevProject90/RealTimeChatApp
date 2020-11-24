import React, {useState} from 'react';
import {useForm} from 'react-hook-form';

import './Join.css';
import Datepicker from 'react-datepicker';
import { Multiselect } from 'multiselect-react-dropdown';
import { Link, useLocation } from 'react-router-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { withRouter, useHistory, useNavigate} from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';

const Join = () => {

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const[selectedItems, setSelectedItems] = useState([]);
    const[newArray, setArray] = useState([]);
    const[selectedDate, setSelectedDate] = useState(null);

    const {register, handleSubmit} = useForm();

    let history = useHistory();

    const itemList = [{value: 'Fig', id : 1},
                    {value : 'Dates', id : 2},
                    {value : 'Grapes', id : 3},
                    {value : 'Apple', id : 4},
                    {value : 'Banana', id : 5},
                    {value : 'Pomogranate', id : 6},
                    {value : 'Orange', id : 7}]
     
     const [options] = useState(itemList);

     const [inputValues, setInputValues] = useState({
        name : '',
        number : '',
        itemList : '',
        expectedDate : ''
     });

     const changeHandler = (event) => {
       setInputValues({...inputValues, [event.target.name] : event.target.value})
     }

     const handleChange = (selectedItems) => {
       setSelectedItems(newArray.concat(selectedItems));
       }

    const navigateData = () => {   
    const navigate = useNavigate();
    navigate('/chat',{state:{name:{name},number:{number}}});
    }
      

    return (

    <div className="outerContainer">  
         <div className = "innerContainer">
         <h1 className= "headingText">Happy Shopping</h1>
           <input placeholder="Customer Name" className="userName" id="name" name="name" type="text" onChange= {(event) => setName(event.target.value)}/>
           <input placeholder="Contact Number" className="contactNumber mt-20" id="number" name="number" type="tel" onChange={changeHandler}/>
           <Multiselect options={options} displayValue ="value" className="mt-20" value={selectedItems} onChange={(event) => {handleChange(event.target.value)}}/>
           <Datepicker placeholderText="Expeced Delivery Date" className= "expectedDate mt-20" clearable selected={selectedDate} onChange={(date) => setSelectedDate(date)} minDate={new Date()} dateFormat='dd/MM/yyyy'/>
          {/* <Link to={'/chat?name=abc&name=890'}> */}
           <button className="button mt-20" type="submit" onClick={navigateData}>Submit</button>    
           {/* </Link> */}
       </div>    
    </div>
    
    ) 
}

export default Join;