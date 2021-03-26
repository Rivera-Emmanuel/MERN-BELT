import React, { useEffect, useState } from 'react';
import { Link, navigate } from '@reach/router'
import axios from 'axios';

const Create = (props) => {

    const [errors, setErrors] = useState("");

    const [result, setResult] = useState([]);
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");


    const [skillOne, setSkillOne] = useState();
    const [skillTwo, setSkillTwo] = useState();
    const [skillThree, setSkillThree] = useState();
    const [skills, setSkills] = useState([]);



    const formHandler = (e) => {
        e.preventDefault();

        skillOne ? skills.push(skillOne) : skills.push(null)
        skillTwo ? skills.push(skillTwo) : skills.push(null)
        skillThree ? skills.push(skillThree) : skills.push(null)

        axios.post("http://localhost:8000/api/pets/new",
            {
                name: name,
                type: type.toUpperCase(),
                description: description,
                skills: skills

            })
            .then(response => {
                console.log(response);
                navigate("/");
                window.location.reload();
            })
            .catch(err => {
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
            });


    };

    console.log("Error", errors);

    return (
        <div>

            <h1>Pet Shelter</h1>
            <Link to="/">back to home</Link>
            <br /><br /><br />
            <h5>Know a pet needing a home?</h5>
            {
                errors ?
                    errors.map((err, index) => <p style={{ backgroundColor: "red" }} key={index}>{err}</p>) :
                    null
            }
            <form onSubmit={formHandler} className="form-group" >
                <label htmlFor="name">Pet Name</label>
                <input className="form-control"
                    type="text" name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />

                <label htmlFor="type">Pet Type</label>
                <input className="form-control"
                    type="text" name="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)} />

                <label htmlFor="description">Pet Description</label>
                <input className="form-control"
                    type="text" name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} />

                <label htmlFor="skills">Skill 1:</label>
                <input className="form-control"
                    type="text" name="skills"
                    // value={skills[0]}
                    onChange={(e) => setSkillOne(e.target.value)} />

                <label htmlFor="skills">Skill 2:</label>
                <input className="form-control"
                    type="text" name="skills"
                    // value={skills[1]}
                    onChange={(e) => setSkillTwo(e.target.value)} />

                <label htmlFor="skills">Skill 3:</label>
                <input className="form-control"
                    type="text" name="skills"
                    // value={skills[1]}
                    onChange={(e) => setSkillThree(e.target.value)} />

                <input className="btn btn-primary mt-3 px-3" type="submit" value="Add Pet" />
            </form>

        </div>
    );
}

export default Create;