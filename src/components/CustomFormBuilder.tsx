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
  [key: string]: FieldConfig  
}

interface DisplayedOutput {
  [key: string]: any
}

export default function CustomFormBuilder(props: any) {
  const [formData, setFormData] = useState({})
  
  // State of form, updated on each Submit action
  const [displayedOutput, setDisplayedOutput] = useState<DisplayedOutput>({})
  
  const fields: FormField[] = props.formFields
  const formTitle: string = props.formTitle
  
  const handleInput = (e: FormEvent) => {
    setFormData({ 
      ...formData, 
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value,
    })
  }
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    setDisplayedOutput(formData)
  }
  
  const showFormOutput = () => {
    return (
      <div className="text-xs">
        { Object.keys(displayedOutput).map((key, index) => (
          <div key={index}>
            <span className="font-semibold">{ key }</span>: { displayedOutput[key] as string }
          </div>
        )) }
      </div>
    )
  }

  return (
    <div className="space-y-10 p-4">
      <h2 className="font-semibold">{ formTitle }</h2>

      <form id="" className="" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          {/* Build out the form inputs */}
          { fields && fields.map((field: any) => (
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
      
      {displayedOutput && 
        <div>
          <code className="">
            { showFormOutput() }
          </code>
        </div>
      }
        
      {/* TODO: Display Form errors on submit */}
     
    </div>
  )
}