import { FormProvider, useForm } from 'react-hook-form'
import phoneImg from '../assets/phone-icon.png';

import { FormInput } from '../components/shared/form-input'
import { Button, Spinner } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/shared/logo';
import { useMutation } from '@tanstack/react-query';
import { signup } from '../services/authApi';
import { useAuthStore } from '../store/auth-store';
import { setAuthHeader } from '../lib/jwt';
import { OAuth } from '../components/shared/OAuth';


export default function SignUp() {
const {mutate, status} = useMutation({
    mutationFn: signup,
      onSuccess: async (data) => {
  console.log(data)
      const { token, ...user } = data;
        useAuthStore.getState().setToken(token as string);
        useAuthStore.getState().setUser(user);
        useAuthStore.getState().login(token as string);
        setAuthHeader(token as string);
        
    }
  })

const form = useForm({
        mode: 'onChange',
        // resolver: zodResolver(registerSchema),
        defaultValues: {
        userName: '',
        email: '',
        password: ''    
        }
});

  const onSubmit = () => {mutate(form.getValues());}
  
  return (
    <div className="min-h-screen mt-20 ">
      <div className="flex flex-col gap-5 p-3 items-center max-w-3xl w-[350px] mx-auto md:flex-row ">
        
        <div>
            <FormProvider {...form}>
        <form className='flex flex-col gap-3 w-[350px] md:w-[450px]' onSubmit={form.handleSubmit(onSubmit)} >
            <div className='flex flex-col justify-between items-center'>
             <Logo className='text-4xl'/>
                <div className='flex gap-2 items-center justify-center'>
            <p className='text-sm mt-5 text-center'>You can sign up with your email, username and password or with google</p>
                <img src={phoneImg} alt="phone-icon" width={60} height={60} />
                </div> 
            </div>
            <FormInput name='userName' label='UserName' placeholder='name'  type='text' required />
            <FormInput name='email' label='Email' placeholder='example@company.com' type='email' required />
            <FormInput name='password' label='Password' placeholder='password' type='password' required />
                <Button type='submit' className='w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50 hover:opacity-100' >
                {(status === "pending") ? (
                  <>
                    <Spinner size="sm" />
                    <span className='ml-4'>Loading...</span>
                  </>
                ) : 'Sign Up'}
              </Button>
              <OAuth/>
              <div className='flex gap-2 items-center justify-center'>
                <span>Have an account?</span> 
                <Link to="/sign-in" className='text-blue-500'>Sign In</Link>
              </div>
            </form>
  </FormProvider>
        </div>
      </div>
    </div>
  )
}
