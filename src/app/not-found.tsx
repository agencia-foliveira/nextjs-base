import { CustomError, ErrorCodes } from '@/lib/errors';

export default function NotFound() {
  throw new CustomError('Not Found', ErrorCodes.NotFound);
}
