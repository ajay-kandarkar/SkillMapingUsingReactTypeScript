import { useEffect, useState } from "react"
import axios from "axios"
import '../App.css';
export default function RegisterUserInformation() {
  interface IUser {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    isConfirmed: ""
  }
  const [order, setOrder] = useState("Asc");
  const [searchregister, setSearchRegister] = useState("");
  const [registerUser, setRegisterUser] = useState<IUser[]>([{
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    isConfirmed: ""
  }]);
  useEffect(() => {
   
    axios.get(`${process.env.REACT_APP_BASE_URL}/get-register-user`)
      .then((response) => {

        setRegisterUser(response.data[0]);
      })
      .catch((error) => {
        if (error) {
         
        }
      })
  }, [])

  const sorting = (registerCol: keyof IUser) => {
    const sortedData = [...registerUser].sort((a, b) =>
      order === 'Asc' ? (a[registerCol] > b[registerCol] ? 1 : -1) : (a[registerCol] < b[registerCol] ? 1 : -1)
    );
    setRegisterUser(sortedData);
    setOrder(order === 'Asc' ? 'Dsc' : 'Asc');
  };

  return (
    <div className="container">
      <div className='d-flex justify-content-end p-3'>
        <div className='input-group w-25'>
          <input className="form-control w-25" type="search" placeholder="Search" aria-label="Search"
            onChange={(e) => setSearchRegister(e.target.value)}></input>
          <button className="btn btn-success me-1" type="submit">Search</button>
        </div>
      </div>
      <table className="table table-hover  table-bordered">
        <thead>
          <tr>
            <th scope="col">Index
            </th>
            <th scope="col" onClick={() => sorting("firstName")}>First name
              {order === 'Asc' ? <i className="fas fa-sort-up App" ></i> : <i className="fas fa-sort-down App" ></i>}
            </th>
            <th scope="col" onClick={() => sorting("lastName")}>Last name
              {order === 'Asc' ? <i className="fas fa-sort-up App" ></i> : <i className="fas fa-sort-down App"></i>}
            </th>
            <th scope="col" onClick={() => sorting("lastName")}>Email
              {order === 'Asc' ? <i className="fas fa-sort-up App" ></i> : <i className="fas fa-sort-down App"></i>}
            </th>
            <th scope="col" onClick={() => sorting("lastName")}>Phone
              {order === 'Asc' ? <i className="fas fa-sort-up App" ></i> : <i className="fas fa-sort-down App" ></i>}
            </th>
            <th scope="col">Confirm Register</th>
          </tr>
        </thead>
        <tbody>
          {
            registerUser
              .filter((item) => {
                return searchregister === '' ? true : item.firstName.includes(searchregister);
              })
              .map((patient, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{patient.firstName}</td>
                  <td>{patient.lastName}</td>
                  <td>{patient.email}</td>
                  <td>{patient.phone}</td>
                  <td>{patient.isConfirmed}</td>
                </tr>
              ))
          }
        </tbody>
      </table>
    </div>
  )
}
