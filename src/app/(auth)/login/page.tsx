import Link from "next/link";
import LoginForm from "./LoginForm";

const Register = () => {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex gap-2 items-center justify-center">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Login your account
        </h2>
        <Link href="/">
          <img src="/snake-1.png" alt="logo" className="w-24 h-24" />
        </Link>
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
        <LoginForm />
        <div className="flex justify-between mt-2 font-semibold">
          <Link
            href="/forgot-password"
            className="hover:underline hover:text-blue-600"
          >
            Forgot?
          </Link>
          <Link
            href="/register"
            className="hover:underline hover:text-blue-600"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
