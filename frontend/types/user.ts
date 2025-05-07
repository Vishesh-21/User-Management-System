export type User = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  location: string;
};

export type FormError = {
  field: string;
  message: string;
};
