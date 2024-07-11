import RegisterForm from '@/components/forms/register-form'
import { getUser } from '@/lib/actions/patient.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Register = async ({params :{ userId}}:SearchParamProps) => {
  // const user = await getUser(userId)
  return (
    <div className="max-h-screen flex h-screen">
    <section className="remove-scrollbar container my-auto">
      <div className="sub-container max-w-[496px]">
    <Image  
    src='/assets/icons/logo-full.svg'
    height={1000}
    width={1000}
    alt="patient"
    className="mb-12 h-10 w-fit"
    />
   
   <RegisterForm />

    <div className="text-14-regular mt-20 flex justify-between">
    <p className="justify-items-end text-dark-600 xl:text-left">
    @ 2024 Carepulse
    </p>
    <Link href='/?admin=true' className="text-green-500">
    Admin
    </Link>
    </div>
      </div>
      </section> 

      <Image className="max-w-[390px] side_img hidden md:block" src='/assets/images/register-img.png'
      height={1000}
      width={1000}
      alt="patient"
      /> 
</div>
  )
}

export default Register