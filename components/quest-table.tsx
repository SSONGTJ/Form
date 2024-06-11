"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import { quest } from "@/types";

const QuestTable = ({ quests }: { quests: quest[] }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const QuestRow = (aQuest: quest) => {
    return (
      <TableRow key={aQuest.id}>
        <TableCell>{aQuest.id}</TableCell>
        <TableCell>{aQuest.title}</TableCell>
        <TableCell>{aQuest.type}</TableCell>
        <TableCell>{`${aQuest.created_at}`}</TableCell>
      </TableRow>
    );
  };

  return (
    <>
      <Button onPress={onOpen}>생성</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                폼 만들기
              </ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                
              </ModalBody>
              <ModalFooter>
                <Button color="warning" variant="light" onPress={onClose}>
                  만들기
                </Button>
                <Button color="default" onPress={onClose}>
                  취소
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Title</TableColumn>
          <TableColumn>Type</TableColumn>
          <TableColumn>Created_at</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"보여줄 데이터가 없습니다."}>
          {quests && quests.map((aQuest: quest) => QuestRow(aQuest))}
        </TableBody>
      </Table>
    </>
  );
};

export default QuestTable;
