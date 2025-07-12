
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Shield, Check } from 'lucide-react';

export function SafetyTips() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="mr-2 h-5 w-5" />
          Safety Tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start">
            <Check className="mr-2 h-4 w-4 text-primary mt-0.5" />
            <span>Meet in a public place and test drive with the owner</span>
          </li>
          <li className="flex items-start">
            <Check className="mr-2 h-4 w-4 text-primary mt-0.5" />
            <span>Check the vehicle's history and documentation</span>
          </li>
          <li className="flex items-start">
            <Check className="mr-2 h-4 w-4 text-primary mt-0.5" />
            <span>Verify ownership and inspect the vehicle thoroughly</span>
          </li>
          <li className="flex items-start">
            <Check className="mr-2 h-4 w-4 text-primary mt-0.5" />
            <span>Never send money in advance or share personal financial information</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
