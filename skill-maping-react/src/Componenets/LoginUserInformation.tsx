import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify";
export default function LoginUserInformation() {
  const [registerUser, setRegisterUser] = useState([{
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
        console.log(response.data[0])
      })
      .catch((error) => {
        if(error)
        {
           
        }
      })
  }, [])
  return (
    <div className="p-5">
      <table className="table table-success table-striped p-5">
        <thead>
          <tr>
            <th scope="col">index</th>
            <th scope="col">First name</th>
            <th scope="col">Last name</th>
            <th scope="col">email</th>
            <th scope="col">phone</th>
            <th scope="col">Confirm Register</th>
          </tr>
        </thead>
        <tbody>
          {
            registerUser.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.isConfirmed}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

