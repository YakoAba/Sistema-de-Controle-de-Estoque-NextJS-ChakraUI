import { DeleteIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { ConfirmationBox } from "../caixaConfirmacao";

const ButtonDeletar = ({ onClick, id }) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleConfirm = () => {
    onClick();
    setIsConfirmationOpen(false);
  };

  const handleCancel = () => {
    setIsConfirmationOpen(false);
  };

  return (
    <>
      <Button
        id={`deletar${id}`}
        p="2"
        h="auto"
        fontSize={11}
        onClick={() => setIsConfirmationOpen(true)}
        leftIcon={<DeleteIcon />}
        colorScheme="red"
        variant="solid"
        ml={3}
        padding="10px"
      >
        DELETAR
      </Button>
      <ConfirmationBox
        isOpen={isConfirmationOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title="Confirmar exclusão"
        confirmButtonText="Sim"
        cancelButtonText="Não"
      >
        <p>Deseja realmente excluir este item?</p>
      </ConfirmationBox>
    </>
  );
};

export default ButtonDeletar;
