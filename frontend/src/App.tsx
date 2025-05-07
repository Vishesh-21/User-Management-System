import { Route, Routes } from "react-router-dom";
import { UserForm } from "./components/UserForm";
import { UserList } from "./components/UserList";
import { EditPage } from "./components/EditPage";

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/create" element={<UserForm />} />
        <Route path="/edit/:id" element={<EditPage />} />
      </Routes>
    </div>
  );
};
