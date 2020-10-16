import React,{useState,useEffect} from "react";
import {Form,Button,} from "react-bootstrap";
import DatePicker from "react-datepicker";
import graphServices from "./duck/graphServices";
import * as moment from 'moment'
import "./apexChart.css";
import "./options.css";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

function Options(props) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [cities, setCityData] = useState();
    const [country, setCountryData] = useState();
    const [selectedCity, setSelectedCity] = useState();


    useEffect(()=>{
        graphServices.getCities().then(response => setCityData(response?.results))
    },[])

    function handleChange(e){
        
        console.log(e.value,e.label);
          setCountryData(e.value);
          setSelectedCity(e.label)
    }


function handleSave(e)
{
    let no2=[];
    let pm10=[];
    let pm25=[];
    let so2=[];
    let o3=[];
    let co=[];
    let bc=[];
    let dataseries=[];
    let noData=false;
    e.preventDefault();
    if(selectedCity!==undefined&&startDate)
    {
        props.spinner(true);
        let startdate=moment(startDate).format("YYYY-MM-DD");
        let enddate=moment(endDate).format("YYYY-MM-DD");
           
            graphServices.getGraphData(country,selectedCity,startdate,enddate).then(res=>{
            if(res?.results?.length===0)
            {
                return noData=true;
            }  
            else{
                
            return res?.results?.filter((city)=>(city?.parameter==="pm25") ? pm25.push({x:Date.parse(city?.date?.utc),"y":city?.value}) :
                (city?.parameter==="pm10") ? pm10.push({x:Date.parse(city?.date?.utc),y:city?.value}) :
                (city?.parameter==="so2") ? so2.push({x:Date.parse(city?.date?.utc),y:city?.value}) :
                (city?.parameter==="no2") ? no2.push({x:Date.parse(city?.date?.utc),y:city?.value}) :
                (city?.parameter==="o3") ? o3.push({x:Date.parse(city?.date?.utc),y:city?.value}):
                (city?.parameter==="co") ? co.push({x:Date.parse(city?.date?.utc),y:city?.value}):
                (city?.parameter==="bc") ? bc.push({x:Date.parse(city?.date?.utc),y:city?.value}):'')
            }
           }).then(res=>{!noData&&dataseries.push({name:"pm25",data:pm25},{name:"pm10",data:pm10},{name:"no2",data:no2},{name:"so2",data:so2},{name:"o3",data:o3},{name:"co",data:co},{name:"bc",data:bc});
             props.handleData(dataseries)});
    }

   
}

return(

        <div>
             <Form>

                    <div>
                         <h4 className="heading">Select your City:</h4>
                        
                        <Dropdown options={cities?.map((city)=>({value:city?.country,label:city?.name}))}   onChange={handleChange} value={selectedCity} placeholder="Select an option" />;
                       
                    </div>
                    <div>
                        <h4 className="heading">Date-From:</h4>
                           <DatePicker
                                  selected={startDate}
                                  onChange={date => setStartDate(date)} 
                                  className="dateselection"
                                  maxDate={new Date()}
                                  dateFormat="yyyy/MM/dd"
                            /> 
                    </div>
                    <div>
                        <h4 className="heading">Date-To:</h4>
                           <DatePicker
                                  selected={endDate}
                                  onChange={date => setEndDate(date)} 
                                  className="dateselection"
                                  maxDate={new Date()}
                                  dateFormat="yyyy/MM/dd"
                            /> 
                    </div>
                    <div className="SaveButton">
                    <Button as="input" type="submit" value="Save"  className={selectedCity?"saveBtn":"cantSave"} onClick={handleSave} disabled={selectedCity?false:true}/>
                    </div>
                          
        </Form>
    </div>
)

}


export default Options;