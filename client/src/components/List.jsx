import React from 'react';
import { Link } from '@reach/router'
import { orderBy } from "lodash";


const List = (props) => {

    const { result, recordDelete } = props;

    //variable object for sorting. Passing in RESULT:
    const state = {
        collection: result,
        sortParams: {
            direction: undefined
        }
    };

    //sorting direction
    //toggle "asc"/"desc" values based on needs
    const sortDirection = state.direction === "asc" ? "desc" : "asc";
        const sortedCollection = orderBy(
            state.collection,
            ["type"],
            [sortDirection]
        );

        return(
        <div>
            <h1>Pet Shelter</h1>
            <Link to="/new">add a pet to a shelter!</Link>
            <br /><br /><br />
            <h5>These pets are looking for a good home:</h5>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Actions Available</th>
                    </tr>
                </thead>

                {sortedCollection.map((element) => {
                    return (
                        <tbody>
                            <tr>
                                <td>{element.name}</td>
                                <td>{element.type}</td>
                                <td>
                                    {/* <button className="btn btn-primary m-1 px-3"
                                        onClick={(e) => recordDelete(element._id)}>Delete
                                    </button> */}
                                    <Link to={`/pet/${element._id}`}>
                                        <button type="button" className="btn btn-primary m-1 px-3" >Details
                                        </button>
                                    </Link>
                                    <Link to={`/${element._id}/edit`}>
                                        <button type="button" className="btn btn-primary m-1 px-3" 
                                        onClick={(e) =>{ 
                                        props.setName(element.name);
                                        props.setType(element.type);
                                        props.setDescription(element.description);
                                        props.setSkillOne(element.skills[0]);
                                        props.setSkillTwo(element.skills[1]);
                                        props.setSkillThree(element.skills[2]);
                                        }}>Edit
                                        </button>
                                    </Link>
                                    
                                    
                                </td>
                            </tr>
                        </tbody>
                    )
                })}
            </table>
        </div>



    );
}


export default List;



//"result.map" one liner for reference:
// <>{result.map((element) => {return (<><p>{element.name}</p></>)})}</>