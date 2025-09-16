import { CustomClerkProvider } from './CustomClerkProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return <CustomClerkProvider>{children}</CustomClerkProvider>;
}
