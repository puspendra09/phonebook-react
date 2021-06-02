import './App.css';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { postAPI, fetchAPI } from './lib/api';
import axios from 'axios';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobileName] = useState('');
  const [alternative, setAlternative] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [allData, setAllData] = useState([]);

  useEffect(async () => {
    const temp = await fetchAPI("/phonebook");
    setAllData(temp);
    console.log("fghjkl", allData);
  }, [firstName]);

  const onSubmit = (event) => {
    console.log('sdfghjkl');
    // event.preventDefault();

    const data = {
      firstName: firstName,
      lastName: lastName,
      mobileNumber: mobile,
      alternativeNumber: alternative,
      emailId: email,
      address: address
    }

    postAPI("/phonebook", data);
    setFirstName('');
    setLastName('');
    setMobileName('');
    setAddress('');
    setAlternative('');
    setEmail('');
  }

  const reset = () => {
    setFirstName('');
    setLastName('');
    setMobileName('');
    setAddress('');
    setAlternative('');
    setEmail('');
  }

  const edit = async (id) => {
    const data = {
      firstName: firstName,
      lastName: lastName,
      mobileNumber: mobile,
      alternativeNumber: alternative,
      emailId: email,
      address: address
    }
    axios.put(`http://localhost:8081/phonebook/${id}`)
      .then(res => {
        console.log(res);
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setMobileName(res.data.mobileNumber);
        setAddress(res.data.address);
        setAlternative(res.data.alternativeNumber);
        setEmail(res.data.emailId);
  })}

  const onDelete = async (id) => {
      console.log(id);

      axios.delete(`http://localhost:8081/phonebook/${id}`)
        .then(res => {
          console.log(res);
        })
    }

    return (
      <div className="App">
        <h1>Phonebook</h1>
        <form onSubmit={onSubmit}>
          <TextField
            id="standard-basic"
            label="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          /> &nbsp; &nbsp; &nbsp; &nbsp;

        <TextField
            id="standard-basic"
            label="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          /><br />

          <TextField id="standard-basic"
            label="Mobile No"
            onChange={(e) => setMobileName(e.target.value)}
            value={mobile}
          /> &nbsp; &nbsp; &nbsp; &nbsp;

        <TextField
            id="standard-basic"
            label="Alternative number"
            onChange={(e) => setAlternative(e.target.value)}
            value={alternative}
          /><br />

          <TextField
            id="standard-basic"
            label="Email ID"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          /> &nbsp; &nbsp; &nbsp; &nbsp;

        <TextField
            id="standard-basic"
            label="Address"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />

          <div style={{ marginTop: 30 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >Save
          </Button> &nbsp; &nbsp; &nbsp;

        <Button
              variant="contained"
              color="primary"
              type="reset"
              onClick={reset}
            >cancel
        </Button>
          </div>
        </form>

        <table style={{ marginLeft: "auto", marginRight: "auto", marginTop: 50, width: "90%", border: "1px solid black", borderCollapse: "collapse" }}>
          {
            allData.length > 0 &&
            <thead>
              <td style={{ border: "1px solid black" }}>S.No.</td>
              <td style={{ border: "1px solid black" }}>First Name</td>
              <td style={{ border: "1px solid black" }}>Last Name</td>
              <td style={{ border: "1px solid black" }}>Mobile Number</td>
              <td style={{ border: "1px solid black" }}>Alternative Number</td>
              <td style={{ border: "1px solid black" }}>Email ID</td>
              <td style={{ border: "1px solid black" }}>Address</td>
              <td style={{ border: "1px solid black" }}>Action</td>
            </thead>
          }

          {
            allData.length > 0 ? (
              allData.map((data, index) => (
                <tbody>
                  <td style={{ border: "1px solid black" }}>{index + 1}</td>
                  <td style={{ border: "1px solid black" }}>{data.firstName}</td>
                  <td style={{ border: "1px solid black" }}>{data.lastName}</td>
                  <td style={{ border: "1px solid black" }}>{data.mobileNumber}</td>
                  <td style={{ border: "1px solid black" }}>{data.alternativeNumber}</td>
                  <td style={{ border: "1px solid black" }}>{data.emailId}</td>
                  <td style={{ border: "1px solid black" }}>{data.address}</td>
                  <td style={{ border: "1px solid black" }}><Button onClick={() => edit(data._id)}>edit</Button><Button onClick={() => onDelete(data._id)}>delete</Button></td>
                </tbody>
              ))) :
              <td>No contact</td>
          }

        </table>
      </div>
    );
  }

  export default App;
