import React, { useState }  from 'react'
import { AgGridReact } from 'ag-grid-react';

import './App.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import Button from'@mui/material/Button';
import TextField from'@mui/material/TextField';
import Stack from'@mui/material/Stack';
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'



function App() {
  const [todo, setTodo] = useState({desc: '', date: '', priority: ''});
  const [todos, setTodos] = useState([]);

  const addTodo = (event) => {
    setTodos([...todos, todo]);
    setTodo({desc: '', date: '', priority: ''});
  }

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  } 

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2022-03-29T12:00:00")
  )

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const columns = [
    { field: 'desc', sortable: true, filter: true },
    { field: 'date', sortable: true, filter: true },
    { field: 'priority', sortable: true, filter: true },
  ]

  return (
    <div className="App">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
      <TextField
        label="Description"
        variant="standard"
        name="desc"
        value={todo.desc}
        onChange={inputChanged}/>
      
      <KeyboardDatePicker
        label="Date"
        variant="inline"
        format='dd-MM-yyy'
        name="date"
        value={selectedDate}
        onChange={date => handleDateChange(date)}/>

      <TextField
        label="Priority"
        name="priority" 
        variant="standard"
        value={todo.priority} 
        onChange={inputChanged}/>

      <Button onClick={addTodo} variant="contained">Add</Button>
      </Stack> 
      </MuiPickersUtilsProvider>
      <div className="ag-theme-material" style={{height: 400, width: 600, margin: 'auto'}}>
        <AgGridReact
          rowData={todos}
          columnDefs={columns}>
        </AgGridReact>
      </div>
    </div>
  );
}

export default App;
