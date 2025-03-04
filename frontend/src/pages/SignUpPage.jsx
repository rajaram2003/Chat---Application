import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [forData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSignUp } = useAuthStore();

  const validateForm = () => { }
  const handleSubmit = (e) => {
    e.preventDefault()
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* Left Side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">

          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <messageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2"></h1>
              <p className="text-base-content/60">Get started with your free account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
          </form>
        </div>
      </div>
    </div>
  )
};

export default SignUpPage;