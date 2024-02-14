import { useEffect, useState } from "react"
import AddClient from "./AddClient"
import AddSkill from "./AddSkill"
import axios from "axios"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DraftEditor from "./DraftEditor";
const Projects = () => {

    interface Iskill {
        id: number;
        name: string;
    }

    interface Iclient {
        id: number;
        name: string;
    }

    interface IprojectInformation {
        project_name: string,
        description: string,
        status: boolean,
        skill_id: number;
        client_id: number;
        registration_id: number;
    }
    
    const [draftEditorContent, setDraftEditorContent] = useState<{ [key: string]: string }>({});
    const [skill, setSkill] = useState<Iskill[]>([]);
    const [client, setClient] = useState<Iclient[]>([]);
    const [statusValue, setStatusValue] = useState<boolean>();
    const navigate = useNavigate();

    const [projectInformation, setProjectInformation] = useState<IprojectInformation>({
        project_name: "",
        description: "",
        status: false,
        skill_id: 0,
        client_id: 0,
        registration_id: 4
    });
              

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/get-all-skill`)
            .then((response) => {
                setSkill(response.data[0])
            })
            .catch((error) => {
                if (error) {
                    toast.error(error.response?.data?.error || 'An error occurred.');
                }
            },)
    }, [skill])


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/get-all-client`)
            .then((response) => {
                setClient(response.data[0])
            })
            .catch((error) => {
                if (error) {
                    toast.error(error.response?.data?.error || 'An error occurred.');
                }
            })
    }, [client])
     
    const draft_editor_content = JSON.stringify(draftEditorContent);

    const handleSubmit = async () => {
        const payload = {
            ...projectInformation,
            draft_editor_content
          };
        
        await axios.post(`${process.env.REACT_APP_BASE_URL}/add-projects`, payload)
            .then((response) => {
                if (response)
                    toast.success(response.data.message)
            })
            .catch((error) => {
                if (error)
                    toast.error("Error is occure while adding project")
            });

        setProjectInformation({
            project_name: "",
            description: "",
            status: false,
            skill_id: 0,
            client_id: 0,
            registration_id: 0
        })
        setDraftEditorContent({});
    }

    const handleInputChange = (fieldName: string, value: any) => {
        setProjectInformation({
            ...projectInformation,
            [fieldName]: value,
        });
    };

    const handelSkillchange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProjectInformation((prevData: any) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handelClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProjectInformation((prevData: any) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };
    const handleStatusChange = (e: any) => {
        const statusValue = e.target.value;
        setStatusValue(statusValue)
        setProjectInformation({
            ...projectInformation,
            status: statusValue
        });
    }

    const updateSkills = (newSkills: any) => {
        setSkill(skill);
        toast.success(newSkills.data.message)
    };

    const storedRegisterId = localStorage.getItem('registerid');
    const registerId = storedRegisterId !== null ? parseInt(storedRegisterId, 10) : 0;
    const handleClearInforamtaion = () => {
        setProjectInformation({
            project_name: "",
            description: "",
            status: false,
            skill_id: 0,
            client_id: 0,
            registration_id: registerId
        })
       setDraftEditorContent({})
        navigate("/listOfProjects")
    }

    const updateClient = (newClient: any) => {
        setClient(newClient.data.client);
        toast.success(newClient.data.message);
    }

    const handleEditorContentChange = (name: string, content: string) => {
        setDraftEditorContent(prevState => ({
          ...prevState,
          [name]: content
        }));
      };

    
    return (
        <>
            <div className="card">
                <div className="card-header">
                    <div className="d-flex justify-content-end">
                        <div>
                            <button type="submit" className="btn saveButton mx-1" onClick={handleSubmit} >Save</button>
                        </div>
                        <div>
                            <button className="btn cancelButton" onClick={handleClearInforamtaion}>Cancel</button>
                        </div>
                    </div>
                </div>
                <div className="card-body p-4 m-2s">
                    <div className="d-flex justify-content-between">
                        <div className="col-5">
                            <label htmlFor="projectName">Project Name</label>
                            <input className="form-control" id="projectName" name="project_name" onChange={(e) => handleInputChange("project_name", e.target.value)} value={projectInformation.project_name} >
                            </input>
                        </div>
                        <div className="col-4 px-4">
                            <label htmlFor="description">Description</label>
                            <input className="form-control" id="description" name="description" onChange={(e) => handleInputChange("description", e.target.value)} value={projectInformation.description}>
                            </input>
                        </div>
                        <div className="col-2">
                            <span>Status</span>
                            <select className="form-select"
                                onChange={handleStatusChange}>
                                <option value="1">Active</option>
                                <option value="0">Not Active</option>
                            </select>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between my-3">
                        <div className="col-4">
                            <span >Skill Name</span>
                            <select className="form-select"
                                name="skill_id"
                                onChange={(e) => handelSkillchange(e)}
                                value={projectInformation.skill_id}>
                                <option selected>Select Skill...</option>
                                {
                                    skill && skill.length > 0 ?
                                        skill.map((item: Iskill) => (
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        )) :
                                        <option>No data</option>
                                }
                            </select>
                        </div>
                        <div className="align-self-end">
                            <AddSkill onUpdateSkills={updateSkills} />
                        </div>
                        <div className="col-5">
                            <span >Client Name</span>
                            <select className="form-select"
                                name='client_id'
                                onChange={(e) => handelClientChange(e)}
                                value={projectInformation.client_id}>
                                <option selected>Select Client...</option>
                                {
                                    client && client.length > 0 ?
                                        client.map((item: Iclient) => (
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        )) :
                                        <option>No data</option>
                                }
                            </select>
                        </div>
                        <div className="align-self-end ">
                            <AddClient onUpdateClient={updateClient} />
                        </div>
                    </div>
                </div>
                <div className="p-2">
                    <div className='card'>
                        <div className='d-flex justify-content-center'>
                            <div className="p-2">
                                <DraftEditor name="Domain" onEditorContentChange={handleEditorContentChange} />
                            </div>
                            <div className="p-2">
                                <DraftEditor name="Business Problem" onEditorContentChange={handleEditorContentChange} />
                            </div>
                            <div className="p-2">
                                <DraftEditor name="Solution" onEditorContentChange={handleEditorContentChange} />
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <div className="p-2">
                                <DraftEditor name="Tech Stack" onEditorContentChange={handleEditorContentChange}/>
                            </div>
                            <div className="p-2">
                                <DraftEditor name="Design" onEditorContentChange={handleEditorContentChange}/>
                            </div>
                            <div className="p-2">
                                <DraftEditor name="Solution Highlites" onEditorContentChange={handleEditorContentChange}/>
                            </div>
                        </div>
                        <div className="p-2 col-4">
                            <DraftEditor name="Business import" onEditorContentChange={handleEditorContentChange}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Projects

