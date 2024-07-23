'use client'

import applicationForm from '../data/job-applicant.json'
import CustomFormBuilder from "./CustomFormBuilder"

export default function FormDemo() {
  const formFieldsArray = Object.values(applicationForm.fields).map(field => ({ ...field }))
  
  return (
    <div className="flex-row grid-container grid grid-cols-5 gap-8">
      {/* Right column - Sample JSON */}
      <div className="flex flex-col col-span-2 justify-items-start justify-between text-sm">
        <h3 className="font-semibold">
          Form definition
        </h3>
        <div className="flex border border-gray-300 pb-6 px-4 p-2 rounded-xl  bg-gray-200">
          <pre className="font-mono text-xs whitespace-pre-wrap overflow-hidden"> 
            { applicationForm && JSON.stringify(applicationForm, null, 2) }
          </pre>
        </div>
      </div>
      
      {/* Right column - Form */}
      <div className="flex flex-col col-span-3 justify-items-start bg-gray-200">
        <CustomFormBuilder
          formTitle={ applicationForm.title }
          formFields={ formFieldsArray } 
        />
      </div>
    </div>)
  }