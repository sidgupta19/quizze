import { Button, Input } from '../../components/ui';
import styles from './styles/LoginForm.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const userSchema = yup
  .object({
    email: yup
      .string()
      .matches(emailRegex, { message: 'Email is not valid' })
      .required(),
    password: yup.string().min(6).required(),
  })
  .required();

export default function LoginForm() {
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
      <Button variant="secondary">Submit</Button>
    </form>
  );
}
