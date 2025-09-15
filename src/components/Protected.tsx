"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedProps {
  children: React.ReactNode;
  requiredPermission?: string;
  requiredSector?: string;
  fallback?: React.ReactNode;
}
export const Protected: React.FC<ProtectedProps> = ({
  children,
  requiredPermission,
  requiredSector,
  fallback,
}) => {
  const { user, loading, hasPermission, hasSectorAccess } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/entrar");
      return;
    }

    if (!loading && user) {
      if (requiredPermission && !hasPermission(requiredPermission)) {
        router.push(
          `/sem-acesso?page=${pathname}&required_permission=${requiredPermission}`,
        );
        return;
      }

      if (requiredSector && !hasSectorAccess(requiredSector)) {
        router.push(
          `/sem-acesso?page=${pathname}&required_sector=${requiredSector}`,
        );
        return;
      }
    }
  }, [
    user,
    loading,
    requiredPermission,
    requiredSector,
    hasPermission,
    hasSectorAccess,
    router,
    pathname,
  ]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full size-16 border-b-2"></div>
      </div>
    );

  if (!user) return fallback || null;

  if (requiredPermission && !hasPermission(requiredPermission))
    return router.push(
      `/sem-acesso?page=${pathname}&required_permission=${requiredPermission}`,
    );

  if (requiredSector && !hasSectorAccess(requiredSector))
    return router.push(
      `/sem-acesso?page=${pathname}&required_sector=${requiredSector}`,
    );

  return <>{children}</>;
};
