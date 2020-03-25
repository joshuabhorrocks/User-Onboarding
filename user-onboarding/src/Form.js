import React, {useState, useEffect}from "react";
import * as yup from "yup";
import axios from "axios";

const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    email: yup
    .string()
    .email()
    .required("Must include an email"),
    password: yup.string().required("Password is required"),
    terms: yup.boolean().oneOf([true], "Please agree to terms of use"),
});

export default function Form() {
    const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    terms: "",
    });

    const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    terms: "",
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [post, setPost] = useState([]);

    useEffect(() => {
    formSchema.isValid(formState).then(valid => {
        setButtonDisabled(!valid);
    });
    }, [formState]);

    const validateChange = event => {
    yup
        .reach(formSchema, event.target.name)
        .validate(event.target.value)
        .then(valid => {
        setErrors({
            ...errors,
            [event.target.name]: ""
        });
        })
        .catch(err => {
        setErrors({
            ...errors,
            [event.target.name]: err.errors[0]
        });
        });
    };
    
    const formSubmit = event => {
    event.preventDefault();
    axios
        .post("https://reqres.in/api/users", formState)
        .then(res => {
        setPost(res.data);
        console.log("success", post); 
        setFormState({
            name: "",
            email: "",
            password: "",
            terms: ""
        });
        })
        .catch(err => {
        console.log(err.res);
        });
    };

    const inputChange = event => {
    event.persist();
    const newFormData = {
        ...formState,
        [event.target.name]:
        event.target.type === "checkbox" ? event.target.checked : event.target.value
    };
    validateChange(event);
    setFormState(newFormData);
    };

    return (
    <form onSubmit={formSubmit}>
        <label htmlFor="name">
        Name
        <input
            id="name"
            type="text"
            name="name"
            value={formState.name}
            onChange={inputChange}
        />
        {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
        </label>
        <label htmlFor="email">
        Email
        <input
            id="email"
            type="text"
            name="email"
            value={formState.email}
            onChange={inputChange}
        />
        {errors.email.length > 0 ? (
            <p className="error"> {errors.email}</p>
        ) : null}
        </label>
        <label htmlFor="password">
            Password
            <input
            id="password"
            type="text"
            name="password"
            value={formState.password}
            onChange={inputChange}
        />
        </label>
        <label htmlFor="terms" className="terms">
        <input
            type="checkbox"
            name="terms"
            checked={formState.terms}
            onChange={inputChange}
        />
        Terms and Conditions
        </label>
        <pre>{JSON.stringify(post, null, 2)}</pre>
        <button disabled={buttonDisabled}>Submit</button>
    </form>
    );
}