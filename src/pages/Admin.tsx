import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  LogOut,
  Mail,
  Phone,
  Paperclip,
  Search,
  RefreshCw,
  ShieldAlert,
  ArrowLeft,
  MessageSquare,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface Submission {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  files_count: number;
  files_info: Array<{ name: string; size: number; type: string }> | null;
  delivery_status: string;
  delivery_error: string | null;
}

const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      setUserEmail(session.user.email ?? "");

      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (roleError) console.error("Role check error:", roleError);
      const admin = !!roleData;
      setIsAdmin(admin);

      if (admin) await loadSubmissions();
      setLoading(false);
    };

    init();

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate("/auth");
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const loadSubmissions = async () => {
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) {
      toast.error("Nelze načíst zprávy: " + error.message);
      return;
    }
    setSubmissions((data ?? []) as unknown as Submission[]);
  };

  const handleRefresh = async () => {
    await loadSubmissions();
    toast.success("Přehled aktualizován.");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("contact_submissions")
      .update({ delivery_status: status })
      .eq("id", id);
    if (error) {
      toast.error("Nelze změnit stav: " + error.message);
      return;
    }
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, delivery_status: status } : s))
    );
    toast.success("Stav aktualizován.");
  };

  const filtered = submissions.filter((s) => {
    if (statusFilter !== "all" && s.delivery_status !== statusFilter) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      (s.phone ?? "").toLowerCase().includes(q) ||
      s.message.toLowerCase().includes(q)
    );
  });

  const stats = {
    total: submissions.length,
    pending: submissions.filter((s) => s.delivery_status === "pending").length,
    sent: submissions.filter((s) => s.delivery_status === "sent").length,
    failed: submissions.filter((s) => s.delivery_status === "failed").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground">Načítám...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="max-w-md text-center bg-card border border-border rounded-lg p-8">
          <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-7 h-7 text-destructive" />
          </div>
          <h1 className="text-xl font-serif font-semibold text-foreground mb-2">
            Přístup zamítnut
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            Účet <strong>{userEmail}</strong> nemá roli <code>admin</code>. Kontaktujte správce
            databáze pro přidělení role.
          </p>
          <div className="flex gap-2 justify-center">
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
              Odhlásit
            </Button>
            <Link to="/">
              <Button variant="ghost">
                <ArrowLeft className="w-4 h-4" />
                Zpět na web
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container-custom py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-lg md:text-xl font-serif font-semibold text-foreground">
              Přehled zpráv
            </h1>
            <p className="text-xs text-muted-foreground">
              Přihlášen: {userEmail}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Obnovit</span>
            </Button>
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Web</span>
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Odhlásit</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container-custom py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Celkem" value={stats.total} icon={<MessageSquare className="w-5 h-5" />} />
          <StatCard label="Čekající" value={stats.pending} icon={<Clock className="w-5 h-5 text-amber-600" />} />
          <StatCard label="Odesláno" value={stats.sent} icon={<CheckCircle2 className="w-5 h-5 text-green-600" />} />
          <StatCard label="Selhalo" value={stats.failed} icon={<XCircle className="w-5 h-5 text-destructive" />} />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Hledat podle jména, e-mailu, telefonu nebo textu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {(["all", "pending", "sent", "failed"] as const).map((s) => (
              <Button
                key={s}
                variant={statusFilter === s ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(s)}
              >
                {s === "all" ? "Vše" : s === "pending" ? "Čekající" : s === "sent" ? "Odesláno" : "Selhalo"}
              </Button>
            ))}
          </div>
        </div>

        {/* List */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-card border border-border rounded-lg">
            <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">
              {submissions.length === 0 ? "Zatím žádné zprávy." : "Žádné zprávy neodpovídají filtru."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((s) => (
              <SubmissionCard key={s.id} submission={s} onStatusChange={updateStatus} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

const StatCard = ({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) => (
  <div className="bg-card border border-border rounded-lg p-4">
    <div className="flex items-center justify-between mb-1">
      <span className="text-xs text-muted-foreground uppercase tracking-wide">{label}</span>
      {icon}
    </div>
    <div className="text-2xl font-semibold text-foreground">{value}</div>
  </div>
);

const statusBadge = (status: string) => {
  if (status === "sent") return <Badge className="bg-green-600 hover:bg-green-700">Odesláno</Badge>;
  if (status === "failed") return <Badge variant="destructive">Selhalo</Badge>;
  return <Badge variant="secondary">Čekající</Badge>;
};

const SubmissionCard = ({
  submission,
  onStatusChange,
}: {
  submission: Submission;
  onStatusChange: (id: string, status: string) => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const date = new Date(submission.created_at);
  const dateStr = date.toLocaleString("cs-CZ", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="font-semibold text-foreground">{submission.name}</h3>
            {statusBadge(submission.delivery_status)}
            {submission.files_count > 0 && (
              <Badge variant="outline" className="gap-1">
                <Paperclip className="w-3 h-3" />
                {submission.files_count}
              </Badge>
            )}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <a href={`mailto:${submission.email}`} className="inline-flex items-center gap-1 hover:text-foreground">
              <Mail className="w-3.5 h-3.5" />
              {submission.email}
            </a>
            {submission.phone && (
              <a href={`tel:${submission.phone}`} className="inline-flex items-center gap-1 hover:text-foreground">
                <Phone className="w-3.5 h-3.5" />
                {submission.phone}
              </a>
            )}
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {dateStr}
            </span>
          </div>
        </div>
      </div>

      <div className={`text-sm text-foreground whitespace-pre-wrap ${expanded ? "" : "line-clamp-3"}`}>
        {submission.message}
      </div>
      {submission.message.length > 200 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-1 text-xs text-primary hover:underline"
        >
          {expanded ? "Sbalit" : "Zobrazit celé"}
        </button>
      )}

      {submission.files_info && submission.files_info.length > 0 && (
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground mb-1">Přílohy:</p>
          <ul className="text-xs text-muted-foreground space-y-0.5">
            {submission.files_info.map((f, i) => (
              <li key={i}>
                • {f.name} ({(f.size / 1024).toFixed(1)} KB)
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-3 pt-3 border-t border-border flex gap-2">
        {submission.delivery_status !== "sent" && (
          <Button size="sm" variant="outline" onClick={() => onStatusChange(submission.id, "sent")}>
            Označit jako odesláno
          </Button>
        )}
        {submission.delivery_status !== "failed" && (
          <Button size="sm" variant="ghost" onClick={() => onStatusChange(submission.id, "failed")}>
            Označit jako selhalo
          </Button>
        )}
      </div>
    </div>
  );
};

export default Admin;
