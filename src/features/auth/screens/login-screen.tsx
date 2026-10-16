import { LoginForm } from '../components/form/login-form';
import { LoginLayout } from '../components/form/login-layout';
import { useLogin } from '../hooks/use-login';

export default function LoginScreen() {
  const login = useLogin();

  return (
    <LoginLayout>
      <LoginForm
        values={login.values}
        feedback={login.feedback}
        loading={login.loading}
        connected={login.connected}
        onChange={login.change}
        onSubmit={login.submit}
      />
    </LoginLayout>
  );
}
