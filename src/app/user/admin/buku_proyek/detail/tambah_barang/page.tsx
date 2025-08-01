"use client";
import TambahBarang from "@/app/ui/admin/buku_proyek/detail/tambah_barang";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { InputTbl } from "@/app/component/input_tbl";
import { toast } from "react-toastify";

export default function page() {
  const searchParams = useSearchParams();
  const [Idbpbarang, setIdbpbarang] = useState("");
  const [Idrekening, setIdrekening] = useState("");
  const [NamaBarang, setNamaBarang] = useState("");
  const [Spesifikasi, setSpesifikasi] = useState("");
  const [Volume, setVolume] = useState("");
  const [Satuan, setSatuan] = useState("");
  const [HargaSatuan, setHargaSatuan] = useState("");
  const [HargaTotal, setHargaTotal] = useState("");
  const router = useRouter();

  useEffect(() => {
    const id_bp = searchParams.get("id_bp");
    const id_kr = searchParams.get("id_kr");
    if (id_bp && id_kr) {
      setIdbpbarang(id_bp);
      setIdrekening(id_kr);
    }
  });

  useEffect(() => {
    const total = Number(HargaSatuan) * Number(Volume);
    setHargaTotal(total.toString());
  }, [HargaSatuan, Volume]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/barangdpa/tambah_data",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_bpbarang: Idbpbarang,
            id_kdrekening: Idrekening,
            nama_barang: NamaBarang,
            spesifikasi: Spesifikasi,
            vol: Volume,
            satuan: Satuan,
            harga_satuan: HargaSatuan,
            harga_total: HargaTotal,
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
    <TambahBarang onSubmit={handleSubmit}>
      <InputTbl
        classPage="mb-7 hidden"
        type="hidden"
        value={Idbpbarang}
        onChange={(e) => setIdbpbarang(e.target.value)}
      >
        id_bpbarang
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        value={NamaBarang}
        onChange={(e) => setNamaBarang(e.target.value)}
      >
        Nama Barang
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        value={Spesifikasi}
        onChange={(e) => setSpesifikasi(e.target.value)}
      >
        Spesifikasi
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        value={Volume}
        onChange={(e) => setVolume(e.target.value)}
      >
        Volume
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        value={Satuan}
        onChange={(e) => setSatuan(e.target.value)}
      >
        Satuan
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        value={HargaSatuan}
        onChange={(e) => setHargaSatuan(e.target.value)}
      >
        Harga Satuan
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        value={HargaTotal}
        onChange={(e) => setHargaTotal(e.target.value)}
      >
        Harga Total
      </InputTbl>
    </TambahBarang>
  );
}
