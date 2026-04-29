import {
  Activity,
  ArrowRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CirclePlay,
  ClipboardCheck,
  Clock3,
  Database,
  Eye,
  FileText,
  Gauge,
  GitBranch,
  Globe2,
  Hexagon,
  Layers3,
  Lock,
  Mail,
  PlayCircle,
  RefreshCw,
  RotateCcw,
  Search,
  Shield,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

type MetricCardProps = {
  title: string;
  value: string;
  note: string;
  tone?: "blue" | "amber" | "red";
  children?: ReactNode;
};

type DashboardView = "overview" | "agents" | "metrics" | "policies" | "audit" | "approvals" | "risk";
type DecisionStatus = "Waiting" | "Approved" | "Rejected" | "Escalated";

const brands = ["Pioneer", "Northstar", "Arcadia", "Chainworks", "Vertex"];

const approvals = [
  ["send_email", "OutreachAgent", "Pending", "2m ago"],
  ["update_record", "DataAgent", "Pending", "5m ago"],
  ["approve_refund", "FinanceAgent", "Pending", "8m ago"],
  ["delete_document", "AdminAgent", "Blocked", "12m ago"],
];

const timeline = [
  ["10:24:31", "Run started", "Agent: SupportAgent", "blue"],
  ["10:24:35", "User request received", "What is the status of order #89432?", "blue"],
  ["10:24:37", "Policy check", "Passed", "green"],
  ["10:24:38", "Tool Call: search_orders", "Approved", "green"],
  ["10:24:41", "Tool Call: send_email", "Pending Approval", "amber"],
  ["10:24:45", "Run completed", "Pending", "slate"],
];

const auditRows = [
  ["10:24:41", "APPROVED", "Tool Call: search_orders", "by Alex Kim"],
  ["10:24:38", "PENDING", "Tool Call: send_email", "by Priya Shah"],
  ["10:24:35", "POLICY CHECK", "Data Access Policy", "by System"],
  ["10:24:31", "RUN STARTED", "SupportAgent", "by System"],
];

const scorecards = [
  ["Groundedness", 82, "bg-blue-400"],
  ["Relevance", 79, "bg-violet-400"],
  ["Safety", 91, "bg-emerald-400"],
  ["Completeness", 74, "bg-amber-400"],
];

const tools = [
  ["send_email", "Email Service", "Approved"],
  ["search_orders", "Order DB", "Approved"],
  ["update_record", "CRM System", "Approved"],
  ["delete_document", "File Storage", "Blocked"],
];

const features = [
  [Users, "Human Approvals", "Require human review for high-risk actions and tool calls before execution."],
  [ShieldCheck, "Policy Enforcement", "Enforce granular policies across agents, tools, data, and contexts."],
  [ClipboardCheck, "Auditability", "Complete, immutable audit logs for every run and every action."],
  [Database, "RAG Transparency", "Trace retrieval, sources and context for every generated response."],
  [RotateCcw, "Run Replay", "Replay any run step-by-step for debugging, review, and analysis."],
  [BarChart3, "Operational Metrics", "Deep observability into performance, reliability, cost, and risk."],
];

const stats = [
  [Eye, "99.9%", "Workflow visibility"],
  [Layers3, "6", "Control layers"],
  [ShieldCheck, "100%", "Audit coverage"],
  [Clock3, "24/7", "Audit trail"],
  [Users, "1,000+", "Agents governed"],
  [Globe2, "Global", "Enterprise ready"],
];

function emitDemoAction(message: string) {
  window.dispatchEvent(new CustomEvent<string>("agentops-demo-action", { detail: message }));
}

const sidebarItems: Array<{ icon: typeof Shield; label: string; view: DashboardView }> = [
  { icon: Shield, label: "Overview", view: "overview" },
  { icon: Hexagon, label: "Agent runs", view: "agents" },
  { icon: BarChart3, label: "Metrics", view: "metrics" },
  { icon: ShieldCheck, label: "Policies", view: "policies" },
  { icon: FileText, label: "Audit logs", view: "audit" },
  { icon: Users, label: "Approvals", view: "approvals" },
  { icon: Gauge, label: "Risk score", view: "risk" },
];

export default function App() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#020611] text-white">
      <BackgroundAccents />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <FeatureGrid />
        <StatsStrip />
      </main>
    </div>
  );
}

