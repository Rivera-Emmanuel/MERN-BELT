import React, { useEffect, useState } from 'react';
import { Link } from '@reach/router'
import axios from 'axios';

const Show = (props) => {

    const { recordDelete } = props;

    const [result, setResult] = useState([]);
    const [error, setError] = useState("");



    useEffect(() => {
        axios.get(`http://localhost:8000/api/pets/${props.id}`)
            .then(response => setResult(response.data))
            .catch(err => {
                console.log(err)
                setError("API connection error.")
            });
    }, []);


    


    console.log(result);


    return (

        <div>

            <div>
                <br />
                <button onClick={(e) => recordDelete(result._id)}>Adopt {result.name}</button>
            </div>
            <div>
                <h1>Pet Shelter</h1>
                <Link to="/">Home</Link>
                <br /><br /><br />
                <h5>Details about: {result.name}</h5>
                <br /><br />

                <h6>Pet type: {result.type}</h6>
                <h6>Description: {result.description}</h6>
                <h6>Skills:
                <br /><br />
                    {
                        result.skills ?
                            result.skills.map(txt => <p>{txt}</p>) :
                            null
                    }

                </h6>

                {/* <Link to={`/${result._id}/edit`}>Edit</Link> */}

            </div>

            {/* <div>
                <br />
                <button onClick={(e) => recordDelete(result._id)}>Delete</button>
            </div> */}

        </div>
    );
}


export default Show;