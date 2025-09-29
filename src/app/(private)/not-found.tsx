import { CustomError, ErrorCodes } from '@/lib/errors';

export default function PrivateNotFound() {
  throw new CustomError('Private Not Found', ErrorCodes.NotFound);
}