function BackgroundAccents() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_26%_18%,rgba(37,99,235,.12),transparent_28rem),radial-gradient(circle_at_78%_20%,rgba(124,58,237,.16),transparent_34rem)]" />
      <div className="absolute left-[34%] top-[31rem] h-[45rem] w-[45rem] rounded-full border border-blue-400/30 bg-blue-500/5 shadow-[0_0_120px_rgba(59,130,246,.35)]" />
      <div className="absolute left-[37%] top-[34rem] h-[39rem] w-[39rem] rounded-full border border-blue-300/20" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,.035)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(circle_at_50%_25%,black,transparent_74%)]" />
    </div>
  );
}

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#020611]/75 backdrop-blur-2xl">
      <div className="mx-auto flex h-20 max-w-[1680px] items-center justify-between px-6 sm:px-10 lg:px-24">
        <a className="flex items-center gap-4" href="#">
          <LogoMark />
          <span className="text-xl font-semibold tracking-[-0.02em] text-white">AgentOps Control Hub</span>
        </a>
        <nav className="hidden items-center gap-10 text-sm font-medium text-slate-200 lg:flex">
          <a className="flex items-center gap-1 transition hover:text-white" href="#platform">
            Platform <ChevronDown className="h-4 w-4" />
          </a>
          <a className="transition hover:text-white" href="#security">Security</a>
          <a className="transition hover:text-white" href="#observability">Observability</a>
          <a className="transition hover:text-white" href="#pricing">Pricing</a>
          <a className="transition hover:text-white" href="#docs">Docs</a>
        </nav>
        <a
          href="#demo"
          className="group inline-flex items-center gap-2 rounded-xl border border-blue-300/25 bg-blue-600 px-5 py-3 text-sm font-semibold shadow-glow transition hover:-translate-y-0.5 hover:bg-blue-500"
        >
          Request Demo <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </a>
      </div>
    </header>
  );
}

function LogoMark() {
  return (
    <div className="relative grid h-10 w-10 place-items-center">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 opacity-70 blur-sm" />
      <div className="relative grid h-9 w-9 place-items-center rounded-2xl border border-blue-200/25 bg-slate-950">
        <Hexagon className="h-6 w-6 rotate-12 text-blue-400" />
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="platform" className="relative border-b border-white/10">
      <div className="mx-auto grid max-w-[1760px] gap-10 px-6 py-14 sm:px-10 lg:grid-cols-[0.72fr_1.44fr] lg:px-16 xl:px-20 lg:py-20">
        <div className="relative z-10 flex flex-col justify-center">
          <div className="mb-7 inline-flex w-fit items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-4 py-2 text-xs font-semibold text-blue-100 shadow-[0_0_30px_rgba(59,130,246,.16)]">
            <span className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,.9)]" />
            Enterprise AI Governance
          </div>
          <h1 className="max-w-2xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl xl:text-7xl">
            Control, Observe and Govern{" "}
            <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-violet-400 bg-clip-text text-transparent">
              AI Agent Workflows
            </span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">
            Secure tool access. Enforce policy. Require approvals. Achieve full auditability,
            observability and evaluation across every AI agent run.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a className="group inline-flex items-center justify-center gap-3 rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold shadow-glow transition hover:-translate-y-0.5 hover:bg-blue-500" href="#demo">
              See Platform <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </a>
            <a className="inline-flex items-center justify-center gap-3 rounded-xl border border-blue-300/25 bg-slate-950/65 px-8 py-4 text-base font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-blue-300/50 hover:bg-slate-900" href="#demo">
              View Demo <CirclePlay className="h-5 w-5 text-blue-300" />
            </a>
          </div>
          <div className="mt-14">
            <p className="text-sm text-slate-400">Trusted by leading teams building with AI</p>
            <div className="mt-5 flex flex-wrap gap-x-7 gap-y-4 text-sm font-semibold text-slate-300">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center gap-2 opacity-80">
                  <Sparkles className="h-4 w-4 text-slate-400" />
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>
        <DashboardPreview />
      </div>
    </section>
  );
}

