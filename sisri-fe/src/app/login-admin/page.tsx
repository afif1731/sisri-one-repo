"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import Button from "@/components/buttons/Button";
import Input from "@/components/forms/Input";
import Typography from "@/components/Typography";

interface LoginAdminForm {
  email: string;
  password: string;
}

const Page = () => {
  const methods = useForm<LoginAdminForm>({ mode: "onTouched" });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<LoginAdminForm> = async (data) =>
    // eslint-disable-next-line no-console
    console.log(data);

  return (
    <>
      <section className="flex">
        <div className="hidden h-screen w-full items-center justify-center bg-gradient-to-r from-[#1677FE] to-[#E8F1FF] md:flex">
          <Image
            src="/images/LOGIN-ADMIN.png"
            alt="Login Admin"
            width={400}
            height={400}
          ></Image>
        </div>
        <div className="relative flex min-h-screen w-full flex-col justify-center space-y-6 px-8">
          <div>
            <Image
              src="/images/LOGO-PRIMARY.png"
              alt="Login Admin"
              width={75}
              height={75}
              className="absolute left-8 top-8"
            ></Image>
          </div>
          <div className="space-y-2">
            <Typography variant="bl" weight="semibold">
              Welcome to <span className="text-blue-main">SISRI</span> Dashboard
              Admin
            </Typography>
            <Typography className="!text-base">
              Please login to your account
            </Typography>
          </div>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full space-y-4">
                <Input
                  id="email"
                  label="Email"
                  validation={{ required: "Field must be filled" }}
                />
                <Input
                  id="password"
                  label="Password"
                  type="password"
                  validation={{ required: "Field must be filled" }}
                />
                <Button
                  variant="blue"
                  className="flex w-full justify-center"
                  type="submit"
                >
                  Login
                </Button>
              </div>
            </form>
          </FormProvider>
          <Typography className="!text-base">
            Don’t have an account?{" "}
            <Link href="/register">
              <span className="font-bold text-blue-main">Register Now</span>
            </Link>
          </Typography>
        </div>
      </section>
    </>
  );
};

export default Page;
