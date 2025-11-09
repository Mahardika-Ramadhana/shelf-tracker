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
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Fines() {
  // Mock data - unpaid fines
  const unpaidFines = [
    {
      id: 1,
      memberName: "Ahmad Wijaya",
      bookTitle: "Introduction to Algorithms",
      amount: 15000,
      fine_date: "2024-01-16",
      daysOverdue: 5,
    },
    {
      id: 2,
      memberName: "Budi Santoso",
      bookTitle: "The Pragmatic Programmer",
      amount: 9000,
      fine_date: "2024-01-13",
      daysOverdue: 3,
    },
  ];

  // Mock data - paid fines
  const paidFines = [
    {
      id: 3,
      memberName: "Siti Nurhaliza",
      bookTitle: "Clean Code",
      amount: 6000,
      fine_date: "2024-01-05",
      paid_date: "2024-01-08",
    },
    {
      id: 4,
      memberName: "Ahmad Wijaya",
      bookTitle: "Design Patterns",
      amount: 12000,
      fine_date: "2023-12-28",
      paid_date: "2024-01-02",
    },
  ];

  const handleMarkPaid = (id: number) => {
    toast.success("Denda berhasil ditandai lunas!");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Manajemen Denda</h2>
        <p className="text-muted-foreground">
          Kelola denda keterlambatan pengembalian buku
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Denda</CardTitle>
          <CardDescription>Lacak status pembayaran denda anggota</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="unpaid" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="unpaid" className="gap-2">
                <AlertCircle className="h-4 w-4" />
                Belum Lunas
              </TabsTrigger>
              <TabsTrigger value="paid" className="gap-2">
                <CheckCircle className="h-4 w-4" />
                Sudah Lunas
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="unpaid" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama Peminjam</TableHead>
                    <TableHead>Judul Buku</TableHead>
                    <TableHead>Jumlah Denda</TableHead>
                    <TableHead>Tanggal Denda</TableHead>
                    <TableHead>Keterlambatan</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {unpaidFines.map((fine) => (
                    <TableRow key={fine.id}>
                      <TableCell className="font-medium">{fine.memberName}</TableCell>
                      <TableCell>{fine.bookTitle}</TableCell>
                      <TableCell className="font-semibold text-destructive">
                        {formatCurrency(fine.amount)}
                      </TableCell>
                      <TableCell>{fine.fine_date}</TableCell>
                      <TableCell>
                        <Badge variant="destructive">
                          {fine.daysOverdue} hari
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-2"
                          onClick={() => handleMarkPaid(fine.id)}
                        >
                          <CheckCircle className="h-4 w-4" />
                          Tandai Lunas
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="paid" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama Peminjam</TableHead>
                    <TableHead>Judul Buku</TableHead>
                    <TableHead>Jumlah Denda</TableHead>
                    <TableHead>Tanggal Denda</TableHead>
                    <TableHead>Tanggal Pembayaran</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paidFines.map((fine) => (
                    <TableRow key={fine.id}>
                      <TableCell className="font-medium">{fine.memberName}</TableCell>
                      <TableCell>{fine.bookTitle}</TableCell>
                      <TableCell className="font-semibold text-muted-foreground">
                        {formatCurrency(fine.amount)}
                      </TableCell>
                      <TableCell>{fine.fine_date}</TableCell>
                      <TableCell>{fine.paid_date}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Lunas
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
