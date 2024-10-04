import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './SignIn.module.css';
import { useId, useState } from 'react';
import clsx from 'clsx';
import Icon from '../Icon/Icon';
import eyeIcon from '/eye.svg';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { toast } from 'react-toastify';
import { loginUser } from '../../services/authService';

const emailRegExp = /^[\w.-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;

const minPasswordLength = 8;
const maxPasswordLength = 32;

const signInSchema = yup.object({
  email: yup
    .string()
    .required('Email is required!')
    .matches(emailRegExp, 'Email address is not valid')
    .email('Please enter a valid email address!'),

  password: yup
    .string()
    .required('Password is required!')
    .min(minPasswordLength, 'Too short')
    .max(maxPasswordLength, 'Too long'),
});

const SingIn = ({ modalClose }) => {
  const [isPassword, setIsPassword] = useState(true);

  const emailId = useId();
  const passwordId = useId();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

  const togglePassword = () => setIsPassword(!isPassword);

  const onSubmit = async data => {
    console.log('Дані форми:', data);

    try {
      await loginUser(data.email, data.password);

      console.log('User logged in successfully!');
      toast.success('User logged in successfully!', {
        position: 'top-center',
      });
    } catch (e) {
      console.log(e.message);
      toast.error('Error while login user.', {
        position: 'top-center',
      });
    } finally {
      reset();
      modalClose();
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Log In</h2>
      <p className={styles.text}>
        Welcome back! Please enter your credentials to access your account and
        continue your search for an teacher.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.emailWrapper}>
          <input
            id={emailId}
            {...register('email')}
            placeholder="Email"
            className={clsx(styles.input, styles.email)}
          />
          <p className={styles.errorText}>{errors.email?.message}</p>
        </div>

        <div className={styles.passwordWrapper}>
          <input
            id={passwordId}
            type={isPassword ? 'password' : 'text'}
            {...register('password', { required: true })}
            placeholder="Password"
            className={clsx(styles.input, styles.password)}
          />

          <button
            type="button"
            onClick={togglePassword}
            className={styles.eyeBtn}
          >
            {isPassword ? (
              <img src={eyeIcon} alt="eye" className="eye" />
            ) : (
              <Icon
                id="eye"
                width={20}
                height={20}
                className={styles.eye}
                fillColor="#121417"
              />
            )}
          </button>
          {errors.password && (
            <p className={styles.errorText}>{errors.password?.message}</p>
          )}
        </div>

        <button type="submit" className={styles.submitBtn}>
          Log In
        </button>
      </form>
    </div>
  );
};

export default SingIn;
