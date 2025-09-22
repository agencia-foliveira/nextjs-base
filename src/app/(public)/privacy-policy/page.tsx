import { Card } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-2xl p-8 flex flex-col gap-6">
        <h1 className="text-3xl font-bold mb-2 text-center">Política de Privacidade</h1>
        <section className="text-gray-700 text-sm space-y-4">
          <p>
            Esta política de privacidade descreve como coletamos, usamos, armazenamos e protegemos
            seus dados pessoais em conformidade com a LGPD/GDPR.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Coleta mínima:</strong> Apenas dados essenciais para funcionamento do sistema.
            </li>
            <li>
              <strong>Finalidade:</strong> Utilizamos seus dados apenas para autenticação,
              autorização e funcionalidades do sistema.
            </li>
            <li>
              <strong>Consentimento:</strong> Solicitamos seu consentimento explícito no cadastro.
            </li>
            <li>
              <strong>Portabilidade:</strong> Você pode exportar seus dados a qualquer momento.
            </li>
            <li>
              <strong>Exclusão:</strong> Você pode solicitar a exclusão definitiva da sua conta e
              dados.
            </li>
            <li>
              <strong>Segurança:</strong> Seus dados são protegidos por criptografia e armazenados
              em ambiente seguro.
            </li>
            <li>
              <strong>Compartilhamento:</strong> Não compartilhamos seus dados com terceiros sem
              autorização legal ou judicial.
            </li>
            <li>
              <strong>Incidentes:</strong> Em caso de incidente de segurança, você será notificado
              conforme exigido por lei.
            </li>
            <li>
              <strong>Contato:</strong> Para dúvidas ou solicitações, entre em contato pelo email
              suporte@exemplo.com.
            </li>
          </ul>
          <p>
            Esta política pode ser atualizada periodicamente. Recomendamos revisá-la regularmente.
          </p>
        </section>
      </Card>
    </main>
  );
}
