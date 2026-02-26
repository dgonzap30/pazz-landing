import { useState, useEffect, useRef, useCallback, type ReactNode } from "react";
import { RevealOnScroll } from "@/ui/RevealOnScroll";
import { SectionHeading } from "@/ui/SectionHeading";
import { StaggerGroup, staggerItem } from "@/ui/StaggerGroup";
import { cn } from "@/lib/cn";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Send,
  Search,
  ChevronRight,
  Bell,
  Home,
  Car,
  Info,
  Check,
  X as XIcon,
  QrCode,
} from "lucide-react";

/* ─── Types ─── */

type ScreenKey = "dashboard" | "pipeline" | "quoter";

const SCREEN_ORDER: Record<ScreenKey, number> = {
  dashboard: 0,
  pipeline: 1,
  quoter: 2,
};

/* ─── Helpers ─── */

function formatMXN(value: number): string {
  return "$" + value.toLocaleString("en-US");
}

function useCountUp(target: number, inView: boolean, duration = 1.2): number {
  const [value, setValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;
    const start = Date.now();
    let rafId: number;
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, target, duration]);

  return value;
}

/* ─── WhatsApp Icon (exact path from real app) ─── */

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.981.998-3.648-.235-.374a9.86 9.86 0 01-1.511-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ─── QR Code SVG ─── */

const QR_PATH = (() => {
  const size = 25;
  const paths: string[] = [];

  const drawFinder = (sx: number, sy: number) => {
    for (let r = 0; r < 7; r++)
      for (let c = 0; c < 7; c++) {
        if (
          r === 0 ||
          r === 6 ||
          c === 0 ||
          c === 6 ||
          (r >= 2 && r <= 4 && c >= 2 && c <= 4)
        )
          paths.push(`M${sx + c},${sy + r}h1v1h-1z`);
      }
  };
  drawFinder(0, 0);
  drawFinder(size - 7, 0);
  drawFinder(0, size - 7);

  for (let i = 8; i < size - 8; i++) {
    if (i % 2 === 0) {
      paths.push(`M${i},6h1v1h-1z`);
      paths.push(`M6,${i}h1v1h-1z`);
    }
  }

  const ap = 16;
  for (let r = -2; r <= 2; r++)
    for (let c = -2; c <= 2; c++) {
      if (Math.abs(r) === 2 || Math.abs(c) === 2 || (r === 0 && c === 0))
        paths.push(`M${ap + c},${ap + r}h1v1h-1z`);
    }

  for (let r = 0; r < size; r++)
    for (let c = 0; c < size; c++) {
      if (
        (r < 8 && c < 8) ||
        (r < 8 && c > size - 9) ||
        (r > size - 9 && c < 8)
      )
        continue;
      if (r === 6 || c === 6) continue;
      if (Math.abs(r - ap) <= 2 && Math.abs(c - ap) <= 2) continue;
      if (r >= 9 && r <= 15 && c >= 9 && c <= 15) continue;
      const hash = ((r * 31 + c * 17 + 42) * 2654435761) >>> 0;
      if (hash % 5 < 2) paths.push(`M${c},${r}h1v1h-1z`);
    }

  return paths.join("");
})();

/* ─── Phone Frame ─── */

function PhoneMockup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative w-[300px] sm:w-[320px] lg:w-[340px]",
        className,
      )}
    >
      <div className="dark-ui rounded-[3rem] border border-white/[0.08] bg-neutral-900 p-3 shadow-[0_8px_60px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_120px_rgba(0,0,0,0.3)]">
        {/* Dynamic island */}
        <div className="mx-auto mb-2 h-[28px] w-[120px] rounded-full bg-black" />
        {/* Screen */}
        <div className="rounded-[2.25rem] bg-white overflow-hidden">
          {children}
        </div>
        {/* Home indicator */}
        <div className="mx-auto mt-2 h-[5px] w-[120px] rounded-full bg-white/20" />
      </div>
    </div>
  );
}

/* ─── App Header (real Pazz assets) ─── */

function AppHeader() {
  return (
    <div className="flex items-center justify-between px-5 pt-5 pb-3">
      <img
        src="/logos/pazz-partner-plus-black.svg"
        alt="PAZZ Partner+"
        className="h-8"
        draggable={false}
      />
      <div className="flex items-center gap-1.5 pl-2.5 pr-3 py-1.5 rounded-full bg-brand-500/10">
        <img
          src="/assets/starIcon.png"
          alt=""
          className="w-5 h-5 object-contain"
          draggable={false}
        />
        <span className="text-sm font-bold text-gray-900">Bronce</span>
      </div>
    </div>
  );
}

