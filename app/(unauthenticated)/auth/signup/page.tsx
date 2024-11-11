import { FC } from 'react';
import { signup } from './signup.action';

const Page: FC = () => {
  return (
    <form action={signup}>
      <div>
        <input name="name" placeholder="Enter your name..." required />
      </div>

      <div>
        <input name="email" placeholder="Enter your email..." required type="email" />
      </div>

      <div>
        <input name="password" placeholder="Enter your password..." required type="password" />
      </div>

      <button type="submit">
        Signup
      </button>
    </form>
  );
};

export default Page;
