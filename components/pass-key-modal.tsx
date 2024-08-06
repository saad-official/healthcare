'use client'
import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import Image from 'next/image';
import { useRouter } from 'next/navigation';

  

const PassKeyModal = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    

    const closeModal = () => {
        setOpen(false);
        router.push('/');

    }

  return (
   <AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogContent className='shad-alert-dialog'>
    <AlertDialogHeader>
      <AlertDialogTitle className='flex items-start justify-between'>Admim Access Verification

        <Image src="/assets/icons/close.svg"
        alt='close'
        width={20}
        height={20}
        onClick={closeModal}
        className='cursor-pointer'
        />

      </AlertDialogTitle>
      <AlertDialogDescription>
       To access the admin page, please enter passkey
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

  )
}

export default PassKeyModal