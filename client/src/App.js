import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Create from './components/Create';
import Show from './components/Show';
import List from './components/List';
import { navigate, Router } from '@reach/router';
import Edit from './components/Edit';



function App() {

  const [result, setResult] = useState([]);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [skillOne, setSkillOne] = useState();
  const [skillTwo, setSkillTwo] = useState();
  const [skillThree, setSkillThree] = useState();
  const [skills, setSkills] = useState([]);




  useEffect(() => {
    axios.get("http://localhost:8000/api/pets")
      .then(response => setResult(response.data))
      .catch(err => {
        console.log(err)
        setError("API connection error.")
      });
  }, []);

  console.log(result);


  const recordDelete = (e) => {

    axios.delete(`http://localhost:8000/api/pets/delete/${e}`)
      .then(response => console.log(response))
      .catch(err => {
        console.log("JSON Error:", err.response.data.errors);
        setError(err.response.data.errors);
      })

    navigate("/");
    window.location.reload();
  };


  return (
    <div className="App">

      <Router >

      </Router>

      <Router>
        <Create path="/new" />
        <Edit path="/:id/edit"
          name={name} setName={setName}
          type={type} setType={setType}
          description={description} setDescription={setDescription}
          skillOne={skillOne} setSkillOne={setSkillOne}
          skillTwo={skillTwo} setSkillTwo={setSkillTwo}
          skillThree={skillThree} setSkillThree={setSkillThree}
          skills={skills} setSkills={setSkills}
        />

        <Show path="/pet/:id"
          name={name} setName={setName}
          type={type} setType={setType}
          description={description} setDescription={setDescription}
          skillOne={skillOne} setSkillOne={setSkillOne}
          skillTwo={skillTwo} setSkillTwo={setSkillTwo}
          skillThree={skillThree} setSkillThree={setSkillThree}
          recordDelete={recordDelete}
          />
        <List primary={true}
          default result={result}
          recordDelete={recordDelete}
          setName={setName}
          type={type} setType={setType}
          description={description} setDescription={setDescription}
          skillOne={skillOne} setSkillOne={setSkillOne}
          skillTwo={skillTwo} setSkillTwo={setSkillTwo}
          skillThree={skillThree} setSkillThree={setSkillThree}
          skills={skills} setSkills={setSkills}
          />
      </Router>

    </div>
  );
}

export default App;
