import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [forData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const {signup, isSignUp} = useAuthStore();

  const validateForm = () => {}
  const handleSubmit = (e) => {
    e.preventDefault()
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">

     {/* Left Side */}
    <div className="flex flex-col justify-center items-center p-6 sm:p-12">

      <div></div>

    </div>
  </div>
  )
};

export default SignUpPage;