function DashboardPreview() {
  const [activeView, setActiveView] = useState<DashboardView>("overview");
  const [timeRange, setTimeRange] = useState("Last 7 days");
  const [rangeOpen, setRangeOpen] = useState(false);
  const [refreshedAt, setRefreshedAt] = useState("Just now");
  const [notice, setNotice] = useState("");
  const [decisionStatus, setDecisionStatus] = useState<DecisionStatus>("Waiting");

  useEffect(() => {
    const handler = (event: Event) => {
      const message = (event as CustomEvent<string>).detail;
      if (message) setNotice(message);
    };
    window.addEventListener("agentops-demo-action", handler);
    return () => window.removeEventListener("agentops-demo-action", handler);
  }, []);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(""), 2400);
    return () => window.clearTimeout(timer);
  }, [notice]);

  function handleRefresh() {
    const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setRefreshedAt(currentTime);
    setNotice(`Dashboard refreshed at ${currentTime}`);
  }

  function handleDecision(status: DecisionStatus) {
    setDecisionStatus(status);
    setNotice(`Decision marked as ${status.toLowerCase()}`);
  }

  return (
    <div id="demo" className="glass-panel relative min-h-[660px] overflow-hidden rounded-3xl xl:min-w-[980px] 2xl:min-w-[1060px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(59,130,246,.18),transparent_28rem)]" />
      {notice ? (
        <div className="absolute right-6 top-6 z-30 rounded-xl border border-cyan-300/20 bg-slate-950/90 px-4 py-3 text-xs font-semibold text-cyan-100 shadow-glow backdrop-blur-xl">
          {notice}
        </div>
      ) : null}
      <div className="relative grid h-full grid-cols-[64px_1fr]">
        <Sidebar activeView={activeView} onViewChange={setActiveView} />
        <div className="min-w-0 overflow-hidden border-l border-white/10 p-5 md:p-7">
          <DashboardTopBar
            title={viewTitle(activeView)}
            timeRange={timeRange}
            rangeOpen={rangeOpen}
            refreshedAt={refreshedAt}
            onToggleRange={() => setRangeOpen((value) => !value)}
            onRangeSelect={(range) => {
              setTimeRange(range);
              setRangeOpen(false);
              setNotice(`Time range changed to ${range}`);
            }}
            onRefresh={handleRefresh}
          />
          {activeView === "overview" ? <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard title="Agent Runs" value="1,284" note="+18.4% vs prev 7 days">
              <Sparkline tone="blue" />
            </MetricCard>
            <MetricCard title="Approval Queue" value="23" note="Pending Approval" tone="amber">
              <Sparkline tone="amber" />
            </MetricCard>
            <MetricCard title="Risk Score" value="Medium" note="Risk score 56 / 100" tone="amber">
              <GaugeCircle value={56} />
            </MetricCard>
            <MetricCard title="Incidents" value="7" note="+2 vs prev 7 days" tone="red">
              <Sparkline tone="red" />
            </MetricCard>
          </div> : null}
          <DashboardContent activeView={activeView} decisionStatus={decisionStatus} onDecision={handleDecision} />
        </div>
      </div>
    </div>
  );
}

