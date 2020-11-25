import React, {useRef, useEffect} from 'react';
import {Form} from '@unform/web';
import {Scope} from '@unform/core';
import * as Yup from 'yup';
import './App.css';
import Input from './components/Form/Input';

const initialData = {
  email: 'hi@theycallmewolf.com',
  address: {
    city: 'London'
  }
}

function App() {

  const formRef = useRef(null);

  async function handleSubmit(data, {reset}) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .email('adicione um email válido')
          .required('email obrigatório'),
        address: Yup.object().shape({
          city: Yup.string()
            .min(3, 'no mínimo 3 caractéres')
            .required('cidade obrigatória')
        })
      })
      
      await schema.validate(data, {
        abortEarly: false,
      })

      console.log(formRef.current);

      formRef.current.setErrors({})
      
      reset();
    } catch(err) {
      if( err instanceof Yup.ValidationError) {
        console.log(err);

        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        })

        formRef.current.setErrors(errorMessages)
      }
    }
  }

  useEffect(() => {
    setTimeout(() =>{
      formRef.current.setData({
        name: 'Mr. Wolf',
        email: 'hi@wolf.com',
        address: {
          street: 'Baker St',
          city: 'London'
        }
      })
    }, 3000)
  }, [])

  return (
   <div className="App">
     <h1>Hello Wolf! 🐺🤟</h1>

     <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="name" />
        <Input type="email" name="email" />
        
        <Scope path="address">
          <Input name="street" />
          <Input name="neighbourhood" />
          <Input name="city" />
          <Input name="state" />
          <Input name="number" />
        </Scope>
        
        <button type="submit">entrar</button>
     </Form>
   </div>
  );
}

export default App;
