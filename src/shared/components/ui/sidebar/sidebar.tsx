import { LogOut } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { Platform, ScrollView, Text, View } from 'react-native';

import { NavItem, type NavItemProps } from '@/shared/components/ui/nav';

export type SidebarItem = Omit<NavItemProps, 'selected'> & { id: string };

export type SidebarProps = {
  /** The caller supplies only the items the current profile is allowed to see. */
  items: readonly SidebarItem[];
  accountItem: SidebarItem;
  activeItemId?: string;
  onLogout: () => void;
  logoutDisabled?: boolean;
  /** Replace the provisional wordmark with the approved official asset here. */
  logo?: ReactNode;
};

export function Sidebar({
  items,
  accountItem,
  activeItemId,
  onLogout,
  logoutDisabled = false,
  logo,
}: SidebarProps) {
  return (
    <View
      {...(Platform.OS === 'web' ? { role: 'navigation' as const } : {})}
      accessibilityLabel="Navegação principal"
      className="h-full w-sidebar shrink-0 self-stretch bg-surface">
      <ScrollView
        className="flex-1"
        contentContainerClassName="grow justify-between gap-6 p-4"
        keyboardShouldPersistTaps="handled">
        <View className="gap-6">
          {logo ?? (
            <Text accessibilityLabel="Five Sense" className="font-montserrat-semibold text-wordmark text-brand-primary">
              FIVE <Text className="font-montserrat">SENSE</Text>
            </Text>
          )}
          <View className="gap-2">
            {items.map((item) => (
              <NavItem key={item.id} {...item} selected={activeItemId === item.id} />
            ))}
          </View>
        </View>
        <View className="gap-2">
          <NavItem {...accountItem} selected={activeItemId === accountItem.id} />
          <NavItem label="Sair" icon={LogOut} onPress={onLogout} disabled={logoutDisabled} />
        </View>
      </ScrollView>
    </View>
  );
}
