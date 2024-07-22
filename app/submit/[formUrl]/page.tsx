import { getFormContentByUrl } from "@/actions/getFormContentByUrl"
import FormSubmitComponent from "@/components/form-submit-component"
import { FormElementInstance } from "@/components/form/form-elements"

const SubmitFormPage = async({params}:{params:{formUrl:string}}) => {

    const form = await getFormContentByUrl(params.formUrl)

    if(!form){
      throw new Error("Form Not Found")
    }

    const formContent = JSON.parse(form.content) as FormElementInstance[]


  return (
   <>
    <FormSubmitComponent formUrl={params.formUrl} content={formContent}/>
   </>
  )
}

export default SubmitFormPage