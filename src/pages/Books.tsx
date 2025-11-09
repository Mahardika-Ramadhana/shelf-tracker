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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, Search, Edit, Trash2, CheckCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function Books() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGenre, setFilterGenre] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Mock data
  const books = [
    {
      id: 1,
      title: "Introduction to Algorithms",
      author: "Thomas H. Cormen",
      publication_year: 2009,
      genre: "Computer Science",
      is_available: true,
    },
    {
      id: 2,
      title: "Clean Code",
      author: "Robert C. Martin",
      publication_year: 2008,
      genre: "Programming",
      is_available: false,
    },
    {
      id: 3,
      title: "The Pragmatic Programmer",
      author: "Andrew Hunt",
      publication_year: 1999,
      genre: "Programming",
      is_available: true,
    },
  ];

  const genres = ["Computer Science", "Programming", "Fiction", "Non-Fiction"];

  const handleAddBook = () => {
    toast.success("Buku berhasil ditambahkan!");
    setIsDialogOpen(false);
  };

  const handleDeleteBook = (id: number) => {
    toast.success("Buku berhasil dihapus!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Manajemen Buku</h2>
          <p className="text-muted-foreground">
            Kelola katalog buku perpustakaan
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Tambah Buku
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Buku Baru</DialogTitle>
              <DialogDescription>
                Masukkan informasi buku yang akan ditambahkan
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Judul Buku</Label>
                <Input id="title" placeholder="Masukkan judul buku" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="author">Penulis</Label>
                <Input id="author" placeholder="Masukkan nama penulis" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="year">Tahun Terbit</Label>
                <Input id="year" type="number" placeholder="2024" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="genre">Genre</Label>
                <Select>
                  <SelectTrigger id="genre">
                    <SelectValue placeholder="Pilih genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {genres.map((genre) => (
                      <SelectItem key={genre} value={genre}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Batal
              </Button>
              <Button onClick={handleAddBook}>Simpan</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Buku</CardTitle>
          <CardDescription>Cari dan filter buku berdasarkan kategori</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari berdasarkan judul atau penulis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterGenre} onValueChange={setFilterGenre}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Semua Genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Genre</SelectItem>
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Semua Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="available">Tersedia</SelectItem>
                <SelectItem value="borrowed">Dipinjam</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul Buku</TableHead>
                <TableHead>Penulis</TableHead>
                <TableHead>Tahun Terbit</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.id}>
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.publication_year}</TableCell>
                  <TableCell>{book.genre}</TableCell>
                  <TableCell>
                    {book.is_available ? (
                      <Badge variant="outline" className="gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Tersedia
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="gap-1">
                        <XCircle className="h-3 w-3" />
                        Dipinjam
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteBook(book.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
