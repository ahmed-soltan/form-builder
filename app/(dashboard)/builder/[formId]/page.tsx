import { getFormById } from '@/actions/getFormById'
import FormBuilder from '@/components/form/form-builder'
import React from 'react'

const BuilderPage = async({params}:{params:{formId:string}}) => {

    const form = await getFormById(params.formId)

    if(!form){
        throw new Error("Form Not Found")
    }

  return <FormBuilder form={form}/>
}

export default BuilderPage