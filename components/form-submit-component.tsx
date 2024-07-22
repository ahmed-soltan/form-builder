"use client";
import { HiCursorClick } from "react-icons/hi";
import { FormElementInstance, FormElementType } from "./form/form-elements";
import { Button } from "./ui/button";
import { useCallback, useRef, useState, useTransition } from "react";
import { toast } from "./ui/use-toast";
import { ImSpinner } from "react-icons/im";
import axios from "axios";

interface FormSubmitComponentProps {
  formUrl: string;
  content: FormElementInstance[];
}
const FormSubmitComponent = ({
  formUrl,
  content,
}: FormSubmitComponentProps) => {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [renderKey, setRenderKey] = useState(new Date().getTime());
  const [submit, setSubmit] = useState(false);
  const [pending, startTransition] = useTransition();
  const validateForm: () => boolean = useCallback(() => {
    for (const field of content) {
      const actualValue = formValues.current[field.id] || "";
      const isValid = FormElementType[field.type].validate(field, actualValue);

      if (!isValid) {
        formErrors.current[field.id] = true;
      }
    }

    if (Object.keys(formErrors.current).length > 0) {
      return false;
    }

    return true;
  }, [content]);

  const submitValue = (key: string, value: string) => {
    formValues.current[key] = value;
  };
  const onSubmit = async () => {
    formErrors.current = {};
    const validForm = validateForm();

    if (!validForm) {
      setRenderKey(new Date().getTime());
      toast({
        title: "Error",
        variant: "destructive",
        description: "Please fill out all required fields.",
      });
    }
    
    try {

      const jsonContent = JSON.stringify(formValues.current);
      await axios.post(`/api/submit/${formUrl}` , {content: jsonContent})
      setSubmit(true);
      toast({
        title: "Form Submitted",
        variant: "success",
        description: "Your form has been submitted successfully",
      });
      
    } catch (error) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "something went wrong",
      });
    }
    
  };


  if(submit){
    return (
      <div className="flex justify-center w-full h-full items-center p-8">
        <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background overflow-y-auto p-8 w-full shadow-md shadow-blue-700 rounded border border-slate-800">
            <h1 className="text-3xl font-bold">Form Submitted</h1>
            <p className="text-sm text-slate-600 dark:text-slate-500">Thank you for your submission. You Can Close This Page Now</p>
        </div>
      </div>
    )
  }
  return (
    <div className="flex justify-center w-full h-full items-center p-8">
      <div
        key={renderKey}
        className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background
       overflow-y-auto p-8 w-full shadow-md shadow-blue-700 rounded border border-slate-800"
      >
        {content.map((element) => {
          const FormComponent = FormElementType[element.type].formComponent;
          return (
            <FormComponent
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
              isInvalid={formErrors.current[element.id]}
              defaultValue={formValues.current[element.id]}
            />
          );
        })}
        {!pending && (
          <>
            <Button className="mt-8" onClick={()=>{
              startTransition(onSubmit)
            }}>
              <HiCursorClick className="w-4 h-4 mr-2" />
              Submit
            </Button>
          </>
        )}

        {pending && <ImSpinner className={"animate-spin"} />}
      </div>
    </div>
  );
};

export default FormSubmitComponent;
