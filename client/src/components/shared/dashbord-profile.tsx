import { Button, Spinner } from "flowbite-react"
import { FormProvider, useForm } from "react-hook-form"
import { FormInput } from "./form-input"
import { Title } from "./title";
import { useAuthStore } from "../../store/auth-store";
import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../../services/userApi";


export const DashbordProfile = () => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [cloudinaryUrl, setCloudinaryUrl] = useState<string | null>(null);
  console.log(cloudinaryUrl);
  const { user } = useAuthStore();

    if (!user) {
        return null;
      }
  const inputFileRef = useRef<HTMLInputElement>(null);
  
    const {mutate, status} = useMutation({
    mutationFn: updateUser,
      onSuccess: async (data) => {
        // @ts-ignore
        useAuthStore.getState().setUser(data);  
    }
  })
    const handleImageChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImageUrl(URL.createObjectURL(file));
          
        }
         onUpload(file as File);
        
    }
      const onUpload = async (file: File) => {
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'my_blog'); 
        try {
            const response = await fetch('https://api.cloudinary.com/v1_1/dxn291kfd/image/upload', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            if (result) {
                setCloudinaryUrl(result.secure_url)
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };
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
  
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = form.getValues();
    console.log(data);
    mutate({
      ...data,
      avatarUrl: cloudinaryUrl || user.avatarUrl,
      userName: data.userName,
      email: data.email,
      password: data.password
    });
  }
  return (
      <div className="max-w-lg mx-auto p-4 w-full text-center">
          <Title text='Profile' size="xl" />
                   <FormProvider {...form}>
        <form className='flex flex-col gap-5 w-[350px] md:w-[450px] justify-center mt-5' onSubmit={onSubmit} >
                  <div className="w-40 h-40 self-center">
                      <img
                          onClick={() => inputFileRef.current?.click()}
                          src={imageUrl || user.avatarUrl}
                          className="w-full h-full rounded-full object-cover border-8 border-[lightgray] cursor-pointer"
                          alt="User avatar" />
                  </div>
                 
            <FormInput ref={inputFileRef} onChange={handleImageChange} name='userName'  placeholder='name'  type='file'  required className="hidden" />     
            <FormInput name='userName'  placeholder='name'  type='text' required />
            <FormInput name='email'  placeholder='example@company.com' type='email' required />
            <FormInput name='password'  placeholder='password' type='password' required />
                <Button type='submit' disabled={!isDirty && cloudinaryUrl === null } className='w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50 hover:opacity-100' >
                {(status === "pending") ? (
                  <>
                    <Spinner size="sm" />
                    <span className='ml-4'>Loading...</span>
                  </>
                ) : 'Update'}
              </Button>
          <div className="flex justify-between mt-3">
              <span className="text-red-500 cursor-pointer">Delete Account</span>
              <span className="text-red-500 cursor-pointer">Sign Out</span>
          </div>
            </form>
          </FormProvider>
        </div>
   
  )
}
