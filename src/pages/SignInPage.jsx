import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import ErroAlert from "../components/ErroAlert";
import { useEffect, useState } from "react";
import logoUrl from "../assets/images/Logo.png";

// --- SVG Icon Components ---
const UserIcon = () => (
  <svg
    className="w-5 h-5 text-gray-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const LockIcon = () => (
  <svg
    className="w-5 h-5 text-gray-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
);

const GoogleIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#FFC107"
      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
    />
    <path
      fill="#FF3D00"
      d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.223 0-9.657-3.356-11.303-7.918l-6.522 5.023C9.505 39.556 16.227 44 24 44z"
    />
    <path
      fill="#1976D2"
      d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.011 35.091 44 30.023 44 24c0-1.341-.138-2.65-.389-3.917z"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg
    className="w-6 h-6"
    fill="#1877F2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

// --- Logo Component ---
const Logo = () => (
  <div className="flex items-center space-x-2">
    <img src={logoUrl} alt="HCH Logo" className="w-18 h-auto" />
    <span className="text-2xl font-bold text-gray-800">HCH</span>
  </div>
);

const isAdminUser = (u) => u?.role === "Admin";

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { user, errorMsg, loginUser } = useAuthContext();
  const [loading, setLoading] = useState(false);

  // redirect after the auth context sets `user`
  useEffect(() => {
    if (!user) return;
    console.log("User role:", user.role);
    console.log("ME from /auth/users/me/:", user.role);
    console.log("isAdminUser:", isAdminUser(user));
    navigate(isAdminUser(user) ? "/admin" : "/dashboard", { replace: true });
  }, [user, navigate]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const me = await loginUser(data);
      if (me)
        navigate(isAdminUser(me) ? "/admin" : "/dashboard", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  // Submit only triggers login; navigation is handled by the effect above

  return (
    <>
      <style>{`
        .bg-pattern {
          background-color: #f8fafc;
          background-image: radial-gradient(#e2e8f0 1px, transparent 1px);
          background-size: 16px 16px;
        }
      `}</style>

      <section className="font-sans bg-pattern min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Form Container */}
            <div className="p-8 sm:p-12 flex flex-col justify-center">
              <div className="mb-8 self-center">
                <Logo />
              </div>

              <div className="w-full">
                {errorMsg && <ErroAlert error={errorMsg} />}

                <h2 className="text-3xl font-bold text-[#083d41] mb-2 text-center">
                  Sign In
                </h2>
                <p className="text-gray-600 mb-8 text-center">
                  Please enter your credentials to proceed.
                </p>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                  noValidate
                >
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                      <UserIcon />
                    </span>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Your Email *"
                      aria-invalid={!!errors.email}
                      {...register("email", { required: "Email is required" })}
                      className="w-full pl-12 pr-4 py-4 rounded-lg bg-gray-100 border-2 border-transparent focus:border-green-300 focus:bg-white focus:ring-0 transition"
                    />
                    {errors.email && (
                      <span className="label-text-alt text-error">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                      <LockIcon />
                    </span>
                    <input
                      id="password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="Password *"
                      aria-invalid={!!errors.password}
                      {...register("password", {
                        required: "Password is required",
                      })}
                      className="w-full pl-12 pr-4 py-4 rounded-lg bg-gray-100 border-2 border-transparent focus:border-green-300 focus:bg-white focus:ring-0 transition"
                    />
                    {errors.password && (
                      <span className="label-text-alt text-error">
                        {errors.password.message}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <label
                      htmlFor="remember"
                      className="flex items-center text-sm text-gray-600"
                    >
                      <input
                        id="remember"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-green-500 focus:ring-green-400 focus:ring-offset-0"
                      />
                      <span className="ml-2">Remember me</span>
                    </label>
                    <a
                      href="#"
                      className="text-sm font-semibold text-green-600 hover:underline"
                    >
                      Forgot Password?
                    </a>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-full transition duration-300 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      {loading ? "Signing In..." : "Sign In"}
                    </button>
                  </div>
                </form>

                <div className="my-8 flex items-center">
                  <div className="flex-grow border-t border-gray-200"></div>
                  <span className="flex-shrink mx-4 text-gray-500 text-sm">
                    Or sign in with
                  </span>
                  <div className="flex-grow border-t border-gray-200"></div>
                </div>

                <div className="flex justify-center gap-4">
                  <button
                    type="button"
                    className="w-14 h-14 flex items-center justify-center bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md transition"
                  >
                    <GoogleIcon />
                  </button>
                  <button
                    type="button"
                    className="w-14 h-14 flex items-center justify-center bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md transition"
                  >
                    <FacebookIcon />
                  </button>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-gray-600">
                    Don't have an account?
                    <Link
                      to="/signup"
                      className="font-semibold text-green-600 hover:underline ml-1"
                    >
                      Sign Up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
