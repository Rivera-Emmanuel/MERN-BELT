import React, { useEffect, useState } from 'react';
import { Link, navigate } from '@reach/router'
import axios from 'axios';

const Edit = (props) => {

    console.log("pet name:", props.name, "type", props.type);


    const [result, setResult] = useState([]);
    const [errors, setErrors] = useState("");


    useEffect(() => {
        axios.get(`http://localhost:8000/api/pets/${props.id}`)
            .then(response => setResult(response.data))
            .catch(err => {
                console.log(err)
                setErrors("API connection error.")
            });


    }, []);

    const formHandler = (e) => {

        setErrors("");

        e.preventDefault();

        if (!errors){
        props.skillOne ? props.skills.push(props.skillOne) : props.skills.push(null)
        props.skillTwo ? props.skills.push(props.skillTwo) : props.skills.push(null)
        props.skillThree ? props.skills.push(props.skillThree) : props.skills.push(null) 
        }
        

        axios.put(`http://localhost:8000/api/pets/update/${props.id}`,
            {
                name: props.name,
                type: props.type.toUpperCase(),
                description: props.description,
                skills:  props.skills

            })
            .then(response => {
                console.log(response)
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

    return (
        <>

            <h1>Pet Shelter</h1>
            <Link to="/">Home</Link>
            <br /><br /><br />
            <h5>Edit this pet:</h5>
            {
                errors ?
                    errors.map((err, index) => <p style={{ backgroundColor: "red" }} key={index}>{err}</p>) :
                    null
            }
            <form onSubmit={formHandler} className="form-group" >

                <label htmlFor="name">Name</label>
                <input 
                    placeholder={result.name}
                    value={props.name}
                    className="form-control" type="text" name="name"
                    onChange={(e) => props.setName(e.target.value)} />

                <label htmlFor="type">Pet Type</label>
                <input
                    placeholder={result.type}
                    value={props.type}
                    className="form-control"
                    type="text" name="type"
                    onChange={(e) => props.setType(e.target.value)} />

                <label htmlFor="description">Pet Description</label>
                <input className="form-control"
                    type="text" name="description"
                    placeholder={result.description}
                    value={props.description}
                    onChange={(e) => props.setDescription(e.target.value)} />

                <label htmlFor="skills">Skill 1:</label>
                <input className="form-control"
                    type="text" name="skills"
                    value={props.skillOne}
                    onChange={(e) => props.setSkillOne(e.target.value)} />

                <label htmlFor="skills">Skill 2:</label>
                <input className="form-control"
                    type="text" name="skills"
                    value={props.skillTwo}
                    onChange={(e) => props.setSkillTwo(e.target.value)} />

                <label htmlFor="skills">Skill 3:</label>
                <input className="form-control"
                    type="text" name="skills"
                    value={props.skillThree}
                    onChange={(e) => props.setSkillThree(e.target.value)} />

                <input className="btn btn-primary mt-3 px-3" type="submit" value="Edit Pet" />
            </form>

            <Link to="/dashboard">
                <button type="button" className="btn btn-primary mt-3 px-3">
                    Cancel
                </button>
            </Link>
        </>
    );
}


export default Edit;