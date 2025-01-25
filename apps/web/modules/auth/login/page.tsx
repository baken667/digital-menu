import { messages } from "@/lib/messages";
import FormWrapper from "../components/form-wrapper";
import LoginForm from "./components/login-form";

export default function LoginPage() {
  return (
    <FormWrapper title={messages.common.auth.login}>
      <LoginForm />
    </FormWrapper>
  );
}
