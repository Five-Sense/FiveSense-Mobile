import { FileExclamationPoint, Package, Users, type LucideIcon } from 'lucide-react-native';

import { VIEWER_NAVIGATION_ITEMS } from '@/shared/constants/navigation';

export type HomeAccessItem = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel: string;
  href: string;
};

function hrefOf(id: string) {
  const item = VIEWER_NAVIGATION_ITEMS.find((candidate) => candidate.id === id);
  if (!item) throw new Error(`Item de navegação inexistente: ${id}`);
  return item.href;
}

/** Atalhos da página principal do Visualizador (protótipo "Home"; textos do Figma). */
export const HOME_ACCESS_ITEMS: readonly HomeAccessItem[] = [
  {
    id: 'occurrences',
    icon: FileExclamationPoint,
    title: 'Ocorrências',
    description: 'Registre uma ocorrência vinculada a um problema e a um material.',
    actionLabel: 'Registrar ocorrência',
    href: hrefOf('occurrences'),
  },
  {
    id: 'teams',
    icon: Users,
    title: 'Equipes',
    description: 'Consulte equipes, horários e atualize o 5S da sua equipe.',
    actionLabel: 'Consultar equipes',
    href: hrefOf('teams'),
  },
  {
    id: 'materials',
    icon: Package,
    title: 'Materiais',
    description: 'Consulte os materiais disponíveis e suas quantidades em estoque.',
    actionLabel: 'Consultar materiais',
    href: hrefOf('materials'),
  },
];