import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Plus, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function Loans() {
  const [borrowDate, setBorrowDate] = useState<Date>(new Date());
  const [dueDate, setDueDate] = useState<Date>(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  );

  // Mock data - active loans
  const activeLoans = [
    {
      id: 1,
      bookTitle: "Introduction to Algorithms",
      memberName: "Ahmad Wijaya",
      borrow_date: "2024-01-10",
      due_date: "2024-01-17",
      daysRemaining: 3,
    },
    {
      id: 2,
      bookTitle: "Clean Code",
      memberName: "Siti Nurhaliza",
      borrow_date: "2024-01-12",
      due_date: "2024-01-19",
      daysRemaining: 5,
    },
  ];

  // Mock data - loan history
  const loanHistory = [
    {
      id: 3,
      bookTitle: "The Pragmatic Programmer",
      memberName: "Budi Santoso",
      borrow_date: "2024-01-01",
      due_date: "2024-01-08",
      return_date: "2024-01-07",
      status: "Returned On Time",
    },
    {
      id: 4,
      bookTitle: "Design Patterns",
      memberName: "Ahmad Wijaya",
      borrow_date: "2023-12-20",
      due_date: "2023-12-27",
      return_date: "2023-12-30",
      status: "Returned Late",
    },
  ];

  const handleCreateLoan = () => {
    toast.success("Transaksi peminjaman berhasil dicatat!");
  };

  const handleReturnBook = (id: number) => {
    toast.success("Buku berhasil dikembalikan!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Manajemen Peminjaman</h2>
        <p className="text-muted-foreground">
          Catat transaksi peminjaman dan pengembalian buku
        </p>
      </div>

      {/* New Loan Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Catat Peminjaman Baru
          </CardTitle>
          <CardDescription>
            Masukkan informasi peminjaman buku
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="member">Anggota</Label>
              <Input id="member" placeholder="Cari nama atau ID anggota..." />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="book">Buku</Label>
              <Input id="book" placeholder="Cari judul atau ID buku..." />
            </div>
            <div className="grid gap-2">
              <Label>Tanggal Pinjam</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !borrowDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {borrowDate ? format(borrowDate, "PPP") : <span>Pilih tanggal</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={borrowDate}
                    onSelect={(date) => date && setBorrowDate(date)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid gap-2">
              <Label>Tanggal Jatuh Tempo</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, "PPP") : <span>Pilih tanggal</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={(date) => date && setDueDate(date)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="mt-4">
            <Button onClick={handleCreateLoan} className="gap-2">
              <Plus className="h-4 w-4" />
              Simpan Transaksi
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Loans Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Peminjaman</CardTitle>
          <CardDescription>Kelola peminjaman aktif dan riwayat</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="active">Peminjaman Aktif</TabsTrigger>
              <TabsTrigger value="history">Riwayat</TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Judul Buku</TableHead>
                    <TableHead>Peminjam</TableHead>
                    <TableHead>Tgl Pinjam</TableHead>
                    <TableHead>Tgl Jatuh Tempo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeLoans.map((loan) => (
                    <TableRow key={loan.id}>
                      <TableCell className="font-medium">{loan.bookTitle}</TableCell>
                      <TableCell>{loan.memberName}</TableCell>
                      <TableCell>{loan.borrow_date}</TableCell>
                      <TableCell>{loan.due_date}</TableCell>
                      <TableCell>
                        <Badge variant={loan.daysRemaining > 0 ? "outline" : "destructive"}>
                          {loan.daysRemaining > 0
                            ? `${loan.daysRemaining} hari lagi`
                            : "Terlambat"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-2"
                          onClick={() => handleReturnBook(loan.id)}
                        >
                          <CheckCircle className="h-4 w-4" />
                          Kembalikan
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="history" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Judul Buku</TableHead>
                    <TableHead>Peminjam</TableHead>
                    <TableHead>Tgl Pinjam</TableHead>
                    <TableHead>Tgl Jatuh Tempo</TableHead>
                    <TableHead>Tgl Kembali</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loanHistory.map((loan) => (
                    <TableRow key={loan.id}>
                      <TableCell className="font-medium">{loan.bookTitle}</TableCell>
                      <TableCell>{loan.memberName}</TableCell>
                      <TableCell>{loan.borrow_date}</TableCell>
                      <TableCell>{loan.due_date}</TableCell>
                      <TableCell>{loan.return_date}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            loan.status === "Returned On Time" ? "outline" : "secondary"
                          }
                        >
                          {loan.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
