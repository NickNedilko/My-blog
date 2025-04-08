import { Button, Spinner } from "flowbite-react"
import { FormProvider, useForm } from "react-hook-form"
import { FormInput } from "./form-input"
import { Title } from "./title";
import { useAuthStore } from "../../store/auth-store";
import { useRef } from "react";


export const DashbordProfile = () => {
    const { user } = useAuthStore();
    if (!user) {
        return null;
      }
    const inputFileRef = useRef<HTMLInputElement>(null);
    
    const form = useForm({
            mode: 'onChange',
            // resolver: zodResolver(registerSchema),
        defaultValues: {
            avatarUrl: `${user.avatarUrl}`,
            userName: `${user.userName}`,
            email: `${user.email}`,
            password: 'password'    
            }
    });
      const { formState } = form;
    const { isDirty } = formState;
  return (
      <div className="max-w-lg mx-auto p-4 w-full text-center">
          <Title text='Profile' size="xl" />
                   <FormProvider {...form}>
        <form className='flex flex-col gap-5 w-[350px] md:w-[450px] justify-center mt-5' onSubmit={()=>{    }} >
                  <div className="w-40 h-40 self-center">
                      <img onClick={()=>inputFileRef.current?.click()}  className="w-full h-full rounded-full object-cover border-8 border-[lightgray] cursor-pointer" src={user.avatarUrl} alt="User avatar" />
                  </div>
                 
            <FormInput ref={inputFileRef} name='userName'  placeholder='name'  type='file' required className="hidden" />     
            <FormInput name='userName'  placeholder='name'  type='text' required />
            <FormInput name='email'  placeholder='example@company.com' type='email' required />
            <FormInput name='password'  placeholder='password' type='password' required />
                <Button type='submit' disabled={!isDirty} className='w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50 hover:opacity-100' >
                {(status === "pending") ? (
                  <>
                    <Spinner size="sm" />
                    <span className='ml-4'>Loading...</span>
                  </>
                ) : 'Update'}
              </Button>
            </form>
  </FormProvider>
        </div>
   
  )
}
