import { StatCard } from "@/components/StatCard";
import { BookOpen, Users, FileText, DollarSign, Plus, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const navigate = useNavigate();

  // Mock data - akan diganti dengan real API calls
  const stats = {
    totalBooks: 1234,
    totalMembers: 567,
    activeLoans: 89,
    unpaidFines: 12,
  };

  const overdueLoans = [
    {
      id: 1,
      bookTitle: "Introduction to Algorithms",
      memberName: "Ahmad Wijaya",
      dueDate: "2024-01-15",
      daysOverdue: 5,
    },
    {
      id: 2,
      bookTitle: "Clean Code",
      memberName: "Siti Nurhaliza",
      dueDate: "2024-01-18",
      daysOverdue: 2,
    },
    {
      id: 3,
      bookTitle: "The Pragmatic Programmer",
      memberName: "Budi Santoso",
      dueDate: "2024-01-12",
      daysOverdue: 8,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview sistem perpustakaan Anda
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Buku"
          value={stats.totalBooks}
          icon={BookOpen}
          description="Buku dalam katalog"
        />
        <StatCard
          title="Total Anggota"
          value={stats.totalMembers}
          icon={Users}
          description="Anggota terdaftar"
        />
        <StatCard
          title="Sedang Dipinjam"
          value={stats.activeLoans}
          icon={FileText}
          description="Peminjaman aktif"
        />
        <StatCard
          title="Denda Belum Lunas"
          value={stats.unpaidFines}
          icon={DollarSign}
          description="Perlu ditindaklanjuti"
        />
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Aksi Cepat</CardTitle>
          <CardDescription>Shortcut untuk tugas yang sering dilakukan</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button onClick={() => navigate("/loans")} className="gap-2">
            <Plus className="h-4 w-4" />
            Catat Peminjaman Baru
          </Button>
          <Button onClick={() => navigate("/members")} variant="outline" className="gap-2">
            <Plus className="h-4 w-4" />
            Tambah Anggota
          </Button>
          <Button onClick={() => navigate("/books")} variant="outline" className="gap-2">
            <Plus className="h-4 w-4" />
            Tambah Buku
          </Button>
        </CardContent>
      </Card>

      {/* Overdue Loans Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <div>
              <CardTitle>Terlambat Pengembalian</CardTitle>
              <CardDescription>Peminjaman yang melewati jatuh tempo</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul Buku</TableHead>
                <TableHead>Peminjam</TableHead>
                <TableHead>Jatuh Tempo</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {overdueLoans.map((loan) => (
                <TableRow key={loan.id}>
                  <TableCell className="font-medium">{loan.bookTitle}</TableCell>
                  <TableCell>{loan.memberName}</TableCell>
                  <TableCell>{loan.dueDate}</TableCell>
                  <TableCell>
                    <Badge variant="destructive">
                      Terlambat {loan.daysOverdue} hari
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
