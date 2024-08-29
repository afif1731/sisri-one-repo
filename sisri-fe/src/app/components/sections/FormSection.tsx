"use client";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { BsRecordCircle } from "react-icons/bs";

import Button from "@/components/buttons/Button";
import Input from "@/components/forms/Input";
import Typography from "@/components/Typography";

type SandboxForm = {
  text: string;
  textReadOnly: string;
  textWithHelper: string;
  textWithHelperReadOnly: string;
  textWithValidation: string;
  textWithValidationReadOnly: string;
  textWithValidationAndHelper: string;
  textWithValidationHelperReadOnly: string;
  PasswordInput: string;
  textWithLeftIcon: string;
  textWithRightIcon: string;
};

const FormSection = () => {
  const methods = useForm<SandboxForm>({
    mode: "onTouched",
  });
  const { handleSubmit } = methods;

  // eslint-disable-next-line no-console
  const onSubmit: SubmitHandler<SandboxForm> = (data) => console.log(data);

  return (
    <>
      <Typography className="text-blue-main" variant="h3" weight="bold">
        Form
      </Typography>
      <br />
      <section className="space-y-2">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="w-fit space-y-4">
            <Input id="text" label="Text" placeholder="Placeholder" />

            <Input
              id="textReadOnly"
              label="Text (Read Only)"
              placeholder="Placeholder"
              defaultValue="Read Only"
              readOnly={true}
            />

            <Input
              id="textWithHelper"
              label="Text With Helper"
              placeholder="Placeholder"
              helperText="Helper text"
            />

            <Input
              id="textWithHelperReadOnly"
              label="Text With Helper (Read Only)"
              placeholder="Placeholder"
              helperText="Helper text"
              readOnly={true}
              defaultValue="Helper Text"
            />

            <Input
              id="textWithValidation"
              label="Text With Validation"
              placeholder="Placeholder"
              validation={{
                required: "Field must be filled",
                minLength: {
                  value: 3,
                  message: "Field must be at least 3 characters",
                },
              }}
            />

            <Input
              id="textWithValidationAndHelper"
              label="Text With Validation And Helper"
              placeholder="Placeholder"
              helperText="This is helper text"
              validation={{
                required: "Field must be filled",
                minLength: {
                  value: 3,
                  message: "Field must be at least 3 characters",
                },
              }}
            />

            <Input
              id="textWithValidationHelperReadOnly"
              label="Text With Validation And Helper (Read Only)"
              placeholder="Placeholder"
              helperText="This is helper text"
              validation={{
                required: "Field must be filled",
                minLength: {
                  value: 3,
                  message: "Field must be at least 3 characters",
                },
              }}
              readOnly={true}
              defaultValue="Helper Text"
            />

            <Input
              id="PasswordInput"
              label="Password Input"
              placeholder="Placeholder"
              validation={{
                required: "Field must be filled",
              }}
              type="password"
            />

            <Input
              id="textWithRightIcon"
              label="Text With Right Icon"
              placeholder="Placeholder"
              rightIcon={BsRecordCircle}
            />

            <Input
              id="textWithLeftIcon"
              label="Text With Left Icon"
              placeholder="Placeholder"
              leftIcon={BsRecordCircle}
            />

            <div className="space-x-2">
              <Button variant="secondary" type="button">
                Not Submit
              </Button>

              <Button variant="blue" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </FormProvider>
      </section>
    </>
  );
};

export default FormSection;
