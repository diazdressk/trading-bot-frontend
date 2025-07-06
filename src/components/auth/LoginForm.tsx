import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { type LoginFormData, loginSchema } from '@/schemas/auth';
import { useAuthStore } from '@/stores';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Bot, Loader2 } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const { login, isLoading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      clearError();
      await login(data);
      navigate('/bots');
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-700 rounded-lg mb-4">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-semibold text-slate-800 mb-1">Trading Bots</h1>
          <p className="text-slate-600 text-sm">Welcome back</p>
        </div>

        <Card className="border border-slate-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-medium text-slate-800 text-center">
              Sign In
            </CardTitle>
            <CardDescription className="text-center text-slate-600 text-sm">
              Enter your credentials to continue
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {error && (
                  <Alert variant="destructive" className="border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-red-800">{error}</AlertDescription>
                  </Alert>
                )}

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your username" {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="Enter your password"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-10 bg-slate-700 hover:bg-slate-800 text-white font-medium disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Signing In...
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>
            </Form>

            <div className="text-center pt-4 border-t border-slate-200">
              <p className="text-sm text-slate-600">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-slate-700 hover:text-slate-900 font-medium hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
