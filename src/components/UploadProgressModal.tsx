
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Loader } from "lucide-react";

interface UploadProgressModalProps {
  isOpen: boolean;
  progress: number;
  step: string;
}

const UploadProgressModal: React.FC<UploadProgressModalProps> = ({ 
  isOpen, 
  progress,
  step
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Uploading your car listing</DialogTitle>
          <DialogDescription>
            Please wait while we upload your images and create your listing
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-6">
          <div className="flex items-center gap-3 mb-4">
            <Loader className="h-5 w-5 animate-spin text-primary" />
            <p className="text-sm font-medium">{step}</p>
          </div>
          
          <Progress value={progress} className="h-2" />
          
          <p className="mt-2 text-xs text-right text-muted-foreground">
            {Math.round(progress)}% complete
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadProgressModal;
