import { useQuery } from "react-query";
import supabase from "../../app/supabase";

interface PropsType {
  name: string;
  id: string;
  diemdi: string;
  hoten: string;
  bia: string;
}

const GetBookingPage = async (page: number, TourName: string) => {
  const { data, error } = await supabase
    .from("booking")
    .select(
      `
      status, hanhkhach,
      customer( id, hoten, cccd, sdt, email, ngaysinh, diachi, ghichu, yeucau ),
      tour( id, name, diemdi, bia )
    `
    )
    //.filter('tour.name', 'ilike', `%${TourName}%`)
    .ilike("tour.name", `%${TourName}%`)
    .not("tour( id, name, diemdi, bia )", "is", null)
    .range((page - 1) * 5, page * 5 - 1)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Tour not found!");
  }
  //danh sách tất cả booking

  return data;
};
export default function useGetBookingPage(page: number, TourName: string) {
  return useQuery("BookingPage" + page + TourName, () =>
    GetBookingPage(page, TourName)
  );
}
