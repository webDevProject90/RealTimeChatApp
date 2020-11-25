import React, {useState} from 'react';
import Datepicker from 'react-datepicker';
import { Multiselect } from 'multiselect-react-dropdown';

import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Join.css';

const Join = () => {

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const[selectedDate, setSelectedDate] = useState(new Date());

    const[selectedValue, setSelectedValue] = useState([]);

    const ItemList = [{value: 'Fig', id : 1},
                    {value : 'Dates', id : 2},
                    {value : 'Grapes', id : 3},
                    {value : 'Apple', id : 4},
                    {value : 'Banana', id : 5},
                    {value : 'Pomogranate', id : 6},
                    {value : 'Orange', id : 7}];

     const handleNumberChange = (event) => {
      const regExp = /^[0-9\b]+$/; 
      const value = event.target.value; 
        if (value === '' || regExp.test(value)) {  
           setNumber(value);
        }  
    }

    const handleSelectedItems = (event) => {
      setSelectedValue(Array.isArray(event) ? event.map(x => x.value) : []);      
    }

    const navigateData = (event) => {
       const nameElement = document.getElementById('name');
       const numberElement = document.getElementById('number');
       const selectElement = document.getElementById('multiselectContainerReact');  
       if(nameElement.value.length>0 && numberElement.value.length === 10 && selectElement.innerText.length> 0){
          document.getElementsByClassName('errorMsg')[0].setAttribute("style", "display : none;");
          window.open('\chat');
       }else{
          document.getElementsByClassName('errorMsg')[0].setAttribute("style", "display: block;");  
      }
    }     

    return (

    <div className="outerContainer">  
         <div className = "innerContainer">
         <h1 className= "headingText">Happy Shopping</h1>
           <input placeholder="Customer Name" className="userName" id="name" name="name" type="text" value= {name} onChange= {(event) => setName(event.target.value)}/>
           <input placeholder="Contact Number" className="contactNumber mt-20" id="number" maxLength="10" name="number" value={number} type="tel" onChange={handleNumberChange}/>
           <Multiselect options={ItemList} displayValue ="value" className="mt-20" value={selectedValue} onChange={handleSelectedItems} clearable/>
           <Datepicker placeholderText="Expeced Delivery Date" className= "expectedDate mt-20" selected={selectedDate} onChange={(date) => setSelectedDate(date)} minDate={new Date()} dateFormat='dd/MM/yyyy'/>
            <button className="button mt-20" type="submit" onClick={navigateData}>Submit</button> 
           <div class="errorMsg">Enter Details Correctly</div>
       </div>    
    </div>
    
    ) 
}

export default Join;