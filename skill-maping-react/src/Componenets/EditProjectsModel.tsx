import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import '../App.css'
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
interface EditProjectsModelProps {
  userId: number;
  initialUserInformation: {
    client_name: string;
    project_name: string;
    skill_name: number;
    description: string;
};
  onEdit: (editedData: any) => void;
}

const EditProjectsModel: React.FC<EditProjectsModelProps> = (props) => {
  const [show, setShow] = useState(false);
  const handleEditIcon = () => {
    setShow(true)
  }

  const handleClose = () => {
    setShow(false)
  }

  const [editeProject, setediteProject] = useState<any>({
    project_name: props.initialUserInformation.project_name,
    description: props.initialUserInformation.description,
    skill_id: props.initialUserInformation.skill_name,
    client_id: props.initialUserInformation.client_name,
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
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setediteProject((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_BASE_URL}/update-project/${props.userId}`, editeProject);
      props.onEdit(editeProject);
      setediteProject({
        project_name: '',
        description: '',
        skill_id: '',
        client_id: '',
      })
    } catch (error) {
      toast.error('An error occurred while updating the projects.');
      setediteProject({
        project_name: '',
        description: '',
        skill_id: '',
        client_id: '',
      })
    }
  };

  const handelSkillchange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setediteProject((prevData: any) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handelClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setediteProject((prevData: any) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/get-all-skill`)
      .then((response) => {
        setSkill(response.data[0]);
      })
      .catch((error) => {
        toast.error(error.response?.data?.error || 'An error occurred.');
      })

  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/get-all-client`)
      .then((response) => {
        setClient(response.data[0]);
      })
      .catch((error) => {
        toast.error(error.response?.data?.error || 'An error occurred.');
      })
  }, []);

  return (
    <>
      <div>
        <button type="button" className="btn fas fa-edit" onClick={handleEditIcon} >
        </button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className='backgroundColor' closeButton>
          <Modal.Title>Edit Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-between">
            <Form.Group className="col-5">
              <Form.Label htmlFor="projectName">Project Name</Form.Label>
              <Form.Control
                type="text"
                id="projectName"
                name="project_name"
                value={editeProject.project_name}
                onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>}
              />
            </Form.Group>
            <Form.Group className="col-5">
              <Form.Label htmlFor="description">Description</Form.Label>
              <Form.Control
                type="text"
                id="description"
                name="description"
                value={editeProject.description}
                onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>}
              />
            </Form.Group>
          </div>
          <div className="d-flex justify-content-between my-3">
            <Form.Group className="col-4">
              <Form.Label>Skill Name</Form.Label>
              <Form.Select
                name="skill_id"
                onChange={handelSkillchange}
                value={editeProject.skill_id}
              >
                <option>Select Skill...</option>
                {skill && skill.length > 0
                  ? skill.map((item: Iskill) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))
                  : <option>No data</option>}
              </Form.Select>
            </Form.Group>
            <Form.Group className="col-4">
              <Form.Label>Client Name</Form.Label>
              <Form.Select
                name="client_id"
                onChange={handelClientChange}
                value={editeProject.client_id}
              >
                <option>Select Client...</option>
                {client && client.length > 0
                  ? client.map((item: Iclient) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))
                  : <option>No data</option>}
              </Form.Select>
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className='btn cancelButton' onClick={handleClose}> Close</button>
          <button className='btn backgroundColor' onClick={handleEdit}>Update</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditProjectsModel;
