import type { FormError, User } from "../../types/user";

export const validateForm = (formData : User): FormError[] => {
    const newErrors: FormError[] = [];
    if (!formData.firstName)
      newErrors.push({ field: "firstName", message: "First name is required" });
    if (!formData.lastName)
      newErrors.push({ field: "lastName", message: "Last name is required" });
    if (!formData.email) {
      newErrors.push({ field: "email", message: "Email is required" });
    } else if (!formData.email.includes("@")) {
      newErrors.push({ field: "email", message: "Invalid email format" });
    }
    if (!formData.phone) {
      newErrors.push({ field: "phone", message: "Phone number is required" });
    } else if (formData.phone.length !== 10) {
      newErrors.push({
        field: "phone",
        message: "Phone number must be 10 digits",
      });
    }
    if (!formData.role)
      newErrors.push({ field: "role", message: "Role is required" });
    if (!formData.department)
      newErrors.push({
        field: "department",
        message: "Department is required",
      });
    if (!formData.location)
      newErrors.push({ field: "location", message: "Location is required" });
    return newErrors;
  };