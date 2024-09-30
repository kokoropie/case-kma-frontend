import Link from "next/link";
import RegisterForm from "./RegisterForm";

const Register = () => {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex justify-center items-center">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register your account
        </h2>
        <Link href="/">
          <img src="/snake-1.png" alt="logo" className="h-24 w-24" />
        </Link>
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
        <RegisterForm />
        <p className="mt-2">
          You have an account?{" "}
          <Link
            href="/login"
            className="font-semibold hover:underline hover:text-blue-600"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
