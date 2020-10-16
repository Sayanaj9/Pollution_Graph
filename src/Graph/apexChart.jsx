import React, { Component } from "react";
import Chart from "react-apexcharts";
import "./apexChart.css";
import "react-datepicker/dist/react-datepicker.css";
import "./apexChart.css";
import Options from "./Options";

class ApexChart extends Component {
 
    state = {
      options: {
        chart: {
          id: "basic-bar",
        },
        xaxis:{
           type: "datetime",
       
          showDuplicates: false,
          title: {
            text: "date",
            align: 'right',
            offsetX: 0,
            offsetY: 0,
            style: {
                color: undefined,
                fontSize: '12px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 600,
                cssClass: 'apexcharts-xaxis-title',
            },
            
        },
        },
        yaxis:{
         
          title: {
            text: "values",
            offsetX: 0,
            offsetY: 0,
            style: {
                color: undefined,
                fontSize: '12px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 600,
                cssClass: 'apexcharts-xaxis-title',
            },
        },
        },
        title: {
          text: "Pollution depiction graph",
          align: 'center',
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize:  '14px',
            fontWeight:  'bold',
            fontFamily:  undefined,
            color:  '#263238'
          },
      }
        
      },
      series:[],
     

   
      spinner:false,
      noData:false
    
    };


handleData=(data)=>{
 
          if(data.length===0)
          {
            this.setState({noData:true,series:[]})
          }
          else{
            this.setState({series:data,spinner:false,noData:false})
          }
         
}


handleSpinner=(data)=>{
  this.setState({spinner:data})
}


render() {
    return (
    
  <div className="graph">
     
      <div className="app">
        {this.state.noData&&<span>No Data Found!!</span>}
      {this.state.spinner&&!this.state.noData&&<span className="loader">Loading...</span>}
        <div className="row">
          
          <div className="mixed-chart">
            
            <Chart
              options={this.state.options}
              series={this.state.series&&this.state.series}
              type="line"
              width="850"
            />
          </div>
        </div>
      </div>
     

      <div className="options">

        <Options handleData={this.handleData} keySelected={this.state.key} spinner={this.handleSpinner}/>
      </div>
     
      </div>
        

    );
  }
}

export default ApexChart;












      