export type FaqItem = {
  pregunta: string;
  respuesta: string;
};

export type Temporada = "general" | "Navidad" | "Reyes";

export type FranjaPrecio = "barato" | "medio" | "caro";

export type Bolucompra = {
  id: number;
  slug: string;
  nombre: string;
  tienda: string;
  urlProducto: string;
  linkAfiliado: string;
  precioReferencia: string;
  moneda: string;
  fechaPrecio: string;
  emoji: string;
  imagenUrl: string;
  descripcion: string;
  nivel: number;
  tags: string[];
  categoria: string;
  fecha: string;
  tituloSeo: string;
  metaDescription: string;
  intro: string;
  porQue: string[];
  paraQuien: string[];
  pros: string[];
  contras: string[];
  ideasDeUso: string[];
  veredicto: string;
  faq: FaqItem[];
  tagsRicos: string[];
  temporada: Temporada;
  edadSugerida: string;
  franja: FranjaPrecio | "";
  consejoParaRegalar: string;
};