function Sidebar({ activeView, onViewChange }: { activeView: DashboardView; onViewChange: (view: DashboardView) => void }) {
  return (
    <aside className="flex flex-col items-center justify-between border-r border-white/10 bg-slate-950/55 py-6">
      <div className="flex flex-col items-center gap-5">
        <LogoMark />
        <div className="flex flex-col gap-4">
          {sidebarItems.map(({ icon: Icon, label, view }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              title={label}
              onClick={() => onViewChange(view)}
              className={`group relative grid h-10 w-10 place-items-center rounded-xl border transition ${
                activeView === view
                  ? "border-blue-400/30 bg-blue-500/20 text-blue-200 shadow-glow"
                  : "border-transparent text-slate-500 hover:border-white/10 hover:bg-white/5 hover:text-slate-200"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="pointer-events-none absolute left-12 top-1/2 z-20 -translate-y-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-slate-950/95 px-3 py-2 text-[11px] font-semibold text-slate-100 opacity-0 shadow-2xl shadow-black/40 transition group-hover:translate-x-1 group-hover:opacity-100">
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="relative h-9 w-9 overflow-hidden rounded-full border border-cyan-300/30 bg-slate-800 shadow-[0_0_24px_rgba(34,211,238,.24)]">
        <img
          src="/images/autor-logo.png"
          alt="Daniel Danek"
          className="h-full w-full object-cover"
        />
      </div>
    </aside>
  );
}

function TooltipButton({
  children,
  tooltip,
  placement = "bottom",
  align = "center",
  className = "",
  onClick,
  ariaLabel,
}: {
  children: ReactNode;
  tooltip: string;
  placement?: "top" | "bottom";
  align?: "center" | "end";
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  const placementClass =
    placement === "top"
      ? "bottom-full mb-2 group-hover:-translate-y-1"
      : "top-full mt-2 group-hover:translate-y-1";
  const alignClass =
    align === "end"
      ? "right-0"
      : "left-1/2 -translate-x-1/2";

  return (
    <button type="button" aria-label={ariaLabel} onClick={onClick} className={`group relative ${className}`}>
      {children}
      <span className={`pointer-events-none absolute z-[100] w-max max-w-[260px] rounded-lg border border-cyan-300/20 bg-[#020611] px-3 py-2 text-center text-[11px] font-semibold leading-4 text-slate-50 opacity-0 shadow-[0_18px_40px_rgba(0,0,0,.65),0_0_24px_rgba(59,130,246,.22)] ring-1 ring-white/10 transition group-hover:opacity-100 ${placementClass} ${alignClass}`}>
        {tooltip}
      </span>
    </button>
  );
}

function DashboardTopBar({
  title,
  timeRange,
  rangeOpen,
  refreshedAt,
  onToggleRange,
  onRangeSelect,
  onRefresh,
}: {
  title: string;
  timeRange: string;
  rangeOpen: boolean;
  refreshedAt: string;
  onToggleRange: () => void;
  onRangeSelect: (range: string) => void;
  onRefresh: () => void;
}) {
  const ranges = ["Last 24 hours", "Last 7 days", "Last 30 days"];

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-semibold tracking-[-0.02em]">{title}</h2>
        <ChevronDown className="h-4 w-4 text-slate-500" />
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <TooltipButton
            tooltip="Change the dashboard time window used by metrics and logs."
            onClick={onToggleRange}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2 text-xs text-slate-300 transition hover:border-blue-300/30 hover:bg-blue-500/10 hover:text-white"
            ariaLabel="Select time range"
          >
            <CalendarDays className="h-4 w-4" /> {timeRange} <ChevronDown className="h-3 w-3" />
          </TooltipButton>
          {rangeOpen ? (
            <div className="absolute right-0 top-11 z-40 w-40 rounded-xl border border-white/10 bg-slate-950/95 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-xl">
              {ranges.map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => onRangeSelect(range)}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-xs font-medium transition ${
                    range === timeRange ? "bg-blue-500/20 text-blue-100" : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <TooltipButton
          tooltip={`Refresh simulated dashboard data. Last refreshed: ${refreshedAt}.`}
          onClick={onRefresh}
          className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-slate-950/60 text-slate-300 transition hover:border-blue-300/30 hover:bg-blue-500/10 hover:text-white"
          ariaLabel="Refresh dashboard"
        >
          <RefreshCw className="h-4 w-4" />
        </TooltipButton>
      </div>
    </div>
  );
}

function viewTitle(view: DashboardView) {
  const titles: Record<DashboardView, string> = {
    overview: "Overview",
    agents: "Agent Runs",
    metrics: "Operational Metrics",
    policies: "Policy Controls",
    audit: "Audit Logs",
    approvals: "Approval Center",
    risk: "Risk Command",
  };
  return titles[view];
}

function DashboardContent({
  activeView,
  decisionStatus,
  onDecision,
}: {
  activeView: DashboardView;
  decisionStatus: DecisionStatus;
  onDecision: (status: DecisionStatus) => void;
}) {
  if (activeView === "overview") {
    return (
      <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <ApprovalQueue />
        <RunTimeline />
        <RiskPanel />
        <AuditLogs />
        <EvaluationScorecard />
        <SecureToolAccess />
      </div>
    );
  }

  if (activeView === "agents") {
    return (
      <ViewShell
        title="Live agent execution control"
        copy="Track active agents, tool usage, policy gates and run completion across the fleet."
        stats={[["Active agents", "42"], ["Runs today", "1,284"], ["Tool calls", "8,931"]]}
      >
        <RunTimeline />
        <AgentFleetPanel />
      </ViewShell>
    );
  }

  if (activeView === "metrics") {
    return (
      <ViewShell
        title="Reliability, quality and cost signals"
        copy="Measure agent workflow health across evaluations, latency, replay outcomes and operating cost."
        stats={[["Eval score", "0.82"], ["p95 latency", "2.4s"], ["Cost/run", "$0.018"]]}
      >
        <EvaluationScorecard />
        <MetricsPanel />
      </ViewShell>
    );
  }

  if (activeView === "policies") {
    return (
      <ViewShell
        title="Policy enforcement surface"
        copy="Review enforced controls for tools, data scopes, approval gates and blocked actions."
        stats={[["Policies", "18"], ["Blocked", "7"], ["Coverage", "100%"]]}
      >
        <PolicyPanel />
        <SecureToolAccess />
      </ViewShell>
    );
  }

  if (activeView === "audit") {
    return (
      <ViewShell
        title="Immutable audit trail"
        copy="Inspect every approval, policy check, tool call and operator decision in one place."
        stats={[["Audit events", "12.4K"], ["Retention", "365d"], ["Exports", "JSON"]]}
      >
        <AuditLogs />
        <AuditDetailPanel />
      </ViewShell>
    );
  }

  if (activeView === "approvals") {
    return (
      <ViewShell
        title="Human-in-the-loop approval queue"
        copy="Prioritize risky requests and approve, reject or escalate agent tool calls."
        stats={[["Pending", "23"], ["SLA breach", "2"], ["Approved", "96%"]]}
      >
        <ApprovalQueue />
        <ApprovalDecisionPanel decisionStatus={decisionStatus} onDecision={onDecision} />
      </ViewShell>
    );
  }

  return (
    <ViewShell
      title="Risk command center"
      copy="Understand why a run is risky before it touches sensitive tools or data."
      stats={[["Risk score", "56"], ["Critical tools", "4"], ["Incidents", "7"]]}
    >
      <RiskPanel />
      <RiskFactorsPanel />
    </ViewShell>
  );
}

function ViewShell({
  title,
  copy,
  stats,
  children,
}: {
  title: string;
  copy: string;
  stats: Array<[string, string]>;
  children: ReactNode;
}) {
  return (
    <div className="mt-5 space-y-4">
      <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-5 shadow-xl shadow-black/20">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">Selected dashboard</div>
            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{title}</h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{copy}</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {stats.map(([label, value]) => (
              <div key={label} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <div className="text-xl font-semibold tracking-[-0.04em]">{value}</div>
                <div className="mt-1 text-[10px] font-medium uppercase text-slate-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">{children}</div>
    </div>
  );
}

function MetricCard({ title, value, note, tone = "blue", children }: MetricCardProps) {
  const noteColor = tone === "red" ? "text-rose-400" : tone === "amber" ? "text-amber-300" : "text-emerald-400";
  return (
    <div className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/45 p-4 shadow-xl shadow-black/20">
      <div className="text-xs font-semibold text-slate-300">{title}</div>
      <div className="mt-3 flex items-end justify-between gap-4">
        <div>
          <div className="text-2xl font-semibold tracking-[-0.04em] text-white">{value}</div>
          <div className={`mt-1 text-[11px] font-medium ${noteColor}`}>{note}</div>
        </div>
        {children}
      </div>
    </div>
  );
}

function Sparkline({ tone }: { tone: "blue" | "amber" | "red" }) {
  const stroke = tone === "red" ? "#fb7185" : tone === "amber" ? "#facc15" : "#3b82f6";
  return (
    <svg viewBox="0 0 96 48" className="h-12 w-24 overflow-visible">
      <path d="M2 41 C 12 39, 18 31, 27 33 S 43 13, 51 20 S 62 29, 70 15 S 82 27, 94 8" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <path d="M2 47 L2 41 C 12 39, 18 31, 27 33 S 43 13, 51 20 S 62 29, 70 15 S 82 27, 94 8 L94 47 Z" fill={stroke} opacity=".12" />
    </svg>
  );
}

function GaugeCircle({ value }: { value: number }) {
  return (
    <div className="relative grid h-14 w-14 place-items-center rounded-full bg-[conic-gradient(#fbbf24_0_56%,rgba(30,41,59,.9)_56%_100%)]">
      <div className="grid h-11 w-11 place-items-center rounded-full bg-slate-950 text-sm font-semibold">{value}</div>
    </div>
  );
}

function Panel({
  title,
  action,
  actionTip,
  onAction,
  children,
  className = "",
  id,
}: {
  title: string;
  action?: string;
  actionTip?: string;
  onAction?: () => void;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`relative z-10 min-w-0 overflow-visible rounded-2xl border border-white/10 bg-slate-950/45 p-4 shadow-xl shadow-black/20 hover:z-40 ${className}`}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        {action ? (
          <TooltipButton
            tooltip={actionTip ?? `${action} ${title.toLowerCase()} details.`}
            placement="top"
            align="end"
            onClick={onAction ?? (() => emitDemoAction(`${title}: ${action}`))}
            className="shrink-0 text-xs font-medium text-blue-400 transition hover:text-blue-200"
          >
            {action}
          </TooltipButton>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function ApprovalQueue() {
  return (
    <Panel title="Approval Queue" action="View all" className="scroll-mt-24" id="approval-queue">
      <div className="space-y-3">
        {approvals.map(([tool, agent, status, time]) => (
          <div key={tool} className="grid grid-cols-[32px_1fr_auto] items-center gap-3 border-b border-white/5 pb-3 last:border-0 last:pb-0">
            <div className={`grid h-8 w-8 place-items-center rounded-lg ${status === "Blocked" ? "bg-rose-500/10 text-rose-400" : "bg-blue-500/10 text-blue-300"}`}>
              {status === "Blocked" ? <Lock className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
            </div>
            <div className="min-w-0">
              <div className="truncate text-xs font-medium text-white">Tool Call: {tool}</div>
              <div className="text-[11px] text-slate-500">Agent: {agent}</div>
            </div>
            <div className="text-right">
              <StatusChip status={status} />
              <div className="mt-1 text-[10px] text-slate-500">{time}</div>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function RunTimeline() {
  return (
    <Panel title="Run Timeline" action="View run" className="xl:row-span-1">
      <div className="space-y-3">
        {timeline.map(([time, title, detail, tone]) => (
          <div key={`${time}-${title}`} className="grid grid-cols-[56px_18px_1fr] gap-3">
            <div className="pt-0.5 text-[11px] text-slate-500">{time}</div>
            <div className="relative flex justify-center">
              <span className={`mt-1 h-2.5 w-2.5 rounded-full ${dotColor(tone)}`} />
              <span className="absolute top-5 h-full w-px bg-white/10 last:hidden" />
            </div>
            <div>
              <div className="text-xs font-medium text-white">{title}</div>
              <div className="mt-0.5 text-[11px] text-slate-500">{detail}</div>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function RiskPanel() {
  return (
    <Panel title="Risk Score" className="scroll-mt-24" id="risk-panel">
      <div className="flex items-end gap-2">
        <div className="text-3xl font-semibold tracking-[-0.05em]">56</div>
        <div className="pb-1 text-sm text-slate-400">/ 100</div>
      </div>
      <div className="mt-5">
        <div className="h-2 overflow-hidden rounded-full bg-gradient-to-r from-emerald-400 via-amber-300 to-rose-500">
          <div className="ml-[56%] h-4 w-1 -translate-y-1 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,.8)]" />
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-slate-500">
          <span>Low (0)</span>
          <span>Critical (100)</span>
        </div>
      </div>
      <div className="mt-6">
        <div className="mb-3 text-xs font-semibold text-slate-300">Top Risk Factors</div>
        {["Tool: send_email +20", "Data Exfiltration Risk +15", "Unverified Output +10"].map((item) => (
          <div key={item} className="mb-2 flex justify-between text-xs text-slate-300">
            <span>- {item.replace(/ \+\d+$/, "")}</span>
            <span className="text-rose-400">{item.match(/\+\d+$/)?.[0]}</span>
          </div>
        ))}
      </div>
      <TooltipButton
        tooltip="Open the detailed risk explanation behind this score."
        onClick={() => emitDemoAction("Risk assessment opened")}
        className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-blue-400 transition hover:text-blue-200"
      >
        View risk assessment <ArrowRight className="h-3 w-3" />
      </TooltipButton>
    </Panel>
  );
}

function AuditLogs() {
  return (
    <Panel title="Audit Logs" action="View all" className="scroll-mt-24" id="audit-logs">
      <div className="space-y-3">
        {auditRows.map(([time, status, label, actor]) => (
          <div key={`${time}-${status}`} className="grid grid-cols-[50px_88px_1fr_auto] items-center gap-3 text-[11px]">
            <span className="text-slate-500">{time}</span>
            <StatusChip status={status} />
            <span className="truncate text-slate-300">{label}</span>
            <span className="text-slate-500">{actor}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function EvaluationScorecard() {
  return (
    <Panel title="Evaluation Scorecards" action="View all" className="scroll-mt-24" id="scorecards">
      <div className="grid grid-cols-[116px_1fr] items-center gap-6">
        <div className="relative grid h-28 w-28 place-items-center rounded-full bg-[conic-gradient(#3b82f6_0_82%,rgba(30,41,59,.9)_82%_100%)]">
          <div className="grid h-[5.5rem] w-[5.5rem] place-items-center rounded-full bg-slate-950">
            <div className="text-center">
              <div className="text-3xl font-semibold tracking-[-0.05em]">0.82</div>
              <div className="text-[10px] text-slate-400">Overall Score</div>
              <div className="text-[10px] text-emerald-400">Good</div>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          {scorecards.map(([label, value, color]) => (
            <div key={label as string}>
              <div className="mb-1 flex justify-between text-xs text-slate-300">
                <span>{label}</span>
                <span>{Number(value) / 100}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

function SecureToolAccess() {
  return (
    <Panel title="Secure Tool Access" action="View">
      <div className="space-y-3">
        {tools.map(([tool, system, status]) => (
          <div key={tool} className="grid grid-cols-[28px_1fr_auto_18px] items-center gap-3">
            <div className="grid h-7 w-7 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-300">
              {tool === "delete_document" ? <FileText className="h-4 w-4" /> : <Search className="h-4 w-4" />}
            </div>
            <div>
              <div className="text-xs font-medium text-white">{tool}</div>
              <div className="text-[11px] text-slate-500">{system}</div>
            </div>
            <StatusChip status={status} />
            <Lock className="h-4 w-4 text-slate-500" />
          </div>
        ))}
      </div>
    </Panel>
  );
}

function AgentFleetPanel() {
  return (
    <Panel title="Agent Fleet" action="Manage">
      <div className="space-y-3">
        {[
          ["SupportAgent", "Running", "312 runs", "98.4% success"],
          ["OutreachAgent", "Approval gated", "184 runs", "12 pending"],
          ["FinanceAgent", "Restricted", "93 runs", "4 blocked"],
          ["AdminAgent", "Sandboxed", "28 runs", "high risk"],
        ].map(([name, status, runs, detail]) => (
          <div key={name} className="grid grid-cols-[1fr_auto] gap-3 rounded-xl border border-white/5 bg-white/[0.025] p-3">
            <div>
              <div className="text-sm font-semibold text-white">{name}</div>
              <div className="mt-1 text-xs text-slate-500">{runs} - {detail}</div>
            </div>
            <StatusChip status={status === "Running" ? "APPROVED" : status === "Restricted" ? "POLICY CHECK" : "PENDING"} />
          </div>
        ))}
      </div>
    </Panel>
  );
}

function MetricsPanel() {
  return (
    <Panel title="Operational Metrics" action="Export">
      <div className="space-y-4">
        {[
          ["Successful runs", 94, "bg-emerald-400"],
          ["Approval latency", 64, "bg-blue-400"],
          ["Replay recovery", 71, "bg-violet-400"],
          ["Cost efficiency", 82, "bg-cyan-400"],
        ].map(([label, value, color]) => (
          <div key={label as string}>
            <div className="mb-2 flex justify-between text-xs text-slate-300"><span>{label}</span><span>{value}%</span></div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-800"><div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} /></div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function PolicyPanel() {
  return (
    <Panel title="Policy Rules" action="Edit">
      <div className="space-y-3">
        {[
          ["Email approval required", "send_email", "Enabled"],
          ["PII redaction before logging", "all tools", "Enabled"],
          ["Refund threshold review", "approve_refund", "Enabled"],
          ["Document deletion block", "delete_document", "Enforced"],
        ].map(([rule, scope, status]) => (
          <div key={rule} className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/[0.025] p-3">
            <div><div className="text-sm font-semibold">{rule}</div><div className="text-xs text-slate-500">{scope}</div></div>
            <StatusChip status={status === "Enforced" ? "POLICY CHECK" : "APPROVED"} />
          </div>
        ))}
      </div>
    </Panel>
  );
}

function AuditDetailPanel() {
  return (
    <Panel title="Audit Evidence" action="Download">
      <div className="rounded-xl border border-white/10 bg-black/30 p-4 font-mono text-xs leading-6 text-slate-300">
        <div>run_id: run_9f3ab7e0</div>
        <div>actor: SupportAgent</div>
        <div>policy_result: passed</div>
        <div>tool_call: search_orders</div>
        <div>approval: Alex Kim / approved</div>
        <div>export: immutable JSONL + signed hash</div>
      </div>
    </Panel>
  );
}

function ApprovalDecisionPanel({
  decisionStatus,
  onDecision,
}: {
  decisionStatus: DecisionStatus;
  onDecision: (status: DecisionStatus) => void;
}) {
  return (
    <Panel title="Decision Console" action="Open" actionTip="Open the full approval decision workspace.">
      <div className="space-y-4">
        <div className="rounded-xl border border-amber-400/20 bg-amber-500/10 p-4">
          <div className="text-sm font-semibold">Tool Call: send_email</div>
          <div className="mt-2 text-xs leading-5 text-slate-400">OutreachAgent wants to send a customer-facing email with generated content. Approval required by policy.</div>
          <div className="mt-3 flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-3 py-2">
            <span className="text-xs text-slate-400">Decision status</span>
            <StatusChip status={decisionStatus} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <TooltipButton
            tooltip="Allow this agent tool call to continue."
            placement="top"
            onClick={() => onDecision("Approved")}
            className="rounded-xl bg-emerald-500/15 px-4 py-3 text-xs font-semibold text-emerald-300 transition hover:bg-emerald-500/25 hover:text-emerald-100"
          >
            Approve
          </TooltipButton>
          <TooltipButton
            tooltip="Block this pending action and record the rejection in audit logs."
            placement="top"
            onClick={() => onDecision("Rejected")}
            className="rounded-xl bg-rose-500/15 px-4 py-3 text-xs font-semibold text-rose-300 transition hover:bg-rose-500/25 hover:text-rose-100"
          >
            Reject
          </TooltipButton>
          <TooltipButton
            tooltip="Route this request to a senior operator or owner."
            placement="top"
            onClick={() => onDecision("Escalated")}
            className="rounded-xl bg-blue-500/15 px-4 py-3 text-xs font-semibold text-blue-300 transition hover:bg-blue-500/25 hover:text-blue-100"
          >
            Escalate
          </TooltipButton>
        </div>
      </div>
    </Panel>
  );
}

function RiskFactorsPanel() {
  return (
    <Panel title="Risk Breakdown" action="Simulate">
      <div className="space-y-3">
        {[
          ["Sensitive tool access", "+20", "send_email can communicate externally."],
          ["Data exfiltration", "+15", "Response includes customer context."],
          ["Unverified output", "+10", "No evaluator pass has completed yet."],
          ["Policy coverage", "-8", "Approval gate reduces residual risk."],
        ].map(([label, score, copy]) => (
          <div key={label} className="rounded-xl border border-white/5 bg-white/[0.025] p-3">
            <div className="flex justify-between text-sm font-semibold"><span>{label}</span><span className={score.startsWith("-") ? "text-emerald-300" : "text-rose-300"}>{score}</span></div>
            <div className="mt-1 text-xs text-slate-500">{copy}</div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function FeatureGrid() {
  return (
    <section id="security" className="relative z-10 border-b border-white/10 py-10 sm:py-14">
      <div className="mx-auto grid max-w-[1680px] gap-8 px-6 sm:px-10 lg:grid-cols-[0.8fr_1.6fr] lg:px-24">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">Why teams use AgentOps Control Hub</div>
          <h2 className="mt-4 max-w-md text-3xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-4xl">
            Built for safe, scalable and reliable AI systems
          </h2>
          <p className="mt-5 max-w-md text-sm leading-6 text-slate-400">
            From approvals to evaluations, every control you need to operate AI agents with confidence.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {features.map(([Icon, title, copy]) => (
            <article key={title as string} className="group rounded-2xl border border-blue-300/15 bg-slate-950/50 p-5 shadow-xl shadow-black/25 transition hover:-translate-y-1 hover:border-blue-300/35 hover:shadow-glow">
              <div className="mb-7 grid h-12 w-12 place-items-center rounded-2xl border border-blue-400/25 bg-blue-500/10 text-blue-300 shadow-glow">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-base font-semibold text-white">{title as string}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{copy as string}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsStrip() {
  return (
    <section id="observability" className="relative z-10 px-6 py-9 sm:px-10 lg:px-24">
      <div className="mx-auto grid max-w-[1500px] overflow-hidden rounded-3xl border border-blue-300/15 bg-slate-950/55 shadow-2xl shadow-black/35 backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-6">
        {stats.map(([Icon, value, label], index) => (
          <div key={label as string} className={`flex items-center gap-5 p-7 ${index > 0 ? "border-t border-white/10 sm:border-l sm:border-t-0" : ""}`}>
            <Icon className="h-8 w-8 flex-none text-blue-400" />
            <div>
              <div className="text-2xl font-semibold tracking-[-0.04em] text-white">{value as string}</div>
              <div className="text-sm text-slate-400">{label as string}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function StatusChip({ status }: { status: string }) {
  const classes =
    status === "Approved" || status === "APPROVED" || status === "Passed"
      ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
      : status === "Blocked" || status === "Rejected"
        ? "border-rose-400/20 bg-rose-500/10 text-rose-300"
      : status === "POLICY CHECK"
        ? "border-blue-400/20 bg-blue-500/10 text-blue-300"
          : status === "RUN STARTED" || status === "Escalated"
            ? "border-violet-400/20 bg-violet-500/10 text-violet-300"
            : "border-amber-400/20 bg-amber-500/10 text-amber-300";
  return <span className={`status-chip ${classes}`}>{status}</span>;
}

function dotColor(tone: string) {
  if (tone === "green") return "bg-emerald-400";
  if (tone === "amber") return "bg-amber-300";
  if (tone === "slate") return "bg-slate-500";
  return "bg-blue-400";
}

