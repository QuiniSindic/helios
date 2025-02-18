import { z } from 'zod';

export const loginDTOSchema = z.object({
  email: z.string().email('El email debe ser válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface loginDTO extends z.infer<typeof loginDTOSchema> {}

export interface FormData {
  email: string;
  password: string;
}
