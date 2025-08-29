'use client';

import { Drawer, DrawerBody, DrawerContent, DrawerHeader } from '@heroui/react';

type BottomSheetProps = {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
};

export function BottomSheet({
  open,
  title,
  onClose,
  children,
}: BottomSheetProps) {
  return (
    <Drawer
      isOpen={open}
      onOpenChange={(isOpen) => !isOpen && onClose()}
      onClose={onClose}
      placement="bottom"
      size="3xl" // o full
      backdrop="opaque" // "transparent" | "blur"
      // shouldBlockScroll={true} // ya viene true por defecto
      classNames={{
        base: 'rounded-t-2xl', // esquinas superiores redondeadas
        header: 'border-b border-black/5 dark:border-white/10',
      }}
    >
      <DrawerContent>
        <DrawerHeader>{title}</DrawerHeader>
        <DrawerBody className="p-2">{children}</DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
