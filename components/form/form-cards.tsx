import { getForms } from "@/actions/getForms"
import FormCard from "./form-card";

const FormCards = async() => {
  const forms = await getForms();

  console.log(forms)
  return (
    <>
        {forms.map(form =>(
            <FormCard key={form.id} form={form}/>
        ))}
    </>
  )
}

export default FormCards