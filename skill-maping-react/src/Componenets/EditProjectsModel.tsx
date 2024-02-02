import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import '../App.css'
import axios from 'axios';
interface EditProjectsModelProps {
  userId: number;
  onEdit: (editedData: any) => void;
}

const EditProjectsModel: React.FC<EditProjectsModelProps> = (props) => {

  const [editedData, setEditedData] = useState<any>({
    project_name: '',
    description: '',
    skill_id: '',
    client_id: '',
  });

  interface Iskill {
    id: number,
    name: string
  }

  interface Iclient {
    id: number,
    name: string,
  }

  const [skill, setSkill] = useState<[]>([]);
  const [client, setClient] = useState<[]>([]);
  const [loadingSkill, setLoadingSkill] = useState<boolean>(true);
  const [loadingClient, setLoadingClient] = useState<boolean>(true);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = async () => {
    try {
       
      await axios.put(`${process.env.REACT_APP_BASE_URL}/update-project/${props.userId}`, editedData);
      props.onEdit(editedData);
      toast.success('Client updated successfully.');
      setEditedData({
        project_name: '',
        description: '',
        skill_id: '',
        client_id: '',
      })
    } catch (error) {
      toast.error('An error occurred while updating the client.');
      setEditedData({
        project_name: '',
        description: '',
        skill_id: '',
        client_id: '',
      })
    }
  };

  const handelSkillchange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditedData((prevData: any) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handelClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditedData((prevData: any) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (loadingSkill) {
      axios.get(`${process.env.REACT_APP_BASE_URL}/get-all-skill`)
        .then((response) => {
          setSkill(response.data[0]);
        })
        .catch((error) => {
          toast.error(error.response?.data?.error || 'An error occurred.');
        })
        .finally(() => setLoadingSkill(false));
    }
  }, [loadingSkill]);


  useEffect(() => {
    if (loadingClient) {
      axios.get(`${process.env.REACT_APP_BASE_URL}/get-all-client`)
        .then((response) => {
          setClient(response.data[0]);
        })
        .catch((error) => {
          toast.error(error.response?.data?.error || 'An error occurred.');
        })
        .finally(() => setLoadingClient(false));
    }
  }, [loadingClient]);

  const handeleResetFieldData = () => {
    setEditedData({
      project_name: '',
      description: '',
      skill_id: '',
      client_id: '',
    })
  }

  return (
    <>
      <div>
        <button type="button" className="btn fas fa-edit" onClick={handeleResetFieldData} data-bs-toggle="modal" data-bs-target="#editClient">
        </button>
      </div>
      <div className="modal fade py-5" id="editClient">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-body">
              <div className="card">
                <div className='card-header backgroundColor'>
                  <h5>Update Client</h5>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="col-5">
                      <label htmlFor="projectName">Project Name</label>
                      <input
                        className="form-control"
                        id="projectName"
                        name="project_name"
                        value={editedData.project_name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-5">
                      <label htmlFor="description">Description</label>
                      <input
                        className="form-control"
                        id="description"
                        name="description"
                        value={editedData.description}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-between my-3">
                    <div className="col-4">
                      <span>Skill Name</span>
                      <select className="form-select"
                        name='skill_id'
                        onChange={(e) => handelSkillchange(e)}
                        value={editedData.skill_id}                         >
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
                    <div className="col-4">
                      <span>Client Name</span>
                      <select className="form-select"
                        name='client_id'
                        onChange={(e) => handelClientChange(e)}
                        value={editedData.client_id}                         >
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
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn cancelButton" onClick={handeleResetFieldData} data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn backgroundColor" onClick={handleEdit} data-bs-dismiss="modal">
                update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProjectsModel;
