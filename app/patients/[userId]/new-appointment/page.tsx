import AppointmentForm from "@/components/forms/appointment-form";
import PatientForm from "@/components/forms/patient-form";
import { Button } from "@/components/ui/button";
import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image";
import Link from "next/link";
import * as Sentry from '@sentry/nextjs'

export default async function NewAppointment({params:{userId}}: SearchParamProps ) {
  const patient = await getPatient(userId);
  Sentry.metrics.set("user_view_new-appointment", patient.name);
  return ( 
    <div className="max-h-screen flex h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
      <Image  
      src='/assets/icons/logo-full.svg'
      height={1000}
      width={1000}
      alt="patient"
      className="mb-12 h-10 w-fit"
      />
     <AppointmentForm
     type='create'
     userId={userId}
     patientId={patient?.$id}
     />

  
      <p className="copyright mt-10 py-12">
      @ 2024 Carepulse
      </p>
        </div>
        </section> 

        <Image className="max-w-[390px] bg-bottom" src='/assets/images/appointment-img.png'
        height={1000}
        width={1000}
        alt="patient"
   
        /> 
  </div>
  );
}
