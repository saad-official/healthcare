"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../submit-button";
import { useState } from "react";
import { getAppointmentSchema, UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import { createAppointment } from "@/lib/actions/appointment.actions";
import { SelectItem } from "../ui/select";
import { Doctors } from "@/constant";
import Image from "next/image";
import { Appointment } from "@/types/appwrite.types";

export enum FormFieldType {
  INPUT = "input",
  CHECKBOX = "checkbox",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  DATE_PICKER = "datePicker",
  RADIO = "radio",
  SELECT = "select",
  SKELETON = "skeleton",
}

export function AppointmentForm({
  type,
  userId,
  patientId,
  appointment,
  setOpen,
}: {
  type: "create" | "cancel" | "schedule";
  userId: string;
  patientId: string;
  appointment: Appointment;
  setOpen: (open: boolean) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const AppointmentFormValidation = getAppointmentSchema(type);
  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: "",
      cancellationReason: "",
      note: "",
      schedule: new Date(),
      reason: "",
    },
  });

  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    setIsLoading(true);
    console.log("come here");
    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
        break;
    }

    try {
      if (type === "create" && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          note: values.note!,
          status: status as Status,
        };

        const appointment = await createAppointment(appointmentData);
        if (appointment) {
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`
          );
        }
      }
      else{
        const appointmentToUpdae = {
          userId,
          appointmentId:appointment?.$id,
          appointment:{
            primaryPhysician:values?.primaryPhysician,
           schedule:new Date(values?.schedule),
           status:status as Status,
           cancellationReason:values?.cancellationReason,
          },
          type
        }

        const updatedAppointment = await updateAppointment(appointmentToUpdae)
      }
    } catch (error) {
      console.log("error", error);
    }

    // try {
    //   const userData = { name, email, phone };
    //   const user = await createUser(userData);
    //   console.log("user", user);
    //   if (user) router.push(`/patients/${user?.$id}/register`);
    // } catch (error: any) {
    //   console.log("error");
    // }
  }

  let buttonLabel;

  switch (type) {
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;
    case "create":
      buttonLabel = "Create Appointment";
      break;
    case "schedule":
      buttonLabel = "Schedule Appointment";
      break;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">New Appointment</h1>
          <p className="text-dark-700">
            Request a new aapointment in 10 seconds
          </p>
        </section>

        {type !== "cancel" && (
          <>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Doctor"
              placeholder="Select a doctor"
            >
              {Doctors.map((doctor, i) => (
                <SelectItem key={doctor.name + i} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt="doctor"
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Expected appointment date"
              showTimeSelect
              dateFormat="MM/dd/yyyy - h:mm aa"
            />

            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                placeholder="Enter reason for appointment"
                control={form.control}
                name="reason"
                label="Reason for appointment"
              />

              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                placeholder="Enter Notes"
                control={form.control}
                name="note"
                label="Notes"
              />
            </div>
          </>
        )}

        {type === "cancel" && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            placeholder="Enter reason for cancellation"
            control={form.control}
            name="cancellationReason"
            label="Reason for cancellation"
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          className={`${
            type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"
          } w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
}

export default AppointmentForm;
