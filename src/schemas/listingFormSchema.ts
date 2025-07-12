
import { z } from 'zod';

// Form schema definition
export const listingFormSchema = z.object({
  title: z.string().min(10, {
    message: "Title must be at least 10 characters."
  }).max(100, {
    message: "Title must not exceed 100 characters."
  }),
  make: z.string({
    required_error: "Please select a make."
  }),
  model: z.string({
    required_error: "Please enter a model."
  }),
  year: z.coerce.number().int().min(1900, {
    message: "Year must be at least 1900."
  }).max(new Date().getFullYear() + 1, {
    message: `Year must not exceed ${new Date().getFullYear() + 1}.`
  }),
  condition: z.string({
    required_error: "Please select the condition of your car."
  }),
  price: z.coerce.number().positive({
    message: "Price must be a positive number."
  }),
  mileage: z.coerce.number().nonnegative({
    message: "Mileage must be a non-negative number."
  }),
  fuelType: z.string({
    required_error: "Please select a fuel type."
  }),
  transmission: z.string({
    required_error: "Please select a transmission type."
  }),
  bodyType: z.string({
    required_error: "Please select a body type."
  }),
  color: z.string().min(2, {
    message: "Please specify the color."
  }),
  description: z.string().min(30, {
    message: "Description must be at least 30 characters."
  }).max(2000, {
    message: "Description must not exceed 2000 characters."
  }),
  features: z.array(z.string()).optional(),
  images: z.array(z.string()).min(1, {
    message: "At least one image is required."
  }),
  location: z.object({
    city: z.string().min(2, {
      message: "City is required."
    }),
    state: z.string().optional()
  }),
  seller: z.object({
    name: z.string().min(2, {
      message: "Name is required."
    }),
    phone: z.string().min(5, {
      message: "Phone number is required."
    }),
    phoneSecondary: z.string().optional(),
    email: z.string().email({
      message: "Please enter a valid email address."
    }).optional(),
    type: z.enum(['private', 'dealer'], {
      required_error: "Please select a seller type."
    })
  })
});

export type FormValues = z.infer<typeof listingFormSchema>;

// Default values for the form
export const defaultFormValues: Partial<FormValues> = {
  title: '',
  year: new Date().getFullYear(),
  condition: '',
  price: 0,
  mileage: 0,
  fuelType: 'Petrol',
  transmission: 'Automatic',
  bodyType: 'Sedan',
  color: '',
  description: '',
  features: [],
  images: [],
  location: {
    city: '',
    state: ''
  },
  seller: {
    name: '',
    phone: '',
    phoneSecondary: '',
    email: '',
    type: 'private'
  }
};
