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
      size="xl" // o full
      backdrop="opaque" // "transparent" | "blur"
      shouldBlockScroll={false} // viene true por defecto
      classNames={{
        base: 'rounded-t-2xl',
        header: 'border-b border-black/5 dark:border-white/10',
      }}
      motionProps={{
        initial: { y: 100, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: 100, opacity: 0 },
      }}
    >
      <DrawerContent>
        <DrawerHeader>{title}</DrawerHeader>
        <DrawerBody className="p-2">{children}</DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
