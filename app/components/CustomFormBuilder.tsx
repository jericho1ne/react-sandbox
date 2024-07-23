'use client'

import { useState } from "react"
import type { FormEvent } from "react"

type FieldType = 'plaintext' | 'phone' | 'date' | 'email' | 'number'

interface FieldConfig {
  id: string
  key?: string
  title: string
  type: FieldType
  required?: boolean
  placeholder?: string
}

interface FormField {
  [key: string]: FieldConfig; // Index signature for dynamic field names
}

export default function CustomFormBuilder(props: any) {
  const [formData, setFormData] = useState({});
  
  const fields: FormField[] = props.formFields
  const formTitle: string = props.formTitle
  
  const handleInput = (e: FormEvent) => {
    
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    })
    
    console.log(formData)
  }

  return (
    <div className="space-y-10 p-4">
      <h2 className="font-semibold">{ formTitle }</h2>

      <form id="" className="">
        <div className="flex flex-col">
          {/* Build out the form inputs */}
          { fields && fields.map((field) => (
            <label 
              className="flex flex-col mb-4" 
              key={ field.id }
            >
              <span className="text-gray-600 text-sm mb-2">
                { field.title }
              </span>
              <input 
                className="border-slate-700 rounded-sm p-2"
                key={field.id}
                name={field.id} 
                type={field.type} 
                placeholder={field.placeholder} 
                required={field.required}
                onChange={handleInput}
              />
            </label>
          )) }
        </div>
        <input 
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold mt-4 py-2 px-4 border border-gray-400 rounded shadow" 
          type="submit" value="Submit" 
        />
      </form>
    </div>
  )
}