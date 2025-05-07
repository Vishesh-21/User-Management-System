import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { User } from "../../types/user";
import axios from "axios";
import { UserForm } from "./UserForm";

export const EditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/${id}`
        );
        setUser(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return <UserForm user={user} />;
};
