import AronPiper from "../assets/AronPiper.jpg"
import Jennie from "../assets/jennie.jpg"
import Greicy from "../assets/greicy.jpg"
import Jorge from "../assets/jorge.jpg"
import Gaston from "../assets/gaston.jpg"
import loliBahia from "../assets/loliBahia.jpg"
import yoongi from "../assets/yoongi.jpg"
import hyunjin from "../assets/hyujin.jpg"
import harry from "../assets/harry.jpg"
import bradpitt from "../assets/bradpitt.jpg"
import michael from "../assets/michael.jpg"
import avatar1 from "../assets/avatar 1.jpg"
import avatar2 from "../assets/avatar 2.jpg"
import avatar4 from "../assets/avatar 4.jpg"
import avatar5 from "../assets/avatar 5.jpg"
import profile from "../assets/profile.jpg"
import dardosSong from "../assets/dardos.mp3"
import cover from '../assets/cover.jpg'
import concertImgAlvaro from "../assets/alvaro_diaz.jpeg"
import concertImgOneDirection from "../assets/one_direction.jpeg"
import concertImgMichaelJackson from "../assets/michael_jackson.jpeg"
import concertImgFuerzaRegida from "../assets/fuerza_regida.jpeg"
import concertImgGrupoGuayacan from "../assets/grupo_guayacan.jpeg"
import concertImgThreeDaysGrace from "../assets/three_days_grace.jpeg"
import concertImg5sos from "../assets/5sos.jpeg"

export const imageMap: Record<string, string> = {
  // Songs
  "Dardos": cover,
  "assets/cover.jpg": cover,
  "/assets/cover.jpg": cover,
  "dardosSong": dardosSong,
  "assets/dardos.mp3": dardosSong,
  "/assets/dardos.mp3": dardosSong,

   // Con /assets/ — para posts y comentarios
  "/assets/AronPiper.jpg": AronPiper,
  "/assets/jennie.jpg": Jennie,
  "/assets/greicy.jpg": Greicy,
  "/assets/jorge.jpg": Jorge,
  "/assets/gaston.jpg": Gaston,
  "/assets/loliBahia.jpg": loliBahia,
  "/assets/yoongi.jpg": yoongi,
  "/assets/hyujin.jpg": hyunjin,
  "/assets/harry.jpg": harry,
  "/assets/bradpitt.jpg": bradpitt,
  "/assets/michael.jpg": michael,
  "/assets/avatar 1.jpg": avatar1,
  "/assets/avatar 2.jpg": avatar2,
  "/assets/avatar 4.jpg": avatar4,
  "/assets/avatar 5.jpg": avatar5,
  "/assets/profile.jpg": profile,
  "/assets/alvaro_diaz.jpeg": concertImgAlvaro,
  "/assets/alvaro_Diaz.jpeg": concertImgAlvaro,
  "/assets/one_direction.jpeg": concertImgOneDirection,
  "/assets/michael_jackson.jpeg": concertImgMichaelJackson,
  "/assets/fuerza_regida.jpeg": concertImgFuerzaRegida,
  "/assets/grupo_guayacan.jpeg": concertImgGrupoGuayacan,
  "/assets/three_days_grace.jpeg": concertImgThreeDaysGrace,
  "/assets/5sos.jpeg": concertImg5sos,

  // Sin /assets/ — para users
  "assets/AronPiper.jpg": AronPiper,
  "assets/jennie.jpg": Jennie,
  "assets/loliBahia.jpg": loliBahia,
  "assets/yoongi.jpg": yoongi,
  "assets/hyujin.jpg": hyunjin,
  "assets/harry.jpg": harry,
  "assets/bradpitt.jpg": bradpitt,
  "assets/michael.jpg": michael,
  "assets/avatar 1.jpg": avatar1,
  "assets/avatar 2.jpg": avatar2,
  "assets/avatar 4.jpg": avatar4,
  "assets/avatar 5.jpg": avatar5,
  "assets/profile.jpg": profile,
  "assets/alvaro_diaz.jpeg": concertImgAlvaro,
  "assets/alvaro_Diaz.jpeg": concertImgAlvaro,
  "assets/one_direction.jpeg": concertImgOneDirection,
  "assets/michael_jackson.jpeg": concertImgMichaelJackson,
  "assets/fuerza_regida.jpeg": concertImgFuerzaRegida,
  "assets/grupo_guayacan.jpeg": concertImgGrupoGuayacan,
  "assets/three_days_grace.jpeg": concertImgThreeDaysGrace,
  "assets/5sos.jpeg": concertImg5sos,
  "./src/assets/alvaro_Diaz.jpeg": concertImgAlvaro,
  "./src/assets/alvaro_diaz.jpeg": concertImgAlvaro,
  "./src/assets/one_direction.jpeg": concertImgOneDirection,
  "src/assets/michael_jackson.jpeg": concertImgMichaelJackson,
  "src/assets/fuerza_regida.jpeg": concertImgFuerzaRegida,
  "src/assets/grupo_guayacan.jpeg": concertImgGrupoGuayacan,
  "src/assets/three_days_grace.jpeg": concertImgThreeDaysGrace,
  "src/assets/5sos.jpeg": concertImg5sos,

  // Keys cortas
  "AronPiper": AronPiper,
  "Jennie": Jennie,
  "Greicy": Greicy,
  "Jorge": Jorge,
  "Gaston": Gaston,
  "profile": profile,
}

export function resolveAsset(src?: string): string {
  if (!src) return "";
  return imageMap[src] ?? src;
}
