import '../App.css'
import { useFormik } from 'formik';
import axios from "axios"
import { toast } from "react-toastify"
import ValidationSchema from './Validations/ValidationSchemaAddSkill';

const AddSkill = ({ onUpdateSkills } :any) => {
    const initialValues = {
        name: "",
        description: "",
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: ValidationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/add-skill`, {
                    name: values.name || "",
                    description: values.description || ""
                });
                resetForm();
                onUpdateSkills(response)
            } catch (error: any) {
                toast.error(error.response?.data?.error || 'An error occurred.');
            }
        },
    });
     
    return (
        <>
            <div>
                <button className="btn cancelButton my-4" data-bs-toggle="modal" onClick={() => formik.handleReset} data-bs-target="#addskill">Add Skill</button>
            </div>
            <div className="modal fade" id="addskill">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header backgroundColor">
                            <h5 className="modal-title" id="addskillModelLabel">Add Skill</h5>
                            <div>
                                <button type="button" className="btn-close " data-bs-dismiss="modal" aria-label="Close" onClick={() => formik.handleReset}></button>
                            </div>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name <span className='text-danger'>*</span></label>
                                    <input type="text" id="name"
                                        className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                                        name="name"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.name}
                                    />
                                    {formik.touched.name && formik.errors.name && (
                                        <div className="invalid-feedback">{formik.errors.name}</div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description <span className='text-danger'>*</span></label>
                                    <input type="text" id="description"
                                        name="description"
                                        className={`form-control ${formik.touched.description && formik.errors.description ? 'is-invalid' : ''}`}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.description}
                                    />
                                    {formik.touched.description && formik.errors.description && (
                                        <div className="invalid-feedback">{formik.errors.description}</div>
                                    )}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn cancelButton" data-bs-dismiss="modal" onClick={formik.handleReset}>Cancel</button>
                                    <button type="submit" className="btn backgroundColor" data-bs-dismiss="modal" onClick={() => formik.handleSubmit} disabled={!(formik.isValid && formik.dirty)}>Add Skill</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddSkill;
