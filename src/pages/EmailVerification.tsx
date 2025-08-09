import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, XCircle, Mail, Leaf, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const EmailVerification = () => {
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token_hash = searchParams.get('token_hash');
        const type = searchParams.get('type');
        
        if (type === 'email' && token_hash) {
          const { error } = await supabase.auth.verifyOtp({
            token_hash,
            type: 'email'
          });

          if (error) {
            console.error('Email verification error:', error);
            setVerificationStatus('error');
            toast({
              title: "Verification Failed",
              description: "The verification link is invalid or has expired.",
              variant: "destructive",
            });
          } else {
            setVerificationStatus('success');
            toast({
              title: "Email Verified",
              description: "Your email has been successfully verified. You can now login.",
            });
          }
        } else {
          setVerificationStatus('error');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setVerificationStatus('error');
      }
    };

    verifyEmail();
  }, [searchParams, toast]);

  const handleResendVerification = async () => {
    // This would require the user's email, which we don't have here
    // In a real app, you might want to redirect to a form where they can enter their email
    toast({
      title: "Resend Verification",
      description: "Please contact support or try registering again.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-3 rounded-lg">
              <Leaf className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              AgriBusiness Pro
            </span>
          </div>
        </div>

        <Card>
          <CardContent className="p-8 text-center">
            {verificationStatus === 'loading' && (
              <>
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying Email</h2>
                <p className="text-gray-600 mb-6">
                  Please wait while we verify your email address...
                </p>
              </>
            )}

            {verificationStatus === 'success' && (
              <>
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Verified!</h2>
                <p className="text-gray-600 mb-6">
                  Your email has been successfully verified. You can now login to your account.
                </p>
                <Link to="/login" className="block">
                  <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                    Continue to Login
                  </Button>
                </Link>
              </>
            )}

            {verificationStatus === 'error' && (
              <>
                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <XCircle className="h-8 w-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h2>
                <p className="text-gray-600 mb-6">
                  The verification link is invalid or has expired. Please try again.
                </p>
                <div className="space-y-3">
                  <Button
                    onClick={handleResendVerification}
                    variant="outline"
                    className="w-full"
                  >
                    Get Help
                  </Button>
                  <Link to="/register" className="block">
                    <Button className="w-full">Register Again</Button>
                  </Link>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailVerification;