"use client";

import {
  AlertTriangle,
  ArrowLeft,
  Building,
  Home,
  Shield,
  User,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SemAcessoPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = searchParams.get("page");
  const requiredPermission = searchParams.get("required_permission");
  const requiredSector = searchParams.get("required_sector");

  const formatPermission = (permission: string) => {
    return permission
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatSector = (sector: string) => {
    const sectorNames: { [key: string]: string } = {
      gestao: "Gestão",
      credito: "Crédito",
      administrativo: "Administrativo",
    };
    return (
      sectorNames[sector] || sector.charAt(0).toUpperCase() + sector.slice(1)
    );
  };

  const getErrorInfo = () => {
    if (requiredPermission) {
      return {
        type: "permission",
        title: "Permissão Insuficiente",
        description: `Você não possui a permissão necessária para acessar esta página.`,
        detail: `Permissão necessária: ${formatPermission(requiredPermission)}`,
        icon: Shield,
      };
    }

    if (requiredSector) {
      return {
        type: "sector",
        title: "Setor Não Autorizado",
        description: `Seu setor atual não tem acesso a esta funcionalidade.`,
        detail: `Setor necessário: ${formatSector(requiredSector)}`,
        icon: Building,
      };
    }

    return {
      type: "general",
      title: "Acesso Negado",
      description: "Você não tem autorização para acessar esta página.",
      detail: null,
      icon: User,
    };
  };

  const errorInfo = getErrorInfo();
  const IconComponent = errorInfo.icon;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Card principal */}
        <Card className="shadow-lg border-0 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">
                {errorInfo.title}
              </CardTitle>
              <CardDescription className="mt-2">
                {errorInfo.description}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Informações específicas do erro */}
            {errorInfo.detail && (
              <Alert>
                <IconComponent />
                <AlertTitle>Detalhes do Acesso</AlertTitle>
                <AlertDescription>{errorInfo.detail}</AlertDescription>
              </Alert>
            )}

            {/* Informações da página tentada */}
            {page && (
              <div className="rounded-lg p-3 border">
                <p className="text-sm mb-1">Página solicitada:</p>
                <Badge variant="secondary" className="font-mono text-xs">
                  {page}
                </Badge>
              </div>
            )}

            {/* Botões de ação */}
            <div className="flex flex-col gap-3 pt-4">
              <Button
                onClick={() => router.back()}
                variant="outline"
                className="w-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>

              <Button onClick={() => router.push("/")} className="w-full">
                <Home className="w-4 h-4 mr-2" />
                Ir para Início
              </Button>
            </div>

            {/* Informações de contato */}
            <div className="text-center pt-4 border-t">
              <p className="text-xs text-slate-500">
                Precisa de acesso? Entre em contato com o administrador do
                sistema.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Informações adicionais */}
        <div className="text-center">
          <p className="text-sm text-slate-400">
            Se você acredita que isso é um erro, verifique suas permissões ou
            contate o suporte.
          </p>
        </div>
      </div>
    </div>
  );
}
