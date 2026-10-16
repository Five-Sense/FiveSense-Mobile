import { FileExclamationPoint, House, Package, Users, type LucideIcon } from 'lucide-react-native';

export type NavigationItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  /** Rota do Expo Router. */
  href: string;
};

/** Menu principal do Visualizador (docs/workflows.md; Home conforme o protótipo 04 · Principal). */
export const VIEWER_NAVIGATION_ITEMS: readonly NavigationItem[] = [
  { id: 'home', label: 'Home', icon: House, href: '/' },
  { id: 'occurrences', label: 'Ocorrências', icon: FileExclamationPoint, href: '/ocorrencias' },
  { id: 'teams', label: 'Equipes', icon: Users, href: '/equipes' },
  { id: 'materials', label: 'Materiais', icon: Package, href: '/materiais' },
];