/* ─── Bottom Navigation ─── */

const BOTTOM_NAV: { icon: typeof Home; label: string; screen: ScreenKey }[] = [
  { icon: Home, label: "Inicio", screen: "dashboard" },
  { icon: Users, label: "Seguimiento", screen: "pipeline" },
  { icon: Car, label: "Leasing", screen: "quoter" },
];

function BottomNav({
  active,
  onNavigate,
}: {
  active: ScreenKey;
  onNavigate: (screen: ScreenKey) => void;
}) {
  return (
    <div className="flex items-center justify-around border-t border-gray-100 bg-white px-2 py-2.5 shrink-0">
      {BOTTOM_NAV.map((item) => {
        const Icon = item.icon;
        const isActive = item.screen === active;
        return (
          <button
            key={item.screen}
            onClick={() => onNavigate(item.screen)}
            className="flex flex-col items-center gap-0.5 min-w-0 cursor-pointer active:scale-90 transition-transform"
          >
            <div
              className={cn(
                "p-1.5 rounded-xl transition-colors",
                isActive && "bg-brand-500",
              )}
            >
              <Icon
                className={cn(
                  "w-[18px] h-[18px]",
                  isActive ? "text-white" : "text-gray-400",
                )}
                strokeWidth={isActive ? 2.5 : 1.8}
              />
            </div>
            <span
              className={cn(
                "text-[9px] font-semibold truncate",
                isActive ? "text-gray-900" : "text-gray-400",
              )}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ─── Toast ─── */

function Toast({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-16 left-4 right-4 z-50 bg-gray-900 text-white text-xs font-medium px-4 py-2.5 rounded-xl shadow-lg text-center pointer-events-none"
    >
      <div className="flex items-center justify-center gap-2">
        <Check className="w-3.5 h-3.5 text-emerald-400" strokeWidth={3} />
        {message}
      </div>
    </motion.div>
  );
}

/* ─── QR Overlay ─── */

function QROverlay({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white rounded-2xl p-6 shadow-2xl mx-6 w-full max-w-[260px]"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-sm font-bold text-gray-900 text-center mb-4">
          Escanea el código QR
        </p>
        <div className="flex justify-center mb-4">
          <div className="relative rounded-xl overflow-hidden border border-gray-100 p-2">
            <svg
              className="w-[150px] h-[150px]"
              viewBox="0 0 25 25"
              shapeRendering="crispEdges"
            >
              <rect width="25" height="25" fill="white" />
              <path d={QR_PATH} fill="#1a1a1a" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/logos/pazz-icon.svg"
                className="w-8 h-8 rounded-md bg-white p-0.5 shadow-sm"
                alt=""
              />
            </div>
          </div>
        </div>
        <p className="text-[11px] text-gray-400 text-center mb-4 leading-relaxed">
          Tu contacto será redirigido a la precalificación de Pazz.
        </p>
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-gray-100 text-sm font-semibold text-gray-700 cursor-pointer active:scale-[0.97] transition-transform hover:bg-gray-200"
        >
          Cerrar
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ─── Client Card ─── */

function ClientCard({
  name,
  subtitle,
  showBell = true,
  uppercase = false,
  onClick,
}: {
  name: string;
  subtitle: string;
  showBell?: boolean;
  uppercase?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer active:scale-[0.98]"
    >
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "text-sm font-semibold text-gray-900 truncate",
            uppercase && "uppercase",
          )}
        >
          {name}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
      </div>
      <div className="flex items-center gap-2 ml-3 shrink-0">
        {showBell && (
          <div className="w-6 h-6 rounded-full bg-brand-500 flex items-center justify-center">
            <Bell className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
          </div>
        )}
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
}

/* ─── Client Detail Drawer ─── */

const PIPELINE_STAGES = [
  "Precalificación",
  "Documentación",
  "Comité",
  "Contratación",
];

function ClientDetailDrawer({
  name,
  currentStage,
  onClose,
}: {
  name: string;
  currentStage: number;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-40 flex items-end bg-black/30"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="w-full bg-white rounded-t-2xl p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 rounded-full bg-gray-200 mx-auto mb-4" />
        <p className="text-sm font-bold text-gray-900 uppercase mb-1">
          {name}
        </p>
        <p className="text-xs text-gray-500 mb-5">Progreso del referido</p>

        {/* Pipeline stepper */}
        <div className="flex items-center justify-between mb-5">
          {PIPELINE_STAGES.map((stage, i) => (
            <div key={stage} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors",
                    i < currentStage
                      ? "bg-emerald-500 text-white"
                      : i === currentStage
                        ? "bg-brand-500 text-white"
                        : "bg-gray-100 text-gray-400",
                  )}
                >
                  {i < currentStage ? (
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  ) : (
                    i + 1
                  )}
                </div>
                <span className="text-[9px] text-gray-500 mt-1.5 text-center leading-tight w-14">
                  {stage}
                </span>
              </div>
              {i < PIPELINE_STAGES.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 flex-1 mx-1 rounded-full -mt-4",
                    i < currentStage ? "bg-emerald-500" : "bg-gray-200",
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-gray-100 text-sm font-semibold text-gray-600 cursor-pointer active:scale-[0.97] transition-transform"
        >
          Cerrar
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ─── Dashboard Content ─── */

function DashboardContent({
  onToast,
  showMore,
  onShowMore,
  onSelectClient,
}: {
  onToast: (msg: string) => void;
  showMore: boolean;
  onShowMore: () => void;
  onSelectClient: (name: string, stage: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const goalAmount = useCountUp(25000, inView);
  const earnedAmount = useCountUp(20000, inView, 1.4);

  return (
    <div ref={ref}>
      <AppHeader />

      <div className="px-5 space-y-5 pb-6">
        <h2 className="text-base font-bold text-gray-900">Mi actividad</h2>

        {/* Goal progress card */}
        <div className="rounded-xl border border-gray-200 p-4 space-y-3 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Meta de junio.</span>
            <ChevronRight className="w-5 h-5 text-brand-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {formatMXN(goalAmount)}
          </p>

          <div className="space-y-1">
            <span className="text-sm text-gray-500">
              Comisiones ganadas en junio.
            </span>
            <p className="text-2xl font-bold text-gray-900">
              {formatMXN(earnedAmount)}
            </p>
          </div>

          {/* Animated progress bar */}
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-brand-500 rounded-full"
              initial={{ width: 0 }}
              animate={inView ? { width: "80%" } : { width: 0 }}
              transition={{
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.3,
              }}
            />
          </div>
          <p className="text-sm text-gray-500">
            Faltan $5,000 para alcanzar tu meta.
          </p>
        </div>

        {/* Promotions */}
        <div className="rounded-xl bg-brand-500/5 border border-brand-500/10 px-4 py-3">
          <p className="text-xs font-semibold text-brand-600">
            Promociones activas
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Bono de $2,000 por cada 3 contratos cerrados este mes.
          </p>
        </div>

        {/* Clients requiring attention */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-900">
              Clientes que requieren atención
            </h3>
            <span className="text-xs font-bold text-brand-500 bg-brand-500/10 px-2 py-0.5 rounded-full">
              {showMore ? 5 : 3}
            </span>
          </div>
          <ClientCard
            name="Pedro Juan Gutiérrez"
            subtitle="Precalificación sin concluir"
            uppercase
            onClick={() => onSelectClient("Pedro Juan Gutiérrez", 0)}
          />
          <ClientCard
            name="Clínica del Monte"
            subtitle="Precalificación sin concluir"
            uppercase
            onClick={() => onSelectClient("Clínica del Monte", 0)}
          />
          <ClientCard
            name="Mariblanca Sabas Alomá"
            subtitle="Documentación pendiente"
            uppercase
            onClick={() => onSelectClient("Mariblanca Sabas Alomá", 1)}
          />
          <AnimatePresence>
            {showMore && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-3 overflow-hidden"
              >
                <ClientCard
                  name="Transportes del Valle"
                  subtitle="Comité de crédito en revisión"
                  uppercase
                  onClick={() =>
                    onSelectClient("Transportes del Valle", 2)
                  }
                />
                <ClientCard
                  name="Jorge Méndez Ruiz"
                  subtitle="Contratación pendiente"
                  uppercase
                  showBell={false}
                  onClick={() => onSelectClient("Jorge Méndez Ruiz", 3)}
                />
              </motion.div>
            )}
          </AnimatePresence>
          {!showMore && (
            <button
              onClick={onShowMore}
              className="w-full text-center text-sm font-semibold text-brand-500 py-2 cursor-pointer active:opacity-70 hover:underline"
            >
              Ver más
            </button>
          )}
        </div>

        {/* Referral invite card */}
        <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4 space-y-2.5">
          <p className="text-[13px] font-bold text-gray-900">
            Invita y gana $5,000
          </p>
          <p className="text-[11px] text-gray-500 leading-relaxed">
            Comparte tu enlace de referido y gana $5,000 por cada partner que se
            registre y cierre su primer contrato.
          </p>
          <button
            onClick={() => onToast("Invitación enviada por WhatsApp")}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-2.5 text-[13px] font-semibold text-white cursor-pointer active:scale-[0.97] transition-all hover:bg-[#20bd5a] shadow-[0_2px_8px_rgba(37,211,102,0.25)] hover:shadow-[0_4px_14px_rgba(37,211,102,0.35)]"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 shrink-0" />
            Compartir por WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Pipeline Content ─── */

function PipelineContent({
  onSelectClient,
}: {
  onSelectClient: (name: string, stage: number) => void;
}) {
  const [activeTab, setActiveTab] = useState<
    "proceso" | "ganadas" | "perdidas"
  >("proceso");

  return (
    <div>
      <AppHeader />

      <div className="px-5 space-y-4 pb-6">
        {/* Search bar */}
        <div className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 cursor-text hover:border-gray-300 transition-colors">
          <Search className="w-4 h-4 text-gray-400 shrink-0" />
          <span className="text-sm text-gray-400">Buscar cliente...</span>
        </div>

        {/* Interactive tabs */}
        <div className="flex border-b border-gray-200">
          {(
            [
              { key: "proceso", label: "En proceso" },
              { key: "ganadas", label: "Ganadas" },
              { key: "perdidas", label: "Perdidas" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "flex-1 pb-2.5 text-sm font-semibold text-center transition-colors cursor-pointer",
                activeTab === tab.key
                  ? "text-brand-500 border-b-2 border-brand-500 -mb-px"
                  : "text-gray-400 hover:text-gray-600",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {activeTab === "proceso" && (
            <motion.div
              key="proceso"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              {/* Precalificación */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-gray-900">
                      Precalificación
                    </p>
                    <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full">
                      3
                    </span>
                  </div>
                  <Info className="w-4 h-4 text-gray-400" />
                </div>
                <ClientCard
                  name="Pedro Juan Gutiérrez González"
                  subtitle="Último acceso: 14/08/2025"
                  onClick={() =>
                    onSelectClient("Pedro Juan Gutiérrez González", 0)
                  }
                />
                <ClientCard
                  name="Zilia Sánchez Domínguez"
                  subtitle="Último acceso: 14/08/2025"
                  onClick={() =>
                    onSelectClient("Zilia Sánchez Domínguez", 0)
                  }
                />
                <ClientCard
                  name="Mariblanca Sabas Alomá"
                  subtitle="Último acceso: 12/08/2025"
                  showBell={false}
                  onClick={() =>
                    onSelectClient("Mariblanca Sabas Alomá", 0)
                  }
                />
              </div>

              {/* Documentación */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-gray-900">
                      Documentación
                    </p>
                    <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full">
                      1
                    </span>
                  </div>
                  <Info className="w-4 h-4 text-gray-400" />
                </div>
                <ClientCard
                  name="Servando Cabrera Moreno"
                  subtitle="Último acceso: 14/08/2025"
                  onClick={() =>
                    onSelectClient("Servando Cabrera Moreno", 1)
                  }
                />
              </div>

              {/* Comité */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-gray-900">
                      Comité de crédito
                    </p>
                    <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full">
                      0
                    </span>
                  </div>
                  <Info className="w-4 h-4 text-gray-400" />
                </div>
                <div className="rounded-xl bg-gray-50 py-4 text-center">
                  <span className="text-sm text-gray-400">
                    No hay clientes en esta etapa.
                  </span>
                </div>
              </div>

              {/* Contratación */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-gray-900">
                      Contratación
                    </p>
                    <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full">
                      0
                    </span>
                  </div>
                  <Info className="w-4 h-4 text-gray-400" />
                </div>
                <div className="rounded-xl bg-gray-50 py-4 text-center">
                  <span className="text-sm text-gray-400">
                    No hay clientes en esta etapa.
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "ganadas" && (
            <motion.div
              key="ganadas"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Agosto 2025
              </p>
              {[
                { name: "María López García", amount: "$380,000" },
                { name: "Carlos Hernández Ruiz", amount: "$450,000" },
              ].map((deal) => (
                <div
                  key={deal.name}
                  className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                      <Check
                        className="w-3.5 h-3.5 text-white"
                        strokeWidth={3}
                      />
                    </div>
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {deal.name}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-emerald-600 shrink-0 ml-2">
                    {deal.amount}
                  </span>
                </div>
              ))}

              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider pt-2">
                Julio 2025
              </p>
              <div className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                    <Check
                      className="w-3.5 h-3.5 text-white"
                      strokeWidth={3}
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    Ana Martínez Vega
                  </p>
                </div>
                <span className="text-sm font-bold text-emerald-600 shrink-0 ml-2">
                  $520,000
                </span>
              </div>
            </motion.div>
          )}

          {activeTab === "perdidas" && (
            <motion.div
              key="perdidas"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Agosto 2025
              </p>
              <div className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3.5 shadow-sm">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center shrink-0">
                    <XIcon
                      className="w-3.5 h-3.5 text-white"
                      strokeWidth={3}
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    Roberto Sánchez M.
                  </p>
                </div>
                <span className="text-sm font-medium text-red-500 shrink-0 ml-2">
                  $280,000
                </span>
              </div>
              <div className="rounded-xl bg-gray-50 py-8 text-center">
                <p className="text-sm text-gray-400">
                  Solo 1 oportunidad perdida este mes.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Quoter Content ─── */

function QuoterContent({
  onShowQR,
  onToast,
}: {
  onShowQR: () => void;
  onToast: (msg: string) => void;
}) {
  return (
    <div>
      <AppHeader />

      <div className="px-5 space-y-5 pb-6">
        <h2 className="text-lg font-bold text-gray-900 leading-snug">
          Convierte tus contactos en clientes.
        </h2>

        {/* Step 1 */}
        <div className="rounded-2xl border border-gray-200 p-4 space-y-3 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="shrink-0 w-10 h-10 rounded-full border-2 border-brand-500 flex items-center justify-center">
              <span className="text-lg font-bold text-brand-500">1</span>
            </div>
            <div className="pt-0.5 min-w-0">
              <h3 className="text-[13px] font-bold text-gray-900 leading-snug">
                Invita a tu contacto a precalificarse.
              </h3>
              <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                Comparte un enlace para que se precalifique y descubra la
                arrendadora ideal.
              </p>
            </div>
          </div>
          <button
            onClick={onShowQR}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-brand-500 py-2.5 text-[13px] font-semibold text-brand-500 cursor-pointer active:scale-[0.97] transition-all hover:bg-brand-500/5"
          >
            <QrCode className="w-3.5 h-3.5 shrink-0" />
            Mostrar código QR
          </button>
          <button
            onClick={() =>
              onToast("Enlace de precalificación copiado")
            }
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-2.5 text-[13px] font-semibold text-white cursor-pointer active:scale-[0.97] transition-all hover:bg-[#20bd5a] shadow-[0_2px_8px_rgba(37,211,102,0.25)] hover:shadow-[0_4px_14px_rgba(37,211,102,0.35)]"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 shrink-0" />
            Enviar WhatsApp
          </button>
        </div>

        {/* Step 2 */}
        <div className="rounded-2xl border border-gray-200 p-4 space-y-3 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="shrink-0 w-10 h-10 rounded-full border-2 border-brand-500 flex items-center justify-center">
              <span className="text-lg font-bold text-brand-500">2</span>
            </div>
            <div className="pt-0.5 min-w-0">
              <h3 className="text-[13px] font-bold text-gray-900 leading-snug">
                Comparte la cotización de un auto.
              </h3>
              <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                Elige y cotiza un auto, conoce sus características y compártelo.
              </p>
            </div>
          </div>
          <button
            onClick={() => onToast("Redirigiendo al cotizador...")}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-brand-500 py-2.5 text-[13px] font-semibold text-brand-500 cursor-pointer active:scale-[0.97] transition-all hover:bg-brand-500/5"
          >
            Cotizar
          </button>
          <button
            onClick={() => onToast("Enlace de cotización copiado")}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-2.5 text-[13px] font-semibold text-white cursor-pointer active:scale-[0.97] transition-all hover:bg-[#20bd5a] shadow-[0_2px_8px_rgba(37,211,102,0.25)] hover:shadow-[0_4px_14px_rgba(37,211,102,0.35)]"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 shrink-0" />
            Enviar WhatsApp
          </button>
        </div>

        {/* Help section */}
        <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4 space-y-2.5">
          <p className="text-[13px] font-bold text-gray-900">
            Ayudar a los clientes a decidir
          </p>
          <p className="text-[11px] text-gray-500 leading-relaxed">
            Comparte información sobre beneficios fiscales del arrendamiento
            puro y ayuda a tus contactos a tomar la mejor decisión.
          </p>
          <button className="w-full flex items-center justify-center gap-2 rounded-xl border border-gray-300 py-2 text-[13px] font-semibold text-gray-700 cursor-pointer active:scale-[0.97] transition-all hover:bg-gray-100">
            Ver material de apoyo
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Phone App (navigable mini-app) ─── */

function PhoneApp({
  screen,
  onNavigate,
}: {
  screen: ScreenKey;
  onNavigate: (s: ScreenKey) => void;
}) {
  const [showQR, setShowQR] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [showMoreClients, setShowMoreClients] = useState(false);
  const [clientDrawer, setClientDrawer] = useState<{
    name: string;
    stage: number;
  } | null>(null);
  const toastTimeout = useRef<number | null>(null);
  const prevScreen = useRef(screen);
  const scrollRef = useRef<HTMLDivElement>(null);

  const direction =
    SCREEN_ORDER[screen] >= SCREEN_ORDER[prevScreen.current] ? 1 : -1;
  useEffect(() => {
    prevScreen.current = screen;
    scrollRef.current?.scrollTo({ top: 0 });
  }, [screen]);

  const showToast = useCallback(
    (msg: string) => {
      setToast(msg);
      if (toastTimeout.current) clearTimeout(toastTimeout.current);
      toastTimeout.current = window.setTimeout(() => setToast(null), 2200);
    },
    [],
  );

  const openClientDrawer = useCallback(
    (name: string, stage: number) => {
      setClientDrawer({ name, stage });
    },
    [],
  );

  return (
    <div className="flex flex-col h-[640px] lg:h-[660px] relative overflow-hidden">
      {/* Screen content */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-hide">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={screen}
            initial={{ opacity: 0, x: direction * 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {screen === "dashboard" && (
              <DashboardContent
                onToast={showToast}
                showMore={showMoreClients}
                onShowMore={() => setShowMoreClients(true)}
                onSelectClient={openClientDrawer}
              />
            )}
            {screen === "pipeline" && (
              <PipelineContent onSelectClient={openClientDrawer} />
            )}
            {screen === "quoter" && (
              <QuoterContent
                onShowQR={() => setShowQR(true)}
                onToast={showToast}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Overlays */}
      <AnimatePresence>
        {clientDrawer && (
          <ClientDetailDrawer
            name={clientDrawer.name}
            currentStage={clientDrawer.stage}
            onClose={() => setClientDrawer(null)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showQR && <QROverlay onClose={() => setShowQR(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {toast && <Toast message={toast} />}
      </AnimatePresence>

      {/* Navigation */}
      <BottomNav active={screen} onNavigate={onNavigate} />
    </div>
  );
}

/* ─── Feature Cards ─── */

const FEATURES = [
  {
    icon: Users,
    title: "Seguimiento",
    description:
      "Monitorea cada referido a través de las etapas del proceso: precalificación, documentación y contratación.",
  },
  {
    icon: LayoutDashboard,
    title: "Mi actividad",
    description:
      "Visualiza tu meta mensual, comisiones ganadas y clientes que requieren tu atención.",
  },
  {
    icon: Send,
    title: "Leasing",
    description:
      "Comparte cotizaciones y enlaces de precalificación por WhatsApp o código QR.",
  },
];

/* ─── Screen Selector (Mobile) ─── */

const MOBILE_TABS: { label: string; screen: ScreenKey }[] = [
  { label: "Inicio", screen: "dashboard" },
  { label: "Seguimiento", screen: "pipeline" },
  { label: "Leasing", screen: "quoter" },
];

/* ─── Main Component ─── */

export function ProductShowcase() {
  const [mobileScreen, setMobileScreen] = useState<ScreenKey>("dashboard");
  const [leftScreen, setLeftScreen] = useState<ScreenKey>("pipeline");
  const [centerScreen, setCenterScreen] = useState<ScreenKey>("dashboard");
  const [rightScreen, setRightScreen] = useState<ScreenKey>("quoter");

  const cascadeRef = useRef<HTMLDivElement>(null);
  const cascadeInView = useInView(cascadeRef, { once: true, margin: "-80px" });

  return (
    <section
      id="la-app"
      className="section-divider relative py-20 sm:py-24 lg:py-36 bg-neutral-950 overflow-x-clip"
    >
      {/* Subtle depth gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-dark via-neutral-950 to-surface-dark pointer-events-none" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <SectionHeading
            title="Conoce tu herramienta"
            subtitle="Todo lo que necesitas para gestionar referidos, en tu bolsillo."
          />
        </RevealOnScroll>

        {/* Mobile screen selector */}
        <div className="flex lg:hidden justify-center gap-1.5 mb-8 sm:mb-10">
          {MOBILE_TABS.map((tab) => (
            <button
              key={tab.screen}
              onClick={() => setMobileScreen(tab.screen)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-full transition-all cursor-pointer",
                mobileScreen === tab.screen
                  ? "bg-brand-500/15 text-brand-400 border border-brand-500/20"
                  : "text-neutral-500 hover:text-neutral-300",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Mobile: single navigable phone */}
        <div className="lg:hidden flex justify-center">
          <PhoneMockup>
            <PhoneApp screen={mobileScreen} onNavigate={setMobileScreen} />
          </PhoneMockup>
        </div>

        {/* Desktop: phone cascade — fans out from a single stacked phone */}
        <div ref={cascadeRef} className="relative hidden lg:block">
          {/* Warm glow — expands as phones spread */}
          <motion.div
            className="absolute bottom-[8%] left-1/2 -translate-x-1/2 h-[300px] rounded-full bg-brand-500/[0.04] blur-[150px] pointer-events-none"
            initial={{ width: 200, opacity: 0 }}
            animate={
              cascadeInView
                ? { width: 900, opacity: 1 }
                : { width: 200, opacity: 0 }
            }
            transition={{
              duration: 1.6,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.3,
            }}
          />

          {/* Perspective container */}
          <div
            className="flex items-center justify-center gap-10"
            style={{ perspective: "1400px" }}
          >
            {/* Left phone */}
            <motion.div
              initial={{ opacity: 0, x: 390, rotateY: 0, scale: 1 }}
              animate={
                cascadeInView
                  ? { opacity: 1, x: 0, rotateY: 6, scale: 0.9 }
                  : { opacity: 0, x: 390, rotateY: 0, scale: 1 }
              }
              transition={{
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.4,
              }}
              className="relative z-0"
            >
              <PhoneMockup>
                <PhoneApp screen={leftScreen} onNavigate={setLeftScreen} />
              </PhoneMockup>
            </motion.div>

            {/* Center phone */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={
                cascadeInView
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 30, scale: 0.96 }
              }
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 0,
              }}
              className="relative z-10"
            >
              <PhoneMockup>
                <PhoneApp screen={centerScreen} onNavigate={setCenterScreen} />
              </PhoneMockup>
            </motion.div>

            {/* Right phone */}
            <motion.div
              initial={{ opacity: 0, x: -390, rotateY: 0, scale: 1 }}
              animate={
                cascadeInView
                  ? { opacity: 1, x: 0, rotateY: -6, scale: 0.9 }
                  : { opacity: 0, x: -390, rotateY: 0, scale: 1 }
              }
              transition={{
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.45,
              }}
              className="relative z-0"
            >
              <PhoneMockup>
                <PhoneApp screen={rightScreen} onNavigate={setRightScreen} />
              </PhoneMockup>
            </motion.div>
          </div>
        </div>

        {/* Feature label cards */}
        <StaggerGroup
          stagger={0.1}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mt-12 sm:mt-16 lg:mt-24"
        >
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <motion.div key={f.title} variants={staggerItem}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-tint border border-edge mb-4">
                    <Icon className="w-5 h-5 text-brand-500" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-fg mb-2">
                    {f.title}
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed max-w-xs mx-auto">
                    {f.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
