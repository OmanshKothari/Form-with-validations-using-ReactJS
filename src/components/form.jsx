
import React, { Component } from 'react';

const regularExpression = RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);

const formValid = ({formErrors, ...rest}) => {
    let valid = true;

    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false)
    });
    Object.values(rest).forEach(val => {
        val.length === null && (valid = false)
    });
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
            formErrors: {
                name: '',
                email: '',
                phone: '',
                age: ''
            }
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
        console.log("name: ", name);
        console.log("value", value);
        let formErrors = this.state.formErrors;
        switch(name){
            case 'name':
                formErrors.name = value.length < 3 ? "Minimum 3 characters required*" : '';
                break;
            case 'email':
                formErrors.name = regularExpression.test(value) ? "" : 'Invalid Email*';
                break;
            case 'phone':
                formErrors.phone = value.length > 0 && value.length !== 10 ? "Phone number should be 10 characters*" : '';
                break;
            case 'dob':
                let ageValue = this.handleAge(value);
                console.log("Age is : ", ageValue);
                formErrors.age = ageValue < 18 ? "Minimum age should be 18*" : '';
                break;
            default:
                break;
        }

        this.setState({formErrors: formErrors});
    }
    
    handleSubmit = e => {
        
        e.preventDefault();

        if(formValid(this.state)){
            // Add user to local storage
            console.log(`
            Name: ${this.state.name} 
            Email: ${this.state.email}
            Phone: ${this.state.phone}
            Date of Birth: ${this.state.dob}
            Age: ${this.state.age}`);
        }
        else{
            console.log("Error in form");
        }
    };

    render() { 
        return (
            <div className='container'>
                <div className='card mt-5'>
                    <form onSubmit={this.handleSubmit} className='card-body'>
                        <div className='form-group mb-3'>
                            <label className="mb-2" htmlFor="name">
                                <strong>Name</strong>
                            </label>
                            <input className="form-control" type="text" noValidate name="name" id="name" placeholder='Enter your Name' onChange={this.handleChange}/>
                            {this.state.formErrors.name.length > 0 && (<span>{this.state.formErrors.name}</span>)}
                        </div>
                        <div className='form-group mb-3'>
                            <label className="mb-2" htmlFor="email">
                                <strong>Email</strong>
                            </label>
                            <input className="form-control" type="email" noValidate name="email" id="email" placeholder='Enter your Email' onChange={this.handleChange}/>
                            {this.state.formErrors.email.length > 0 && (<span>{this.state.formErrors.email}</span>)}
                        </div>
                        <div className='form-group mb-3'>
                            <label className="mb-2" htmlFor="phone">
                                <strong>Phone</strong>
                            </label>
                            <input className="form-control" type="text" noValidate  name="phone" id="phone" placeholder='Enter your Phone Number' onChange={this.handleChange}/>
                            {this.state.formErrors.phone.length > 0 && (<span>{this.state.formErrors.phone}</span>)}
                        </div>
                        <div className='form-group mb-3'>
                            <label className="mb-2" htmlFor="dob">
                                <strong>Date of birth</strong>
                            </label>
                            <input className="form-control" type="date" noValidate name="dob" id="dob" onChange={this.handleChange}/>
                            <span>Age : {this.state.age}</span>
                            {this.state.formErrors.age.length > 0 && (<span>{this.state.formErrors.age}</span>)}
                        </div>
                        <div className="d-grid mt-3">
                            <button className="btn btn-block btn-primary" type="submit">Regitser</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
 
export default Form;