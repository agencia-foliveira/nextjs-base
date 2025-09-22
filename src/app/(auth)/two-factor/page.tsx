import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function TwoFactorPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-sm p-8 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-center mb-2">Autenticação em duas etapas</h1>
        <p className="text-gray-600 text-center mb-4">
          Digite o código de verificação gerado pelo seu app autenticador.
        </p>
        <form className="flex flex-col gap-4">
          <div>
            <Label htmlFor="otp">Código OTP</Label>
            <Input
              id="otp"
              name="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              pattern="[0-9]{6}"
              placeholder="000000"
              required
              className="tracking-widest text-lg text-center"
            />
          </div>
          <Button type="submit" className="w-full">
            Verificar
          </Button>
        </form>
      </Card>
    </main>
  );
}
