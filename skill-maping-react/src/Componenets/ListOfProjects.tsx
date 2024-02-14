import { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import axios from 'axios'
import '../App.css'
import { useNavigate } from 'react-router-dom';
import DeleteProjectsModel from './DeleteProjectsModel';
import EditProjectsModel from './EditProjectsModel';
const ListOfProjects = () => {
    interface ClientDetails {
        id: number,
        client_name: string;
        project_name: string;
        skill_name: number;
        description: string;
        draft_editor_content : string;
    }

    const [searchClient, setsearchClient] = useState("");
    const [clientDetails, setClientDetails] = useState<ClientDetails[]>([]);
    const [entries, setEntries] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/get-allProjects`)
            .then((response) => {
                console.log("Get all Project : ",response.data[0])
                setClientDetails(response.data[0]);
                setEntries(response.data[0].length);
            })
            .catch((error) => {
                if (error) {
                    toast.error(error.response?.data?.error || 'An error occurred.');
                }
            })
    }, [entries]);

    const handleDelete = async (userId: number) => {
        setClientDetails((prevDetails) => prevDetails.filter((user) => user.id !== userId));
        setEntries(entries - 1);
    };

    const handleEdit = async (editedData: any) => {
        const updatedClientDetails = clientDetails.map((user) =>
            user.id === editedData.userId ? { ...user, ...editedData } : user
        );
        setClientDetails(updatedClientDetails);
        window.location.reload();
    };
       
    return (
        <>
            <div className='card'>
                <div className='card-header'>
                    <h4><b>Project List</b></h4>
                </div>
                <div className='card-body'>
                    <div className="d-md-flex justify-content-between d-sm-block">
                        <div className="d-flex p-4">
                            <span className="m-2">Show</span>
                            <select className="form-select" >
                                <option value="1">{entries}</option>
                            </select>
                            <span className="m-2">Entries</span>
                        </div>
                        <div className="d-flex">
                            <label htmlFor="search" className="mx-3 my-auto">Search : </label>
                            <div>
                                <input type="text" className="form-control my-4" id="search" placeholder="Search"
                                    onChange={(e) => setsearchClient(e.target.value)} />
                            </div>
                            <button className="btn backgroundColor m-auto mx-2 " onClick={() => { navigate("/projects") }}>+ Add Project</button>
                        </div>
                    </div>
                    <div>
                        <table className="table">
                            <thead>
                                <tr className='backgroundColor'>
                                    <th scope="col">Name</th>
                                    <th scope="col">Client</th>
                                    <th scope="col">Skill</th>
                                    <th scope="col">Description</th>
                                    <th scope="col" className="px-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientDetails
                                    .filter((item) => {
                                        return searchClient === '' ? true : item.project_name.includes(searchClient);
                                    })
                                    .map((user, index) => (
                                        <tr key={index}>
                                            <td>{user.project_name}</td>
                                            <td>{user.client_name}</td>
                                            <td>{user.skill_name}</td>
                                            <td>{user.description}</td>
                                            <td className="d-flex">
                                                <div className="mx-3">
                                                    <EditProjectsModel userId={user.id}  initialUserInformation={user} onEdit={(editedData) => handleEdit(editedData)} />
                                                </div>
                                                <div>
                                                    <DeleteProjectsModel userId={user.id} onDelete={handleDelete} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListOfProjects


