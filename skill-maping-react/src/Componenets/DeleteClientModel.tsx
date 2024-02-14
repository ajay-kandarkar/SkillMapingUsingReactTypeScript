import axios from 'axios';
import '../App.css'
import { useState } from 'react';
import { toast } from "react-toastify";
import Modal from 'react-bootstrap/Modal';
interface DeleteProjectsModelProps {
  userId: number;
  onDelete: any;
}
const DeleteClientModel: React.FC<DeleteProjectsModelProps> = (props) => {
  const [show, setShow] = useState(false);
  const [deleteID, setDeleteID] = useState<number>(props.userId);
  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/delete-client/${deleteID}`);
      toast.success('Client deleted successfully.');
      props.onDelete(deleteID);
      setShow(false)
    } catch (error) {
      toast.error('An error occurred while deleting the Client.');
      setShow(false)
    }
  };

  const handleDeleteIcon = () => {
    setShow(true)
    setDeleteID(props.userId)
  }

  const handleClose = () => {
    setShow(false)
  }

  return (
    <>
      <div>
        <button type="button" className="btn fas fa-trash-alt" onClick={handleDeleteIcon} >
        </button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className='backgroundColor' closeButton>
          <Modal.Title >Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to delete ?</Modal.Body>
        <Modal.Footer>
          <button className='btn cancelButton' onClick={handleClose}> Close</button>
          <button className="btn backgroundColor" onClick={handleDelete}>Delete</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeleteClientModel;
