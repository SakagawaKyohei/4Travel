import { useMutation, useQueryClient } from "react-query";
import supabase from "../../app/supabase";

interface User {
  sdt: string;
  hoten: string;
  email: string;
  password: string;
}
const createUser = async (user: User) => {
  const { data, error: signUpError } = await supabase.auth.signUp({
    email: user.email,
    password: user.password,

    options: {
      data: {
        ten: user.hoten,
        role: "admin", //admin cập nhật role sau //user=>staff, user1=>customer
        sdt: user.sdt,
      },
    },
  });
  //avt mac dinh, nua doi anh sau

  console.log(data.user?.email_confirmed_at);
  // User exists, but is fake. See https://supabase.com/docs/reference/javascript/auth-signup
  if (data.user && data.user.identities && data.user.identities.length === 0) {
    throw new Error("Email đã được đăng ký");
  }

  if (signUpError) {
    throw signUpError;
  }

  return data;
};

export default function useCreateUser(user: User) {
  return useMutation(() => createUser(user));
}
