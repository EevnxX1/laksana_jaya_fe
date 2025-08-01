"use client";
import TambahRekening from "@/app/ui/admin/buku_proyek/detail/tambah_rekening";
import { InputTbl } from "@/app/component/input_tbl";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function page() {
  const searchParams = useSearchParams();
  const [Idbpbarang, setIdbpbarang] = useState("");
  const [NomerRekening, setNomerRekening] = useState("");
  const [Ket, setKet] = useState("");
  const router = useRouter();

  useEffect(() => {
    const id = searchParams.get("id_bp");
    if (id) {
      setIdbpbarang(id);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/kdrekening/tambah_data",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_bpbarang: Idbpbarang,
            no_rekening: NomerRekening,
            ket: Ket,
          }),
        }
      );

      if (res.status === 201 || res.status === 200) {
        toast.success("Data berhasil disimpan");
        router.push(`/user/admin/buku_proyek/detail?id_bp=${Idbpbarang}`);
      } else {
        toast.error("Gagal menyimpan data");
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi error saat submit");
    }
  };
  return (
    <TambahRekening onSubmit={handleSubmit}>
      <InputTbl
        classPage=""
        value={NomerRekening}
        onChange={(e) => setNomerRekening(e.target.value)}
      >
        Nomer Rekening
      </InputTbl>
      <InputTbl
        classPage=""
        value={Ket}
        onChange={(e) => setKet(e.target.value)}
      >
        Ket
      </InputTbl>
      <InputTbl
        classPage="hidden"
        value={Idbpbarang}
        onChange={(e) => setIdbpbarang(e.target.value)}
      >
        ID Buku Proyek Barang
      </InputTbl>
    </TambahRekening>
  );
}
