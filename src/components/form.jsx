
import React, { Component } from 'react';

const regularExpression = RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);
const regphone = RegExp(/^[0-9]*$/);

const formValid = ({formErrors, dob, email, name}) => {
    let valid = true;
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false)
    });
    name ===  null && (valid = false);
    email === null && (valid = false);
    dob === null && (valid = false);
    return valid;
}

class Form extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            name: null,
            email: null,
            phone: null,
            dob: null,
            age: null,
            users: [],
            formErrors: {
                name: '',
                email: '',
                phone: '',
                age: ''
            },
            errorMessage: ''
         } 
    }

    handleAge = (DOB) => {
        let dob = new Date(DOB);
        let month_diff = Date.now() - dob.getTime();
        let age_dt = new Date(month_diff);
        let year = age_dt.getUTCFullYear();
        this.setState({age: Math.abs(year - 1970)});
        return Math.abs(year - 1970);
    }

    handleChange = e => {
        e.preventDefault();

        const {name, value} = e.target;
        let formErrors = this.state.formErrors;
        switch(name){
            case 'name':
                formErrors.name = value.length < 3 ? "Minimum 3 characters required*" : '';
                break;
            case 'email':
                formErrors.email = regularExpression.test(value) ? "" : 'Invalid Email*';
                break;
            case 'phone':
                formErrors.phone = regphone.test(value) ? (value.length > 0 && value.length !== 10 ? "Phone number should be 10 characters*" : '') : "Phone number should not contain characters*";
                break;
            case 'dob':
                let ageValue = this.handleAge(value);
                formErrors.age = ageValue < 18 ? "Minimum age should be 18*" : '';
                break;
            default:
                break;
        }
        this.setState({[name]: value});
        this.setState({formErrors: formErrors});
    }
    
    handleSubmit = e => {
        
        e.preventDefault();

        if(formValid(this.state)){
            // Add user to local storage
            let {name, email, phone, dob, users} = this.state;
            let new_user = {
                name: name,
                email: email,
                phone: phone,
                dob: dob
            };
            users = users.concat(new_user);
            let errorMessage = '';
            this.setState({users, errorMessage});
            localStorage.setItem("users", JSON.stringify(users));
        }
        else{
            let errorMessage = "Please fill all inputs of the form!!";
            this.setState({errorMessage});
        }
    };

    render() { 
        return (
            <div className='container-sm col-md-6 text-center'>
                <div className='card mt-5'>
                    <h1 className='text-center m-3'>User Registration Form</h1>
                    {this.state.errorMessage.length > 0 && (<div className='alert alert-danger' role={'alert'}>{this.state.errorMessage}</div>)}
                    <form onSubmit={this.handleSubmit} className='card-body'>
                        <div className='form-group mb-3 row'>
                            <div className='col-md-4 text-center'>
                                <label className="mb-2" htmlFor="name">
                                    <strong>Name</strong>
                                </label>
                            </div>
                            <div className='col-md-8'>
                                <input className="form-control" type="text" noValidate name="name" id="name" placeholder='Enter your Name' onChange={this.handleChange}/>
                                <small>{this.state.formErrors.name.length > 0 && (<span className='text-danger'>{this.state.formErrors.name}</span>)}</small>
                            </div>
                        </div>
                        <div className='form-group mb-3 row'>
                            <div className='col-md-4 text-center'>
                                <label className="mb-2" htmlFor="email">
                                    <strong>Email</strong>
                                </label>
                            </div>
                            <div className='col-md-8'>
                                <input className="form-control" type="email" noValidate name="email" id="email" placeholder='Enter your Email' onChange={this.handleChange}/>
                                <small>{this.state.formErrors.email.length > 0 && (<span className='text-danger'>{this.state.formErrors.email}</span>)}</small>
                            </div>
                        </div>
                        <div className='form-group mb-3 row'>
                            <div className='col-md-4 text-center'>
                                <label className="mb-2" htmlFor="phone">
                                    <strong>Phone</strong>
                                </label>
                            </div>
                            <div className='col-md-8'>
                                <input className="form-control" type="text" noValidate  name="phone" id="phone" placeholder='Enter your Phone Number' onChange={this.handleChange}/>
                                <small>{this.state.formErrors.phone.length > 0 && (<span className='text-danger'>{this.state.formErrors.phone}</span>)}</small>
                            </div>
                        </div>
                        <div className='form-group mb-3 row'>
                            <div className='col-lg-8 col-md-auto'>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <label className="mb-2" htmlFor="dob">
                                            <strong>Date of birth</strong>
                                        </label>
                                    </div>
                                    <div className='col-md-6'>
                                    <input className="form-control mb-2" type="date" noValidate name="dob" id="dob" onChange={this.handleChange}/>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-auto'>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <label className='mb-2 col-md-6'><strong>Age</strong></label>
                                    </div>
                                    <div className='col-md-6'>
                                        <input className="form-control col-md-6 mb-2" readOnly type="text" name="age" value={this.state.age} />
                                    <small>{this.state.formErrors.age.length > 0 && (<span className='text-danger'>{this.state.formErrors.age}</span>)}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 text-center">
                            <button className="btn btn-block btn-primary" type="submit">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
 
export default Form;