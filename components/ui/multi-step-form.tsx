"use client"

import React, { useState, ReactNode, useRef, useEffect } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';

interface MultiStepFormProps {
  children: ReactNode[];
}

export function MultiStepForm({ children }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentStep]);

  const next = () => {
    if (currentStep < children.length - 1) {
      setCurrentStep(step => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep(step => step - 1);
    }
  };

  const goTo = (step: number) => {
    setCurrentStep(step);
  }

  return (
    <Card ref={formRef} className="w-full max-w-2xl mx-auto bg-transparent backdrop-blur-sm border-gray-200/20 shadow-lg">
        {children[currentStep]}
        <CardFooter className="flex justify-between items-center mt-4">
            <div>
                {currentStep > 0 && (
                <Button onClick={prev} variant="ghost">
                    Go Back
                </Button>
                )}
            </div>
            <Pagination>
                <PaginationContent>
                    {children.map((_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink href="#" onClick={() => goTo(index)} isActive={currentStep === index}>
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                </PaginationContent>
            </Pagination>
            <div>
                {currentStep < children.length - 1 && (
                    <Button onClick={next}>
                        Next
                    </Button>
                )}
                 {currentStep === children.length - 1 && (
                    <Button>
                        Submit
                    </Button>
                )}
            </div>
        </CardFooter>
    </Card>
  );
}
