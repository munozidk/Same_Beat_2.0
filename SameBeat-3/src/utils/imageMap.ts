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
import dardosSong from "../assets/dardos.mp3"
import cover from '../assets/cover.jpg'

export const imageMap: Record<string, string> = {
  // Songs
  "Dardos": cover,
  "dardosSong": dardosSong,

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

  // Keys cortas
  "AronPiper": AronPiper,
  "Jennie": Jennie,
  "Greicy": Greicy,
  "Jorge": Jorge,
  "Gaston": Gaston,
}