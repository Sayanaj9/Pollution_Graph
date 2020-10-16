import axios from "axios";

const getCities=()=>
{
    return axios.get('https://api.openaq.org/v1/cities?limit=10000')
        .then(response =>response?.data)
}

const getGraphData=(country,city,startdate,enddate)=>{
    return axios.get(`https://api.openaq.org/v1/measurements?country=${country}&city=${city}&date_from=${startdate}&date_to=${enddate}&limit=10000`)
    .then(response =>response?.data)
}

export default{
    getCities,
    getGraphData
}
