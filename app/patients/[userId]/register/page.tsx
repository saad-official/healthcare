import RegisterForm from '@/components/forms/register-form'
import { getUser } from '@/lib/actions/patient.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Register = async ({params :{ userId}}:SearchParamProps) => {
  const user = await getUser(userId)
  return (
    <div className="max-h-screen flex h-screen">
    <section className="remove-scrollbar container">
      <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
    <Image  
    src='/assets/icons/logo-full.svg'
    height={1000}
    width={1000}
    alt="patient"
    className="mb-12 h-10 w-fit"
    />
   
   <RegisterForm user={user} />

    
    <p className="copyright py-12">
    @ 2024 Carepulse
    </p>
     
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