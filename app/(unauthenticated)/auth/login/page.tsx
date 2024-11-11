import { FC } from 'react';
import Link from 'next/link';
import { login } from './login.action';

const Page: FC = () => {
  return (
    <form action={login}>
      <div>
        <input autoComplete="username" name="email" type="email" />
      </div>

      <div>
        <input autoComplete="current-password" name="password" type="password" />
      </div>

      <button type="submit">
        Login
      </button>

      <hr />

      <p>
        No account? <Link href="/auth/signup">Signup</Link>
      </p>
    </form>
  );
};

export default Page;
