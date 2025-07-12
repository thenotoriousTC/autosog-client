
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Phone, Mail } from 'lucide-react';

interface SellerInfoProps {
  name: string;
  type: 'private' | 'dealer';
  phone: string;
  email?: string;
  joinDate?: string;
}

export function SellerInfo({ name, type, phone, email, joinDate }: SellerInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="mr-2 h-5 w-5" />
          Seller Information
        </CardTitle>
        <CardDescription>
          {type === 'dealer' ? 'Dealership' : 'Private Seller'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="text-sm text-muted-foreground">
              {joinDate 
                ? `Member since ${joinDate}` 
                : 'New member'}
            </p>
          </div>
          
          {/* Contact options */}
          <div className="space-y-3">
            <Button className="w-full" size="lg">
              <Phone className="mr-2 h-4 w-4" />
              {phone}
            </Button>
            
            {email && (
              <Button variant="outline" className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                Contact by Email
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
