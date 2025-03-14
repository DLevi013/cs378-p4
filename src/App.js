import './App.css';
// import { fetchWeatherApi } from 'openmeteo';
import axios from 'axios';
import React, {useEffect, useState} from 'react';


// import 'bootstrap/dist/css/bootstrap.min.css'; // This imports bootstrap css styles. You can use bootstrap or your own classes by using the className attribute in your elements.
{/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"></link> */}

{/* <link href="https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap" rel="stylesheet"></link> */}
// const link = document.createElement("link");
// link.href = "https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap";
// link.rel = "stylesheet";
// document.head.appendChild(link);
// {/* <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Sofia"></link> */}

// Menu data. An array of objects where each object represents a menu item. Each menu item has an id, title, description, image name, and price.
// You can use the image name to get the image from the images folder.
const menuItems = [
  {
    id: 1,
    title: 'Gyoza',
    description: 'Japanese dumplings',
    imageName: `${process.env.PUBLIC_URL}/images/gyoza.png`,
    price: 5.99,
  },
  {
    id: 2,
    title: 'Sushi',
    description: 'Japanese rice rolls',
    imageName: `${process.env.PUBLIC_URL}/images/sushi.png`,
    price: 6.99,
  },
  {
    id: 3,
    title: 'Ramen',
    description: 'Japanese noodle soup',
    imageName: `${process.env.PUBLIC_URL}/images/ramen.png`,
    price: 7.99,
  },
  {
    id: 4,
    title: 'Matcha Cake',
    description: 'Japanese green tea cake',
    imageName: `${process.env.PUBLIC_URL}/images/matcha-cake.png`,
    price: 4.99,
  },
  {
    id: 5,
    title: 'Mochi',
    description: 'Japanese rice cake',
    imageName: `${process.env.PUBLIC_URL}/images/mochi.png`,
    price: 3.99,
  },
  {
    id: 6,
    title: 'Yakitori',
    description: 'Japanese skewered chicken',
    imageName: `${process.env.PUBLIC_URL}/images/yakitori.png`,
    price: 2.99,
  },
  {
    id: 7,
    title: 'Takoyaki',
    description: 'Japanese octopus balls',
    imageName: `${process.env.PUBLIC_URL}/images/takoyaki.png`,
    price: 5.99,
  },
  {
    id: 8,
    title: 'Sashimi',
    description: 'Japanese raw fish',
    imageName: `${process.env.PUBLIC_URL}/images/sashimi.png`,
    price: 8.99,
  },
  {
    id: 9,
    title: 'Okonomiyaki',
    description: 'Japanese savory pancake',
    imageName: `${process.env.PUBLIC_URL}/images/okonomiyaki.png`,
    price: 6.99,
  },
  {
    id: 10,
    title: 'Katsu Curry',
    description: 'Japanese curry with fried pork',
    imageName: `${process.env.PUBLIC_URL}/images/katsu-curry.png`,
    price: 9.99,
  }
];

const allHeadingInfo = [
    {
      
      houseLogo: `${process.env.PUBLIC_URL}/images/houselogo.png`,
      details: 'Opened and Established in Texas',
      restaurant: 'Sushi House: Authentic Japanese Cuisine',
      title: 'Menu',

    }
];



function App() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);
  const [intLat, setIntLat] = useState(0);
  const [intLong, setIntLong] = useState(0);

  const fetchData =  async () => {

    var austin = document.getElementById("austin");
    var dallas = document.getElementById("dallas");
    var houston = document.getElementById("houston");
    var latRaw = document.getElementById("lat");
    var longRaw = document.getElementById("long");


    austin.addEventListener('click', function() {
      console.log('austin was clicked!');
      latRaw.value = "30.2672";
      longRaw.value = "-97.7431";
      setCount(count + 1);
      
    });

    dallas.addEventListener('click', function() {
      console.log('dallas was clicked!');
      latRaw.value = "32.7767";
      longRaw.value = "-96.7970";
      setCount(count + 1);

      
    });

    houston.addEventListener('click', function() {
      console.log('houston was clicked!');
      latRaw.value = "29.7601";
      longRaw.value = "-95.3701";
      setCount(count + 1);
      
    });

    console.log("count = " + count);
    if(count == 0){
      latRaw.value = "45.4404";
      longRaw.value = "12.3160";
    }

    setIntLat(parseInt(latRaw.value));
    setIntLong(parseInt(longRaw.value));

    if((intLong < -180 || intLong > 180) && (intLat < -90 || intLat > 90)){
      window.alert("Longitude and Longitude must be between -90 and 90")
      return;
    }

    if(intLat < -90 || intLat > 90){
      window.alert("Latitude must be between -90 and 90")
    }
    if(intLong < -180 || intLong > 180){
      window.alert("Longitude must be between -180 and 180")
    }

    
    console.log("intlat" + intLat);
    console.log("intlong" + intLong);
    

    setCount(count + 1);
    try {
      let response = await axios.get('https://api.open-meteo.com/v1/forecast', {
        params:{
          latitude: latRaw.value, 
          longitude: longRaw.value, 
          hourly: "temperature_2m",
          timezone: "America/Chicago",
          temperature_unit: "fahrenheit",
          forecast_hours: 24,
        }, 
      });

      var hourlyData = response.data.hourly;
      var timeAndTemp = hourlyData.time.map((time, index) => {
        var hour = parseInt(time.slice(11,16));
        console.log(hour);
        var finTime = time.slice(11, 16) + " AM";
        if( hour > 11){
            if(hour == 12){
              finTime = "12:00 " + "PM"
            }
            if(hour == 13){
              finTime = "1:00 " + "PM"
            }
            if(hour == 14){
              finTime = "2:00 " + "PM"
            }
            if(hour == 15){
              finTime = "3:00 " + "PM"
            }
            if(hour == 16){
              finTime = "4:00 " + "PM"
            }
            if(hour == 17){
              finTime = "5:00 " + "PM"
            }
            if(hour == 18){
              finTime = "6:00 " + "PM"
            }
            if(hour == 19){
              finTime = "7:00 " + "PM"
            }
            if(hour == 20){
              finTime = "8:00 " + "PM"
            }
            if(hour == 21){
              finTime = "9:00 " + "PM"
            }
            if(hour == 22){
              finTime = "10:00 " + "PM"
            }
            if(hour == 23){
              finTime = "11:00 " + "PM"
            }
        }



        return{
          time: finTime, 
          temperature: hourlyData.temperature_2m[index]
        };
        
      });


      setData(timeAndTemp.slice(0, 25));
      console.log(response.data); // Handle the data
    } catch (error) {
      console.error('Axios error:', error);
    }
  }


  useEffect(() => {
    fetchData();
  }, []);




  return (
    <div>
      <div class="locations">


        <button id = "austin" onClick={() => fetchData()}> Austin</button>
        <button id = "dallas" onClick={() => fetchData()}> Dallas</button>
        <button id = "houston" onClick={() => fetchData()}> Houston</button>
        <input type="text" id = "lat" placeholder="Enter Latitude:"></input>
        <input type="text" id = "long" placeholder="Enter Longitude:"></input>
        <button onClick={() => fetchData()}>Enter</button>



      </div>
        <div class = "timeandtemp">
          {data && (<p>{data.map((entry, index) => (
              <li key={index}>
                {entry.time}: {entry.temperature} F
              </li>))}</p>)}
        </div>
    </div>
  );
};

export default App;