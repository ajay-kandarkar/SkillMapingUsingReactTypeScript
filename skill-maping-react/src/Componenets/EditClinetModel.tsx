import { useEffect, useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify'
interface EditClientModelProps {
    userId: number;
    intialClientInformation :{
        name: string;
        location: string;
        country_name: string;
        domain_name: string;
    }
    onEdit: (editedData: any) => void;
}

const EditClinetModel: React.FC<EditClientModelProps> = (props) => {

    interface Icountry {
        id: number,
        name: string
    }

    interface Idomain {
        id: number,
        name: string
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [country, setCountry] = useState<Icountry[]>([]);
    const [domain, setDomain] = useState<Idomain[]>([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/get-country`)
            .then((response) => {
                console.log(response.data[0])
                setCountry(response.data[0])
            })
            .catch((error: any) => {
                console.log(error)
            })
    }, [])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/get-domain`)
            .then((response) => {
                setDomain(response.data[0])
            })
            .catch((error: any) => {
                console.log(error)
            })
       })

    const [editeClient, setediteCLient] = useState<any>({
        name: props.intialClientInformation.name,
        location: props.intialClientInformation.location,
        country_id: props.intialClientInformation.country_name,
        domain_id: props.intialClientInformation.domain_name,
    });

     const handleEdit = async () => {
        try {
            await axios.put(`${process.env.REACT_APP_BASE_URL}/update-client/${props.userId}`, editeClient);
            props.onEdit(editeClient);
            editeClient({
                name: '',
                location: '',
                country_id: '',
                domain_id: '',
            })
          .then((response : any)=>{
             toast.success(response.data.message)
          })
        } catch (error) {
            toast.error('An error occurred while updating the projects.');
            setediteCLient({
                name: '',
                location: '',
                country_id: '',
                domain_id: '',
            })
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setediteCLient((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handelCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setediteCLient((prevData: any) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }));
      };

      const handelDomainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setediteCLient((prevData: any) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }));
      };

    return (
        <>
            <div>
                <button type="button" className="btn fas fa-edit" onClick={handleShow} >
                </button>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header className='backgroundColor' closeButton>
                    <Modal.Title >Edit Client</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={editeClient.name}
                                onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type='text'
                                name="location"
                                value={editeClient.location}
                                onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>} />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Country</Form.Label>
                            <Form.Select
                                name="country_id"
                                onChange={handelCountryChange}
                                value={editeClient.country_id}
                            >
                                <option>Select  Country...</option>
                                 {country && country.length > 0
                                    ? country.map((item: Icountry) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))
                                    : <option>No data</option>}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                        <Form.Label>Domain</Form.Label>
                            <Form.Select
                                name="domain_id"
                                onChange={handelDomainChange}
                                value={editeClient.domain_id}
                            >
                                 <option>Select Domain...</option>
                                {domain && domain.length > 0
                                    ? domain.map((item: Idomain) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))
                                    : <option>No data</option>}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn cancelButton' onClick={handleClose}>
                        Cancel
                    </button>
                    <button className='btn backgroundColor' onClick={handleEdit}>
                        Update
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditClinetModel