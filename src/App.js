import React, {useEffect, useState} from 'react';

import './App.css';
import BirthdayCard from "./BirthdayCard";

function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function checkValidJsonStr(str) {
  return  isJson(str) && Array.isArray(JSON.parse(str)) && JSON.parse(str).every(it => it.hasOwnProperty('name') && it.hasOwnProperty('birthday'))
}

function App() {
  const [birthdays, changeBirthdays] = useState({});
  const [json, changeJson] = useState('[ { "name": "John Smith", "birthday": "11/11/2007" }, { "name": "Joe Smith", "birthday": "10/11/2007" }, { "name": "Bob Smith", "birthday": "09/11/2007" }, { "name": "Mike Smith", "birthday": "09/11/2005" }, { "name": "Mike Carlos", "birthday": "09/11/2005" }, { "name": "Bob Smith", "birthday": "09/11/2005" }, { "name": "John Carlos", "birthday": "09/11/2005" }, { "name": "Mike K", "birthday": "09/11/2005" }, { "name": "Bob K", "birthday": "09/11/2005" }, { "name": "Alice K", "birthday": "09/11/2005" }, { "name": "JS PHP", "birthday": "09/06/2005" }, { "name": "Random Name", "birthday": "09/06/2005" }, { "name": "Name Random", "birthday": "09/06/2005" } ]');
  const [isJsonValid, changeJsonValid] = useState(true);
  const [calYear, setCalYear] = useState('2007');
  const [calYearTemp, setCalYearTemp] = useState('2007');
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
  useEffect(() => {
    //check for validity of JSON, and save birthdays to state
    const isValidJsonStr = checkValidJsonStr(json);
    if (isValidJsonStr) {
      const userArr = JSON.parse(json);
      let birthdaysDup = {};
      userArr.forEach(user => {
        let userBday = new Date(user.birthday);
        userBday.setFullYear(calYear);
        let day = userBday.getDay();
        if (birthdaysDup.hasOwnProperty(day)) birthdaysDup[day].push(user.name);
        else birthdaysDup[day] = [user.name];
      });
      changeBirthdays({...birthdaysDup});
    }
    changeJsonValid(isValidJsonStr)
  }, [json, calYear]);
  return (
    <div className="App">
      <h1>Work Area</h1>
      <div className="cards">{weekDays.map((day, ind) => {
        return (<BirthdayCard key={ind} day={day} names={birthdays[ind]}/>)
      })}</div>
      <div className="input_parent">
        <div>
          <textarea value={json} rows="25" cols="75" onChange={e => changeJson(e.target.value)}/>
          {!isJsonValid && <div className="invalid">Invalid Json</div>}
        </div>
        <div className='input_year'>
          <label htmlFor="calyear">Year</label>
          <input id="calyear" value={calYearTemp} onChange={e => setCalYearTemp(e.target.value)} type="text"/>
          <button onClick={() => setCalYear(calYearTemp)}>Update</button>
        </div>
      </div>
    </div>
  );
}

export default App;
