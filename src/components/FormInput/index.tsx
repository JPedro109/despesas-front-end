import React from 'react';

import FormInputStyle from './styles';

type FormInputTypes = {
  formValues: any,
  setFormValues: (attributes: any) => void,
  type: string,
  placeholder: string,
  name: string
  min?: string;
  autoComplete?: string;
}

export const FormInput = ({ formValues, setFormValues, type, placeholder, name, min, autoComplete }: FormInputTypes) => {

    const handleInputChange = (e: any) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    };
  
    return (
      <>
        <div>
          <FormInputStyle 
            type={type}
            placeholder={placeholder} 
            name={name} 
            onChange={handleInputChange} 
            value={formValues[name] || ""}
            min={min || ""}
            autoComplete={autoComplete || ""}
          />
        </div>
      </>
  );
};