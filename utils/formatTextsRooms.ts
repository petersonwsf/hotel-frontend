import {
  FaBed, FaShower, FaBath, FaTv, FaWifi, FaUsb,
  FaLock, FaPhone, FaPlay, FaSnowflake, FaFire,
  FaWind, FaGlassMartiniAlt, FaCoffee, FaConciergeBell,
    FaSuitcase, FaToiletPaper
} from "react-icons/fa";
import {
  MdOutlineIron, MdMicrowave, MdHotelClass,
  MdOutlineLocalLaundryService,
  MdOutlineSensorWindow
} from "react-icons/md";
import { MdBed } from "react-icons/md";
import { GiPillow, GiBathtub, GiHairStrands } from "react-icons/gi";
import { TbFridge, TbTeapot } from "react-icons/tb";
import { IconType } from "react-icons";

import { RoomCategory } from "@/types/Room.types";

const amenityIconMap : Record<string, IconType> = {
  cama_de_casaL:          MdBed,
  cama_de_solteiro:       FaBed,
  roupa_de_cama_extra:    MdHotelClass,
  travesseiros_extras:    GiPillow,
  banheira:               FaBath,
  chuveiro:               FaShower,
  toalhas_de_banho:       FaToiletPaper,
  roupao:                 GiBathtub,
  amenidades_de_banho:    FaToiletPaper,
  secador_de_cabelo:      GiHairStrands,
  tv_a_cabo:              FaTv,
  wifi_gratuito:          FaWifi,
  tomadas_usb:            FaUsb,
  cofre_eletronico:       FaLock,
  telefone_fixo:          FaPhone,
  servico_de_streaming:   FaPlay,
  ar_condicionado:        FaSnowflake,
  aquecedor:              FaFire,
  cortina_blackout:       MdOutlineSensorWindow,
  ventilador_de_teto:     FaWind,
  minibar:                FaGlassMartiniAlt,
  cafeteira:              FaCoffee,
  micro_ondas:            MdMicrowave,
  frigobar:               TbFridge,
  chaleira_eletrica:      TbTeapot,
  servico_de_quarto_24h:  FaConciergeBell,
  servico_de_lavanderia:  MdOutlineLocalLaundryService,
  mesa_de_trabalho:       FaSuitcase,
  ferro_de_passar_roupa:  MdOutlineIron,
};

const categoryLabelMap: Record<RoomCategory, string> = {
  DLX: "Deluxe",
  PRM: "Premium",
  PST: "Suíte Presidencial",
  STD: "Padrão",
  STE: "Suíte",
  STJ: "Suíte Júnior",
  SUP: "Superior",
};

export const amenityDescriptionMap: Record<string, string> = {
  cama_de_casaL:
    "Cama espaçosa de casal para garantir o descanso ideal a dois com o máximo conforto.",
  cama_de_solteiro:
    "Cama aconchegante para acomodação individual com colchão de alta qualidade.",
  roupa_de_cama_extra:
    "Kits adicionais de lençóis, fronhas e edredons higienizados e à disposição.",
  travesseiros_extras:
    "Travesseiros macios e antialérgicos adicionais para ajustar seu conforto.",
  banheira:
    "Banheira privativa projetada para proporcionar momentos relaxantes de imersão.",
  chuveiro:
    "Chuveiro com pressão de água excelente e controle de temperatura preciso.",
  toalhas_de_banho:
    "Toalhas felpudas 100% algodão, macias e com alta absorção para o seu pós-banho.",
  roupao:
    "Roupões confortáveis e macios para uso durante sua estadia no quarto.",
  amenidades_de_banho:
    "Kit com xampu, condicionador, sabonete e hidratante de alta qualidade.",
  secador_de_cabelo:
    "Secador de cabelo portátil com ajuste de temperatura disponível no banheiro.",
  tv_a_cabo:
    "Televisão HD com acesso a uma ampla grade de canais abertos e fechados.",
  wifi_gratuito:
    "Conexão à internet de alta velocidade ilimitada em todas as áreas do quarto.",
  tomadas_usb:
    "Entradas USB estrategicamente localizadas para facilitar o carregamento de dispositivos.",
  cofre_eletronico:
    "Cofre com senha digital para guardar seus pertences de valor com segurança.",
  telefone_fixo:
    "Aparelho de telefone para contato direto com a recepção e serviço de quarto.",
  servico_de_streaming:
    "Acesso facilitado às principais plataformas de filmes e séries na sua TV.",
  ar_condicionado:
    "Climatização com controle de temperatura individual para o seu total conforto.",
  aquecedor:
    "Sistema de aquecimento para manter o ambiente agradável nos dias frios.",
  cortina_blackout:
    "Bloqueio total da iluminação externa para garantir um sono tranquilo a qualquer hora.",
  ventilador_de_teto:
    "Circulação de ar ajustável no teto para manter a temperatura agradável.",
  minibar:
    "Seleção de bebidas e petiscos selecionados disponíveis diretamente na sua acomodação.",
  cafeteira:
    "Cafeteira elétrica no quarto com sachês ou cápsulas para preparar seu café na hora.",
  micro_ondas:
    "Aparelho prático para aquecer refeições rápidas e lanches a qualquer momento.",
  frigobar:
    "Pequeno refrigerador no quarto para manter suas bebidas e alimentos bem gelados.",
  chaleira_eletrica:
    "Equipamento para aquecer água rapidamente para o preparo de chás e cafés instantâneos.",
  servico_de_quarto_24h:
    "Cardápio variado de refeições e bebidas entregues no seu quarto a qualquer hora.",
  servico_de_lavanderia:
    "Opção de lavagem e secagem das suas peças de roupa com agilidade e cuidado.",
  mesa_de_trabalho:
    "Bancada funcional com iluminação adequada e cadeira confortável para home office.",
  ferro_de_passar_roupa:
    "Ferro e tábua de passar disponíveis para manter suas roupas impecáveis.",
};

export function getAmenityIcon(amenity: string): IconType | null {
  return amenityIconMap[amenity] ?? null;
}

export function formatEnums(value: string) {
    return value.split("_").map((word) => {
        const cleanWord = word.toLowerCase();
        return cleanWord.charAt(0).toUpperCase() + cleanWord.slice(1)
    }).join(' ');
}

export function formatFloor(value: string) : string | undefined {
    if (value === "2_ANDAR") return "2° Andar"
    if (value === "1_ANDAR") return "3° Andar"
    if (value === "3_ANDAR") return "1° Andar"
    if (value === "TERREO") return "Térreo"
}

export function getRoomCategoryLabel(category: RoomCategory): string {
  return categoryLabelMap[category];
}