import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
interface DeleteProjectsModelProps {
    userId: number; 
    onDelete:any;
 }
     const DeleteProjectsModel: React.FC<DeleteProjectsModelProps> = (props) => {
      const handleDelete = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_BASE_URL}/delete-project/${props.userId}`);
            toast.success('Client deleted successfully.');
            props.onDelete(props.userId);
        } catch (error) {
            toast.error('An error occurred while deleting the client.');
        }
    };
    
  return (
    <>
    <div>
      <button type="button" className="btn fas fa-trash-alt" data-bs-toggle="modal" data-bs-target="#deleteModel">
      </button>
    </div>
    <div className="modal fade" id="deleteModel">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header backgroundColor">
              <h5 className="modal-title" id="deleteModelLabel">Delete Client</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Are you sure want to Delete ?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn cancelButton" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn backgroundColor" onClick={handleDelete} data-bs-dismiss="modal">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DeleteProjectsModel
