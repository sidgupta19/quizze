import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Button, Input } from '../../components/ui';
import styles from './styles/SignupForm.module.css';

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const userSchema = yup
  .object({
    name: yup.string().required(),
    email: yup
      .string()
      .matches(emailRegex, { message: 'Email is not valid' })
      .required(),
    password: yup.string().min(6).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'passwords do not match'),
  })
  .required();

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Input
        error={errors.name}
        field="name"
        label="Name"
        register={register}
      />
      <Input
        error={errors.email}
        field="email"
        label="Email"
        register={register}
      />
      <Input
        error={errors.password}
        field="password"
        label="Password"
        register={register}
        type="password"
      />
      <Input
        error={errors.confirmPassword}
        field="confirmPassword"
        label="Confirm Password"
        register={register}
        type="password"
      />

      <Button variant="secondary">Submit</Button>
    </form>
  );
}
