import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Schema Yup
const schema = yup.object({
  fullName: yup
    .string()
    .min(3, 'Full name must be at least 3 characters')
    .required('Full name is required'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/\d/, 'Password must include at least one number')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  terms: yup
    .boolean()
    .oneOf([true], 'You must accept the Terms & Conditions')
}).required();

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur'
  });

  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div style={{
      maxWidth: '500px',
      margin: '0 auto',
      padding: '2rem',
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
      fontFamily: 'Inter, sans-serif'
    }}>
      <h2 style={{
        textAlign: 'center',
        fontSize: '1.8rem',
        fontWeight: '600',
        marginBottom: '1.5rem',
        color: '#212529'
      }}>
        Create Account
      </h2>

      {submitted && (
        <div style={{
          marginBottom: '1.5rem',
          padding: '0.75rem',
          backgroundColor: '#abc0e6',
          color: '#2e7d32',
          borderRadius: '8px',
          textAlign: 'center',
          fontWeight: '500',
          animation: 'fadeIn 0.3s'
        }}>
          Registration Successful!
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/*  Name */}
        <div style={{ marginBottom: '1.25rem' }}>
          <input
            {...register('fullName')}
            type="text"
            placeholder="Full Name"
            style={{
              width: '100%',
              padding: '0.875rem',
              border: `1px solid ${errors.fullName ? '#d32f2f' : '#084887'}`,
              borderRadius: '8px',
              fontSize: '1rem',
              transition: 'border-color 0.2s'
            }}
          />
          {errors.fullName && (
            <p style={{
              marginTop: '0.5rem',
              fontSize: '0.875rem',
              color: '#d32f2f'
            }}>
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div style={{ marginBottom: '1.25rem' }}>
          <input
            {...register('email')}
            type="email"
            placeholder="Email"
            style={{
              width: '100%',
              padding: '0.875rem',
              border: `1px solid ${errors.email ? '#d32f2f' : '#084887'}`,
              borderRadius: '8px',
              fontSize: '1rem',
              transition: 'border-color 0.2s'
            }}
          />
          {errors.email && (
            <p style={{
              marginTop: '0.5rem',
              fontSize: '0.875rem',
              color: '#d32f2f'
            }}>
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div style={{ marginBottom: '1.25rem' }}>
          <input
            {...register('password')}
            type="password"
            placeholder="Password"
            style={{
              width: '100%',
              padding: '0.875rem',
              border: `1px solid ${errors.password ? '#d32f2f' : '#084887'}`,
              borderRadius: '8px',
              fontSize: '1rem',
              transition: 'border-color 0.2s'
            }}
          />
          {errors.password && (
            <p style={{
              marginTop: '0.5rem',
              fontSize: '0.875rem',
              color: '#d32f2f'
            }}>
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div style={{ marginBottom: '1.25rem' }}>
          <input
            {...register('confirmPassword')}
            type="password"
            placeholder="Confirm Password"
            style={{
              width: '100%',
              padding: '0.875rem',
              border: `1px solid ${errors.confirmPassword ? '#d32f2f' : '#084887'}`,
              borderRadius: '8px',
              fontSize: '1rem',
              transition: 'border-color 0.2s'
            }}
          />
          {errors.confirmPassword && (
            <p style={{
              marginTop: '0.5rem',
              fontSize: '0.875rem',
              color: '#d32f2f'
            }}>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Conditions */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <input
              {...register('terms')}
              type="checkbox"
              style={{
                marginTop: '4px',
                width: '18px',
                height: '18px',
                cursor: 'pointer'
              }}
            />
            <span style={{ fontSize: '0.95rem', color: '#495057' }}>
              I agree to the <a href="#" style={{ color: '#043668', textDecoration: 'none' }}>Terms & Conditions</a>
            </span>
          </label>
          {errors.terms && (
            <p style={{
              marginTop: '0.5rem',
              fontSize: '0.875rem',
              color: '#d32f2f',
              marginLeft: '26px'
            }}>
              {errors.terms.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '0.875rem',
            backgroundColor: isSubmitting ? '#90caf9' : '#073563',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s'
          }}
        >
          {isSubmitting ? 'Submitting...' : 'Register'}
        </button>
      </form>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

import { useState } from 'react';