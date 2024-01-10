import React, { useState } from 'react'
const Registration = () => {
    interface registrationInformation {  
        firstname: String,
        lastname: String,
        phone: String,
        email: String,
        password:String
    } 
    const [registrationInfromation, setRegistrationInfromation] = useState<registrationInformation>({
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        password:""   
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {         
    setRegistrationInfromation({
        ...registrationInfromation,
        [e.target.name] : e.target.value 
    })
     console.log("registrationInfromation",registrationInfromation)
    }
    return (
        <>
           <div className='container col-md-4 col-sm-8 col-12 m-3 p-3 mx-auto p-5'>
                <div className='card'>
                    <form>
                        <div className='card-header text-center'>
                            <h4>Registration</h4>
                        </div> 
                        <div className='card-body'>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="firstname">First Name</label>
                                <input type="email" id="firstname" name="firstname" className="form-control" onChange={handleChange}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="lastname">Last Name</label>
                                <input type="password" id="lastname" name="lastname" className="form-control"  onChange={handleChange}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="phone">Phone No</label>
                                <input type="phone" id="phone" name="phone" className="form-control"  onChange={handleChange}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" className="form-control"  onChange={handleChange}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="password">Password</label>
                                <input type="email" id="password" name="email" className="form-control"  onChange={handleChange}/>
                            </div>
                            <div className="mb-3">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="check" />
                                    <label className="form-check-label" htmlFor="check">Accept All Term And Condition?</label>
                                </div>
                            </div>
                            <button type="button" className="btn btn-primary btn-block mb-3">Register</button>
                            <p className="text-center">Already Register Sign in ? <a href="/">Sign in</a></p>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}
export default Registration
