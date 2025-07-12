
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FcGoogle } from 'react-icons/fc';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, Key, Loader2, User, Phone } from 'lucide-react';

export default function Auth() {
  const { user, signInWithGoogle, signInWithEmail, signUpWithEmail, isLoading, authError } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [activeTab, setActiveTab] = useState('signin');
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (user && !isLoading) {
      navigate('/');
    }
  }, [user, navigate, isLoading]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    
    if (!email || !password) {
      setFormError(t('auth.fillAllFields', 'Please fill in all fields'));
      return;
    }
    
    const result = await signInWithEmail(email, password);
    if (!result.success) {
      setFormError(result.error || t('auth.signInFailed', 'Sign in failed'));
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    
    if (!email || !password || !firstName || !lastName) {
      setFormError(t('auth.fillRequiredFields', 'Please fill in all required fields'));
      return;
    }
    
    if (password !== confirmPassword) {
      setFormError(t('auth.passwordsDoNotMatch', 'Passwords do not match'));
      return;
    }
    
    if (password.length < 6) {
      setFormError(t('auth.passwordTooShort', 'Password must be at least 6 characters'));
      return;
    }
    
    const result = await signUpWithEmail(email, password, {
      firstName,
      lastName,
      phoneNumber
    });
    
    if (!result.success) {
      setFormError(result.error || t('auth.signUpFailed', 'Sign up failed'));
    } else {
      // Switch to sign in tab after successful signup
      setActiveTab('signin');
    }
  };

  return (
    <Layout>
      <div className="container max-w-md mx-auto py-16 px-4">
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight">{t('auth.welcome', 'Welcome to AutoSog')}</CardTitle>
            <CardDescription>
              {t('auth.description', 'Sign in or create an account to access all features')}
            </CardDescription>
          </CardHeader>
          
          <Tabs defaultValue="signin" value={activeTab} onValueChange={setActiveTab}>
            <div className="px-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">{t('auth.signIn', 'Sign In')}</TabsTrigger>
                <TabsTrigger value="signup">{t('auth.createAccount', 'Create Account')}</TabsTrigger>
              </TabsList>
            </div>
            
            {/* Sign In Tab */}
            <TabsContent value="signin">
              <form onSubmit={handleSignIn}>
                <CardContent className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('auth.email', 'Email')}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="email" 
                        placeholder={t('auth.emailPlaceholder', 'name@example.com')} 
                        type="email" 
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">{t('auth.password', 'Password')}</Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="password" 
                        type="password" 
                        className="pl-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  {(formError || authError) && (
                    <Alert variant="destructive">
                      <AlertDescription>{formError || authError}</AlertDescription>
                    </Alert>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t('auth.signingIn', 'Signing in...')}
                      </>
                    ) : (
                      t('auth.signIn', 'Sign In')
                    )}
                  </Button>
                  
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      {t('auth.noAccount', "Don't have an account?")} <button type="button" className="text-primary font-medium hover:underline" onClick={() => setActiveTab('signup')}>{t('auth.createOne', 'Create one')}</button>
                    </p>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        {t('auth.orContinueWith', 'Or continue with')}
                      </span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center gap-2" 
                    onClick={signInWithGoogle}
                    type="button"
                    disabled={isLoading}
                  >
                    <FcGoogle className="h-5 w-5" />
                    {isLoading ? t('auth.loading', 'Loading...') : 'Google'}
                  </Button>
                </CardContent>
              </form>
            </TabsContent>
            
            {/* Sign Up Tab */}
            <TabsContent value="signup">
              <form onSubmit={handleSignUp}>
                <CardContent className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="first-name" 
                          placeholder="John" 
                          className="pl-10"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="last-name" 
                          placeholder="Doe" 
                          className="pl-10"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="signup-email" 
                        placeholder="name@example.com" 
                        type="email" 
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone-number">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="phone-number" 
                        placeholder="+1 (123) 456-7890" 
                        className="pl-10"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password *</Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="signup-password" 
                        type="password" 
                        className="pl-10"
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Password must be at least 6 characters long
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password *</Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="confirm-password" 
                        type="password" 
                        className="pl-10"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  {(formError || authError) && (
                    <Alert variant="destructive">
                      <AlertDescription>{formError || authError}</AlertDescription>
                    </Alert>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                  
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Already have an account? <button type="button" className="text-primary font-medium hover:underline" onClick={() => setActiveTab('signin')}>Sign in instead</button>
                    </p>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center gap-2" 
                    onClick={signInWithGoogle}
                    type="button"
                    disabled={isLoading}
                  >
                    <FcGoogle className="h-5 w-5" />
                    {isLoading ? "Loading..." : "Google"}
                  </Button>
                </CardContent>
              </form>
            </TabsContent>
          </Tabs>
          
          <CardFooter className="flex flex-col text-center text-sm text-muted-foreground mt-4">
            <p>{t('auth.termsNotice', 'By continuing, you agree to our Terms of Service and Privacy Policy.')}</p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
