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
import { formSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { GenderOptions } from "@/constant";
import { Label } from "../ui/label";

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

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit({ email, name, phone }: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const userData = { name, email, phone };
      const user = await createUser(userData);
      console.log("user", user);
      if (user) router.push(`/patients/${user?.$id}/register`);
    } catch (error: any) {
      console.log("error");
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Let us know more about yourself</p>
        </section>

        <section className="mb-9 space-y-1">
          <h1 className="sub-header">Personal Information</h1>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <div className="flex flex-col xl:flex-row gap-6 ">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />

          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Phone Number"
            placeholder="(555) 123-4567"
          />
        </div>

        <div className="flex flex-col xl:flex-row gap-6 ">
          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="birthday"
            label="Date of Birth"
          />

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="gender"
            label="Gender"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup className="flex h-11 gap-6 xl:justify-between"
                onValueChange={field.onChange}
                defaultValue={field.value}
                >
                  {GenderOptions.map((options) => (
                    <div key={options} className="radio-group">
                      <RadioGroupItem value={options} id={options}>
                        <Label htmlFor={options} className="cursor-pointer">
                          {options}
                        </Label>
                      </RadioGroupItem>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>

        

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
}

export default RegisterForm;
